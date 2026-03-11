#!/usr/bin/env python
"""Run benchmarks and patch the results into README.md between markers.

Usage:
    python scripts/update_readme_benchmarks.py

Expects pytest-benchmark to be installed.
"""

import json
import subprocess
import sys
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
README = ROOT / "README.md"
BENCH_JSON = ROOT / "bench_output.json"

# Benchmark groups and display names
COMPARISON_BENCHMARKS = {
    "Jacobian 10x10": {
        "fastdual": "test_jac_fastdual_10",
        "findiff": "test_jac_findiff_10",
    },
    "Jacobian 20x20": {
        "fastdual": "test_jac_fastdual_20",
        "findiff": "test_jac_findiff_20",
    },
}

HESSIAN_BENCHMARKS = {
    "Hessian 5x5": {
        "fastdual": "test_hessian_5",
        "findiff": "test_hessian_findiff_5",
    },
    "Hessian 10x10": {
        "fastdual": "test_hessian_10",
        "findiff": "test_hessian_findiff_10",
    },
    "Hessian 20x20": {
        "fastdual": "test_hessian_20",
        "findiff": "test_hessian_findiff_20",
    },
}

OVERHEAD_BENCHMARKS = {
    "Scalar add": {"dual": "test_scalar_add", "float": "test_float_add"},
    "Scalar mul": {"dual": "test_scalar_mul", "float": "test_float_mul"},
    "Scalar pow": {"dual": "test_scalar_pow", "float": "test_float_pow"},
    "sin": {"dual": "test_sin", "float": "test_float_sin"},
    "exp": {"dual": "test_exp", "float": "test_float_exp"},
    "log": {"dual": "test_log", "float": "test_float_log"},
}

HDOVERHEAD_BENCHMARKS = {
    "Scalar add": {"hd": "test_hd_scalar_add", "float": "test_float_add"},
    "Scalar mul": {"hd": "test_hd_scalar_mul", "float": "test_float_mul"},
    "sin": {"hd": "test_hd_sin", "float": "test_float_sin"},
    "exp": {"hd": "test_hd_exp", "float": "test_float_exp"},
}

GRAD_VS_HESS_BENCHMARKS = {
    "5 variables": {
        "gradient": "test_gradient_5",
        "hessian": "test_hessian_5",
    },
    "10 variables": {
        "gradient": "test_gradient_10",
        "hessian": "test_hessian_10",
    },
    "20 variables": {
        "gradient": "test_gradient_20",
        "hessian": "test_hessian_20",
    },
}


def run_benchmarks():
    """Run pytest-benchmark and return JSON results."""
    cmd = [
        sys.executable, "-m", "pytest",
        "tests/test_benchmark.py",
        "--benchmark-only",
        "--benchmark-json", str(BENCH_JSON),
        "-q",
    ]
    subprocess.run(cmd, cwd=str(ROOT), check=True)
    with open(BENCH_JSON) as f:
        return json.load(f)


def extract_times(data):
    """Map benchmark name -> median time in seconds."""
    times = {}
    for bench in data["benchmarks"]:
        name = bench["name"]
        times[name] = bench["stats"]["median"]
    return times


def format_time(seconds):
    """Format time with appropriate unit."""
    if seconds < 1e-6:
        return f"{seconds * 1e9:.0f} ns"
    elif seconds < 1e-3:
        return f"{seconds * 1e6:.1f} us"
    elif seconds < 1:
        return f"{seconds * 1e3:.1f} ms"
    return f"{seconds:.2f} s"


