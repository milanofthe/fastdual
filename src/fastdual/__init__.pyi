"""Type stubs for fastdual public API."""

from typing import Any, Callable, TypeVar, overload

import numpy as np
import numpy.typing as npt

from ._fastdual import Dual as Dual
from ._fastdual import reset as reset

_F = TypeVar("_F", bound=Callable[..., Any])


class DualArray(np.ndarray):
    """ndarray subclass with auto-seeding and ufunc dispatch for Duals."""

    __array_priority__: float

    @overload
    def __new__(cls, input_array: list[float] | list[int] | npt.NDArray[np.floating[Any]] | npt.NDArray[np.integer[Any]]) -> "DualArray": ...
    @overload
    def __new__(cls, input_array: list[Dual] | npt.NDArray[np.object_]) -> "DualArray": ...
    def __new__(cls, input_array: Any) -> "DualArray": ...

    def __array_finalize__(self, obj: Any) -> None: ...
    def __array_ufunc__(self, ufunc: Any, method: str, *inputs: Any, **kwargs: Any) -> Any: ...


def der(result: Dual | npt.NDArray[Any] | float, wrt: Dual) -> float | npt.NDArray[np.float64]: ...

def jac(results: npt.NDArray[Any] | list[Dual], seeds: list[Dual] | DualArray) -> npt.NDArray[np.float64]: ...

def seed_array(values: list[float] | tuple[float, ...] | npt.NDArray[Any]) -> DualArray:
    """.. deprecated:: 0.2.0 Use ``DualArray(values)`` instead."""
    ...

def val(arr: npt.NDArray[Any] | list[Dual]) -> npt.NDArray[np.float64]: ...

def autojac(fnc: _F) -> Callable[..., tuple[npt.NDArray[np.float64], npt.NDArray[np.float64]]]: ...
