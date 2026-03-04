"""Tests for scipy.optimize integration."""

import pytest
import numpy as np

scipy = pytest.importorskip("scipy")

from fastdual import minimize, reset


@pytest.fixture(autouse=True)
def _reset():
    reset()


class TestMinimize:
    def test_rosenbrock(self):
        def rosenbrock(x):
            return (1.0 - x[0]) ** 2 + 100.0 * (x[1] - x[0] ** 2) ** 2

        result = minimize(rosenbrock, [0.0, 0.0])
        assert result.success
        np.testing.assert_allclose(result.x, [1.0, 1.0], atol=1e-5)

    def test_quadratic(self):
        def f(x):
            return x[0] ** 2 + x[1] ** 2

        result = minimize(f, [3.0, 4.0])
        assert result.success
        np.testing.assert_allclose(result.x, [0.0, 0.0], atol=1e-6)

    def test_shifted_quadratic(self):
        def f(x):
            return (x[0] - 2.0) ** 2 + (x[1] - 3.0) ** 2

        result = minimize(f, [0.0, 0.0])
        assert result.success
        np.testing.assert_allclose(result.x, [2.0, 3.0], atol=1e-6)

    def test_with_transcendentals(self):
        def f(x):
            return np.sin(x[0]) ** 2 + np.cos(x[1]) ** 2

        result = minimize(f, [1.0, 1.0])
        assert result.success
        # sin(x)=0 at x=0,pi,... and cos(y)=0 at y=pi/2,...
        assert result.fun < 1e-10

    def test_method_kwarg(self):
        def f(x):
            return x[0] ** 2 + x[1] ** 2

        result = minimize(f, [3.0, 4.0], method='L-BFGS-B')
        assert result.success
        np.testing.assert_allclose(result.x, [0.0, 0.0], atol=1e-6)

    def test_higher_dimensional(self):
        def f(x):
            return np.sum(x * x)

        x0 = np.ones(10)
        result = minimize(f, x0)
        assert result.success
        np.testing.assert_allclose(result.x, np.zeros(10), atol=1e-5)
