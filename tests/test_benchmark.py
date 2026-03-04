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
from fastdual import Dual, DualArray, der, jac, val, reset


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
