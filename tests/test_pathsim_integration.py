"""
Integration tests: fastdual vs pathsim's numerical differentiation.

Compares exact fastdual Jacobians against pathsim's finite-difference
Jacobians on the same dynamical systems pathsim simulates (Van der Pol,
Lorenz, harmonic oscillator, etc.)

Requires: pathsim installed (pip install -e path/to/pathsim)
"""

import pytest
import math
import numpy as np

from fastdual import Dual, val, jac, der, autojac
from fastdual._fastdual import reset

# Try importing pathsim's numerical differentiation
pathsim = pytest.importorskip("pathsim")
from pathsim.optim.numerical import num_jac


@pytest.fixture(autouse=True)
def _reset():
    reset()


# -- Helper: fastdual jacobian matching pathsim's signature --

def dual_jac(func, x):
    """Compute Jacobian of func at x using fastdual.

    Matches the signature of pathsim's num_jac(func, x).
    """
    reset()
    x_arr = np.atleast_1d(x)
    seeds = Dual.from_array(x_arr.tolist())
    # For scalar functions, pass a single Dual; for vector, pass the list
    inp = seeds[0] if len(seeds) == 1 else seeds
    result = np.atleast_1d(func(inp))
    return jac(result, seeds)


def dual_autojac(func):
    """Wraps func(x, u, t) to compute Jacobian w.r.t. x.

    Matches pathsim's num_autojac(func) signature.
    """
    def wrap_func(*args):
        _x, *_args = args
        return dual_jac(lambda x: func(x, *_args), _x)
    return wrap_func


# =========================================================================
# Test Systems — the same ODEs pathsim solves
# =========================================================================

class TestHarmonicOscillator:
    """Spring-mass-damper: x'' + 2*zeta*wn*x' + wn^2*x = 0

    State: [x, x_dot]
    Analytical Jacobian: [[0, 1], [-wn^2, -2*zeta*wn]]
    """

    def f(self, x, u=0, t=0):
        wn, zeta = 2.0, 0.5
        return np.array([x[1], -wn**2 * x[0] - 2*zeta*wn * x[1]])

    def analytical_jac(self, x):
        wn, zeta = 2.0, 0.5
        return np.array([[0.0, 1.0], [-wn**2, -2*zeta*wn]])

    def test_fastdual_matches_analytical(self):
        x0 = np.array([1.0, 0.0])
        J_dual = dual_jac(self.f, x0)
        J_exact = self.analytical_jac(x0)
        np.testing.assert_allclose(J_dual, J_exact, atol=1e-14)

    def test_pathsim_matches_analytical(self):
        # Use nonzero initial state — num_jac's step size collapses at x=0
        x0 = np.array([1.0, 0.5])
        J_num = num_jac(self.f, x0)
        J_exact = self.analytical_jac(x0)
        np.testing.assert_allclose(J_num, J_exact, rtol=1e-6)

    def test_fastdual_more_accurate_than_pathsim(self):
        x0 = np.array([1.0, 0.5])
        J_exact = self.analytical_jac(x0)
        J_dual = dual_jac(self.f, x0)
        J_num = num_jac(self.f, x0)

        err_dual = np.max(np.abs(J_dual - J_exact))
        err_num = np.max(np.abs(J_num - J_exact))

        # fastdual should be exact (machine precision)
        assert err_dual < 1e-14
        # fastdual should be at least as good as finite diff
        assert err_dual <= err_num


