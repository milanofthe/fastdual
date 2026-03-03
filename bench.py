"""
Comprehensive benchmark: dualnum (C extension) vs original Value (pure Python)

Run: python bench.py
"""

import time
import sys
import numpy as np

# -- Import both implementations ---------------------------------------------

# Add src to path for dualnum
sys.path.insert(0, "src")

from dualnum import Dual, der, jac, seed_array, val, reset, autojac

# Import original Value (standalone copy from pathsim)
sys.path.insert(0, ".")
from bench_value_original import Value
from bench_value_original import der as value_der, jac as value_jac, autojac as value_autojac


# -- Benchmark harness --------------------------------------------------------

def bench(name, fn_dual, fn_value, n=200_000, warmup=1000):
    """Run a benchmark comparing Dual vs Value, return (dual_time, value_time, speedup)."""
    # Warmup
    for _ in range(warmup):
        fn_dual()
    for _ in range(warmup):
        fn_value()

    # Measure Dual
    t0 = time.perf_counter()
    for _ in range(n):
        fn_dual()
    t_dual = time.perf_counter() - t0

    # Measure Value
    t0 = time.perf_counter()
    for _ in range(n):
        fn_value()
    t_value = time.perf_counter() - t0

    speedup = t_value / t_dual
    ops_dual = n / t_dual
    ops_value = n / t_value

    print(f"  {name:40s}  "
          f"Dual: {t_dual:6.3f}s ({ops_dual:>10,.0f} ops/s)  "
          f"Value: {t_value:6.3f}s ({ops_value:>10,.0f} ops/s)  "
          f"Speedup: {speedup:5.1f}x")
    return t_dual, t_value, speedup


def section(title):
    print(f"\n{'-' * 100}")
    print(f"  {title}")
    print(f"{'-' * 100}")


# -- Benchmarks ---------------------------------------------------------------

results = []

# ============================================================================
section("SCALAR ARITHMETIC (2 independent variables)")
# ============================================================================

reset()
dx, dy = Dual(3.0), Dual(5.0)
vx, vy = Value(3.0), Value(5.0)

results.append(bench("add (Dual+Dual)",
    lambda: dx + dy,
    lambda: vx + vy))

results.append(bench("add (Dual+float)",
    lambda: dx + 2.0,
    lambda: vx + 2.0))

results.append(bench("subtract (Dual-Dual)",
    lambda: dx - dy,
    lambda: vx - vy))

results.append(bench("multiply (Dual*Dual)",
    lambda: dx * dy,
    lambda: vx * vy))

results.append(bench("multiply (Dual*float)",
    lambda: dx * 4.0,
    lambda: vx * 4.0))

results.append(bench("divide (Dual/Dual)",
    lambda: dx / dy,
    lambda: vx / vy))

results.append(bench("power (Dual**float)",
    lambda: dx ** 2.0,
    lambda: vx ** 2.0))

results.append(bench("power (Dual**Dual)",
    lambda: dx ** dy,
    lambda: vx ** vy))

results.append(bench("negate (-Dual)",
    lambda: -dx,
    lambda: -vx))

results.append(bench("abs(Dual)",
    lambda: abs(dx),
    lambda: abs(vx)))

# ============================================================================
section("COMPOUND EXPRESSIONS (2 variables)")
# ============================================================================

results.append(bench("x*y + x",
    lambda: dx * dy + dx,
    lambda: vx * vy + vx))

results.append(bench("x*y + x*x - y/x",
    lambda: dx * dy + dx * dx - dy / dx,
    lambda: vx * vy + vx * vx - vy / vx))

results.append(bench("(x+1)*(x-1)  [x^2-1]",
    lambda: (dx + 1.0) * (dx - 1.0),
    lambda: (vx + 1.0) * (vx - 1.0)))

results.append(bench("x**2 + 2*x*y + y**2  [(x+y)^2]",
    lambda: dx**2 + 2.0*dx*dy + dy**2,
    lambda: vx**2 + 2.0*vx*vy + vy**2))

# ============================================================================
section("TRANSCENDENTAL FUNCTIONS (single variable)")
# ============================================================================

reset()
dx1 = Dual(1.0)
vx1 = Value(1.0)

