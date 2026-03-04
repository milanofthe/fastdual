"""Tests for HyperDual numbers and Hessian computation."""

import pytest
import math
import numpy as np
from fastdual import HyperDual, hessian


class TestHyperDualArithmetic:
    def test_add(self):
        a = HyperDual(2.0, 1.0, 0.0, 0.0)
        b = HyperDual(3.0, 0.0, 1.0, 0.0)
        c = a + b
        assert c.f == pytest.approx(5.0)
        assert c.f1 == pytest.approx(1.0)
        assert c.f2 == pytest.approx(1.0)
        assert c.f12 == pytest.approx(0.0)

    def test_add_scalar(self):
        a = HyperDual(2.0, 1.0, 1.0, 0.0)
        c = a + 5.0
        assert c.f == pytest.approx(7.0)
        assert c.f1 == pytest.approx(1.0)

    def test_sub(self):
        a = HyperDual(5.0, 1.0, 0.0, 0.0)
        b = HyperDual(3.0, 0.0, 1.0, 0.0)
        c = a - b
        assert c.f == pytest.approx(2.0)
        assert c.f1 == pytest.approx(1.0)
        assert c.f2 == pytest.approx(-1.0)

    def test_mul(self):
        # f(x,y) = x*y, d²/dxdy = 1
        x = HyperDual(2.0, 1.0, 0.0, 0.0)
        y = HyperDual(3.0, 0.0, 1.0, 0.0)
        z = x * y
        assert z.f == pytest.approx(6.0)
        assert z.f1 == pytest.approx(3.0)   # dy/dx * y = y
        assert z.f2 == pytest.approx(2.0)   # x
        assert z.f12 == pytest.approx(1.0)  # d²(xy)/dxdy = 1

    def test_div(self):
        x = HyperDual(4.0, 1.0, 1.0, 0.0)
        c = x / 2.0
        assert c.f == pytest.approx(2.0)
        assert c.f1 == pytest.approx(0.5)

    def test_rdiv(self):
        # f(x) = 1/x, f'' = 2/x^3
        x = HyperDual(2.0, 1.0, 1.0, 0.0)
        z = 1.0 / x
        assert z.f == pytest.approx(0.5)
        assert z.f1 == pytest.approx(-0.25)   # -1/x^2
        assert z.f12 == pytest.approx(0.25)   # 2/x^3 = 0.25

    def test_pow(self):
        # f(x) = x^3, f'' = 6x
        x = HyperDual(2.0, 1.0, 1.0, 0.0)
        z = x ** 3.0
        assert z.f == pytest.approx(8.0)
        assert z.f1 == pytest.approx(12.0)    # 3x^2 = 12
        assert z.f12 == pytest.approx(12.0)   # 6x = 12

    def test_neg(self):
        x = HyperDual(3.0, 1.0, 2.0, 0.5)
        z = -x
        assert z.f == pytest.approx(-3.0)
        assert z.f1 == pytest.approx(-1.0)
        assert z.f12 == pytest.approx(-0.5)


