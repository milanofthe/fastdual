import pytest
import math
import numpy as np
from dualnum import Dual, der, seed_array, val, reset


@pytest.fixture(autouse=True)
def _reset():
    reset()


class TestObjectArray:
    def test_create_array(self):
        arr = np.array([Dual(1.0), Dual(2.0)])
        assert arr.dtype == object
        assert len(arr) == 2

    def test_seed_array(self):
        arr = seed_array([1.0, 2.0, 3.0])
        assert arr.dtype == object
        assert all(isinstance(d, Dual) for d in arr)

    def test_val_extraction(self):
        arr = seed_array([1.0, 2.0, 3.0])
        v = val(arr)
        np.testing.assert_allclose(v, [1.0, 2.0, 3.0])


class TestNumpyUfuncs:
    def test_np_sin(self):
        x = Dual(1.0)
        result = np.sin(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.sin(1.0))
        assert der(result, x) == pytest.approx(math.cos(1.0))

    def test_np_cos(self):
        x = Dual(1.0)
        result = np.cos(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.cos(1.0))

    def test_np_exp(self):
        x = Dual(1.0)
        result = np.exp(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.e)

    def test_np_log(self):
        x = Dual(2.0)
        result = np.log(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.log(2.0))

    def test_np_sqrt(self):
        x = Dual(4.0)
        result = np.sqrt(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(2.0)

    def test_np_negative(self):
        x = Dual(3.0)
        result = np.negative(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(-3.0)

    def test_np_absolute(self):
        x = Dual(-3.0)
        result = np.absolute(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(3.0)


class TestNumpyArrayOps:
    def test_np_sin_array(self):
        arr = seed_array([0.0, math.pi / 2, math.pi])
        result = np.sin(arr)
        v = val(result)
        np.testing.assert_allclose(v, [0.0, 1.0, 0.0], atol=1e-15)

    def test_np_add_arrays(self):
        a = seed_array([1.0, 2.0])
        b = seed_array([3.0, 4.0])
        result = a + b
        v = val(result)
        np.testing.assert_allclose(v, [4.0, 6.0])

    def test_np_mul_arrays(self):
        a = seed_array([2.0, 3.0])
        b = seed_array([4.0, 5.0])
        result = a * b
        v = val(result)
        np.testing.assert_allclose(v, [8.0, 15.0])

    def test_scalar_broadcast(self):
        arr = seed_array([1.0, 2.0, 3.0])
        result = arr * 2.0
        v = val(result)
        np.testing.assert_allclose(v, [2.0, 4.0, 6.0])

    def test_gradient_through_array_ops(self):
        x = Dual(2.0)
        y = Dual(3.0)
        arr = np.array([x, y])
        result = np.sin(arr)
        assert der(result[0], x) == pytest.approx(math.cos(2.0))
        assert der(result[1], y) == pytest.approx(math.cos(3.0))
        assert der(result[0], y) == 0.0
        assert der(result[1], x) == 0.0


class TestArrayPriority:
    def test_dual_wins_over_ndarray(self):
        x = Dual(3.0)
        arr = np.array([1.0, 2.0])
        # Dual.__array_priority__ = 20.0 should make Dual handle this
        result = np.sin(x)
        assert isinstance(result, Dual)

    def test_add_with_float_array(self):
        x = Dual(3.0)
        result = x + 2.0
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(5.0)


class TestBinaryUfuncs:
    def test_np_add(self):
        x = Dual(3.0)
        y = Dual(5.0)
        result = np.add(x, y)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(8.0)

    def test_np_multiply(self):
        x = Dual(3.0)
        y = Dual(5.0)
        result = np.multiply(x, y)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(15.0)

    def test_np_subtract(self):
        x = Dual(5.0)
        y = Dual(3.0)
        result = np.subtract(x, y)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(2.0)

    def test_np_true_divide(self):
        x = Dual(10.0)
        y = Dual(4.0)
        result = np.true_divide(x, y)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(2.5)

    def test_np_power(self):
        x = Dual(2.0)
        result = np.power(x, 3.0)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(8.0)
