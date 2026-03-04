"""Tests for sparse Jacobian computation via graph coloring."""

import pytest
import numpy as np
from fastdual import DualArray, sparse_jac, jac, val, reset
from fastdual._coloring import _greedy_color


@pytest.fixture(autouse=True)
def _reset():
    reset()


class TestGreedyColor:
    def test_diagonal_sparsity(self):
        # Diagonal: no conflicts, should use 1 color
        sparsity = np.eye(3, dtype=bool)
        colors = _greedy_color(sparsity, 3)
        assert max(colors) == 0  # all same color

    def test_dense_sparsity(self):
        # Dense: every pair conflicts, needs n colors
        sparsity = np.ones((2, 3), dtype=bool)
        colors = _greedy_color(sparsity, 3)
        assert len(set(colors)) == 3

    def test_banded_sparsity(self):
        # Tridiagonal: needs at most 2 colors
        n = 5
        sparsity = np.zeros((n, n), dtype=bool)
        for i in range(n):
            sparsity[i, i] = True
            if i > 0:
                sparsity[i, i - 1] = True
            if i < n - 1:
                sparsity[i, i + 1] = True
        colors = _greedy_color(sparsity, n)
        assert max(colors) + 1 <= 3  # tridiag needs at most 3 colors


class TestSparseJac:
    def test_diagonal_system(self):
        # f(x) = [x0^2, x1^2, x2^2] — diagonal Jacobian
        def f(x):
            return np.array([x[0] ** 2, x[1] ** 2, x[2] ** 2])

        x0 = [1.0, 2.0, 3.0]
        sparsity = np.eye(3, dtype=bool)
        J = sparse_jac(f, x0, sparsity)
        expected = np.diag([2.0, 4.0, 6.0])
        np.testing.assert_allclose(J, expected, atol=1e-12)

    def test_vs_dense_jacobian(self):
        # f(x) = [x0*x1, x1*x2]
        def f(x):
            return np.array([x[0] * x[1], x[1] * x[2]])

        x0 = [2.0, 3.0, 4.0]
        sparsity = np.array([
            [True, True, False],
            [False, True, True],
        ])

        J_sparse = sparse_jac(f, x0, sparsity)

        # Compare with dense Jacobian
        seeds = DualArray(x0)
        result = f(seeds)
        J_dense = jac(result, seeds)

        np.testing.assert_allclose(J_sparse, J_dense, atol=1e-12)

    def test_tridiagonal(self):
        # f(x) = [x0+x1, x0+x1+x2, x1+x2+x3, x2+x3]
        def f(x):
            return np.array([
                x[0] + x[1],
                x[0] + x[1] + x[2],
                x[1] + x[2] + x[3],
                x[2] + x[3],
            ])

        x0 = [1.0, 2.0, 3.0, 4.0]
        sparsity = np.array([
            [True, True, False, False],
            [True, True, True, False],
            [False, True, True, True],
            [False, False, True, True],
        ])

        J = sparse_jac(f, x0, sparsity)
        expected = np.array([
            [1, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 1, 1],
            [0, 0, 1, 1],
        ], dtype=float)
        np.testing.assert_allclose(J, expected, atol=1e-12)

    def test_fewer_passes_than_dense(self):
        # Verify coloring reduces number of passes
        n = 10
        sparsity = np.eye(n, dtype=bool)
        colors = _greedy_color(sparsity, n)
        n_colors = max(colors) + 1
        assert n_colors < n  # should need only 1 color for diagonal

    def test_nonlinear(self):
        def f(x):
            return np.array([np.sin(x[0]) * x[1], x[0] ** 2 + x[1] ** 2])

        x0 = [1.0, 2.0]
        sparsity = np.ones((2, 2), dtype=bool)
        J = sparse_jac(f, x0, sparsity)

        seeds = DualArray(x0)
        result = f(seeds)
        J_dense = jac(result, seeds)

        np.testing.assert_allclose(J, J_dense, atol=1e-12)
