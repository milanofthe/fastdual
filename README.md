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

Second-order derivatives via hyper-dual numbers:

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

**Arithmetic:** `+`, `-`, `*`, `/`, `**`, `abs`, unary `-`/`+`

**Transcendentals (25):** `sin`, `cos`, `tan`, `exp`, `log`, `log2`, `log10`, `sqrt`, `arcsin`, `arccos`, `arctan`, `sinh`, `cosh`, `tanh`, `arcsinh`, `arccosh`, `arctanh`, `exp2`, `log1p`, `expm1`, `square`, `cbrt`, `sign`, `conjugate`, `negative`

**NumPy:** All of the above work as `np.sin(dual)`, `np.exp(dual)`, etc. — both on scalars and arrays. Array operations are batch-dispatched to C via `DualArray`.

**Comparisons:** `<`, `<=`, `==`, `!=`, `>`, `>=` (compare primal values)

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
| `hessian(fn, x)` | Hessian matrix via hyper-dual numbers |
| `minimize(fn, x0)` | scipy.optimize with automatic gradients |
| `sparse_jac(fn, x, sparsity)` | Sparse Jacobian via graph coloring |
| `HyperDual(f, f1, f2, f12)` | Hyper-dual number for second derivatives |
| `reset()` | Reset variable ID counter |

## Performance

All hot paths are in C. Overhead vs plain floats:

<!-- BENCH:OVERHEAD:START -->
| Operation | Dual | float | overhead |
|-----------|------|-------|----------|
| Scalar add | 60 ns | 51 ns | 1.2x |
| Scalar mul | 60 ns | 49 ns | 1.2x |
| Scalar pow | 100 ns | 68 ns | 1.5x |
| sin | 64 ns | 61 ns | 1.1x |
| exp | 61 ns | 63 ns | 1.0x |
| log | 61 ns | 62 ns | 1.0x |
| np.sin (10) | 1.2 us | 400 ns | 3.0x |
| np.sin (100) | 3.3 us | 610 ns | 5.4x |
<!-- BENCH:OVERHEAD:END -->

Comparison with finite differences:

<!-- BENCH:COMPARISON:START -->
| Benchmark | fastdual | baseline | speedup |
|-----------|----------|----------|---------|
| Jacobian 10x10 | 8.9 us | 41.6 us | **4.7x faster** |
| Jacobian 20x20 | 20.8 us | 123.0 us | **5.9x faster** |
<!-- BENCH:COMPARISON:END -->

> Jacobians use the C extension for forward-mode AD — one pass computes all partials simultaneously, vs n+1 function evaluations for finite differences.

## Test

```bash
pytest tests/ -v
```
