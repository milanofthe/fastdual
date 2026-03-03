"""
Overhead benchmark: dualnum vs plain floats vs numpy

Measures the cost of carrying gradients compared to raw numeric computation.

Run: python bench_overhead.py
"""

import time
import sys
import math
import numpy as np

sys.path.insert(0, "src")
from dualnum import Dual, der, jac, seed_array, val, reset, autojac


# -- Benchmark harness --------------------------------------------------------

def bench(name, fns, n=500_000, warmup=2000):
    """Benchmark multiple implementations. fns = [(label, fn), ...]"""
    # Warmup all
    for _, fn in fns:
        for _ in range(warmup):
            fn()

    times = []
    for label, fn in fns:
        t0 = time.perf_counter()
        for _ in range(n):
            fn()
        t = time.perf_counter() - t0
        times.append((label, t, n / t))

    # Print
    base_t = times[0][1]  # first entry is the baseline (float)
    parts = []
    for label, t, ops in times:
        overhead = t / base_t
        parts.append(f"{label}: {t:6.3f}s ({ops:>12,.0f} ops/s, {overhead:5.1f}x)")
    print(f"  {name:40s}")
    for p in parts:
        print(f"    {p}")
    print()
    return times


def section(title):
    print(f"\n{'-' * 90}")
    print(f"  {title}")
    print(f"{'-' * 90}")


# ==============================================================================
section("SCALAR ARITHMETIC (overhead vs plain float)")
# ==============================================================================

reset()
dx, dy = Dual(3.0), Dual(5.0)
fx, fy = 3.0, 5.0

bench("add", [
    ("float",  lambda: fx + fy),
    ("Dual 2v", lambda: dx + dy),
])

bench("multiply", [
    ("float",  lambda: fx * fy),
    ("Dual 2v", lambda: dx * dy),
])

bench("divide", [
    ("float",  lambda: fx / fy),
    ("Dual 2v", lambda: dx / dy),
])

bench("power (x**2.0)", [
    ("float",  lambda: fx ** 2.0),
    ("Dual 2v", lambda: dx ** 2.0),
])

bench("power (x**y)", [
    ("float",  lambda: fx ** fy),
    ("Dual 2v", lambda: dx ** dy),
])

# ==============================================================================
section("COMPOUND EXPRESSIONS (2 variables)")
# ==============================================================================

bench("x*y + x", [
    ("float",  lambda: fx * fy + fx),
    ("Dual 2v", lambda: dx * dy + dx),
])

bench("x*y + x*x - y/x", [
    ("float",  lambda: fx * fy + fx * fx - fy / fx),
    ("Dual 2v", lambda: dx * dy + dx * dx - dy / dx),
])

bench("x**2 + 2*x*y + y**2", [
    ("float",  lambda: fx**2 + 2.0*fx*fy + fy**2),
    ("Dual 2v", lambda: dx**2 + 2.0*dx*dy + dy**2),
])

# ==============================================================================
section("TRANSCENDENTAL FUNCTIONS (single variable)")
# ==============================================================================

reset()
dx1 = Dual(1.0)
fx1 = 1.0

for fname in ["sin", "cos", "exp", "log", "sqrt", "tan"]:
    dual_method = getattr(dx1, fname)
    math_fn = getattr(math, fname)
    bench(f"{fname}(x)", [
        ("float",  lambda _f=math_fn, _x=fx1: _f(_x)),
        ("Dual 1v", lambda _m=dual_method: _m()),
    ])

# ==============================================================================
section("TRANSCENDENTAL VIA NUMPY UFUNC DISPATCH")
# ==============================================================================

reset()
dx_np = Dual(1.5)
fx_np = 1.5

for ufname in ["sin", "cos", "exp", "log", "sqrt"]:
    np_fn = getattr(np, ufname)
    math_fn = getattr(math, ufname)
    bench(f"np.{ufname}(x)", [
        ("math.f(float)", lambda _f=math_fn, _x=fx_np: _f(_x)),
        ("np.f(float)",   lambda _f=np_fn, _x=fx_np: _f(_x)),
        ("np.f(Dual)",    lambda _f=np_fn, _d=dx_np: _f(_d)),
    ])

# ==============================================================================
section("GRADIENT SIZE SCALING (more independent variables = larger gradients)")
# ==============================================================================

