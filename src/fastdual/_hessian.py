"""Hessian computation via hyper-dual numbers."""

import functools

import numpy as np


def autohess(fnc):
    """Decorator that wraps a scalar function to return (result, hessian).

    The wrapped function converts its arguments to HyperDual seeds, evaluates
    the original function, and returns (numeric_result, hessian_matrix).

    Usage:
        @autohess
        def f(x, y):
            return x**2 + y**2

        result, H = f(1.0, 1.0)
    """
    from ._hyperdual import hessian_matrix, HyperDual

    @functools.wraps(fnc)
    def wrapper(*args):
        x = np.array(args, dtype=float)

        def array_fun(xarr):
            return fnc(*xarr)

        H = hessian_matrix(array_fun, x)
        # Evaluate with zero-perturbation HyperDuals to get the scalar result,
        # so that functions using HyperDual methods (e.g. .sin()) work correctly.
        hd_args = [HyperDual(float(a)) for a in args]
        result = float(fnc(*hd_args))
        return result, H
    return wrapper
