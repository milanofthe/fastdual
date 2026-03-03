from ._dualnum import Dual, reset
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
    results = np.asarray(results).flat
    seeds = list(seeds)
    n = len(list(results))
    m = len(seeds)
    J = np.zeros((n, m))
    for i, r in enumerate(np.asarray(results).flat):
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