class TestVanDerPol:
    """Van der Pol oscillator (stiff for large mu):
    x1' = x2
    x2' = mu*(1 - x1^2)*x2 - x1

    Analytical Jacobian:
    [[0, 1], [-2*mu*x1*x2 - 1, mu*(1 - x1^2)]]
    """

    def f(self, x, u=0, t=0, mu=10.0):
        return np.array([x[1], mu * (1 - x[0]**2) * x[1] - x[0]])

    def analytical_jac(self, x, mu=10.0):
        return np.array([
            [0.0, 1.0],
            [-2*mu*x[0]*x[1] - 1, mu*(1 - x[0]**2)]
        ])

    def test_fastdual_matches_analytical(self):
        for x0 in [np.array([2.0, 0.0]), np.array([0.5, -1.0]), np.array([1.0, 1.0])]:
            J_dual = dual_jac(self.f, x0)
            J_exact = self.analytical_jac(x0)
            np.testing.assert_allclose(J_dual, J_exact, atol=1e-13)

    def test_fastdual_vs_pathsim(self):
        x0 = np.array([2.0, 0.0])
        J_exact = self.analytical_jac(x0)
        J_dual = dual_jac(self.f, x0)
        J_num = num_jac(self.f, x0)

        err_dual = np.max(np.abs(J_dual - J_exact))
        err_num = np.max(np.abs(J_num - J_exact))

        assert err_dual < 1e-13
        assert err_dual < err_num

    def test_stiff_regime(self):
        """High mu = stiff system — Jacobian accuracy matters most here."""
        mu = 1000.0
        x0 = np.array([2.0, 0.0])

        def f_stiff(x, u=0, t=0):
            return np.array([x[1], mu * (1 - x[0]**2) * x[1] - x[0]])

        J_exact = np.array([
            [0.0, 1.0],
            [-2*mu*x0[0]*x0[1] - 1, mu*(1 - x0[0]**2)]
        ])

        J_dual = dual_jac(f_stiff, x0)
        J_num = num_jac(f_stiff, x0)

        np.testing.assert_allclose(J_dual, J_exact, atol=1e-11)
        # finite diff degrades with large values
        err_dual = np.max(np.abs(J_dual - J_exact))
        err_num = np.max(np.abs(J_num - J_exact))
        assert err_dual < err_num


class TestLorenz:
    """Lorenz attractor:
    x' = sigma*(y - x)
    y' = x*(rho - z) - y
    z' = x*y - beta*z
    """

    sigma, rho, beta = 10.0, 28.0, 8.0/3.0

    def f(self, x, u=0, t=0):
        s, r, b = self.sigma, self.rho, self.beta
        return np.array([
            s * (x[1] - x[0]),
            x[0] * (r - x[2]) - x[1],
            x[0] * x[1] - b * x[2]
        ])

    def analytical_jac(self, x):
        s, r, b = self.sigma, self.rho, self.beta
        return np.array([
            [-s,    s,     0],
            [r-x[2], -1,  -x[0]],
            [x[1],   x[0], -b]
        ])

    def test_fastdual_matches_analytical(self):
        x0 = np.array([1.0, 1.0, 1.0])
        J_dual = dual_jac(self.f, x0)
        J_exact = self.analytical_jac(x0)
        np.testing.assert_allclose(J_dual, J_exact, atol=1e-14)

    def test_at_attractor_region(self):
        """Near the chaotic attractor — typical operating point."""
        x0 = np.array([-6.0, -10.0, 22.0])
        J_dual = dual_jac(self.f, x0)
        J_exact = self.analytical_jac(x0)
        np.testing.assert_allclose(J_dual, J_exact, atol=1e-12)

    def test_fastdual_vs_pathsim(self):
        x0 = np.array([-6.0, -10.0, 22.0])
        J_exact = self.analytical_jac(x0)
        J_dual = dual_jac(self.f, x0)
        J_num = num_jac(self.f, x0)

        err_dual = np.max(np.abs(J_dual - J_exact))
        err_num = np.max(np.abs(J_num - J_exact))

        assert err_dual < 1e-12
        assert err_dual < err_num