class TestHyperDualTranscendentals:
    def test_sin(self):
        # f(x) = sin(x), f'' = -sin(x)
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.sin()
        assert z.f == pytest.approx(math.sin(1.0))
        assert z.f1 == pytest.approx(math.cos(1.0))
        assert z.f12 == pytest.approx(-math.sin(1.0))

    def test_cos(self):
        # f(x) = cos(x), f'' = -cos(x)
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.cos()
        assert z.f == pytest.approx(math.cos(1.0))
        assert z.f1 == pytest.approx(-math.sin(1.0))
        assert z.f12 == pytest.approx(-math.cos(1.0))

    def test_exp(self):
        # f(x) = exp(x), f'' = exp(x)
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.exp()
        e = math.exp(1.0)
        assert z.f == pytest.approx(e)
        assert z.f1 == pytest.approx(e)
        assert z.f12 == pytest.approx(e)

    def test_log(self):
        # f(x) = ln(x), f'' = -1/x^2
        x = HyperDual(2.0, 1.0, 1.0, 0.0)
        z = x.log()
        assert z.f == pytest.approx(math.log(2.0))
        assert z.f1 == pytest.approx(0.5)
        assert z.f12 == pytest.approx(-0.25)

    def test_sqrt(self):
        # f(x) = sqrt(x), f'' = -1/(4*x^(3/2))
        x = HyperDual(4.0, 1.0, 1.0, 0.0)
        z = x.sqrt()
        assert z.f == pytest.approx(2.0)
        assert z.f1 == pytest.approx(0.25)
        assert z.f12 == pytest.approx(-1.0 / 32.0)

    def test_tan(self):
        # f(x) = tan(x), f'' = 2*tan(x)*sec^2(x)
        x = HyperDual(0.5, 1.0, 1.0, 0.0)
        z = x.tan()
        t = math.tan(0.5)
        sec2 = 1.0 + t * t
        assert z.f == pytest.approx(t)
        assert z.f1 == pytest.approx(sec2)
        assert z.f12 == pytest.approx(2.0 * t * sec2)

    def test_arctan(self):
        # f(x) = arctan(x), f' = 1/(1+x^2), f'' = -2x/(1+x^2)^2
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.arctan()
        assert z.f == pytest.approx(math.atan(1.0))
        assert z.f1 == pytest.approx(0.5)
        assert z.f12 == pytest.approx(-0.5)

    def test_sinh(self):
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.sinh()
        assert z.f == pytest.approx(math.sinh(1.0))
        assert z.f1 == pytest.approx(math.cosh(1.0))
        assert z.f12 == pytest.approx(math.sinh(1.0))  # sinh'' = sinh

    def test_cosh(self):
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.cosh()
        assert z.f == pytest.approx(math.cosh(1.0))
        assert z.f1 == pytest.approx(math.sinh(1.0))
        assert z.f12 == pytest.approx(math.cosh(1.0))  # cosh'' = cosh

    def test_tanh(self):
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.tanh()
        t = math.tanh(1.0)
        sech2 = 1.0 - t * t
        assert z.f == pytest.approx(t)
        assert z.f1 == pytest.approx(sech2)
        assert z.f12 == pytest.approx(-2.0 * t * sech2)

    def test_square(self):
        # f(x) = x^2, f'' = 2
        x = HyperDual(3.0, 1.0, 1.0, 0.0)
        z = x.square()
        assert z.f == pytest.approx(9.0)
        assert z.f1 == pytest.approx(6.0)
        assert z.f12 == pytest.approx(2.0)

    def test_log2(self):
        x = HyperDual(4.0, 1.0, 1.0, 0.0)
        z = x.log2()
        assert z.f == pytest.approx(2.0)

    def test_exp2(self):
        x = HyperDual(3.0, 1.0, 1.0, 0.0)
        z = x.exp2()
        assert z.f == pytest.approx(8.0)

    def test_log1p(self):
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.log1p()
        assert z.f == pytest.approx(math.log(2.0))
        assert z.f1 == pytest.approx(0.5)
        assert z.f12 == pytest.approx(-0.25)

    def test_expm1(self):
        x = HyperDual(1.0, 1.0, 1.0, 0.0)
        z = x.expm1()
        e = math.exp(1.0)
        assert z.f == pytest.approx(e - 1.0)
        assert z.f1 == pytest.approx(e)
        assert z.f12 == pytest.approx(e)


class TestHessian:
    def test_quadratic(self):
        # f(x) = x0^2 + x1^2, H = [[2, 0], [0, 2]]
        def f(x):
            return x[0] ** 2.0 + x[1] ** 2.0

        H = hessian(f, [1.0, 1.0])
        np.testing.assert_allclose(H, [[2.0, 0.0], [0.0, 2.0]], atol=1e-12)

    def test_mixed_quadratic(self):
        # f(x) = x0*x1, H = [[0, 1], [1, 0]]
        def f(x):
            return x[0] * x[1]

        H = hessian(f, [2.0, 3.0])
        np.testing.assert_allclose(H, [[0.0, 1.0], [1.0, 0.0]], atol=1e-12)

    def test_rosenbrock(self):
        # f(x,y) = (1-x)^2 + 100*(y-x^2)^2
        # H = [[2 + 1200*x^2 - 400*y, -400*x],
        #       [-400*x, 200]]
        def rosenbrock(x):
            return (1.0 - x[0]) ** 2.0 + 100.0 * (x[1] - x[0] ** 2.0) ** 2.0

        x0 = [1.0, 1.0]
        H = hessian(rosenbrock, x0)
        expected = [[802.0, -400.0], [-400.0, 200.0]]
        np.testing.assert_allclose(H, expected, atol=1e-10)

    def test_symmetry(self):
        def f(x):
            return x[0] ** 2.0 * x[1] + x[1] ** 3.0

        H = hessian(f, [2.0, 3.0])
        np.testing.assert_allclose(H, H.T, atol=1e-12)

    def test_3d(self):
        # f(x) = x0*x1*x2
        # H = [[0, x2, x1], [x2, 0, x0], [x1, x0, 0]]
        def f(x):
            return x[0] * x[1] * x[2]

        H = hessian(f, [2.0, 3.0, 4.0])
        expected = [[0, 4, 3], [4, 0, 2], [3, 2, 0]]
        np.testing.assert_allclose(H, expected, atol=1e-12)

    def test_transcendental_hessian(self):
        # f(x) = sin(x0) * exp(x1)
        # H = [[-sin(x0)*exp(x1), cos(x0)*exp(x1)],
        #      [cos(x0)*exp(x1),  sin(x0)*exp(x1)]]
        def f(x):
            return x[0].sin() * x[1].exp()

        x0 = [1.0, 0.0]
        H = hessian(f, x0)
        expected = [
            [-math.sin(1.0), math.cos(1.0)],
            [math.cos(1.0), math.sin(1.0)],
        ]
        np.testing.assert_allclose(H, expected, atol=1e-12)
