"""Type stubs for fastdual public API."""

from typing import Any, Callable, TypeVar

import numpy as np
import numpy.typing as npt

from ._fastdual import Dual as Dual
from ._hyperdual import HyperDual as HyperDual
from ._hessian import autohess as autohess

_F = TypeVar("_F", bound=Callable[..., Any])


def der(result: Dual | npt.NDArray[Any] | float, wrt: Dual) -> float | npt.NDArray[np.float64]: ...

def jac(results: npt.NDArray[Any] | list[Dual], seeds: list[Dual]) -> npt.NDArray[np.float64]: ...

def val(arr: npt.NDArray[Any] | list[Dual]) -> npt.NDArray[np.float64]: ...

def autojac(fnc: _F) -> Callable[..., tuple[npt.NDArray[np.float64], npt.NDArray[np.float64]]]: ...

def autohess(fnc: _F) -> Callable[..., tuple[float, npt.NDArray[np.float64]]]: ...
