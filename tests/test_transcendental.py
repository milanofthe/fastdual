import pytest
import math
from dualnum import Dual, der, reset


@pytest.fixture(autouse=True)
def _reset():
    reset()


class TestSin:
    def test_value(self):
        x = Dual(1.0)
        assert x.sin().val == pytest.approx(math.sin(1.0))

    def test_derivative(self):
        x = Dual(1.0)
        z = x.sin()
        assert der(z, x) == pytest.approx(math.cos(1.0))


class TestCos:
    def test_value(self):
        x = Dual(1.0)
        assert x.cos().val == pytest.approx(math.cos(1.0))

    def test_derivative(self):
        x = Dual(1.0)
        z = x.cos()
        assert der(z, x) == pytest.approx(-math.sin(1.0))


class TestTan:
    def test_value(self):
        x = Dual(0.5)
        assert x.tan().val == pytest.approx(math.tan(0.5))

    def test_derivative(self):
        x = Dual(0.5)
        z = x.tan()
        assert der(z, x) == pytest.approx(1.0 / math.cos(0.5) ** 2)


class TestExp:
    def test_value(self):
        x = Dual(1.0)
        assert x.exp().val == pytest.approx(math.e)

    def test_derivative(self):
        x = Dual(2.0)
        z = x.exp()
        assert der(z, x) == pytest.approx(math.exp(2.0))


class TestLog:
    def test_value(self):
        x = Dual(math.e)
        assert x.log().val == pytest.approx(1.0)

    def test_derivative(self):
        x = Dual(3.0)
        z = x.log()
        assert der(z, x) == pytest.approx(1.0 / 3.0)


class TestLog2:
    def test_value(self):
        x = Dual(8.0)
        assert x.log2().val == pytest.approx(3.0)

    def test_derivative(self):
        x = Dual(4.0)
        z = x.log2()
        assert der(z, x) == pytest.approx(1.0 / (4.0 * math.log(2.0)))


class TestLog10:
    def test_value(self):
        x = Dual(100.0)
        assert x.log10().val == pytest.approx(2.0)

    def test_derivative(self):
        x = Dual(5.0)
        z = x.log10()
        assert der(z, x) == pytest.approx(1.0 / (5.0 * math.log(10.0)))


class TestSqrt:
    def test_value(self):
        x = Dual(9.0)
        assert x.sqrt().val == pytest.approx(3.0)

    def test_derivative(self):
        x = Dual(4.0)
        z = x.sqrt()
        assert der(z, x) == pytest.approx(0.5 / math.sqrt(4.0))


class TestArcsin:
    def test_value(self):
        x = Dual(0.5)
        assert x.arcsin().val == pytest.approx(math.asin(0.5))

    def test_derivative(self):
        x = Dual(0.5)
        z = x.arcsin()
        assert der(z, x) == pytest.approx(1.0 / math.sqrt(1.0 - 0.25))


class TestArccos:
    def test_value(self):
        x = Dual(0.5)
        assert x.arccos().val == pytest.approx(math.acos(0.5))

    def test_derivative(self):
        x = Dual(0.5)
        z = x.arccos()
        assert der(z, x) == pytest.approx(-1.0 / math.sqrt(1.0 - 0.25))


class TestArctan:
    def test_value(self):
        x = Dual(1.0)
        assert x.arctan().val == pytest.approx(math.atan(1.0))

    def test_derivative(self):
        x = Dual(1.0)
        z = x.arctan()
        assert der(z, x) == pytest.approx(0.5)


class TestSinh:
    def test_value(self):
        x = Dual(1.0)
        assert x.sinh().val == pytest.approx(math.sinh(1.0))

    def test_derivative(self):
        x = Dual(1.0)
        z = x.sinh()
        assert der(z, x) == pytest.approx(math.cosh(1.0))


class TestCosh:
    def test_value(self):
        x = Dual(1.0)
        assert x.cosh().val == pytest.approx(math.cosh(1.0))

    def test_derivative(self):
        x = Dual(1.0)
        z = x.cosh()
        assert der(z, x) == pytest.approx(math.sinh(1.0))


