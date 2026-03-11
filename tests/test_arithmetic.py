import pytest
import math
from fastdual import Dual, der
from fastdual._fastdual import reset


@pytest.fixture(autouse=True)
def _reset():
    reset()


class TestDualDual:
    def test_add(self):
        x = Dual(3.0)
        y = Dual(5.0)
        z = x + y
        assert z.val == 8.0

    def test_sub(self):
        x = Dual(3.0)
        y = Dual(5.0)
        z = x - y
        assert z.val == -2.0

    def test_mul(self):
        x = Dual(3.0)
        y = Dual(5.0)
        z = x * y
        assert z.val == 15.0

    def test_truediv(self):
        x = Dual(10.0)
        y = Dual(4.0)
        z = x / y
        assert z.val == 2.5

    def test_pow(self):
        x = Dual(2.0)
        y = Dual(3.0)
        z = x ** y
        assert z.val == 8.0


class TestDualFloat:
    def test_add(self):
        x = Dual(3.0)
        assert (x + 2.0).val == 5.0
        assert (2.0 + x).val == 5.0

    def test_sub(self):
        x = Dual(3.0)
        assert (x - 1.0).val == 2.0
        assert (10.0 - x).val == 7.0

    def test_mul(self):
        x = Dual(3.0)
        assert (x * 4.0).val == 12.0
        assert (4.0 * x).val == 12.0

    def test_truediv(self):
        x = Dual(10.0)
        assert (x / 2.0).val == 5.0
        assert (20.0 / x).val == 2.0

    def test_pow_const_exp(self):
        x = Dual(3.0)
        z = x ** 2.0
        assert z.val == 9.0

    def test_pow_const_base(self):
        y = Dual(2.0)
        z = 3.0 ** y
        assert z.val == 9.0


class TestDualInt:
    def test_add(self):
        x = Dual(3.0)
        assert (x + 2).val == 5.0
        assert (2 + x).val == 5.0

    def test_mul(self):
        x = Dual(3.0)
        assert (x * 4).val == 12.0
        assert (4 * x).val == 12.0

    def test_pow(self):
        x = Dual(2.0)
        assert (x ** 3).val == 8.0


class TestUnary:
    def test_neg(self):
        x = Dual(3.0)
        assert (-x).val == -3.0

    def test_pos(self):
        x = Dual(3.0)
        assert (+x).val == 3.0

    def test_abs_positive(self):
        x = Dual(3.0)
        assert abs(x).val == 3.0

    def test_abs_negative(self):
        x = Dual(-3.0)
        assert abs(x).val == 3.0

    def test_float(self):
        x = Dual(3.5)
        assert float(x) == 3.5

    def test_int(self):
        x = Dual(3.7)
        assert int(x) == 3

    def test_bool_true(self):
        assert bool(Dual(1.0))

    def test_bool_false(self):
        assert not bool(Dual(0.0))


class TestComparison:
    def test_lt(self):
        assert Dual(1.0) < Dual(2.0)
        assert Dual(1.0) < 2.0
        assert not (Dual(2.0) < 1.0)

    def test_le(self):
        assert Dual(1.0) <= Dual(1.0)
        assert Dual(1.0) <= 2.0

    def test_eq(self):
        assert Dual(3.0) == Dual(3.0)
        assert Dual(3.0) == 3.0

    def test_ne(self):
        assert Dual(3.0) != Dual(4.0)

    def test_gt(self):
        assert Dual(3.0) > Dual(2.0)

    def test_ge(self):
        assert Dual(3.0) >= Dual(3.0)


class TestEdgeCases:
    def test_div_by_zero(self):
        x = Dual(1.0)
        y = Dual(0.0)
        with pytest.raises(ZeroDivisionError):
            x / y

    def test_div_by_zero_scalar(self):
        x = Dual(1.0)
        with pytest.raises(ZeroDivisionError):
            x / 0.0

    def test_rdiv_by_zero(self):
        y = Dual(0.0)
        with pytest.raises(ZeroDivisionError):
            1.0 / y

    def test_constant_is_just_float(self):
        # Constants don't need to be Duals — just use plain floats
        x = Dual(3.0)
        z = x + 7.0
        assert z.val == 10.0
        assert der(z, x) == 1.0

    def test_repr(self):
        x = Dual(3.5)
        assert "3.5" in repr(x)
        assert "Dual" in repr(x)

    def test_hash(self):
        x = Dual(3.0)
        assert hash(x) == hash(3.0)

    def test_chain_ops(self):
        x = Dual(2.0)
        z = (x + 1.0) * (x - 1.0)  # (x+1)(x-1) = x^2 - 1
        assert z.val == pytest.approx(3.0)