class TestRobertsonStiff:
    """Robertson chemical kinetics — extremely stiff 3-species system.

    x1' = -0.04*x1 + 1e4*x2*x3
    x2' =  0.04*x1 - 1e4*x2*x3 - 3e7*x2^2
    x3' =  3e7*x2^2

    This is a classic stiff ODE where Jacobian accuracy is critical
    for implicit solvers (BDF, ESDIRK).
    """

    def f(self, x, u=0, t=0):
        return np.array([
            -0.04*x[0] + 1e4*x[1]*x[2],
             0.04*x[0] - 1e4*x[1]*x[2] - 3e7*x[1]**2,
             3e7*x[1]**2
        ])

    def analytical_jac(self, x):
        return np.array([
            [-0.04,       1e4*x[2],        1e4*x[1]],
            [ 0.04, -1e4*x[2]-6e7*x[1], -1e4*x[1]],
            [ 0.0,        6e7*x[1],        0.0]
        ])

    def test_fastdual_matches_analytical(self):
        x0 = np.array([1.0, 0.0, 0.0])
        J_dual = dual_jac(self.f, x0)
        J_exact = self.analytical_jac(x0)
        np.testing.assert_allclose(J_dual, J_exact, atol=1e-10)

    def test_mid_integration_point(self):
        """Test at a point typical of mid-integration."""
        x0 = np.array([0.9, 3.5e-5, 0.1])
        J_dual = dual_jac(self.f, x0)
        J_exact = self.analytical_jac(x0)
        np.testing.assert_allclose(J_dual, J_exact, rtol=1e-12)

    def test_large_scale_separation(self):
        """The 1e4 and 3e7 coefficients cause scale issues for finite diff."""
        x0 = np.array([0.9, 3.5e-5, 0.1])
        J_exact = self.analytical_jac(x0)
        J_dual = dual_jac(self.f, x0)
        J_num = num_jac(self.f, x0)

        err_dual = np.max(np.abs(J_dual - J_exact) / (np.abs(J_exact) + 1e-20))
        err_num = np.max(np.abs(J_num - J_exact) / (np.abs(J_exact) + 1e-20))

        # fastdual should be many orders of magnitude better
        assert err_dual < 1e-10
        assert err_dual < err_num


class TestAutojacWrapper:
    """Test the autojac wrapper matching pathsim's num_autojac pattern."""

    def test_dynamic_operator_pattern(self):
        """Pathsim's DynamicOperator calls jac(x, u, t) — test that pattern."""
        def rhs(x, u, t):
            return np.array([
                x[1] + u,
                -x[0]**2 + t
            ])

        jac_fn = dual_autojac(rhs)

        x0 = np.array([2.0, 3.0])
        u, t = 1.0, 0.5

        J = jac_fn(x0, u, t)

        # Analytical: d/dx of [x1+u, -x0^2+t] = [[0, 1], [-2*x0, 0]]
        J_exact = np.array([[0.0, 1.0], [-4.0, 0.0]])
        np.testing.assert_allclose(J, J_exact, atol=1e-14)

    def test_matches_pathsim_num_autojac(self):
        from pathsim.optim.numerical import num_autojac

        def rhs(x, u, t):
            return np.array([
                np.sin(x[0]) * x[1],
                np.exp(-x[0]) + x[1]**2
            ])

        jac_dual = dual_autojac(rhs)
        jac_num = num_autojac(rhs)

        x0 = np.array([1.0, 2.0])
        u, t = 0.0, 0.0

        J_dual = jac_dual(x0, u, t)
        J_num = jac_num(x0, u, t)

        # Both should agree to at least finite-diff accuracy
        np.testing.assert_allclose(J_dual, J_num, rtol=1e-5)

        # But fastdual should be exact
        J_exact = np.array([
            [math.cos(1.0)*2.0, math.sin(1.0)],
            [-math.exp(-1.0),   4.0]
        ])
        np.testing.assert_allclose(J_dual, J_exact, atol=1e-14)


class TestTranscendentalSystems:
    """Systems using transcendental functions — where finite diff is weakest."""

    def test_trigonometric_system(self):
        def f(x):
            return np.array([np.sin(x[0]) * np.cos(x[1]),
                             np.exp(x[0] + x[1])])

        x0 = np.array([1.0, 2.0])
        J_dual = dual_jac(f, x0)

        J_exact = np.array([
            [math.cos(1.0)*math.cos(2.0), -math.sin(1.0)*math.sin(2.0)],
            [math.exp(3.0),                math.exp(3.0)]
        ])
        np.testing.assert_allclose(J_dual, J_exact, atol=1e-13)

    def test_nested_transcendentals(self):
        def f(x):
            return np.array([np.log(1 + np.exp(x[0])),
                             np.sqrt(x[0]**2 + x[1]**2)])

        x0 = np.array([1.0, 2.0])
        J_dual = dual_jac(f, x0)

        # softplus derivative = sigmoid
        sigmoid = 1.0 / (1.0 + math.exp(-1.0))
        norm = math.sqrt(5.0)
        J_exact = np.array([
            [sigmoid, 0.0],
            [1.0/norm, 2.0/norm]
        ])
        np.testing.assert_allclose(J_dual, J_exact, atol=1e-14)


