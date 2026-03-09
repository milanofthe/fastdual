"""scipy.optimize integration for fastdual."""

import numpy as np


def minimize(fun, x0, method=None, hess=False, **kwargs):
    """Minimize a scalar function using automatic derivatives.

    Wraps ``scipy.optimize.minimize`` with automatic gradient (and optionally
    Hessian) computation via forward-mode AD. The function ``fun`` should
    accept a DualArray and return a scalar Dual.

    Parameters
    ----------
    fun : callable
        Objective function ``f(x) -> scalar``. Will be called with a DualArray.
    x0 : array_like
        Initial guess.
    method : str, optional
        Optimization method. Defaults to ``'L-BFGS-B'`` without Hessian,
        ``'trust-ncg'`` with Hessian.
    hess : bool
        If True, compute exact Hessians via hyper-dual numbers and use a
        second-order method. Default False.
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

    from . import DualArray
    from ._hyperdual import hessian_matrix

    x0 = np.asarray(x0, dtype=float).ravel()

    if method is None:
        method = 'trust-ncg' if hess else 'L-BFGS-B'

    def fun_and_grad(x):
        seeds = DualArray(x)
        result = fun(seeds)
        f_val = float(result)
        grad = np.array([result.der(seeds[i]) for i in range(len(x))])
        return f_val, grad

    hess_callback = None
    if hess:
        def hess_callback(x):
            def array_fun(hd_list):
                return fun(np.asarray(hd_list, dtype=object))
            return hessian_matrix(array_fun, np.asarray(x, dtype=float).ravel())

    return sp_minimize(
        fun_and_grad, x0, method=method, jac=True, hess=hess_callback, **kwargs
    )
