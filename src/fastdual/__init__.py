from importlib.metadata import version as _pkg_version

__version__ = _pkg_version("fastdual")

from ._fastdual import Dual, reset
from ._fastdual import seed_array as _c_seed_array
from ._fastdual import val_array as _c_val_array
from ._fastdual import der_array as _c_der_array
from ._fastdual import jac_matrix as _c_jac_matrix
from ._fastdual import apply_unary_array as _c_apply_unary
from ._fastdual import apply_binary_array as _c_apply_binary
import functools
import warnings
import numpy as np

from ._optimize import minimize
from ._hyperdual import HyperDual
from ._hessian import hessian
from ._coloring import sparse_jac


# ---------------------------------------------------------------------------
# __array_function__ protocol — dispatch table
# ---------------------------------------------------------------------------

HANDLED_FUNCTIONS = {}


def implements(np_function):
    """Register an __array_function__ implementation."""
    def decorator(func):
        HANDLED_FUNCTIONS[np_function] = func
        return func
    return decorator


# -- np.dot -----------------------------------------------------------------

@implements(np.dot)
def _dot(a, b):
    a = np.asarray(a)
    b = np.asarray(b)
    if a.ndim == 1 and b.ndim == 1:
        # 1D dot product
        return sum(ai * bi for ai, bi in zip(a, b))
    if a.ndim == 2 and b.ndim == 2:
        # 2D matmul
        n, k = a.shape
        k2, m = b.shape
        out = np.empty((n, m), dtype=object)
        for i in range(n):
            for j in range(m):
                out[i, j] = sum(a[i, p] * b[p, j] for p in range(k))
        return out.view(DualArray)
    if a.ndim == 2 and b.ndim == 1:
        # matvec
        n, k = a.shape
        out = np.empty(n, dtype=object)
        for i in range(n):
            out[i] = sum(a[i, p] * b[p] for p in range(k))
        return out.view(DualArray)
    return NotImplemented


# -- np.sum -----------------------------------------------------------------

@implements(np.sum)
def _sum(a, axis=None, dtype=None, out=None, keepdims=False, initial=np._NoValue, where=np._NoValue):
    a = np.asarray(a)
    if axis is not None or keepdims or out is not None:
        return NotImplemented
    result = a.flat[0]
    for x in list(a.flat)[1:]:
        result = result + x
    return result


# -- np.prod ----------------------------------------------------------------

@implements(np.prod)
def _prod(a, axis=None, dtype=None, out=None, keepdims=False, initial=np._NoValue, where=np._NoValue):
    a = np.asarray(a)
    if axis is not None or keepdims or out is not None:
        return NotImplemented
    result = a.flat[0]
    for x in list(a.flat)[1:]:
        result = result * x
    return result


# -- np.concatenate / np.stack ---------------------------------------------

@implements(np.concatenate)
def _concatenate(arrays, axis=0, out=None, dtype=None, casting="same_kind"):
    raw = [np.asarray(a).view(np.ndarray) for a in arrays]
    result = np.concatenate(raw, axis=axis)
    if result.dtype == object:
        return result.view(DualArray)
    return result


@implements(np.stack)
def _stack(arrays, axis=0, out=None, dtype=None, casting="same_kind"):
    raw = [np.asarray(a).view(np.ndarray) for a in arrays]
    result = np.stack(raw, axis=axis)
    if result.dtype == object:
        return result.view(DualArray)
    return result


# -- np.linalg.norm ---------------------------------------------------------

@implements(np.linalg.norm)
def _norm(x, ord=None, axis=None, keepdims=False):
    x = np.asarray(x)
    if axis is not None or keepdims:
        return NotImplemented
    flat = list(x.flat)
    if ord is None or ord == 2:
        # L2 norm: sqrt(sum(x_i^2))
        s = sum(xi * xi for xi in flat)
        return s.sqrt() if isinstance(s, Dual) else s ** 0.5
    if ord == 1:
        return sum(abs(xi) for xi in flat)
    if ord == np.inf:
        return max(flat, key=lambda xi: abs(float(xi)))
    return NotImplemented


# -- np.linalg.solve --------------------------------------------------------

@implements(np.linalg.solve)
def _solve(a, b):
    a = np.array(np.asarray(a), dtype=object)
    b = np.array(np.asarray(b), dtype=object)
    n = a.shape[0]
    # Augment [A | b]
    if b.ndim == 1:
        aug = np.empty((n, n + 1), dtype=object)
        aug[:, :n] = a
        aug[:, n] = b
        ncols_b = 1
    else:
        m = b.shape[1]
        aug = np.empty((n, n + m), dtype=object)
        aug[:, :n] = a
        aug[:, n:] = b
        ncols_b = m

    # Forward elimination with partial pivoting (pivot on .val)
    for col in range(n):
        # Find pivot
        max_row = col
        max_val = abs(float(aug[col, col]))
        for row in range(col + 1, n):
            v = abs(float(aug[row, col]))
            if v > max_val:
                max_val = v
                max_row = row
        if max_row != col:
            aug[[col, max_row]] = aug[[max_row, col]]

        pivot = aug[col, col]
        for row in range(col + 1, n):
            factor = aug[row, col] / pivot
            for j in range(col, aug.shape[1]):
                aug[row, j] = aug[row, j] - factor * aug[col, j]

    # Back substitution
    for col in range(n - 1, -1, -1):
        for row in range(col):
            factor = aug[row, col] / aug[col, col]
            for j in range(aug.shape[1]):
                aug[row, j] = aug[row, j] - factor * aug[col, j]
        pivot = aug[col, col]
        for j in range(n, aug.shape[1]):
            aug[col, j] = aug[col, j] / pivot

    result = aug[:, n:]
    if ncols_b == 1:
        return result[:, 0].view(DualArray)
    return result.view(DualArray)


