import pytest
import math
import numpy as np
from fastdual import Dual, der, val, autojac
from fastdual._fastdual import reset


@pytest.fixture(autouse=True)
def _reset():
    reset()


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
