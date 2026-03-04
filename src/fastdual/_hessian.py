"""Hessian computation via hyper-dual numbers."""

import numpy as np
from ._hyperdual import HyperDual


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
    x = np.asarray(x, dtype=float).ravel()
    n = len(x)
    H = np.zeros((n, n))

    for i in range(n):
        for j in range(i, n):
            # Create HyperDual seeds: x_k with e1 in direction i, e2 in direction j
            hx = []
            for k in range(n):
                f1 = 1.0 if k == i else 0.0
                f2 = 1.0 if k == j else 0.0
                hx.append(HyperDual(x[k], f1, f2, 0.0))
            result = fun(hx)
            H[i, j] = result.f12
            H[j, i] = result.f12  # symmetry

    return H