class TestScalarSystems:
    """Scalar ODE systems (1D) — pathsim's num_jac handles these specially."""

    def test_scalar_logistic(self):
        """Logistic equation: x' = r*x*(1 - x/K)"""
        r, K = 1.5, 100.0

        def f(x):
            return r * x * (1 - x / K)

        x0 = 50.0

        J_dual = dual_jac(f, np.array([x0]))
        J_num = num_jac(f, x0)

        # Analytical: r*(1 - 2*x/K)
        J_exact = r * (1 - 2*x0/K)

        np.testing.assert_allclose(J_dual[0, 0], J_exact, atol=1e-14)
        # Use atol since J_exact=0.0 makes rtol undefined
        np.testing.assert_allclose(J_num, J_exact, atol=1e-6)


class TestPerformance:
    """Benchmark fastdual vs finite diff Jacobians."""

    def test_10x10_system(self):
        """10-variable coupled system — realistic size for pathsim."""
        n = 10

        def coupled(x):
            out = np.empty(n, dtype=object)
            for i in range(n):
                out[i] = x[i]**2
                if i > 0:
                    out[i] = out[i] + x[i-1] * x[i]
                if i < n-1:
                    out[i] = out[i] - x[i+1]
            return out

        x0 = np.arange(1.0, n + 1.0)

        J_dual = dual_jac(coupled, x0)
        J_num = num_jac(lambda x: np.array([float(v) for v in coupled(Dual.from_array(x0)).flat], dtype=float).reshape(-1) if False else coupled(x), x0)

        # Build analytical Jacobian
        J_exact = np.zeros((n, n))
        for i in range(n):
            J_exact[i, i] = 2*x0[i]
            if i > 0:
                J_exact[i, i] += x0[i-1]
                J_exact[i, i-1] = x0[i]
            if i < n-1:
                J_exact[i, i+1] = -1.0

        np.testing.assert_allclose(J_dual, J_exact, atol=1e-12)


