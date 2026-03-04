"""scipy.optimize integration for fastdual."""

import numpy as np


def minimize(fun, x0, method='L-BFGS-B', **kwargs):
    """Minimize a scalar function using automatic gradients.

    Wraps ``scipy.optimize.minimize`` with automatic gradient computation
    via forward-mode AD. The function ``fun`` should accept a DualArray and
    return a scalar Dual.

    Parameters
    ----------
    fun : callable
        Objective function ``f(x) -> scalar``. Will be called with a DualArray.
    x0 : array_like
        Initial guess.
    method : str
        Optimization method (default ``'L-BFGS-B'``).
    **kwargs
        Additional keyword arguments passed to ``scipy.optimize.minimize``.

    Returns
    -------
    scipy.optimize.OptimizeResult
    """
    try:
        from scipy.optimize import minimize as sp_minimize
    except ImportError:
        raise ImportError(
            "scipy is required for fastdual.minimize. "
            "Install it with: pip install fastdual[optimize]"
        )

    from . import DualArray, val

    x0 = np.asarray(x0, dtype=float).ravel()

    def fun_and_grad(x):
        seeds = DualArray(x)
        result = fun(seeds)
        f_val = float(result)
        grad = np.array([result.der(seeds[i]) for i in range(len(x))])
        return f_val, grad

    return sp_minimize(fun_and_grad, x0, method=method, jac=True, **kwargs)
