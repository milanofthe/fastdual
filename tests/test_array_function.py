"""Tests for __array_function__ protocol on DualArray."""

import pytest
import math
import numpy as np
from fastdual import Dual, DualArray, der, val, jac, reset


@pytest.fixture(autouse=True)
def _reset():
    reset()


class TestDot:
    def test_1d_dot(self):
        a = DualArray([1.0, 2.0, 3.0])
        b = DualArray([4.0, 5.0, 6.0])
        result = np.dot(a, b)
        assert isinstance(result, Dual)
        assert float(result) == pytest.approx(32.0)

    def test_1d_dot_gradient(self):
        a = DualArray([2.0, 3.0])
        b = DualArray([4.0, 5.0])
        result = np.dot(a, b)
        # d(2*4 + 3*5)/d(a[0]) = 4, d/d(a[1]) = 5
        assert der(result, a[0]) == pytest.approx(4.0)
        assert der(result, a[1]) == pytest.approx(5.0)
        # d/d(b[0]) = 2, d/d(b[1]) = 3
        assert der(result, b[0]) == pytest.approx(2.0)
        assert der(result, b[1]) == pytest.approx(3.0)

    def test_2d_matmul(self):
        A = DualArray([[1.0, 2.0], [3.0, 4.0]])
        B = DualArray([[5.0, 6.0], [7.0, 8.0]])
        C = np.dot(A, B)
        v = val(C)
        expected = np.array([[19.0, 22.0], [43.0, 50.0]])
        np.testing.assert_allclose(v, expected)

    def test_2d_1d_matvec(self):
        A = DualArray([[1.0, 2.0], [3.0, 4.0]])
        x = DualArray([5.0, 6.0])
        result = np.dot(A, x)
        v = val(result)
        np.testing.assert_allclose(v, [17.0, 39.0])

    def test_matvec_gradient(self):
        A = DualArray([[1.0, 0.0], [0.0, 1.0]])  # identity
        x = DualArray([3.0, 7.0])
        y = np.dot(A, x)
        # A is identity, so dy/dx should be identity-like
        assert der(y[0], x[0]) == pytest.approx(1.0)
        assert der(y[1], x[1]) == pytest.approx(1.0)


class TestSum:
    def test_basic_sum(self):
        a = DualArray([1.0, 2.0, 3.0])
        result = np.sum(a)
        assert float(result) == pytest.approx(6.0)

    def test_sum_gradient(self):
        a = DualArray([1.0, 2.0, 3.0])
        result = np.sum(a)
        for i in range(3):
            assert der(result, a[i]) == pytest.approx(1.0)

    def test_sum_of_products(self):
        a = DualArray([2.0, 3.0])
        result = np.sum(a * a)  # x0^2 + x1^2
        assert float(result) == pytest.approx(13.0)
        assert der(result, a[0]) == pytest.approx(4.0)
        assert der(result, a[1]) == pytest.approx(6.0)


class TestProd:
    def test_basic_prod(self):
        a = DualArray([2.0, 3.0, 4.0])
        result = np.prod(a)
        assert float(result) == pytest.approx(24.0)

    def test_prod_gradient(self):
        a = DualArray([2.0, 3.0, 4.0])
        result = np.prod(a)
        # d(2*3*4)/d(a[0]) = 3*4 = 12
        assert der(result, a[0]) == pytest.approx(12.0)
        # d/d(a[1]) = 2*4 = 8
        assert der(result, a[1]) == pytest.approx(8.0)
        # d/d(a[2]) = 2*3 = 6
        assert der(result, a[2]) == pytest.approx(6.0)


class TestConcatenate:
    def test_basic(self):
        a = DualArray([1.0, 2.0])
        b = DualArray([3.0, 4.0])
        result = np.concatenate([a, b])
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [1.0, 2.0, 3.0, 4.0])

    def test_gradient_preserved(self):
        a = DualArray([1.0, 2.0])
        b = DualArray([3.0, 4.0])
        result = np.concatenate([a, b])
        assert der(result[0], a[0]) == pytest.approx(1.0)
        assert der(result[2], b[0]) == pytest.approx(1.0)
        assert der(result[0], b[0]) == 0.0


class TestStack:
    def test_basic(self):
        a = DualArray([1.0, 2.0])
        b = DualArray([3.0, 4.0])
        result = np.stack([a, b])
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [[1.0, 2.0], [3.0, 4.0]])


class TestLinalgNorm:
    def test_l2_norm(self):
        a = DualArray([3.0, 4.0])
        result = np.linalg.norm(a)
        assert float(result) == pytest.approx(5.0)

    def test_l2_gradient(self):
        a = DualArray([3.0, 4.0])
        result = np.linalg.norm(a)
        # d(sqrt(9+16))/d(a[0]) = 3/5
        assert der(result, a[0]) == pytest.approx(3.0 / 5.0)
        assert der(result, a[1]) == pytest.approx(4.0 / 5.0)

    def test_l1_norm(self):
        a = DualArray([3.0, -4.0])
        result = np.linalg.norm(a, ord=1)
        assert float(result) == pytest.approx(7.0)

    def test_linf_norm(self):
        a = DualArray([3.0, -4.0])
        result = np.linalg.norm(a, ord=np.inf)
        assert abs(float(result)) == pytest.approx(4.0)


class TestLinalgSolve:
    def test_2x2(self):
        # Solve [[2, 1], [1, 3]] x = [5, 10]
        A = DualArray([[2.0, 1.0], [1.0, 3.0]])
        b = DualArray([5.0, 10.0])
        x = np.linalg.solve(A, b)
        v = val(x)
        expected = np.linalg.solve(
            np.array([[2.0, 1.0], [1.0, 3.0]]),
            np.array([5.0, 10.0]),
        )
        np.testing.assert_allclose(v, expected, atol=1e-12)

    def test_3x3(self):
        A_vals = [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 10.0]]
        b_vals = [1.0, 2.0, 3.0]
        A = DualArray(A_vals)
        b = DualArray(b_vals)
        x = np.linalg.solve(A, b)
        v = val(x)
        expected = np.linalg.solve(np.array(A_vals), np.array(b_vals))
        np.testing.assert_allclose(v, expected, atol=1e-10)

    def test_gradient_through_solve(self):
        # A x = b, with A = [[a, 0], [0, 1]], b = [1, 1]
        # => x = [1/a, 1], dx[0]/da = -1/a^2
        a = Dual(2.0)
        one = Dual(1.0, seed=False)
        zero = Dual(0.0, seed=False)
        A = DualArray(np.array([[a, zero], [zero, one]]))
        b = DualArray(np.array([one, one]))
        x = np.linalg.solve(A, b)
        assert float(x[0]) == pytest.approx(0.5)
        assert der(x[0], a) == pytest.approx(-0.25)  # -1/4
