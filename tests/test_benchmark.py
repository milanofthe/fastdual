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


# -- Scalar arithmetic -------------------------------------------------------

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


# -- Transcendentals ---------------------------------------------------------

def test_sin(benchmark):
    x = Dual(1.0)
    benchmark(lambda: x.sin())


def test_exp(benchmark):
    x = Dual(1.0)
    benchmark(lambda: x.exp())


def test_log(benchmark):
    x = Dual(2.0)
    benchmark(lambda: x.log())


# -- Array operations ---------------------------------------------------------

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


# -- Hessian ------------------------------------------------------------------

def test_hessian_3x3(benchmark):
    from fastdual import hessian

    def f(x):
        return x[0] ** 2.0 * x[1] + x[1] ** 2.0 * x[2] + x[2] ** 2.0 * x[0]

    benchmark(lambda: hessian(f, [1.0, 2.0, 3.0]))