def build_speedup_table(times, benchmarks, header_cols):
    """Build a comparison table with speedup column."""
    col1, col2 = header_cols
    lines = [
        f"| Benchmark | {col1} | {col2} | speedup |",
        f"|-----------|{'---|' * 3}",
    ]
    for label, keys in benchmarks.items():
        names = list(keys.keys())
        t_fast = times.get(keys[names[0]])
        t_base = times.get(keys[names[1]])
        if t_fast is None or t_base is None:
            continue
        speedup = t_base / t_fast
        if speedup >= 1:
            sp_str = f"**{speedup:.1f}x faster**"
        else:
            sp_str = f"{1/speedup:.1f}x slower"
        lines.append(
            f"| {label} | {format_time(t_fast)} | {format_time(t_base)} | {sp_str} |"
        )
    return "\n".join(lines)


def build_overhead_table(times):
    """Build the overhead table with relative cost vs plain floats."""
    lines = [
        "| Operation | Dual | float | overhead |",
        "|-----------|------|-------|----------|",
    ]
    for label, keys in OVERHEAD_BENCHMARKS.items():
        t_dual = times.get(keys["dual"])
        t_float = times.get(keys["float"])
        if t_dual is None or t_float is None:
            continue
        ratio = t_dual / t_float
        lines.append(
            f"| {label} | {format_time(t_dual)} | {format_time(t_float)} | {ratio:.1f}x |"
        )
    return "\n".join(lines)


def build_hd_overhead_table(times):
    """Build the HyperDual overhead table vs float."""
    lines = [
        "| Operation | HyperDual | float | overhead |",
        "|-----------|-----------|-------|----------|",
    ]
    for label, keys in HDOVERHEAD_BENCHMARKS.items():
        t_hd = times.get(keys["hd"])
        t_float = times.get(keys["float"])
        if t_hd is None or t_float is None:
            continue
        ratio = t_hd / t_float
        lines.append(
            f"| {label} | {format_time(t_hd)} | {format_time(t_float)} | {ratio:.1f}x |"
        )
    return "\n".join(lines)


def build_grad_vs_hess_table(times):
    """Build the gradient vs hessian comparison table."""
    lines = [
        "| Size | Gradient (Dual) | Hessian (HyperDual) | ratio |",
        "|------|-----------------|---------------------|-------|",
    ]
    for label, keys in GRAD_VS_HESS_BENCHMARKS.items():
        t_grad = times.get(keys["gradient"])
        t_hess = times.get(keys["hessian"])
        if t_grad is None or t_hess is None:
            continue
        ratio = t_hess / t_grad
        lines.append(
            f"| {label} | {format_time(t_grad)} | {format_time(t_hess)} | {ratio:.1f}x |"
        )
    return "\n".join(lines)


def patch_section(text, marker, content):
    """Replace content between <!-- BENCH:marker:START --> and <!-- BENCH:marker:END -->."""
    return re.sub(
        rf"(<!-- BENCH:{marker}:START -->).*?(<!-- BENCH:{marker}:END -->)",
        rf"\1\n{content}\n\2",
        text,
        flags=re.DOTALL,
    )


def patch_readme(times):
    """Replace all benchmark sections in README.md."""
    text = README.read_text(encoding="utf-8")

    text = patch_section(text, "OVERHEAD", build_overhead_table(times))
    text = patch_section(text, "HDOVERHEAD", build_hd_overhead_table(times))
    text = patch_section(text, "COMPARISON",
                         build_speedup_table(times, COMPARISON_BENCHMARKS,
                                             ("fastdual", "fin. diff.")))
    text = patch_section(text, "HESSIAN",
                         build_speedup_table(times, HESSIAN_BENCHMARKS,
                                             ("fastdual", "fin. diff.")))
    text = patch_section(text, "GRADVSHESS", build_grad_vs_hess_table(times))

    README.write_text(text, encoding="utf-8")


def main():
    print("Running benchmarks...")
    data = run_benchmarks()
    times = extract_times(data)

    print("Patching README.md...")
    patch_readme(times)

    print("Generating charts...")
    from generate_charts import generate_charts
    generate_charts(times)

    # Cleanup
    BENCH_JSON.unlink(missing_ok=True)
    print("Done.")


if __name__ == "__main__":
    main()
