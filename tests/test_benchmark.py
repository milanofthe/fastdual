"""Benchmarks for fastdual using pytest-benchmark.

Run: pytest tests/test_benchmark.py --benchmark-only
"""

import math
import numpy as np

pytest_benchmark = None
try:
    import pytest_benchmark
except ImportError:
    pass

import pytest
from fastdual import Dual, DualArray, HyperDual, der, jac, val, hessian, reset


pytestmark = pytest.mark.skipif(
    pytest_benchmark is None,
    reason="pytest-benchmark not installed",
)


@pytest.fixture(autouse=True)
def _reset():
    reset()


# -- Scalar arithmetic (Dual) ------------------------------------------------

def test_scalar_add(benchmark):
    x = Dual(3.0)
    y = Dual(5.0)
    benchmark(lambda: x + y)


def test_scalar_mul(benchmark):
    x = Dual(3.0)
    y = Dual(5.0)
    benchmark(lambda: x * y)


def test_scalar_pow(benchmark):
    x = Dual(2.0)
    benchmark(lambda: x ** 3.0)


# -- Scalar arithmetic (float baseline) -------------------------------------

def test_float_add(benchmark):
    x = 3.0
    y = 5.0
    benchmark(lambda: x + y)


def test_float_mul(benchmark):
    x = 3.0
    y = 5.0
    benchmark(lambda: x * y)


def test_float_pow(benchmark):
    x = 2.0
    benchmark(lambda: x ** 3.0)


# -- Transcendentals (Dual) -------------------------------------------------

def test_sin(benchmark):
    x = Dual(1.0)
    benchmark(lambda: x.sin())


def test_exp(benchmark):
    x = Dual(1.0)
    benchmark(lambda: x.exp())


def test_log(benchmark):
    x = Dual(2.0)
    benchmark(lambda: x.log())


# -- Transcendentals (float baseline) ---------------------------------------

def test_float_sin(benchmark):
    x = 1.0
    benchmark(lambda: math.sin(x))


def test_float_exp(benchmark):
    x = 1.0
    benchmark(lambda: math.exp(x))


def test_float_log(benchmark):
    x = 2.0
    benchmark(lambda: math.log(x))


# -- Array operations (Dual) ------------------------------------------------

def test_seed_array_10(benchmark):
    vals = list(range(1, 11))
    benchmark(lambda: DualArray(vals))


def test_seed_array_100(benchmark):
    vals = list(range(1, 101))
    benchmark(lambda: DualArray(vals))


def test_np_sin_array_10(benchmark):
    arr = DualArray(list(range(1, 11)))
    benchmark(lambda: np.sin(arr))


def test_np_sin_array_100(benchmark):
    arr = DualArray(list(range(1, 101)))
    benchmark(lambda: np.sin(arr))


def test_val_extraction_100(benchmark):
    arr = DualArray(list(range(1, 101)))
    benchmark(lambda: val(arr))


# -- Array operations (float baseline) --------------------------------------

def test_float_np_sin_array_10(benchmark):
    arr = np.arange(1.0, 11.0)
    benchmark(lambda: np.sin(arr))


def test_float_np_sin_array_100(benchmark):
    arr = np.arange(1.0, 101.0)
    benchmark(lambda: np.sin(arr))


# -- Jacobian -----------------------------------------------------------------

def test_jacobian_5x5(benchmark):
    def run():
        x = DualArray([1.0, 2.0, 3.0, 4.0, 5.0])
        f = np.array([x[i] * x[(i + 1) % 5] for i in range(5)])
        return jac(f, x)
    benchmark(run)


def test_jacobian_10x10(benchmark):
    def run():
        x = DualArray(list(range(1, 11)))
        f = np.array([x[i] * x[(i + 1) % 10] + x[i] ** 2 for i in range(10)])
        return jac(f, x)
    benchmark(run)


def test_jacobian_20x20(benchmark):
    def run():
        x = DualArray(list(range(1, 21)))
        f = np.array([x[i] * x[(i + 1) % 20] + x[i] ** 2 for i in range(20)])
        return jac(f, x)
    benchmark(run)


# -- Finite difference helper -------------------------------------------------

def _jac_findiff(fun, x0, eps=1e-7):
    x0 = np.array(x0, dtype=float)
    f0 = np.array(fun(x0), dtype=float)
    n = len(x0)
    m = len(f0)
    J = np.empty((m, n))
    for j in range(n):
        xp = x0.copy()
        xp[j] += eps
        J[:, j] = (np.array(fun(xp), dtype=float) - f0) / eps
    return J


# -- Jacobian: fastdual vs finite differences ---------------------------------

