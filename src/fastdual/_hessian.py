"""Hessian computation via hyper-dual numbers."""

import numpy as np


def hessian(fun, x):
    """Compute the Hessian matrix of a scalar function.

    Parameters
    ----------
    fun : callable
        Scalar function ``f(x) -> scalar`` that works with HyperDual numbers.
    x : array_like
        Point at which to evaluate the Hessian, shape ``(n,)``.

    Returns
    -------
    H : ndarray, shape (n, n)
        Hessian matrix where ``H[i, j] = d²f / dx_i dx_j``.
    """
    from ._hyperdual import hessian_matrix
    return hessian_matrix(fun, np.asarray(x, dtype=float).ravel())
