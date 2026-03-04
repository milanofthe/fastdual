# fastdual

Fast forward-mode automatic differentiation via dual numbers, implemented as a CPython C extension.

Computes exact gradients, Jacobians, and Hessians with minimal overhead — no taping, no graph construction, just numbers that carry their derivatives.

## Install

```bash
pip install fastdual
```

## Drop-in Gradients

Any function that works with floats works with `Dual` — no rewriting, no framework, no JIT warmup:

```python
from fastdual import Dual, der

def my_function(x):
    return x**3 - 2*x + 1

x = Dual(3.0)
y = my_function(x)
dy_dx = der(y, x)  # 25.0 (exact derivative)
```

## Quick Start

```python
from fastdual import Dual, der
import numpy as np

x = Dual(3.0)
y = Dual(5.0)

z = x * y + np.sin(x)
print(z.val)        # 15.1411...
print(der(z, x))    # 5.99 (dz/dx = y + cos(x))
print(der(z, y))    # 3.0  (dz/dy = x)
```

## Array Operations

```python
from fastdual import DualArray, val, jac
import numpy as np

xs = DualArray([1.0, 2.0, 3.0])  # independent seeds

result = np.sin(xs) + xs ** 2
print(val(result))     # [sin(1)+1, sin(2)+4, sin(3)+9]
print(jac(result, xs)) # diagonal Jacobian
```

## Automatic Jacobians

```python
from fastdual import autojac
import numpy as np

@autojac
def f(x, y):
    return np.array([x**2 + y, x * y**2])

result, J = f(2.0, 3.0)
# result = [7.0, 18.0]
# J = [[4.0,  1.0],
#      [9.0, 12.0]]
```

## Hessians

Second-order derivatives via hyper-dual numbers (also a C extension):

```python
from fastdual import hessian

def rosenbrock(x):
    return (1.0 - x[0])**2 + 100.0 * (x[1] - x[0]**2)**2

H = hessian(rosenbrock, [1.0, 1.0])
# [[802, -400],
#  [-400, 200]]
```

## Optimization

Automatic gradient computation for `scipy.optimize.minimize`:

```python
from fastdual import minimize

def objective(x):
    return (x[0] - 1)**2 + 100 * (x[1] - x[0]**2)**2

result = minimize(objective, [0.0, 0.0])
print(result.x)  # [1.0, 1.0]
```

Requires `pip install fastdual[optimize]`.

## Sparse Jacobians

For large systems with known sparsity, avoid redundant computation via graph coloring:

```python
from fastdual import sparse_jac
import numpy as np

def f(x):
    return np.array([x[i-1] + x[i] + x[i+1] for i in range(1, len(x)-1)])

sparsity = ...  # boolean (m, n) array of known nonzero entries
J = sparse_jac(f, x0, sparsity)  # only n_colors << n forward passes
```

## NumPy Integration

`DualArray` supports `__array_ufunc__` and `__array_function__` protocols:

```python
from fastdual import DualArray
import numpy as np

x = DualArray([1.0, 2.0, 3.0])

np.sin(x)              # ufuncs
np.dot(x, x)           # dot product
np.sum(x)              # reduction
np.linalg.norm(x)      # L2 norm
np.linalg.solve(A, b)  # linear solve with gradient propagation
```

## Supported Operations

Both `Dual` (first-order) and `HyperDual` (second-order) types are C extensions. All operations work as methods and (for `Dual`) as NumPy ufuncs.

### Arithmetic

| Operation | Syntax | Dual | HyperDual |
|-----------|--------|:----:|:---------:|
| Addition | `a + b` | yes | yes |
| Subtraction | `a - b` | yes | yes |
| Multiplication | `a * b` | yes | yes |
| Division | `a / b` | yes | yes |
| Floor division | `a // b` | yes | — |
| Modulo | `a % b` | yes | — |
| Power | `a ** b` | yes | yes |
| Negation | `-a` | yes | yes |
| Absolute value | `abs(a)` | yes | yes |

### Transcendental Functions

Available as methods (`.sin()`) on both types and via NumPy ufuncs (`np.sin()`) on `Dual`/`DualArray`.

| Function | Method | Derivative |
|----------|--------|------------|
| `sin` | `.sin()` | cos(x) |
| `cos` | `.cos()` | -sin(x) |
| `tan` | `.tan()` | sec²(x) |
| `exp` | `.exp()` | exp(x) |
| `log` | `.log()` | 1/x |
| `sqrt` | `.sqrt()` | 1/(2√x) |
| `arcsin` | `.arcsin()` | 1/√(1-x²) |
| `arccos` | `.arccos()` | -1/√(1-x²) |
| `arctan` | `.arctan()` | 1/(1+x²) |
| `sinh` | `.sinh()` | cosh(x) |
| `cosh` | `.cosh()` | sinh(x) |
| `tanh` | `.tanh()` | sech²(x) |
| `arcsinh` | `.arcsinh()` | 1/√(1+x²) |
| `arccosh` | `.arccosh()` | 1/√(x²-1) |
| `arctanh` | `.arctanh()` | 1/(1-x²) |
| `exp2` | `.exp2()` | ln(2)·2ˣ |
| `log2` | `.log2()` | 1/(x·ln2) |
| `log10` | `.log10()` | 1/(x·ln10) |
| `log1p` | `.log1p()` | 1/(1+x) |
| `expm1` | `.expm1()` | exp(x) |
| `square` | `.square()` | 2x |
| `cbrt` | `.cbrt()` | 1/(3x^⅔) |

