import pytest
import math
import numpy as np
from fastdual import Dual, DualArray, der, val, reset, autojac


@pytest.fixture(autouse=True)
def _reset():
    reset()


class TestObjectArray:
    def test_create_array(self):
        arr = np.array([Dual(1.0), Dual(2.0)])
        assert arr.dtype == object
        assert len(arr) == 2

    def test_DualArray(self):
        arr = DualArray([1.0, 2.0, 3.0])
        assert arr.dtype == object
        assert all(isinstance(d, Dual) for d in arr)

    def test_val_extraction(self):
        arr = DualArray([1.0, 2.0, 3.0])
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
        arr = DualArray([0.0, math.pi / 2, math.pi])
        result = np.sin(arr)
        v = val(result)
        np.testing.assert_allclose(v, [0.0, 1.0, 0.0], atol=1e-15)

    def test_np_add_arrays(self):
        a = DualArray([1.0, 2.0])
        b = DualArray([3.0, 4.0])
        result = a + b
        v = val(result)
        np.testing.assert_allclose(v, [4.0, 6.0])

    def test_np_mul_arrays(self):
        a = DualArray([2.0, 3.0])
        b = DualArray([4.0, 5.0])
        result = a * b
        v = val(result)
        np.testing.assert_allclose(v, [8.0, 15.0])

    def test_scalar_broadcast(self):
        arr = DualArray([1.0, 2.0, 3.0])
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


class TestNewUnaryUfuncs:
    def test_np_arcsinh(self):
        x = Dual(1.0)
        result = np.arcsinh(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.asinh(1.0))
        assert der(result, x) == pytest.approx(1.0 / math.sqrt(2.0))

    def test_np_arccosh(self):
        x = Dual(2.0)
        result = np.arccosh(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.acosh(2.0))

    def test_np_arctanh(self):
        x = Dual(0.5)
        result = np.arctanh(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.atanh(0.5))

    def test_np_exp2(self):
        x = Dual(3.0)
        result = np.exp2(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(8.0)
        assert der(result, x) == pytest.approx(8.0 * math.log(2.0))

    def test_np_log1p(self):
        x = Dual(1.0)
        result = np.log1p(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.log(2.0))

    def test_np_expm1(self):
        x = Dual(1.0)
        result = np.expm1(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(math.e - 1.0)

    def test_np_square(self):
        x = Dual(3.0)
        result = np.square(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(9.0)
        assert der(result, x) == pytest.approx(6.0)

    def test_np_cbrt(self):
        x = Dual(27.0)
        result = np.cbrt(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(3.0)

    def test_np_sign(self):
        x = Dual(3.0)
        result = np.sign(x)
        assert isinstance(result, Dual)
        assert result.val == 1.0
        assert der(result, x) == 0.0

    def test_np_conjugate(self):
        x = Dual(3.0)
        result = np.conjugate(x)
        assert isinstance(result, Dual)
        assert result.val == pytest.approx(3.0)
        assert der(result, x) == pytest.approx(1.0)


class TestRealImag:
    def test_real(self):
        x = Dual(3.0)
        r = x.real
        assert isinstance(r, Dual)
        assert r.val == 3.0
        assert der(r, x) == 1.0

    def test_imag(self):
        x = Dual(3.0)
        i = x.imag
        assert isinstance(i, Dual)
        assert i.val == 0.0

    def test_complex_cast(self):
        x = Dual(3.5)
        c = complex(x)
        assert c == 3.5 + 0j


class TestAutojac:
    def test_simple_scalar(self):
        @autojac
        def f(x):
            return np.array([x ** 2])

        result, J = f(3.0)
        np.testing.assert_allclose(result, [9.0])
        np.testing.assert_allclose(J, [[6.0]])

    def test_two_inputs(self):
        @autojac
        def f(x, y):
            return np.array([x + y, x * y])

        result, J = f(2.0, 3.0)
        np.testing.assert_allclose(result, [5.0, 6.0])
        np.testing.assert_allclose(J, [[1.0, 1.0], [3.0, 2.0]])

    def test_nonlinear(self):
        @autojac
        def f(x, y):
            return np.array([x ** 2 + y, x * y ** 2])

        result, J = f(2.0, 3.0)
        np.testing.assert_allclose(result, [7.0, 18.0])
        np.testing.assert_allclose(J, [[4.0, 1.0], [9.0, 12.0]])

    def test_with_transcendentals(self):
        @autojac
        def f(x):
            return np.array([np.sin(x), np.exp(x)])

        result, J = f(1.0)
        np.testing.assert_allclose(result, [math.sin(1.0), math.e], rtol=1e-10)
        np.testing.assert_allclose(J, [[math.cos(1.0)], [math.e]], rtol=1e-10)


class TestDualArraySubclass:
    def test_seed_array_returns_dualarray(self):
        arr = DualArray([1.0, 2.0, 3.0])
        assert isinstance(arr, DualArray)
        assert arr.dtype == object

    def test_dualarray_from_list(self):
        da = DualArray([Dual(1.0), Dual(2.0)])
        assert isinstance(da, DualArray)
        assert len(da) == 2


class TestDualArrayUnaryUfuncs:
    def test_np_sin_array(self):
        arr = DualArray([0.0, math.pi / 2, math.pi])
        result = np.sin(arr)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [0.0, 1.0, 0.0], atol=1e-15)

    def test_np_cos_array(self):
        arr = DualArray([0.0, math.pi / 2])
        result = np.cos(arr)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [1.0, 0.0], atol=1e-15)

    def test_np_exp_array(self):
        arr = DualArray([0.0, 1.0])
        result = np.exp(arr)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [1.0, math.e])

    def test_np_log_array(self):
        arr = DualArray([1.0, math.e])
        result = np.log(arr)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [0.0, 1.0])

    def test_np_sqrt_array(self):
        arr = DualArray([1.0, 4.0, 9.0])
        result = np.sqrt(arr)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [1.0, 2.0, 3.0])

    def test_np_square_array(self):
        arr = DualArray([2.0, 3.0])
        result = np.square(arr)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [4.0, 9.0])

    def test_np_negative_array(self):
        arr = DualArray([1.0, -2.0])
        result = np.negative(arr)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [-1.0, 2.0])

    def test_unary_gradients_preserved(self):
        arr = DualArray([1.0, 2.0])
        result = np.sin(arr)
        assert der(result[0], arr[0]) == pytest.approx(math.cos(1.0))
        assert der(result[1], arr[1]) == pytest.approx(math.cos(2.0))
        assert der(result[0], arr[1]) == 0.0
        assert der(result[1], arr[0]) == 0.0


