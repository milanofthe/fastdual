# fastdual

Fast forward-mode automatic differentiation via dual numbers, implemented as a CPython C extension.

Computes exact gradients and Jacobians with minimal overhead — no taping, no graph construction, just numbers that carry their derivatives.

## Install

```bash
pip install fastdual
```

For development:

```bash
pip install -e .[test]
```

## Quick Start

```python
from fastdual import Dual, der
import numpy as np

# Create independent variables
x = Dual(3.0)
y = Dual(5.0)

# Compute — gradients propagate automatically
z = x * y + np.sin(x)
print(z.val)        # 15.1411...
print(der(z, x))    # 5.99 (dz/dx = y + cos(x))
print(der(z, y))    # 3.0  (dz/dy = x)
```

## Array Operations

```python
from fastdual import seed_array, val, jac
import numpy as np

# Create array of independent seeds
xs = seed_array([1.0, 2.0, 3.0])

# NumPy ufuncs work directly — dispatched to C, not per-element Python
result = np.sin(xs) + xs ** 2

# Extract values and Jacobian
print(val(result))   # [sin(1)+1, sin(2)+4, sin(3)+9]
print(jac(result, xs))
# [[cos(1)+2,       0,       0],
#  [      0, cos(2)+4,       0],
#  [      0,       0, cos(3)+6]]
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

## Supported Operations

**Arithmetic:** `+`, `-`, `*`, `/`, `**`, `abs`, unary `-`/`+`

**Transcendentals (25):** `sin`, `cos`, `tan`, `exp`, `log`, `log2`, `log10`, `sqrt`, `arcsin`, `arccos`, `arctan`, `sinh`, `cosh`, `tanh`, `arcsinh`, `arccosh`, `arctanh`, `exp2`, `log1p`, `expm1`, `square`, `cbrt`, `sign`, `conjugate`, `negative`

**NumPy integration:** All of the above work as `np.sin(dual)`, `np.exp(dual)`, etc. — both on scalars and arrays. Array operations are batch-dispatched to C via `DualArray`, avoiding per-element Python overhead.

**Comparisons:** `<`, `<=`, `==`, `!=`, `>`, `>=` (compare primal values)

## API Reference

| Function | Description |
|----------|-------------|
| `Dual(value)` | Create an independent variable (seed) |
| `Dual(value, seed=False)` | Create a constant (no gradient) |
| `der(result, wrt)` | Partial derivative of result w.r.t. a seed |
| `seed_array(values)` | Array of independent seeds from floats |
| `val(array)` | Extract primal values from Dual array |
| `jac(results, seeds)` | Full Jacobian matrix |
| `autojac(fn)` | Decorator: `fn(*floats) -> (values, jacobian)` |
| `reset()` | Reset variable ID counter |

## Performance

All hot paths are in C. Overhead vs plain floats:

| Operation | Overhead |
|-----------|----------|
| Scalar arithmetic | 1.3-1.5x |
| Transcendentals | 1.2-1.7x |
| `np.sin(arr[10])` | ~4x |
| `np.sin(arr[100])` | ~8x |
| Jacobian (10x10) vs finite diff | **10x faster** |
| Jacobian (20x20) vs finite diff | **10x faster** |

## Test

```bash
pytest tests/ -v
```
