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
from fastdual import Dual, DualArray, der, jac, val, reset, hessian, sparse_jac
from fastdual._coloring import _greedy_color


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


# -- Hessian ------------------------------------------------------------------

def test_hessian_3x3(benchmark):
    from fastdual import hessian

    def f(x):
        return x[0] ** 2.0 * x[1] + x[1] ** 2.0 * x[2] + x[2] ** 2.0 * x[0]

    benchmark(lambda: hessian(f, [1.0, 2.0, 3.0]))


# -- Finite difference helpers ------------------------------------------------

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


def _hessian_findiff(fun, x0, eps=1e-5):
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


# -- Hessian: fastdual vs finite differences ----------------------------------

def _rosenbrock(x):
    return (1.0 - x[0]) ** 2 + 100.0 * (x[1] - x[0] ** 2) ** 2

def _rosenbrock_scalar(x):
    return (1.0 - x[0]) ** 2 + 100.0 * (x[1] - x[0] ** 2) ** 2


def test_hessian_fastdual_2d(benchmark):
    def f(x):
        return (1.0 - x[0]) ** 2.0 + 100.0 * (x[1] - x[0] ** 2.0) ** 2.0
    benchmark(lambda: hessian(f, [1.0, 1.0]))


def test_hessian_findiff_2d(benchmark):
    benchmark(lambda: _hessian_findiff(_rosenbrock_scalar, [1.0, 1.0]))


def test_hessian_fastdual_5d(benchmark):
    def f(x):
        return sum((1.0 - x[i]) ** 2.0 + 100.0 * (x[i + 1] - x[i] ** 2.0) ** 2.0 for i in range(4))
    benchmark(lambda: hessian(f, [1.0] * 5))


def test_hessian_findiff_5d(benchmark):
    def f(x):
        return sum((1.0 - x[i]) ** 2 + 100.0 * (x[i + 1] - x[i] ** 2) ** 2 for i in range(4))
    benchmark(lambda: _hessian_findiff(f, [1.0] * 5))


# -- Sparse Jacobian vs dense Jacobian ----------------------------------------

def _make_tridiag_fun(n):
    def f(x):
        out = [x[0] + x[1]]
        for i in range(1, n - 1):
            out.append(x[i - 1] + x[i] ** 2 + x[i + 1])
        out.append(x[n - 2] + x[n - 1])
        return np.array(out)
    return f


def _make_tridiag_sparsity(n):
    sparsity = np.zeros((n, n), dtype=bool)
    for i in range(n):
        sparsity[i, i] = True
        if i > 0:
            sparsity[i, i - 1] = True
        if i < n - 1:
            sparsity[i, i + 1] = True
    return sparsity


def test_sparse_jac_20(benchmark):
    n = 20
    f = _make_tridiag_fun(n)
    x0 = np.linspace(1, 2, n).tolist()
    sparsity = _make_tridiag_sparsity(n)
    benchmark(lambda: sparse_jac(f, x0, sparsity))


def test_dense_jac_20(benchmark):
    n = 20
    f = _make_tridiag_fun(n)
    x0 = np.linspace(1, 2, n).tolist()
    def run():
        seeds = DualArray(x0)
        return jac(f(seeds), seeds)
    benchmark(run)


def test_sparse_jac_50(benchmark):
    n = 50
    f = _make_tridiag_fun(n)
    x0 = np.linspace(1, 2, n).tolist()
    sparsity = _make_tridiag_sparsity(n)
    benchmark(lambda: sparse_jac(f, x0, sparsity))
