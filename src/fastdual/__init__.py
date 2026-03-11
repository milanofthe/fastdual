from importlib.metadata import version as _pkg_version

__version__ = _pkg_version("fastdual")

from ._fastdual import Dual, reset
from ._fastdual import val_array as _c_val_array
from ._fastdual import der_array as _c_der_array
from ._fastdual import jac_matrix as _c_jac_matrix
import functools
import numpy as np

from ._hyperdual import HyperDual
from ._hessian import autohess


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
        s = Dual.from_array(list(args))
        out = fnc(*s)
        out_arr = np.atleast_1d(out)
        return val(out_arr), jac(out_arr, s)
    return wrapper