def _make_jac_fun(n):
    def f(x):
        return np.array([x[i] * x[(i + 1) % n] + x[i] ** 2 for i in range(n)])
    return f


def test_jac_fastdual_10(benchmark):
    f = _make_jac_fun(10)
    x0 = list(range(1, 11))
    def run():
        seeds = DualArray(x0)
        return jac(f(seeds), seeds)
    benchmark(run)


def test_jac_findiff_10(benchmark):
    f = _make_jac_fun(10)
    x0 = list(range(1, 11))
    benchmark(lambda: _jac_findiff(f, x0))


def test_jac_fastdual_20(benchmark):
    f = _make_jac_fun(20)
    x0 = list(range(1, 21))
    def run():
        seeds = DualArray(x0)
        return jac(f(seeds), seeds)
    benchmark(run)


def test_jac_findiff_20(benchmark):
    f = _make_jac_fun(20)
    x0 = list(range(1, 21))
    benchmark(lambda: _jac_findiff(f, x0))


# -- HyperDual scalar benchmarks ---------------------------------------------

def test_hd_scalar_add(benchmark):
    x = HyperDual(3.0, 1.0, 0.0, 0.0)
    y = HyperDual(5.0, 0.0, 1.0, 0.0)
    benchmark(lambda: x + y)


def test_hd_scalar_mul(benchmark):
    x = HyperDual(3.0, 1.0, 0.0, 0.0)
    y = HyperDual(5.0, 0.0, 1.0, 0.0)
    benchmark(lambda: x * y)


def test_hd_sin(benchmark):
    x = HyperDual(1.0, 1.0, 1.0, 0.0)
    benchmark(lambda: x.sin())


def test_hd_exp(benchmark):
    x = HyperDual(1.0, 1.0, 1.0, 0.0)
    benchmark(lambda: x.exp())


# -- End-to-end: gradient (Dual) vs Hessian (HyperDual) ----------------------

def _make_gradient_fun(n):
    """Evaluate f and extract full gradient via Dual."""
    def run():
        x = DualArray(list(range(1, n + 1)))
        s = x[0] * x[0]
        for i in range(1, n):
            s = s + x[i] * x[(i - 1) % n] + x[i] * x[i]
        return val(np.array([s])), jac(np.array([s]), x)
    return run


def test_gradient_5(benchmark):
    benchmark(_make_gradient_fun(5))


def test_gradient_10(benchmark):
    benchmark(_make_gradient_fun(10))


def test_gradient_20(benchmark):
    benchmark(_make_gradient_fun(20))


# -- Hessian benchmarks -------------------------------------------------------

def _make_hessian_fun(n):
    def f(x):
        s = x[0] * x[0]
        for i in range(1, n):
            s = s + x[i] * x[(i - 1) % n] + x[i] * x[i]
        return s
    return f


def test_hessian_5(benchmark):
    f = _make_hessian_fun(5)
    x0 = list(range(1, 6))
    benchmark(lambda: hessian(f, x0))


def test_hessian_10(benchmark):
    f = _make_hessian_fun(10)
    x0 = list(range(1, 11))
    benchmark(lambda: hessian(f, x0))


def test_hessian_20(benchmark):
    f = _make_hessian_fun(20)
    x0 = list(range(1, 21))
    benchmark(lambda: hessian(f, x0))


def _hessian_findiff(fun, x0, eps=1e-5):
    """Hessian via finite differences (baseline)."""
    x0 = np.array(x0, dtype=float)
    n = len(x0)
    H = np.empty((n, n))
    f0 = fun(x0)
    for i in range(n):
        for j in range(i, n):
            xpp = x0.copy(); xpp[i] += eps; xpp[j] += eps
            xpm = x0.copy(); xpm[i] += eps; xpm[j] -= eps
            xmp = x0.copy(); xmp[i] -= eps; xmp[j] += eps
            xmm = x0.copy(); xmm[i] -= eps; xmm[j] -= eps
            H[i, j] = (fun(xpp) - fun(xpm) - fun(xmp) + fun(xmm)) / (4 * eps * eps)
            H[j, i] = H[i, j]
    return H


def test_hessian_findiff_5(benchmark):
    f = _make_hessian_fun(5)
    x0 = list(range(1, 6))
    benchmark(lambda: _hessian_findiff(f, x0))


def test_hessian_findiff_10(benchmark):
    f = _make_hessian_fun(10)
    x0 = list(range(1, 11))
    benchmark(lambda: _hessian_findiff(f, x0))


def test_hessian_findiff_20(benchmark):
    f = _make_hessian_fun(20)
    x0 = list(range(1, 21))
    benchmark(lambda: _hessian_findiff(f, x0))