# ---------------------------------------------------------------------------
# DualArray
# ---------------------------------------------------------------------------

class DualArray(np.ndarray):
    """ndarray subclass that intercepts ufuncs for C-level batch dispatch.

    When constructed with numeric input (list, tuple, or ndarray of floats/ints),
    automatically creates independent seed Duals::

        x = DualArray([1.0, 2.0, 3.0])  # 3 independent seeds

    When constructed with an array of existing Dual objects, wraps them as-is.
    """
    __array_priority__ = 25.0

    def __new__(cls, input_array):
        arr = np.asarray(input_array)
        # Auto-seed: if input is numeric (not object dtype), create seeds
        if arr.dtype != object:
            return np.asarray(_c_seed_array(arr.ravel().tolist()), dtype=object).reshape(arr.shape).view(cls)
        return arr.view(cls)

    def __array_finalize__(self, obj):
        pass

    def __array_ufunc__(self, ufunc, method, *inputs, **kwargs):
        if method != '__call__' or kwargs.get('out') is not None:
            return self._fallback(ufunc, method, *inputs, **kwargs)

        name = ufunc.__name__

        if len(inputs) == 1:
            arr = np.asarray(inputs[0])
            result = _c_apply_unary(name, arr)
            if result is not None:
                if result.dtype == object:
                    return result.view(DualArray)
                return result  # predicate ufuncs return bool arrays

        elif len(inputs) == 2:
            lhs = np.asarray(inputs[0]) if isinstance(inputs[0], np.ndarray) else inputs[0]
            rhs = np.asarray(inputs[1]) if isinstance(inputs[1], np.ndarray) else inputs[1]
            result = _c_apply_binary(name, lhs, rhs)
            if result is not None:
                return result.view(DualArray)

        return self._fallback(ufunc, method, *inputs, **kwargs)

    def __array_function__(self, func, types, args, kwargs):
        if func in HANDLED_FUNCTIONS:
            result = HANDLED_FUNCTIONS[func](*args, **kwargs)
            if result is not NotImplemented:
                return result
        return super().__array_function__(func, types, args, kwargs)

    def _fallback(self, ufunc, method, *inputs, **kwargs):
        regular = tuple(
            x.view(np.ndarray) if isinstance(x, DualArray) else x
            for x in inputs
        )
        result = getattr(ufunc, method)(*regular, **kwargs)
        if isinstance(result, np.ndarray) and result.dtype == object:
            return result.view(DualArray)
        return result


def der(result, wrt):
    """Get the partial derivative of result with respect to a seed Dual.

    Works on scalars and numpy arrays of Duals.
    """
    if isinstance(result, np.ndarray):
        flat = list(result.flat)
        derivs = _c_der_array(flat, wrt)
        return np.array(derivs).reshape(result.shape)
    if isinstance(result, Dual):
        return result.der(wrt)
    return 0.0


def jac(results, seeds):
    """Compute the Jacobian matrix: J[i, j] = d(results[i]) / d(seeds[j])."""
    results_flat = list(np.asarray(results).flat)
    seeds_list = list(seeds)
    flat, nr, ns = _c_jac_matrix(results_flat, seeds_list)
    return np.array(flat).reshape(nr, ns)


def seed_array(values):
    """Create a numpy array of independent seed Duals from a list of floats.

    .. deprecated:: 0.2.0
        Use ``DualArray(values)`` instead.
    """
    warnings.warn(
        "seed_array() is deprecated, use DualArray() instead",
        DeprecationWarning,
        stacklevel=2,
    )
    return DualArray(list(values))


def val(arr):
    """Extract primal values from an array of Duals."""
    arr = np.asarray(arr)
    flat = list(arr.flat)
    return np.array(_c_val_array(flat)).reshape(arr.shape)


def autojac(fnc):
    """Decorator that wraps a function to return (result, jacobian).

    The wrapped function converts its arguments to seed Duals, evaluates
    the original function, and returns (numeric_result, jacobian_matrix).

    Usage:
        @autojac
        def f(x, y):
            return np.array([x**2 + y, x * y**2])

        result, J = f(2.0, 3.0)
    """
    @functools.wraps(fnc)
    def wrapper(*args):
        seeds = DualArray(list(args))
        out = fnc(*seeds)
        out_arr = np.atleast_1d(out)
        return val(out_arr), jac(out_arr, seeds)
    return wrapper
