"""Mapping from numpy ufunc names to Dual method names.

Used by __array_ufunc__ dispatch in the C extension.
This module exists as a reference; the actual dispatch is in C for speed.
"""

UNARY_UFUNCS = {
    "sin":       "sin",
    "cos":       "cos",
    "tan":       "tan",
    "exp":       "exp",
    "log":       "log",
    "log2":      "log2",
    "log10":     "log10",
    "sqrt":      "sqrt",
    "arcsin":    "arcsin",
    "arccos":    "arccos",
    "arctan":    "arctan",
    "sinh":      "sinh",
    "cosh":      "cosh",
    "tanh":      "tanh",
    "arcsinh":   "arcsinh",
    "arccosh":   "arccosh",
    "arctanh":   "arctanh",
    "exp2":      "exp2",
    "log1p":     "log1p",
    "expm1":     "expm1",
    "square":    "square",
    "cbrt":      "cbrt",
    "sign":      "sign",
    "absolute":  "__abs__",
    "negative":  "__neg__",
    "positive":  "__pos__",
    "conjugate": "conjugate",
}

BINARY_UFUNCS = {
    "add":          "__add__",
    "subtract":     "__sub__",
    "multiply":     "__mul__",
    "true_divide":  "__truediv__",
    "divide":       "__truediv__",
    "power":        "__pow__",
}