for n_vars in [1, 2, 4, 8, 16, 32]:
    reset()
    duals = [Dual(float(i + 1)) for i in range(n_vars)]
    floats = [float(i + 1) for i in range(n_vars)]

    # Simple chain: x0 * x1 + x2 * x3 + ...
    def dual_chain(ds=duals):
        s = ds[0]
        for d in ds[1:]:
            s = s * d + d
        return s

    def float_chain(fs=floats):
        s = fs[0]
        for f in fs[1:]:
            s = s * f + f
        return s

    iters = max(5000, 200_000 // max(1, n_vars))
    bench(f"chain multiply-add ({n_vars} vars)", [
        ("float",  float_chain),
        (f"Dual {n_vars}v", dual_chain),
    ], n=iters)

# ==============================================================================
section("FULL JACOBIAN PIPELINE vs NUMPY (compute + extract gradients)")
# ==============================================================================

# Rosenbrock gradient: a realistic 2-input, 2-output system
def rosenbrock_float(x, y):
    return np.array([
        -2.0 * (1.0 - x) + 400.0 * x * (x * x - y),
        200.0 * (y - x * x)
    ])

def rosenbrock_jac_float(x, y):
    """Analytical Jacobian of rosenbrock gradient."""
    return np.array([
        [2.0 + 400.0 * (3.0 * x * x - y), -400.0 * x],
        [-400.0 * x, 200.0]
    ])

@autojac
def rosenbrock_dual(x, y):
    return np.array([
        -2.0 * (1.0 - x) + 400.0 * x * (x * x - y),
        200.0 * (y - x * x)
    ])

def finite_diff_jac(fn, x0, eps=1e-7):
    """Central finite differences."""
    x0 = np.asarray(x0, dtype=float)
    f0 = fn(*x0)
    n = len(x0)
    m = len(f0)
    J = np.empty((m, n))
    for j in range(n):
        xp = x0.copy(); xp[j] += eps
        xm = x0.copy(); xm[j] -= eps
        J[:, j] = (fn(*xp) - fn(*xm)) / (2 * eps)
    return J

x0 = [1.5, 2.0]

bench("Rosenbrock Jacobian (2x2)", [
    ("analytical",   lambda: rosenbrock_jac_float(*x0)),
    ("finite diff",  lambda: finite_diff_jac(rosenbrock_float, x0)),
    ("autojac(Dual)", lambda: rosenbrock_dual(*x0)),
], n=50_000)

# Larger system
def coupled_system(xs):
    n = len(xs)
    out = []
    for i in range(n):
        s = xs[i] ** 2
        if i > 0:
            s = s + xs[i - 1] * xs[i]
        if i < n - 1:
            s = s - xs[i + 1]
        out.append(s)
    return np.array(out)

def coupled_system_findiff(x0):
    return finite_diff_jac(lambda *a: coupled_system(np.array(a)), x0)

def coupled_system_autojac_fn(x0):
    reset()
    seeds = seed_array(x0)
    out = coupled_system(seeds)
    return val(out), jac(out, seeds)

for n_vars in [5, 10, 20]:
    x0_n = np.arange(1.0, n_vars + 1.0)

    iters = max(500, 20_000 // n_vars)
    bench(f"Coupled system Jacobian ({n_vars}x{n_vars})", [
        ("finite diff",   lambda _x=x0_n: coupled_system_findiff(_x)),
        ("autojac(Dual)", lambda _x=x0_n: coupled_system_autojac_fn(_x)),
    ], n=iters)


# ==============================================================================
section("ARRAY OPERATIONS: DUAL OBJECT ARRAY vs NUMPY FLOAT ARRAY")
# ==============================================================================

for arr_size in [10, 50, 100, 500]:
    reset()
    d_arr = seed_array(np.arange(1.0, arr_size + 1.0))
    f_arr = np.arange(1.0, arr_size + 1.0)

    iters = max(100, 10_000 // arr_size)

    bench(f"np.sin(arr[{arr_size}])", [
        ("numpy float64", lambda _a=f_arr: np.sin(_a)),
        ("Dual object",   lambda _a=d_arr: np.sin(_a)),
    ], n=iters)

    bench(f"arr[{arr_size}] + arr[{arr_size}]", [
        ("numpy float64", lambda _a=f_arr: _a + _a),
        ("Dual object",   lambda _a=d_arr: _a + _a),
    ], n=iters)

    bench(f"arr[{arr_size}] * arr[{arr_size}]", [
        ("numpy float64", lambda _a=f_arr: _a * _a),
        ("Dual object",   lambda _a=d_arr: _a * _a),
    ], n=iters)


# ==============================================================================
# SUMMARY
# ==============================================================================

section("SUMMARY")
print()
print("  Interpretation guide:")
print("    1.0x = same speed as baseline (float/numpy)")
print("    5.0x = 5x slower than baseline")
print("   Higher overhead is expected when carrying more gradient variables.")
print("   The key question: is Dual + AD faster than finite differences?")
print()
