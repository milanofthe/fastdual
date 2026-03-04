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

OVERHEAD_BENCHMARKS = {
    "Scalar add": {"dual": "test_scalar_add", "float": "test_float_add"},
    "Scalar mul": {"dual": "test_scalar_mul", "float": "test_float_mul"},
    "Scalar pow": {"dual": "test_scalar_pow", "float": "test_float_pow"},
    "sin": {"dual": "test_sin", "float": "test_float_sin"},
    "exp": {"dual": "test_exp", "float": "test_float_exp"},
    "log": {"dual": "test_log", "float": "test_float_log"},
    "np.sin (10)": {"dual": "test_np_sin_array_10", "float": "test_float_np_sin_array_10"},
    "np.sin (100)": {"dual": "test_np_sin_array_100", "float": "test_float_np_sin_array_100"},
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


def build_comparison_table(times):
    """Build the comparison markdown table."""
    lines = [
        "| Benchmark | fastdual | baseline | speedup |",
        "|-----------|----------|----------|---------|",
    ]
    for label, keys in COMPARISON_BENCHMARKS.items():
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


def patch_readme(comparison_table, overhead_table):
    """Replace content between markers in README.md."""
    text = README.read_text(encoding="utf-8")

    # Patch comparison table
    text = re.sub(
        r"(<!-- BENCH:COMPARISON:START -->).*?(<!-- BENCH:COMPARISON:END -->)",
        rf"\1\n{comparison_table}\n\2",
        text,
        flags=re.DOTALL,
    )

    # Patch overhead table
    text = re.sub(
        r"(<!-- BENCH:OVERHEAD:START -->).*?(<!-- BENCH:OVERHEAD:END -->)",
        rf"\1\n{overhead_table}\n\2",
        text,
        flags=re.DOTALL,
    )

    README.write_text(text, encoding="utf-8")


def main():
    print("Running benchmarks...")
    data = run_benchmarks()
    times = extract_times(data)

    print("Building tables...")
    comparison = build_comparison_table(times)
    overhead = build_overhead_table(times)

    print("Patching README.md...")
    patch_readme(comparison, overhead)

    # Cleanup
    BENCH_JSON.unlink(missing_ok=True)
    print("Done.")


if __name__ == "__main__":
    main()