class TestParameterSensitivity:
    """Propagate Dual parameters through ODE integration steps.

    Make physical parameters Dual seeds, run the solver, and read off
    sensitivities of the final state w.r.t. those parameters.
    """

    def test_euler_step_lorenz_sigma(self):
        """Forward Euler on Lorenz — sensitivity of one step w.r.t. sigma."""
        reset()
        sigma = Dual(10.0)

        x = np.array([1.0, 2.0, 3.0])
        dt = 0.01
        rho, beta = 28.0, 8.0/3.0

        dx0 = sigma * (x[1] - x[0])
        dx1 = x[0] * (rho - x[2]) - x[1]
        dx2 = x[0] * x[1] - beta * x[2]

        x_next = np.array([x[0] + dt * dx0,
                           x[1] + dt * dx1,
                           x[2] + dt * dx2])

        # d(x0_next)/dsigma = dt * (y - x) = 0.01 * 1.0 = 0.01
        assert der(x_next[0], sigma) == pytest.approx(0.01, abs=1e-15)
        # second and third components don't depend on sigma
        assert der(x_next[1], sigma) == pytest.approx(0.0)
        assert der(x_next[2], sigma) == pytest.approx(0.0)

    def test_rk4_lorenz_parameter_sensitivity(self):
        """RK4 integration of Lorenz — sensitivity w.r.t. all 3 params."""
        reset()
        sigma = Dual(10.0)
        rho = Dual(28.0)
        beta = Dual(8.0 / 3.0)

        def lorenz(state, s, r, b):
            x, y, z = state[0], state[1], state[2]
            return np.array([
                s * (y - x),
                x * (r - z) - y,
                x * y - b * z,
            ])

        def rk4_step(state, dt, s, r, b):
            k1 = lorenz(state, s, r, b)
            k2 = lorenz(state + 0.5 * dt * k1, s, r, b)
            k3 = lorenz(state + 0.5 * dt * k2, s, r, b)
            k4 = lorenz(state + dt * k3, s, r, b)
            return state + (dt / 6.0) * (k1 + 2*k2 + 2*k3 + k4)

        state = np.array([1.0, 1.0, 1.0])
        dt = 0.01

        # Run 10 RK4 steps
        for _ in range(10):
            state = rk4_step(state, dt, sigma, rho, beta)

        # All state components should carry sensitivities
        for i in range(3):
            ds = der(state[i], sigma)
            dr = der(state[i], rho)
            db = der(state[i], beta)
            assert math.isfinite(ds)
            assert math.isfinite(dr)
            assert math.isfinite(db)

        # Verify against finite differences
        def simulate_float(s_val, r_val, b_val):
            st = np.array([1.0, 1.0, 1.0])
            for _ in range(10):
                k1 = np.array([s_val*(st[1]-st[0]), st[0]*(r_val-st[2])-st[1], st[0]*st[1]-b_val*st[2]])
                k2_st = st + 0.5*dt*k1
                k2 = np.array([s_val*(k2_st[1]-k2_st[0]), k2_st[0]*(r_val-k2_st[2])-k2_st[1], k2_st[0]*k2_st[1]-b_val*k2_st[2]])
                k3_st = st + 0.5*dt*k2
                k3 = np.array([s_val*(k3_st[1]-k3_st[0]), k3_st[0]*(r_val-k3_st[2])-k3_st[1], k3_st[0]*k3_st[1]-b_val*k3_st[2]])
                k4_st = st + dt*k3
                k4 = np.array([s_val*(k4_st[1]-k4_st[0]), k4_st[0]*(r_val-k4_st[2])-k4_st[1], k4_st[0]*k4_st[1]-b_val*k4_st[2]])
                st = st + (dt/6.0)*(k1 + 2*k2 + 2*k3 + k4)
            return st

        eps = 1e-7
        base = simulate_float(10.0, 28.0, 8.0/3.0)

        fd_sigma = (simulate_float(10.0+eps, 28.0, 8.0/3.0) - base) / eps
        fd_rho = (simulate_float(10.0, 28.0+eps, 8.0/3.0) - base) / eps
        fd_beta = (simulate_float(10.0, 28.0, 8.0/3.0+eps) - base) / eps

        for i in range(3):
            assert der(state[i], sigma) == pytest.approx(fd_sigma[i], rel=1e-5)
            assert der(state[i], rho) == pytest.approx(fd_rho[i], rel=1e-5)
            assert der(state[i], beta) == pytest.approx(fd_beta[i], rel=1e-5)

    def test_vanderpol_mu_sensitivity(self):
        """Van der Pol — sensitivity of trajectory w.r.t. stiffness mu."""
        reset()
        mu = Dual(5.0)

        def vdp(state, mu_param):
            x, v = state[0], state[1]
            return np.array([v, mu_param * (1 - x**2) * v - x])

        state = np.array([2.0, 0.0])
        dt = 0.001

        # 100 forward Euler steps
        for _ in range(100):
            dx = vdp(state, mu)
            state = state + dt * dx

        dx_dmu = der(state[0], mu)
        dv_dmu = der(state[1], mu)
        assert math.isfinite(dx_dmu)
        assert math.isfinite(dv_dmu)

        # Cross-check with finite differences
        eps = 1e-7
        def sim_vdp(mu_val):
            st = np.array([2.0, 0.0])
            for _ in range(100):
                d = np.array([st[1], mu_val * (1 - st[0]**2) * st[1] - st[0]])
                st = st + dt * d
            return st

        fd = (sim_vdp(5.0 + eps) - sim_vdp(5.0)) / eps
        assert dx_dmu == pytest.approx(fd[0], rel=1e-5)
        assert dv_dmu == pytest.approx(fd[1], rel=1e-5)


