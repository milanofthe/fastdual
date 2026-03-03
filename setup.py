import os
import sys
import numpy as np
from setuptools import setup, Extension

# Detect compiler: MSVC uses /O2, gcc/clang use -O3
# On Windows with MinGW, sys.platform is still "win32" so we check the
# compiler class at build time by deferring to an env-var or using no
# flags (setuptools will add its own optimisation flags).
# The --compiler=mingw32 flag or distutils.cfg can select MinGW.
# We keep it simple: don't pass compiler-specific optimisation flags,
# let the toolchain defaults apply. setuptools already passes -O for MinGW
# and /O2 for MSVC via its own logic.

setup(
    ext_modules=[
        Extension(
            "fastdual._fastdual",
            sources=["src/fastdual/_fastdual.c"],
            include_dirs=[np.get_include()],
        )
    ],
)