### Binary Functions (Dual only)

These are available via NumPy ufuncs on `Dual`/`DualArray`.

| Function | Usage | Description |
|----------|-------|-------------|
| `arctan2` | `np.arctan2(y, x)` | Two-argument arctangent |
| `hypot` | `np.hypot(a, b)` | √(a² + b²) with gradient |
| `maximum` | `np.maximum(a, b)` | Element-wise maximum |
| `minimum` | `np.minimum(a, b)` | Element-wise minimum |
| `copysign` | `np.copysign(a, b)` | Magnitude of a, sign of b |

### Utility Functions

| Function | Method | Dual | HyperDual |
|----------|--------|:----:|:---------:|
| `sign` | `.sign()` | yes | yes |
| `fabs` | `.fabs()` | yes | yes |
| `conjugate` | `.conjugate()` | yes | yes |
| `floor` | `.floor()` | yes | yes |
| `ceil` | `.ceil()` | yes | yes |

### Predicates (Dual only)

`np.isfinite()`, `np.isinf()`, `np.isnan()` — check the primal value, return `bool`.

### Comparisons

`<`, `<=`, `==`, `!=`, `>`, `>=` — compare on primal value only.

## API Reference

| Function | Description |
|----------|-------------|
| `Dual(value)` | Create an independent variable (seed) |
| `Dual(value, seed=False)` | Create a constant (no gradient) |
| `DualArray(values)` | Array of independent seeds from numeric input |
| `der(result, wrt)` | Partial derivative of result w.r.t. a seed |
| `val(array)` | Extract primal values from Dual array |
| `jac(results, seeds)` | Full Jacobian matrix |
| `autojac(fn)` | Decorator: `fn(*floats) -> (values, jacobian)` |
| `HyperDual(f, f1, f2, f12)` | Hyper-dual number for second derivatives |
| `hessian(fn, x)` | Hessian matrix via hyper-dual numbers |
| `minimize(fn, x0)` | scipy.optimize with automatic gradients |
| `sparse_jac(fn, x, sparsity)` | Sparse Jacobian via graph coloring |
| `reset()` | Reset variable ID counter |

## Performance

All hot paths are in C — both `Dual` and `HyperDual` types are C extensions with zero Python object allocation in the inner loop.

### Dual: overhead vs plain floats

<!-- BENCH:OVERHEAD:START -->
| Operation | Dual | float | overhead |
|-----------|------|-------|----------|
| Scalar add | 122 ns | 95 ns | 1.3x |
| Scalar mul | 122 ns | 95 ns | 1.3x |
| Scalar pow | 164 ns | 119 ns | 1.4x |
| sin | 250 ns | 118 ns | 2.1x |
| exp | 152 ns | 121 ns | 1.3x |
| log | 132 ns | 115 ns | 1.2x |
| np.sin (10) | 2.5 us | 832 ns | 3.0x |
| np.sin (100) | 6.9 us | 1.8 us | 3.8x |
<!-- BENCH:OVERHEAD:END -->

### HyperDual: scalar operations

<!-- BENCH:HDOVERHEAD:START -->
| Operation | HyperDual | Dual | overhead |
|-----------|-----------|------|----------|
| Scalar add | 107 ns | 122 ns | 0.9x |
| Scalar mul | 116 ns | 122 ns | 1.0x |
| sin | 124 ns | 250 ns | 0.5x |
| exp | 125 ns | 152 ns | 0.8x |
<!-- BENCH:HDOVERHEAD:END -->

### Jacobian: fastdual vs finite differences

<!-- BENCH:COMPARISON:START -->
| Benchmark | fastdual | fin. diff. | speedup |
|-----------|---|---|---|
| Jacobian 10x10 | 20.2 us | 80.8 us | **4.0x faster** |
| Jacobian 20x20 | 46.0 us | 238.6 us | **5.2x faster** |
<!-- BENCH:COMPARISON:END -->

> Jacobians use the C extension for forward-mode AD — one pass computes all partials simultaneously, vs n+1 function evaluations for finite differences.

### Hessian: fastdual vs finite differences

<!-- BENCH:HESSIAN:START -->
| Benchmark | fastdual | fin. diff. | speedup |
|-----------|---|---|---|
| Hessian 5x5 | 14.9 us | 172.3 us | **11.6x faster** |
| Hessian 10x10 | 92.8 us | 1.1 ms | **11.6x faster** |
| Hessian 20x20 | 656.3 us | 7.6 ms | **11.5x faster** |
<!-- BENCH:HESSIAN:END -->

> Hessians require n(n+1)/2 function evaluations (each with HyperDual arithmetic). For small n, finite differences with simple functions can be competitive. The hyper-dual approach shines when derivatives must be **exact** (no step-size tuning) or when the function involves transcendentals where finite-difference errors grow.

## Test

```bash
pytest tests/ -v
```
