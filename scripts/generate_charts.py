"""Generate benchmark bar charts for README with transparent background and grey axes."""

import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np
import os

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "..", "assets")
os.makedirs(ASSETS_DIR, exist_ok=True)

GREY = "#888888"
LIGHT_GREY = "#555555"
ACCENT = "#4A90D9"
ACCENT2 = "#D94A4A"
DPI = 150


def style_ax(ax):
    """Apply transparent/grey styling to axes."""
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
        os.path.join(ASSETS_DIR, name),
        dpi=DPI,
        transparent=True,
        bbox_inches="tight",
        pad_inches=0.15,
    )
    plt.close(fig)
    print(f"  saved {name}")


# ---------------------------------------------------------------------------
# 1. Dual overhead vs float
# ---------------------------------------------------------------------------
def chart_overhead():
    ops =    ["add", "mul", "pow", "sin", "exp", "log"]
    dual =   [112,   110,   160,   131,   130,   121]
    floats = [86,    86,    112,   113,   106,   109]

    y = np.arange(len(ops))
    h = 0.35

    fig, ax = plt.subplots(figsize=(7, 3))
    ax.barh(y + h/2, floats, h, label="float", color=GREY, alpha=0.5)
    ax.barh(y - h/2, dual, h, label="Dual", color=ACCENT)

    ax.set_yticks(y)
    ax.set_yticklabels(ops, color=GREY)
    ax.set_xlabel("Time (ns)")
    ax.set_title("Dual vs float — scalar operations")
    ax.legend(frameon=False, labelcolor=GREY)
    ax.invert_yaxis()
    style_ax(ax)
    save(fig, "bench_dual_overhead.png")


# ---------------------------------------------------------------------------
# 2. HyperDual overhead vs float
# ---------------------------------------------------------------------------
def chart_hd_overhead():
    ops =    ["add", "mul", "sin", "exp"]
    hd =     [82,    85,    100,   91]
    floats = [86,    86,    113,   106]

    y = np.arange(len(ops))
    h = 0.35

    fig, ax = plt.subplots(figsize=(7, 2.4))
    ax.barh(y + h/2, floats, h, label="float", color=GREY, alpha=0.5)
    ax.barh(y - h/2, hd, h, label="HyperDual", color=ACCENT)

    ax.set_yticks(y)
    ax.set_yticklabels(ops, color=GREY)
    ax.set_xlabel("Time (ns)")
    ax.set_title("HyperDual vs float — scalar operations")
    ax.legend(frameon=False, labelcolor=GREY)
    ax.invert_yaxis()
    style_ax(ax)
    save(fig, "bench_hyperdual_overhead.png")


# ---------------------------------------------------------------------------
# 3. Jacobian: fastdual vs finite differences
# ---------------------------------------------------------------------------
def chart_jacobian():
    labels = ["10×10", "20×20"]
    fd =     [12.2,    32.8]
    findiff = [74.5,   216.1]

    y = np.arange(len(labels))
    h = 0.35

    fig, ax = plt.subplots(figsize=(7, 2))
    ax.barh(y + h/2, findiff, h, label="finite diff.", color=ACCENT2, alpha=0.7)
    ax.barh(y - h/2, fd, h, label="fastdual", color=ACCENT)

    # Add speedup labels
    for i, (f, d) in enumerate(zip(findiff, fd)):
        ax.text(f + 3, i + h/2, f"{f/d:.1f}×", va="center", color=GREY, fontsize=9)

    ax.set_yticks(y)
    ax.set_yticklabels(labels, color=GREY)
    ax.set_xlabel("Time (μs)")
    ax.set_title("Jacobian — fastdual vs finite differences")
    ax.legend(frameon=False, labelcolor=GREY)
    ax.invert_yaxis()
    style_ax(ax)
    save(fig, "bench_jacobian.png")


# ---------------------------------------------------------------------------
# 4. Hessian: fastdual vs finite differences
# ---------------------------------------------------------------------------
def chart_hessian():
    labels = ["5×5", "10×10", "20×20"]
    fd =     [12.8,   63.1,    416.4]
    findiff = [173.0, 871.4,   5100.0]

    y = np.arange(len(labels))
    h = 0.35

    fig, ax = plt.subplots(figsize=(7, 2.4))
    ax.barh(y + h/2, findiff, h, label="finite diff.", color=ACCENT2, alpha=0.7)
    ax.barh(y - h/2, fd, h, label="fastdual", color=ACCENT)

    for i, (f, d) in enumerate(zip(findiff, fd)):
        ax.text(f + 50, i + h/2, f"{f/d:.0f}×", va="center", color=GREY, fontsize=9)

    ax.set_yticks(y)
    ax.set_yticklabels(labels, color=GREY)
    ax.set_xlabel("Time (μs)")
    ax.set_title("Hessian — fastdual vs finite differences")
    ax.legend(frameon=False, labelcolor=GREY)
    ax.invert_yaxis()
    style_ax(ax)
    save(fig, "bench_hessian.png")


# ---------------------------------------------------------------------------
# 5. Gradient vs Hessian scaling
# ---------------------------------------------------------------------------
def chart_grad_vs_hess():
    sizes = ["5", "10", "20"]
    grad =  [5.9,   7.5,    11.5]
    hess =  [12.8,  63.1,   416.4]

    y = np.arange(len(sizes))
    h = 0.35

    fig, ax = plt.subplots(figsize=(7, 2.4))
    ax.barh(y + h/2, hess, h, label="Hessian (HyperDual)", color=ACCENT2, alpha=0.7)
    ax.barh(y - h/2, grad, h, label="Gradient (Dual)", color=ACCENT)

    for i, (he, gr) in enumerate(zip(hess, grad)):
        ax.text(he + 5, i + h/2, f"{he/gr:.1f}×", va="center", color=GREY, fontsize=9)

    ax.set_yticks(y)
    ax.set_yticklabels([f"n={s}" for s in sizes], color=GREY)
    ax.set_xlabel("Time (μs)")
    ax.set_title("Gradient vs Hessian cost")
    ax.legend(frameon=False, labelcolor=GREY)
    ax.invert_yaxis()
    style_ax(ax)
    save(fig, "bench_grad_vs_hess.png")


if __name__ == "__main__":
    print("Generating benchmark charts...")
    chart_overhead()
    chart_hd_overhead()
    chart_jacobian()
    chart_hessian()
    chart_grad_vs_hess()
    print("Done.")
