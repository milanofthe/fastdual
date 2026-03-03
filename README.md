# dualnum

Fast forward-mode automatic differentiation via dual numbers, implemented as a CPython C extension.

## Install

```bash
pip install -e .[test]
```

## Usage

```python
from dualnum import Dual, der, jac, seed_array, val
import numpy as np

# Create independent variables (seeds)
x = Dual(3.0)
y = Dual(5.0)

# Compute — gradients propagate automatically
z = x * y + x
print(z)          # Dual(18.0)
print(der(z, x))  # 6.0  (dz/dx = y + 1)
print(der(z, y))  # 3.0  (dz/dy = x)

# Works with numpy
arr = seed_array([1.0, 2.0, 3.0])
result = np.sin(arr)
print(val(result))  # [sin(1), sin(2), sin(3)]
```

## Test

```bash
pytest tests/ -v
```
