from ._dualnum import Dual, reset
from ._dualnum import seed_array as _c_seed_array
from ._dualnum import val_array as _c_val_array
from ._dualnum import der_array as _c_der_array
from ._dualnum import jac_matrix as _c_jac_matrix
from ._dualnum import apply_unary_array as _c_apply_unary
from ._dualnum import apply_binary_array as _c_apply_binary
import functools
import numpy as np


class DualArray(np.ndarray):
    """ndarray subclass that intercepts ufuncs for C-level batch dispatch."""
    __array_priority__ = 25.0

    def __new__(cls, input_array):
        return np.asarray(input_array, dtype=object).view(cls)

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
                return result.view(DualArray)

        elif len(inputs) == 2:
            lhs = np.asarray(inputs[0]) if isinstance(inputs[0], np.ndarray) else inputs[0]
            rhs = np.asarray(inputs[1]) if isinstance(inputs[1], np.ndarray) else inputs[1]
            result = _c_apply_binary(name, lhs, rhs)
            if result is not None:
                return result.view(DualArray)

        return self._fallback(ufunc, method, *inputs, **kwargs)

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
    """Create a numpy array of independent seed Duals from a list of floats."""
    return DualArray(_c_seed_array(list(values)))


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
        seeds = seed_array(args)
        out = fnc(*seeds)
        out_arr = np.atleast_1d(out)
        return val(out_arr), jac(out_arr, seeds)
    return wrapper
