"""Hyper-dual numbers for second-order derivative computation.

A hyper-dual number has the form:
    h = f + f1*e1 + f2*e2 + f12*e1*e2

where e1^2 = e2^2 = 0 (nilpotent), e1*e2 = e2*e1 != 0.

After evaluation, h.f12 gives the second derivative d²f/dx_i dx_j.
"""

import math


class HyperDual:
    """Hyper-dual number: (f, f1, f2, f12).

    - f:   primal value
    - f1:  first derivative w.r.t. direction 1
    - f2:  first derivative w.r.t. direction 2
    - f12: second (mixed) derivative
    """
    __slots__ = ('f', 'f1', 'f2', 'f12')

    def __init__(self, f, f1=0.0, f2=0.0, f12=0.0):
        self.f = float(f)
        self.f1 = float(f1)
        self.f2 = float(f2)
        self.f12 = float(f12)

    def __repr__(self):
        return f"HyperDual({self.f}, f1={self.f1}, f2={self.f2}, f12={self.f12})"

    def __float__(self):
        return self.f

    def __int__(self):
        return int(self.f)

    def __bool__(self):
        return bool(self.f)

    # -- Arithmetic ---------------------------------------------------------

    def __add__(self, other):
        if isinstance(other, HyperDual):
            return HyperDual(
                self.f + other.f,
                self.f1 + other.f1,
                self.f2 + other.f2,
                self.f12 + other.f12,
            )
        other = float(other)
        return HyperDual(self.f + other, self.f1, self.f2, self.f12)

    __radd__ = lambda self, other: self.__add__(other)

    def __sub__(self, other):
        if isinstance(other, HyperDual):
            return HyperDual(
                self.f - other.f,
                self.f1 - other.f1,
                self.f2 - other.f2,
                self.f12 - other.f12,
            )
        other = float(other)
        return HyperDual(self.f - other, self.f1, self.f2, self.f12)

    def __rsub__(self, other):
        other = float(other)
        return HyperDual(other - self.f, -self.f1, -self.f2, -self.f12)

    def __mul__(self, other):
        if isinstance(other, HyperDual):
            return HyperDual(
                self.f * other.f,
                self.f1 * other.f + self.f * other.f1,
                self.f2 * other.f + self.f * other.f2,
                self.f12 * other.f + self.f1 * other.f2 + self.f2 * other.f1 + self.f * other.f12,
            )
        other = float(other)
        return HyperDual(self.f * other, self.f1 * other, self.f2 * other, self.f12 * other)

    __rmul__ = lambda self, other: self.__mul__(other)

    def __truediv__(self, other):
        if isinstance(other, HyperDual):
            # a/b = a * (1/b)
            inv = 1.0 / other
            return self * inv
        other = float(other)
        inv = 1.0 / other
        return HyperDual(self.f * inv, self.f1 * inv, self.f2 * inv, self.f12 * inv)

    def __rtruediv__(self, other):
        # other / self
        other = float(other)
        inv = 1.0 / self.f
        inv2 = inv * inv
        inv3 = inv2 * inv
        return HyperDual(
            other * inv,
            -other * inv2 * self.f1,
            -other * inv2 * self.f2,
            other * (2.0 * inv3 * self.f1 * self.f2 - inv2 * self.f12),
        )

    def __pow__(self, other):
        if isinstance(other, HyperDual):
            # a^b = exp(b * ln(a))
            return (other * self._log()).exp()
        other = float(other)
        return _apply_unary(self, lambda x: x ** other, lambda x: other * x ** (other - 1), lambda x: other * (other - 1) * x ** (other - 2))

    def __rpow__(self, other):
        # other^self = exp(self * ln(other))
        other = float(other)
        ln_other = math.log(other)
        return (self * ln_other).exp()

    def __neg__(self):
        return HyperDual(-self.f, -self.f1, -self.f2, -self.f12)

    def __pos__(self):
        return HyperDual(self.f, self.f1, self.f2, self.f12)

    def __abs__(self):
        if self.f >= 0:
            return HyperDual(self.f, self.f1, self.f2, self.f12)
        return HyperDual(-self.f, -self.f1, -self.f2, -self.f12)

    # -- Comparison (on primal only) ----------------------------------------

    def __lt__(self, other): return self.f < float(other)
    def __le__(self, other): return self.f <= float(other)
    def __eq__(self, other): return self.f == float(other)
    def __ne__(self, other): return self.f != float(other)
    def __gt__(self, other): return self.f > float(other)
    def __ge__(self, other): return self.f >= float(other)

    # -- Transcendentals ----------------------------------------------------

    def _log(self):
        inv = 1.0 / self.f
        inv2 = inv * inv
        return HyperDual(
            math.log(self.f),
            self.f1 * inv,
            self.f2 * inv,
            self.f12 * inv - self.f1 * self.f2 * inv2,
        )

    def exp(self):
        e = math.exp(self.f)
        return HyperDual(
            e,
            e * self.f1,
            e * self.f2,
            e * (self.f12 + self.f1 * self.f2),
        )

    def log(self):
        return self._log()

    def sin(self):
        s = math.sin(self.f)
        c = math.cos(self.f)
        return HyperDual(
            s,
            c * self.f1,
            c * self.f2,
            c * self.f12 - s * self.f1 * self.f2,
        )

    def cos(self):
        s = math.sin(self.f)
        c = math.cos(self.f)
        return HyperDual(
            c,
            -s * self.f1,
            -s * self.f2,
            -s * self.f12 - c * self.f1 * self.f2,
        )

    def tan(self):
        t = math.tan(self.f)
        sec2 = 1.0 + t * t
        return HyperDual(
            t,
            sec2 * self.f1,
            sec2 * self.f2,
            sec2 * self.f12 + 2.0 * t * sec2 * self.f1 * self.f2,
        )

    def sqrt(self):
        s = math.sqrt(self.f)
        inv2s = 0.5 / s
        return HyperDual(
            s,
            inv2s * self.f1,
            inv2s * self.f2,
            inv2s * self.f12 - 0.25 / (s * self.f) * self.f1 * self.f2,
        )

    def square(self):
        return HyperDual(
            self.f * self.f,
            2.0 * self.f * self.f1,
            2.0 * self.f * self.f2,
            2.0 * (self.f * self.f12 + self.f1 * self.f2),
        )

    def arcsin(self):
        return _apply_unary(self, math.asin, lambda x: 1.0 / math.sqrt(1 - x * x), lambda x: x / (1 - x * x) ** 1.5)

    def arccos(self):
        return _apply_unary(self, math.acos, lambda x: -1.0 / math.sqrt(1 - x * x), lambda x: -x / (1 - x * x) ** 1.5)

    def arctan(self):
        return _apply_unary(self, math.atan, lambda x: 1.0 / (1 + x * x), lambda x: -2.0 * x / (1 + x * x) ** 2)

    def sinh(self):
        s = math.sinh(self.f)
        c = math.cosh(self.f)
        return HyperDual(s, c * self.f1, c * self.f2, c * self.f12 + s * self.f1 * self.f2)

    def cosh(self):
        s = math.sinh(self.f)
        c = math.cosh(self.f)
        return HyperDual(c, s * self.f1, s * self.f2, s * self.f12 + c * self.f1 * self.f2)

    def tanh(self):
        t = math.tanh(self.f)
        sech2 = 1.0 - t * t
        return HyperDual(t, sech2 * self.f1, sech2 * self.f2, sech2 * self.f12 - 2.0 * t * sech2 * self.f1 * self.f2)

    def arcsinh(self):
        return _apply_unary(self, math.asinh, lambda x: 1.0 / math.sqrt(1 + x * x), lambda x: -x / (1 + x * x) ** 1.5)

    def arccosh(self):
        return _apply_unary(self, math.acosh, lambda x: 1.0 / math.sqrt(x * x - 1), lambda x: -x / (x * x - 1) ** 1.5)

    def arctanh(self):
        return _apply_unary(self, math.atanh, lambda x: 1.0 / (1 - x * x), lambda x: 2.0 * x / (1 - x * x) ** 2)

    def log2(self):
        ln2 = math.log(2.0)
        r = self._log()
        return HyperDual(r.f / ln2, r.f1 / ln2, r.f2 / ln2, r.f12 / ln2)

    def log10(self):
        ln10 = math.log(10.0)
        r = self._log()
        return HyperDual(r.f / ln10, r.f1 / ln10, r.f2 / ln10, r.f12 / ln10)

    def exp2(self):
        return _apply_unary(self, lambda x: 2.0 ** x, lambda x: math.log(2.0) * 2.0 ** x, lambda x: math.log(2.0) ** 2 * 2.0 ** x)

    def log1p(self):
        return _apply_unary(self, math.log1p, lambda x: 1.0 / (1.0 + x), lambda x: -1.0 / (1.0 + x) ** 2)

    def expm1(self):
        e = math.exp(self.f)
        return HyperDual(e - 1.0, e * self.f1, e * self.f2, e * (self.f12 + self.f1 * self.f2))

    def cbrt(self):
        c = self.f ** (1.0 / 3.0)
        return _apply_unary(self, lambda x: x ** (1.0 / 3.0), lambda x: (1.0 / 3.0) * x ** (-2.0 / 3.0), lambda x: (-2.0 / 9.0) * x ** (-5.0 / 3.0))

    def sign(self):
        s = 1.0 if self.f > 0 else (-1.0 if self.f < 0 else 0.0)
        return HyperDual(s, 0.0, 0.0, 0.0)

    def conjugate(self):
        return HyperDual(self.f, self.f1, self.f2, self.f12)

    def floor(self):
        return HyperDual(math.floor(self.f), 0.0, 0.0, 0.0)

    def ceil(self):
        return HyperDual(math.ceil(self.f), 0.0, 0.0, 0.0)


def _apply_unary(h, f, f_prime, f_double_prime):
    """Apply g(u) where u is a HyperDual, using chain rule:
    g(u).f12 = g''(u.f) * u.f1 * u.f2 + g'(u.f) * u.f12
    """
    gp = f_prime(h.f)
    gpp = f_double_prime(h.f)
    return HyperDual(
        f(h.f),
        gp * h.f1,
        gp * h.f2,
        gpp * h.f1 * h.f2 + gp * h.f12,
    )
