import pytest
import math
from fastdual import Dual, der, jac, seed_array, val, reset
import numpy as np


@pytest.fixture(autouse=True)
def _reset():
    reset()


class TestSingleSeed:
    def test_identity(self):
        x = Dual(3.0)
        assert der(x, x) == 1.0

    def test_add_const(self):
        x = Dual(3.0)
        z = x + 5.0
        assert der(z, x) == 1.0

    def test_mul_const(self):
        x = Dual(3.0)
        z = x * 4.0
        assert der(z, x) == 4.0

    def test_square(self):
        x = Dual(3.0)
        z = x * x
        assert der(z, x) == pytest.approx(6.0)

    def test_power(self):
        x = Dual(2.0)
        z = x ** 3.0
        assert der(z, x) == pytest.approx(12.0)  # 3 * 2^2

    def test_div(self):
        x = Dual(4.0)
        z = 1.0 / x
        assert der(z, x) == pytest.approx(-1.0 / 16.0)

    def test_chain_rule(self):
        x = Dual(2.0)
        z = (x * x + x) * x  # x^3 + x^2, dz/dx = 3x^2 + 2x = 16
        assert der(z, x) == pytest.approx(16.0)


class TestMultiSeed:
    def test_two_vars(self):
        x = Dual(3.0)
        y = Dual(5.0)
        z = x * y + x
        assert der(z, x) == pytest.approx(6.0)   # y + 1
        assert der(z, y) == pytest.approx(3.0)   # x

    def test_three_vars(self):
        x = Dual(1.0)
        y = Dual(2.0)
        w = Dual(3.0)
        z = x * y + y * w + w * x
        assert der(z, x) == pytest.approx(5.0)   # y + w
        assert der(z, y) == pytest.approx(4.0)   # x + w
        assert der(z, w) == pytest.approx(3.0)   # y + x

    def test_independent(self):
        x = Dual(3.0)
        y = Dual(5.0)
        assert der(x, y) == 0.0
        assert der(y, x) == 0.0


class TestSparsity:
    def test_constant_has_no_grad(self):
        c = Dual(7.0, seed=False)
        assert len(c.grad) == 0

    def test_add_constant_preserves_sparsity(self):
        x = Dual(3.0)
        z = x + 5.0
        assert len(z.grad) == 1

    def test_mul_zero_clears_grad(self):
        x = Dual(3.0)
        z = x * 0.0
        assert len(z.grad) == 0

    def test_derived_has_correct_ids(self):
        x = Dual(3.0)
        y = Dual(5.0)
        z = x + y
        grad = z.grad
        assert x.var_id in grad
        assert y.var_id in grad


class TestDerFunction:
    def test_scalar(self):
        x = Dual(2.0)
        z = x * x
        assert der(z, x) == pytest.approx(4.0)

    def test_non_dual(self):
        x = Dual(2.0)
        assert der(3.14, x) == 0.0

    def test_constant_wrt(self):
        x = Dual(2.0)
        c = Dual(5.0, seed=False)
        z = x * c
        assert der(z, c) == 0.0

    def test_array(self):
        x = Dual(2.0)
        arr = np.array([x * x, x + 1.0, x * 3.0])
        derivs = der(arr, x)
        np.testing.assert_allclose(derivs, [4.0, 1.0, 3.0])


class TestJacobian:
    def test_simple(self):
        x = Dual(1.0)
        y = Dual(2.0)
        f = np.array([x + y, x * y])
        J = jac(f, [x, y])
        expected = np.array([
            [1.0, 1.0],
            [2.0, 1.0],
        ])
        np.testing.assert_allclose(J, expected)

    def test_nonlinear(self):
        x = Dual(2.0)
        y = Dual(3.0)
        f = np.array([x ** 2 + y, x * y ** 2])
        J = jac(f, [x, y])
        expected = np.array([
            [4.0, 1.0],       # [2x, 1]
            [9.0, 12.0],      # [y^2, 2xy]
        ])
        np.testing.assert_allclose(J, expected)


class TestSeedArray:
    def test_creates_independent_seeds(self):
        arr = seed_array([1.0, 2.0, 3.0])
        assert len(arr) == 3
        for d in arr:
            assert isinstance(d, Dual)
            assert d.var_id >= 0

    def test_seeds_are_independent(self):
        arr = seed_array([1.0, 2.0])
        assert der(arr[0], arr[1]) == 0.0
        assert der(arr[1], arr[0]) == 0.0
        assert der(arr[0], arr[0]) == 1.0


class TestValFunction:
    def test_extracts_values(self):
        arr = seed_array([1.0, 2.0, 3.0])
        v = val(arr)
        np.testing.assert_allclose(v, [1.0, 2.0, 3.0])


class TestReset:
    def test_reset_counter(self):
        x = Dual(1.0)
        vid1 = x.var_id
        reset()
        y = Dual(2.0)
        vid2 = y.var_id
        assert vid2 == vid1  # counter was reset