class TestTanh:
    def test_value(self):
        x = Dual(1.0)
        assert x.tanh().val == pytest.approx(math.tanh(1.0))

    def test_derivative(self):
        x = Dual(1.0)
        z = x.tanh()
        assert der(z, x) == pytest.approx(1.0 - math.tanh(1.0) ** 2)


class TestArcsinh:
    def test_value(self):
        x = Dual(1.0)
        assert x.arcsinh().val == pytest.approx(math.asinh(1.0))

    def test_derivative(self):
        x = Dual(1.0)
        z = x.arcsinh()
        assert der(z, x) == pytest.approx(1.0 / math.sqrt(2.0))


class TestArccosh:
    def test_value(self):
        x = Dual(2.0)
        assert x.arccosh().val == pytest.approx(math.acosh(2.0))

    def test_derivative(self):
        x = Dual(2.0)
        z = x.arccosh()
        assert der(z, x) == pytest.approx(1.0 / math.sqrt(3.0))


class TestArctanh:
    def test_value(self):
        x = Dual(0.5)
        assert x.arctanh().val == pytest.approx(math.atanh(0.5))

    def test_derivative(self):
        x = Dual(0.5)
        z = x.arctanh()
        assert der(z, x) == pytest.approx(1.0 / (1.0 - 0.25))


class TestExp2:
    def test_value(self):
        x = Dual(3.0)
        assert x.exp2().val == pytest.approx(8.0)

    def test_derivative(self):
        x = Dual(3.0)
        z = x.exp2()
        assert der(z, x) == pytest.approx(8.0 * math.log(2.0))


class TestLog1p:
    def test_value(self):
        x = Dual(1.0)
        assert x.log1p().val == pytest.approx(math.log(2.0))

    def test_derivative(self):
        x = Dual(1.0)
        z = x.log1p()
        assert der(z, x) == pytest.approx(0.5)


class TestExpm1:
    def test_value(self):
        x = Dual(1.0)
        assert x.expm1().val == pytest.approx(math.e - 1.0)

    def test_derivative(self):
        x = Dual(1.0)
        z = x.expm1()
        assert der(z, x) == pytest.approx(math.e)


class TestSquare:
    def test_value(self):
        x = Dual(3.0)
        assert x.square().val == pytest.approx(9.0)

    def test_derivative(self):
        x = Dual(3.0)
        z = x.square()
        assert der(z, x) == pytest.approx(6.0)


class TestCbrt:
    def test_value(self):
        x = Dual(27.0)
        assert x.cbrt().val == pytest.approx(3.0)

    def test_derivative(self):
        x = Dual(8.0)
        z = x.cbrt()
        # d/dx cbrt(x) = 1/(3 * cbrt(x)^2) = 1/(3*4) = 1/12
        assert der(z, x) == pytest.approx(1.0 / 12.0)


class TestSign:
    def test_positive(self):
        x = Dual(3.0)
        assert x.sign().val == 1.0

    def test_negative(self):
        x = Dual(-3.0)
        assert x.sign().val == -1.0

    def test_zero(self):
        x = Dual(0.0)
        assert x.sign().val == 0.0

    def test_derivative_is_zero(self):
        x = Dual(3.0)
        z = x.sign()
        assert der(z, x) == 0.0


class TestComposition:
    def test_sin_of_product(self):
        x = Dual(1.0)
        z = (x * 2.0).sin()
        assert z.val == pytest.approx(math.sin(2.0))
        assert der(z, x) == pytest.approx(2.0 * math.cos(2.0))

    def test_exp_of_neg(self):
        x = Dual(1.0)
        z = (-x).exp()
        assert z.val == pytest.approx(math.exp(-1.0))
        assert der(z, x) == pytest.approx(-math.exp(-1.0))

    def test_log_of_square(self):
        x = Dual(3.0)
        z = (x * x).log()
        assert z.val == pytest.approx(math.log(9.0))
        assert der(z, x) == pytest.approx(2.0 / 3.0)