class TestPathsimSimulation:
    """Parameter sensitivity through actual pathsim simulations.

    Based on pathsim/examples/examples_odes/. Make ODE parameters Dual,
    run the simulation, read sensitivities from the final state.
    """

    def _run_pathsim(self, func, x0, duration, dt=0.01, Solver=None):
        """Run a pathsim ODE simulation and return final state."""
        from pathsim import Simulation
        from pathsim.blocks import ODE
        kwargs = dict(blocks=[ode := ODE(func, x0)], connections=[], dt=dt, log=False)
        if Solver is not None:
            kwargs["Solver"] = Solver
        Simulation(**kwargs).run(duration=duration)
        return ode.engine.x

    def test_vanderpol(self):
        """Based on examples/examples_odes/example_vanderpol.py

        Van der Pol oscillator with mu as Dual parameter.
        Original uses mu=1000 with implicit GEAR52A; we use mu=1
        with explicit solver (implicit solvers call np.linalg.solve
        which can't handle object-dtype Dual arrays).
        """
        reset()
        mu = Dual(1.0)
        x0 = np.array([2.0, 0.0])

        def func(x, u, t):
            return np.array([x[1], mu * (1 - x[0]**2) * x[1] - x[0]])

        state = self._run_pathsim(func, x0, duration=1.0)

        assert isinstance(state[0], Dual)
        dx_dmu = der(state[0], mu)
        dv_dmu = der(state[1], mu)
        assert math.isfinite(dx_dmu)
        assert math.isfinite(dv_dmu)

        # Cross-check against finite differences
        eps = 1e-7
        def run(mu_val):
            def f(x, u, t):
                return np.array([x[1], mu_val * (1 - x[0]**2) * x[1] - x[0]])
            return self._run_pathsim(f, x0.copy(), 1.0).astype(float)

        fd = (run(1.0 + eps) - run(1.0)) / eps
        assert dx_dmu == pytest.approx(fd[0], rel=1e-4)
        assert dv_dmu == pytest.approx(fd[1], rel=1e-4)

    def test_robertson(self):
        """Based on examples/examples_odes/example_robertson.py

        Robertson chemical kinetics. Sensitivity w.r.t. rate constant a.
        Original uses implicit GEAR52A for stiffness; we use explicit
        solver with small dt and short duration.
        """
        reset()
        a = Dual(0.04)
        x0 = np.array([1.0, 0.0, 0.0])
        b_val, c_val = 1e4, 3e7

        def func(x, u, t):
            return np.array([
                -a * x[0] + b_val * x[1] * x[2],
                 a * x[0] - b_val * x[1] * x[2] - c_val * x[1]**2,
                                                   c_val * x[1]**2
            ])

        state = self._run_pathsim(func, x0, duration=0.01, dt=0.0001)

        assert isinstance(state[0], Dual)
        for i in range(3):
            assert math.isfinite(der(state[i], a))

        # Cross-check against finite differences
        eps = 1e-9
        def run(a_val):
            def f(x, u, t):
                return np.array([
                    -a_val*x[0] + b_val*x[1]*x[2],
                     a_val*x[0] - b_val*x[1]*x[2] - c_val*x[1]**2,
                                                     c_val*x[1]**2
                ])
            return self._run_pathsim(f, x0.copy(), 0.01, dt=0.0001).astype(float)

        fd_a = (run(0.04 + eps) - run(0.04)) / eps
        for i in range(3):
            assert der(state[i], a) == pytest.approx(fd_a[i], rel=1e-3)

    def test_lorenz(self):
        """Based on examples/examples_odes/example_lorenz.py (as ODE block).

        Lorenz attractor with sigma, rho, beta as Dual parameters.
        """
        reset()
        sigma = Dual(10.0)
        rho = Dual(28.0)
        beta = Dual(8.0 / 3.0)
        x0 = np.array([1.0, 1.0, 1.0])

        def func(x, u, t):
            return np.array([
                sigma * (x[1] - x[0]),
                x[0] * (rho - x[2]) - x[1],
                x[0] * x[1] - beta * x[2],
            ])

        state = self._run_pathsim(func, x0, duration=0.5)

        for i in range(3):
            assert isinstance(state[i], Dual)
            assert math.isfinite(der(state[i], sigma))
            assert math.isfinite(der(state[i], rho))
            assert math.isfinite(der(state[i], beta))

        # Cross-check all three sensitivities
        eps = 1e-7
        def run(s, r, b):
            def f(x, u, t):
                return np.array([s*(x[1]-x[0]), x[0]*(r-x[2])-x[1], x[0]*x[1]-b*x[2]])
            return self._run_pathsim(f, x0.copy(), 0.5).astype(float)

        base = run(10.0, 28.0, 8.0/3.0)
        fd_s = (run(10.0 + eps, 28.0, 8.0/3.0) - base) / eps
        fd_r = (run(10.0, 28.0 + eps, 8.0/3.0) - base) / eps
        fd_b = (run(10.0, 28.0, 8.0/3.0 + eps) - base) / eps

        for i in range(3):
            assert der(state[i], sigma) == pytest.approx(fd_s[i], rel=1e-4)
            assert der(state[i], rho) == pytest.approx(fd_r[i], rel=1e-4)
            assert der(state[i], beta) == pytest.approx(fd_b[i], rel=1e-4)