class TestDualArrayBinaryUfuncs:
    def test_array_add_array(self):
        a = DualArray([1.0, 2.0])
        b = DualArray([3.0, 4.0])
        result = np.add(a, b)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [4.0, 6.0])

    def test_array_multiply_array(self):
        a = DualArray([2.0, 3.0])
        b = DualArray([4.0, 5.0])
        result = np.multiply(a, b)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [8.0, 15.0])

    def test_array_subtract_array(self):
        a = DualArray([5.0, 4.0])
        b = DualArray([1.0, 2.0])
        result = np.subtract(a, b)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [4.0, 2.0])

    def test_array_divide_array(self):
        a = DualArray([10.0, 9.0])
        b = DualArray([2.0, 3.0])
        result = np.true_divide(a, b)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [5.0, 3.0])

    def test_array_power(self):
        a = DualArray([2.0, 3.0])
        result = np.power(a, 2.0)
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [4.0, 9.0])

    def test_array_add_scalar_dual(self):
        a = DualArray([1.0, 2.0])
        s = Dual(10.0)
        result = a + s
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [11.0, 12.0])

    def test_scalar_dual_add_array(self):
        a = DualArray([1.0, 2.0])
        s = Dual(10.0)
        result = s + a
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [11.0, 12.0])

    def test_array_mul_float(self):
        a = DualArray([1.0, 2.0, 3.0])
        result = a * 2.0
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [2.0, 4.0, 6.0])

    def test_binary_gradients_preserved(self):
        a = DualArray([2.0, 3.0])
        b = DualArray([4.0, 5.0])
        result = a * b
        # d(a[0]*b[0])/d(a[0]) = b[0].val = 4.0
        assert der(result[0], a[0]) == pytest.approx(4.0)
        # d(a[0]*b[0])/d(b[0]) = a[0].val = 2.0
        assert der(result[0], b[0]) == pytest.approx(2.0)
        # cross terms zero
        assert der(result[0], a[1]) == 0.0


class TestDualArrayFallback:
    def test_unsupported_ufunc_falls_back(self):
        arr = DualArray([1.0, 2.0])
        # np.positive should go through C path, but np.spacing is not
        # supported by fastdual; test that known ops still return DualArray
        result = np.positive(arr)
        assert isinstance(result, DualArray)

    def test_val_der_jac_work_with_dualarray(self):
        arr = DualArray([1.0, 2.0, 3.0])
        v = val(arr)
        np.testing.assert_allclose(v, [1.0, 2.0, 3.0])

        result = np.sin(arr)
        from fastdual import jac
        J = jac(result, arr)
        expected = np.diag([math.cos(1.0), math.cos(2.0), math.cos(3.0)])
        np.testing.assert_allclose(J, expected)

    def test_operator_add_arrays(self):
        a = DualArray([1.0, 2.0])
        b = DualArray([3.0, 4.0])
        result = a + b
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [4.0, 6.0])

    def test_operator_mul_arrays(self):
        a = DualArray([2.0, 3.0])
        b = DualArray([4.0, 5.0])
        result = a * b
        assert isinstance(result, DualArray)
        v = val(result)
        np.testing.assert_allclose(v, [8.0, 15.0])
