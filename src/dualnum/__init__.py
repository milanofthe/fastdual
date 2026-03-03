from ._dualnum import Dual, reset
import functools
import numpy as np


def der(result, wrt):
    """Get the partial derivative of result with respect to a seed Dual.

    Works on scalars and numpy arrays of Duals.
    """
    if isinstance(result, np.ndarray):
        return np.array([der(r, wrt) for r in result.flat]).reshape(result.shape)
    if isinstance(result, Dual):
        return result.der(wrt)
    return 0.0


def jac(results, seeds):
    """Compute the Jacobian matrix: J[i, j] = d(results[i]) / d(seeds[j])."""
    results_arr = np.asarray(results)
    seeds = list(seeds)
    n = results_arr.size
    m = len(seeds)
    J = np.zeros((n, m))
    for i, r in enumerate(results_arr.flat):
        for j, s in enumerate(seeds):
            J[i, j] = der(r, s)
    return J


def seed_array(values):
    """Create a numpy array of independent seed Duals from a list of floats."""
    return np.array([Dual(float(v)) for v in values])


def val(arr):
    """Extract primal values from an array of Duals."""
    arr = np.asarray(arr)
    out = np.empty(arr.shape, dtype=float)
    for i, d in enumerate(arr.flat):
        if isinstance(d, Dual):
            out.flat[i] = d.val
        else:
            out.flat[i] = float(d)
    return out


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
