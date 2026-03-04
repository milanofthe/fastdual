"""Sparse Jacobian computation via graph coloring.

Uses greedy distance-1 coloring on the column conflict graph to reduce
the number of forward AD passes from n_inputs to n_colors.
"""

import numpy as np
from ._fastdual import Dual


def sparse_jac(fun, x, sparsity):
    """Compute a sparse Jacobian using graph coloring.

    Parameters
    ----------
    fun : callable
        Function ``f(x) -> array`` that works with Dual numbers.
    x : array_like
        Point at which to evaluate, shape ``(n,)``.
    sparsity : array_like
        Boolean sparsity pattern, shape ``(m, n)``. ``sparsity[i, j] = True``
        means ``J[i, j]`` may be nonzero.

    Returns
    -------
    J : ndarray, shape (m, n)
        Jacobian matrix (dense, but computed efficiently using coloring).
    """
    # Import here to avoid circular import at module level
    from . import DualArray

    x = np.asarray(x, dtype=float).ravel()
    sparsity = np.asarray(sparsity, dtype=bool)
    m, n = sparsity.shape

    # Build column conflict graph and color greedily
    colors = _greedy_color(sparsity, n)
    n_colors = max(colors) + 1 if colors else 0

    J = np.zeros((m, n))

    for color in range(n_colors):
        # Columns with this color
        cols = [j for j in range(n) if colors[j] == color]

        # Create seeds: only columns in this color group get seeded
        seed_duals = []
        for j in range(n):
            if colors[j] == color:
                seed_duals.append(Dual(x[j]))
            else:
                seed_duals.append(Dual(x[j], seed=False))

        seed_arr = DualArray(np.array(seed_duals, dtype=object))
        result = fun(seed_arr)
        result = np.atleast_1d(result)

        # Extract derivatives for each seeded column
        for j in cols:
            for i in range(m):
                if sparsity[i, j]:
                    if isinstance(result[i], Dual):
                        J[i, j] = result[i].der(seed_duals[j])

    return J


def _greedy_color(sparsity, n):
    """Greedy distance-1 coloring of the column conflict graph.

    Two columns conflict if they share any nonzero row in the sparsity pattern.
    Returns a list of colors (ints), one per column.
    """
    if n == 0:
        return []

    # Build adjacency: columns i,j conflict if any row has both nonzero
    neighbors = [set() for _ in range(n)]
    m = sparsity.shape[0]
    for row in range(m):
        nonzero_cols = [j for j in range(n) if sparsity[row, j]]
        for a in range(len(nonzero_cols)):
            for b in range(a + 1, len(nonzero_cols)):
                neighbors[nonzero_cols[a]].add(nonzero_cols[b])
                neighbors[nonzero_cols[b]].add(nonzero_cols[a])

    colors = [-1] * n
    for col in range(n):
        used = {colors[nb] for nb in neighbors[col] if colors[nb] >= 0}
        c = 0
        while c in used:
            c += 1
        colors[col] = c

    return colors