for fname in ["sin", "cos", "tan", "exp", "log", "sqrt",
              "arcsin", "arccos", "arctan",
              "sinh", "cosh", "tanh",
              "arcsinh", "arctanh",
              "exp2", "log1p", "expm1", "log2", "log10"]:

    # Dual method
    dm = getattr(dx1, fname, None)
    # Value: use np function
    np_fn = getattr(np, fname, None)

    if dm is None or np_fn is None:
        continue

    # Some functions need values in specific ranges
    special_vals = {
        "arcsin": 0.5, "arccos": 0.5,    # (-1, 1)
        "arctanh": 0.5,                    # (-1, 1)
        "arccosh": 2.0,                    # (1, inf)
    }

    if fname in special_vals:
        reset()
        sv = special_vals[fname]
        dx_s = Dual(sv)
        vx_s = Value(sv)
        results.append(bench(f"{fname}(x)  [x={sv}]",
            lambda _d=dx_s, _m=getattr(dx_s, fname): _m(),
            lambda _v=vx_s, _f=np_fn: _f(_v)))
    else:
        results.append(bench(f"{fname}(x)",
            lambda _m=dm: _m(),
            lambda _f=np_fn, _v=vx1: _f(_v)))

# square and cbrt (not in np namespace as ufunc names matching method names)
reset()
dx3 = Dual(3.0)
vx3 = Value(3.0)

results.append(bench("square(x)",
    lambda: dx3.square(),
    lambda: np.square(vx3)))

results.append(bench("cbrt(x)",
    lambda: dx3.cbrt(),
    lambda: np.cbrt(vx3)))

# ============================================================================
section("NUMPY UFUNC DISPATCH (scalar)")
# ============================================================================

reset()
dx_np = Dual(1.5)
vx_np = Value(1.5)

for ufname in ["sin", "cos", "exp", "log", "sqrt", "square", "cbrt",
               "arctan", "sinh", "tanh", "exp2", "log1p", "expm1", "sign"]:
    np_fn = getattr(np, ufname)
    results.append(bench(f"np.{ufname}(x)",
        lambda _f=np_fn, _d=dx_np: _f(_d),
        lambda _f=np_fn, _v=vx_np: _f(_v)))

# ============================================================================
section("MANY INDEPENDENT VARIABLES (gradient size scaling)")
# ============================================================================

