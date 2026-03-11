"""Generate benchmark bar charts for README with transparent background and grey axes.

Usage:
    python scripts/generate_charts.py                    # from bench_output.json
    python scripts/generate_charts.py bench_output.json  # explicit path
"""

import json
import sys
import os
import pathlib

import matplotlib.pyplot as plt
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS_DIR = ROOT / "assets"
ASSETS_DIR.mkdir(exist_ok=True)

GREY = "#888888"
ACCENT = "#4A90D9"
ACCENT2 = "#D94A4A"
DPI = 150


def style_ax(ax):
    ax.set_facecolor("none")
    ax.figure.set_facecolor("none")
    for spine in ax.spines.values():
        spine.set_color(GREY)
    ax.tick_params(colors=GREY, which="both")
    ax.xaxis.label.set_color(GREY)
    ax.yaxis.label.set_color(GREY)
    ax.title.set_color(GREY)
    ax.grid(axis="x", color=GREY, alpha=0.2, linewidth=0.5)


def save(fig, name):
    fig.savefig(
        str(ASSETS_DIR / name),
        dpi=DPI,
        transparent=True,
        bbox_inches="tight",
        pad_inches=0.15,
    )
    plt.close(fig)
    print(f"  saved {name}")


def to_ns(seconds):
    return seconds * 1e9


def to_us(seconds):
    return seconds * 1e6


def paired_barh(labels, values_a, values_b, label_a, label_b, xlabel, title, name,
                color_a=ACCENT, color_b=GREY, alpha_b=0.5, speedup=False, figheight=None):
    """Generic horizontal paired bar chart."""
    n = len(labels)
    if figheight is None:
        figheight = max(2, 0.6 * n + 0.8)
    y = np.arange(n)
    h = 0.35

    fig, ax = plt.subplots(figsize=(7, figheight))
    bars_b = ax.barh(y + h / 2, values_b, h, label=label_b, color=color_b, alpha=alpha_b)
    bars_a = ax.barh(y - h / 2, values_a, h, label=label_a, color=color_a)

    if speedup:
        xmax = max(max(values_a), max(values_b))
        for i, (va, vb) in enumerate(zip(values_a, values_b)):
            bigger = max(va, vb)
            ratio = vb / va if va > 0 else 0
            ax.text(bigger + xmax * 0.02, i, f"{ratio:.1f}\u00d7",
                    va="center", color=GREY, fontsize=9)

    ax.set_yticks(y)
    ax.set_yticklabels(labels, color=GREY)
    ax.set_xlabel(xlabel)
    ax.set_title(title)
    ax.legend(frameon=False, labelcolor=GREY)
    ax.invert_yaxis()
    style_ax(ax)
    save(fig, name)


def generate_charts(times):
    """Generate all benchmark charts from a times dict {bench_name: median_seconds}."""

    # 1. Dual overhead vs float
    overhead_ops = [
        ("add", "test_scalar_add", "test_float_add"),
        ("mul", "test_scalar_mul", "test_float_mul"),
        ("pow", "test_scalar_pow", "test_float_pow"),
        ("sin", "test_sin", "test_float_sin"),
        ("exp", "test_exp", "test_float_exp"),
        ("log", "test_log", "test_float_log"),
    ]
    labels, dual_ns, float_ns = [], [], []
    for label, d_key, f_key in overhead_ops:
        if d_key in times and f_key in times:
            labels.append(label)
            dual_ns.append(to_ns(times[d_key]))
            float_ns.append(to_ns(times[f_key]))
    if labels:
        paired_barh(labels, dual_ns, float_ns, "Dual", "float",
                     "Time (ns)", "Dual vs float — scalar operations",
                     "bench_dual_overhead.png", figheight=3)

    # 2. HyperDual overhead vs float
    hd_ops = [
        ("add", "test_hd_scalar_add", "test_float_add"),
        ("mul", "test_hd_scalar_mul", "test_float_mul"),
        ("sin", "test_hd_sin", "test_float_sin"),
        ("exp", "test_hd_exp", "test_float_exp"),
    ]
    labels, hd_ns, float_ns = [], [], []
    for label, h_key, f_key in hd_ops:
        if h_key in times and f_key in times:
            labels.append(label)
            hd_ns.append(to_ns(times[h_key]))
            float_ns.append(to_ns(times[f_key]))
    if labels:
        paired_barh(labels, hd_ns, float_ns, "HyperDual", "float",
                     "Time (ns)", "HyperDual vs float — scalar operations",
                     "bench_hyperdual_overhead.png", figheight=2.4)

    # 3. Jacobian: fastdual vs finite differences
    jac_items = [
        ("10\u00d710", "test_jac_fastdual_10", "test_jac_findiff_10"),
        ("20\u00d720", "test_jac_fastdual_20", "test_jac_findiff_20"),
    ]
    labels, fd_us, findiff_us = [], [], []
    for label, fd_key, fi_key in jac_items:
        if fd_key in times and fi_key in times:
            labels.append(label)
            fd_us.append(to_us(times[fd_key]))
            findiff_us.append(to_us(times[fi_key]))
    if labels:
        paired_barh(labels, fd_us, findiff_us, "fastdual", "finite diff.",
                     "Time (\u03bcs)", "Jacobian — fastdual vs finite differences",
                     "bench_jacobian.png", color_b=ACCENT2, alpha_b=0.7,
                     speedup=True, figheight=2)

    # 4. Hessian: fastdual vs finite differences
    hess_items = [
        ("5\u00d75", "test_hessian_5", "test_hessian_findiff_5"),
        ("10\u00d710", "test_hessian_10", "test_hessian_findiff_10"),
        ("20\u00d720", "test_hessian_20", "test_hessian_findiff_20"),
    ]
    labels, fd_us, findiff_us = [], [], []
    for label, fd_key, fi_key in hess_items:
        if fd_key in times and fi_key in times:
            labels.append(label)
            fd_us.append(to_us(times[fd_key]))
            findiff_us.append(to_us(times[fi_key]))
    if labels:
        paired_barh(labels, fd_us, findiff_us, "fastdual", "finite diff.",
                     "Time (\u03bcs)", "Hessian — fastdual vs finite differences",
                     "bench_hessian.png", color_b=ACCENT2, alpha_b=0.7,
                     speedup=True, figheight=2.4)

    # 5. Gradient vs Hessian
    gvh_items = [
        ("n=5", "test_gradient_5", "test_hessian_5"),
        ("n=10", "test_gradient_10", "test_hessian_10"),
        ("n=20", "test_gradient_20", "test_hessian_20"),
    ]
    labels, grad_us, hess_us = [], [], []
    for label, g_key, h_key in gvh_items:
        if g_key in times and h_key in times:
            labels.append(label)
            grad_us.append(to_us(times[g_key]))
            hess_us.append(to_us(times[h_key]))
    if labels:
        paired_barh(labels, grad_us, hess_us, "Gradient (Dual)", "Hessian (HyperDual)",
                     "Time (\u03bcs)", "Gradient vs Hessian cost",
                     "bench_grad_vs_hess.png", color_b=ACCENT2, alpha_b=0.7,
                     speedup=True, figheight=2.4)


def main():
    if len(sys.argv) > 1:
        json_path = sys.argv[1]
    else:
        json_path = str(ROOT / "bench_output.json")

    with open(json_path) as f:
        data = json.load(f)

    times = {}
    for bench in data["benchmarks"]:
        times[bench["name"]] = bench["stats"]["median"]

    print("Generating benchmark charts...")
    generate_charts(times)
    print("Done.")


if __name__ == "__main__":
    main()