for n_vars in [2, 4, 8, 16, 32]:
    reset()
    duals = [Dual(float(i + 1)) for i in range(n_vars)]
    values = [Value(float(i + 1)) for i in range(n_vars)]

    # Sum all pairwise products: sum(x_i * x_j for i<j)
    def dual_pairwise(ds=duals):
        s = ds[0] * ds[1]
        for i in range(len(ds)):
            for j in range(i + 1, len(ds)):
                if i == 0 and j == 1:
                    continue
                s = s + ds[i] * ds[j]
        return s

    def value_pairwise(vs=values):
        s = vs[0] * vs[1]
        for i in range(len(vs)):
            for j in range(i + 1, len(vs)):
                if i == 0 and j == 1:
                    continue
                s = s + vs[i] * vs[j]
        return s

    iters = max(1000, 100_000 // n_vars**2)
    results.append(bench(f"pairwise products ({n_vars} vars, {n_vars*(n_vars-1)//2} terms)",
        dual_pairwise, value_pairwise, n=iters))

# ============================================================================
section("DERIVATIVE EXTRACTION")
# ============================================================================

reset()
dx_d, dy_d = Dual(3.0), Dual(5.0)
vx_d, vy_d = Value(3.0), Value(5.0)
dz = dx_d * dy_d + dx_d
vz = vx_d * vy_d + vx_d

results.append(bench("der(z, x)  [scalar]",
    lambda: der(dz, dx_d),
    lambda: value_der(vz, vx_d)))

# ============================================================================
section("JACOBIAN COMPUTATION")
# ============================================================================

for n_vars in [2, 4, 8]:
    for n_out in [2, 4, 8]:
        reset()
        ds = [Dual(float(i + 1)) for i in range(n_vars)]
        vs = [Value(float(i + 1)) for i in range(n_vars)]

        # Build output: each output is sum of x_i^2
        d_out = np.array([sum(d * d for d in ds[:k+1]) for k in range(n_out)])
        v_out = np.array([sum(v * v for v in vs[:k+1]) for k in range(n_out)])

        iters = max(500, 50_000 // (n_vars * n_out))
        results.append(bench(f"jac({n_out} outputs, {n_vars} inputs)",
            lambda _o=d_out, _s=ds: jac(_o, _s),
            lambda _o=v_out, _s=vs: value_jac(_o, _s),
            n=iters))

# ============================================================================
section("ARRAY OPERATIONS (object dtype)")
# ============================================================================

for arr_size in [10, 50, 100]:
    reset()
    d_arr = seed_array(np.arange(1.0, arr_size + 1.0))
    v_arr = Value.array(np.arange(1.0, arr_size + 1.0))

    iters = max(100, 20_000 // arr_size)

    results.append(bench(f"np.sin(arr[{arr_size}])",
        lambda _a=d_arr: np.sin(_a),
        lambda _a=v_arr: np.sin(_a),
        n=iters))

    results.append(bench(f"arr[{arr_size}] + arr[{arr_size}]",
        lambda _a=d_arr: _a + _a,
        lambda _a=v_arr: _a + _a,
        n=iters))

    results.append(bench(f"arr[{arr_size}] * arr[{arr_size}]",
        lambda _a=d_arr: _a * _a,
        lambda _a=v_arr: _a * _a,
        n=iters))

# ============================================================================
section("AUTOJAC DECORATOR")
# ============================================================================

@autojac
def f_dual(x, y):
    return np.array([x**2 + y, x * y**2, np.sin(x) * np.exp(y)])

@value_autojac
def f_value(x, y):
    return np.array([x**2 + y, x * y**2, np.sin(x) * np.exp(y)])

results.append(bench("autojac 3-output, 2-input function",
    lambda: f_dual(2.0, 3.0),
    lambda: f_value(2.0, 3.0),
    n=50_000))

# ============================================================================
section("REALISTIC: OPERATOR-STYLE JACOBIAN (simulate Operator.jac)")
# ============================================================================

def rosenbrock_dual(xy):
    """Rosenbrock gradient as a 2→2 system."""
    x, y = xy
    return np.array([
        -2.0 * (1.0 - x) + 400.0 * x * (x * x - y),
        200.0 * (y - x * x)
    ])

def rosenbrock_value(xy):
    x, y = xy
    return np.array([
        -2.0 * (1.0 - x) + 400.0 * x * (x * x - y),
        200.0 * (y - x * x)
    ])

def operator_jac_dual(fn, x0):
    reset()
    seeds = seed_array(x0)
    out = fn(seeds)
    return jac(out, seeds)

def operator_jac_value(fn, x0):
    seeds = Value.array(x0)
    out = fn(seeds)
    return value_jac(out, seeds)

x0 = np.array([1.5, 2.0])

results.append(bench("Rosenbrock Jacobian (2x2)",
    lambda: operator_jac_dual(rosenbrock_dual, x0),
    lambda: operator_jac_value(rosenbrock_value, x0),
    n=50_000))

# -- Larger system --
def system_10(xs):
    """10-variable coupled system."""
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

x0_10 = np.arange(1.0, 11.0)

results.append(bench("Coupled system Jacobian (10x10)",
    lambda: operator_jac_dual(system_10, x0_10),
    lambda: operator_jac_value(system_10, x0_10),
    n=5_000))

# -- 20-var system --
x0_20 = np.arange(1.0, 21.0)

results.append(bench("Coupled system Jacobian (20x20)",
    lambda: operator_jac_dual(system_10, x0_20),
    lambda: operator_jac_value(system_10, x0_20),
    n=1_000))


# ============================================================================
# SUMMARY
# ============================================================================

section("SUMMARY")

speedups = [r[2] for r in results]
print(f"\n  Total benchmarks: {len(results)}")
print(f"  Min speedup:  {min(speedups):5.1f}x")
print(f"  Max speedup:  {max(speedups):5.1f}x")
print(f"  Mean speedup: {sum(speedups)/len(speedups):5.1f}x")
print(f"  Median:       {sorted(speedups)[len(speedups)//2]:5.1f}x")
print()
