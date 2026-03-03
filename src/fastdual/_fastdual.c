#define PY_SSIZE_T_CLEAN
#include <Python.h>
#include <structmember.h>
#include <math.h>
#include <string.h>

/* Python 3.10/3.11 compat — these were added in 3.12 */
#ifndef Py_T_DOUBLE
#define Py_T_DOUBLE T_DOUBLE
#endif
#ifndef Py_T_INT
#define Py_T_INT T_INT
#endif
#ifndef Py_READONLY
#define Py_READONLY READONLY
#endif

#define NPY_NO_DEPRECATED_API NPY_1_7_API_VERSION
#include <numpy/arrayobject.h>

#ifdef _MSC_VER
#include <intrin.h>
#pragma intrinsic(_InterlockedIncrement)
static volatile long g_next_var_id = 0;
static inline int32_t next_var_id(void) {
    return (int32_t)_InterlockedIncrement(&g_next_var_id) - 1;
}
static inline void reset_var_id(void) {
    _InterlockedExchange(&g_next_var_id, 0);
}
#else
#include <stdatomic.h>
static _Atomic int32_t g_next_var_id = 0;
static inline int32_t next_var_id(void) {
    return atomic_fetch_add(&g_next_var_id, 1);
}
static inline void reset_var_id(void) {
    atomic_store(&g_next_var_id, 0);
}
#endif

/* ======================================================================
 * SparseGrad — sorted sparse gradient vector
 * ====================================================================== */

#define GRAD_INLINE_CAP 8

typedef struct {
    int32_t  len, cap;
    int32_t *ids;
    double  *derivs;
    int32_t  inline_ids[GRAD_INLINE_CAP];
    double   inline_derivs[GRAD_INLINE_CAP];
} SparseGrad;

static inline void sg_init(SparseGrad *g) {
    g->len = 0;
    g->cap = GRAD_INLINE_CAP;
    g->ids = g->inline_ids;
    g->derivs = g->inline_derivs;
}

static void sg_dealloc(SparseGrad *g) {
    if (g->ids != g->inline_ids) {
        PyMem_Free(g->ids);
        PyMem_Free(g->derivs);
    }
    g->ids = NULL;
    g->derivs = NULL;
    g->len = g->cap = 0;
}

static int sg_ensure_capacity(SparseGrad *g, int32_t need) {
    if (need <= g->cap) return 0;
    int32_t newcap = g->cap;
    while (newcap < need) newcap *= 2;

    int32_t *new_ids = (int32_t *)PyMem_Malloc(newcap * sizeof(int32_t));
    double  *new_der = (double  *)PyMem_Malloc(newcap * sizeof(double));
    if (!new_ids || !new_der) {
        PyMem_Free(new_ids);
        PyMem_Free(new_der);
        PyErr_NoMemory();
        return -1;
    }
    if (g->len > 0) {
        memcpy(new_ids, g->ids, g->len * sizeof(int32_t));
        memcpy(new_der, g->derivs, g->len * sizeof(double));
    }
    if (g->ids != g->inline_ids) {
        PyMem_Free(g->ids);
        PyMem_Free(g->derivs);
    }
    g->ids = new_ids;
    g->derivs = new_der;
    g->cap = newcap;
    return 0;
}

static int sg_copy(SparseGrad *dst, const SparseGrad *src) {
    sg_init(dst);
    if (src->len == 0) return 0;
    if (sg_ensure_capacity(dst, src->len) < 0) return -1;
    memcpy(dst->ids, src->ids, src->len * sizeof(int32_t));
    memcpy(dst->derivs, src->derivs, src->len * sizeof(double));
    dst->len = src->len;
    return 0;
}

static int sg_init_seed(SparseGrad *g) {
    sg_init(g);
    g->len = 1;
    g->ids[0] = next_var_id();
    g->derivs[0] = 1.0;
    return 0;
}

/* Merge two sorted sparse grads: dst = a * scale_a + b * scale_b */
static int sg_merge(SparseGrad *dst, const SparseGrad *a, double sa,
                    const SparseGrad *b, double sb) {
    sg_init(dst);
    if (sg_ensure_capacity(dst, a->len + b->len) < 0) return -1;

    int32_t i = 0, j = 0, k = 0;
    while (i < a->len && j < b->len) {
        if (a->ids[i] < b->ids[j]) {
            double v = a->derivs[i] * sa;
            if (v != 0.0) { dst->ids[k] = a->ids[i]; dst->derivs[k] = v; k++; }
            i++;
        } else if (a->ids[i] > b->ids[j]) {
            double v = b->derivs[j] * sb;
            if (v != 0.0) { dst->ids[k] = b->ids[j]; dst->derivs[k] = v; k++; }
            j++;
        } else {
            double v = a->derivs[i] * sa + b->derivs[j] * sb;
            if (v != 0.0) { dst->ids[k] = a->ids[i]; dst->derivs[k] = v; k++; }
            i++; j++;
        }
    }
    while (i < a->len) {
        double v = a->derivs[i] * sa;
        if (v != 0.0) { dst->ids[k] = a->ids[i]; dst->derivs[k] = v; k++; }
        i++;
    }
    while (j < b->len) {
        double v = b->derivs[j] * sb;
        if (v != 0.0) { dst->ids[k] = b->ids[j]; dst->derivs[k] = v; k++; }
        j++;
    }
    dst->len = k;
    return 0;
}

/* Scale gradient in-place: g *= s */
static void sg_scale_inplace(SparseGrad *g, double s) {
    if (s == 0.0) { g->len = 0; return; }
    for (int32_t i = 0; i < g->len; i++)
        g->derivs[i] *= s;
}

/* Create a scaled copy: dst = src * s */
static int sg_scale(SparseGrad *dst, const SparseGrad *src, double s) {
    if (s == 0.0) { sg_init(dst); return 0; }
    if (sg_copy(dst, src) < 0) return -1;
    sg_scale_inplace(dst, s);
    return 0;
}

/* ======================================================================
 * PyDualObject
 * ====================================================================== */

typedef struct {
    PyObject_HEAD
    double     val;
    SparseGrad grad;
    int32_t    var_id;   /* -1 for derived/constant */
} PyDualObject;

static PyTypeObject PyDual_Type;  /* forward declaration */

#define PyDual_Check(op) PyObject_TypeCheck(op, &PyDual_Type)

static PyDualObject *PyDual_New(double val) {
    PyDualObject *self = (PyDualObject *)PyDual_Type.tp_alloc(&PyDual_Type, 0);
    if (!self) return NULL;
    self->val = val;
    sg_init(&self->grad);
    self->var_id = -1;
    return self;
}

/* Create a Dual with gradient = merge(a.grad * sa, b.grad * sb) */
static PyDualObject *PyDual_FromMerge(double val,
                                       const SparseGrad *a, double sa,
                                       const SparseGrad *b, double sb) {
    PyDualObject *r = PyDual_New(val);
    if (!r) return NULL;
    sg_dealloc(&r->grad);
    if (sg_merge(&r->grad, a, sa, b, sb) < 0) {
        Py_DECREF(r);
        return NULL;
    }
    return r;
}

/* Create a Dual with gradient = src.grad * s */
static PyDualObject *PyDual_FromScale(double val,
                                       const SparseGrad *src, double s) {
    PyDualObject *r = PyDual_New(val);
    if (!r) return NULL;
    sg_dealloc(&r->grad);
    if (sg_scale(&r->grad, src, s) < 0) {
        Py_DECREF(r);
        return NULL;
    }
    return r;
}

/* Extract double from PyObject (float, int, or Dual) */
static int as_double(PyObject *obj, double *out) {
    if (PyDual_Check(obj)) {
        *out = ((PyDualObject *)obj)->val;
        return 1;
    }
    if (PyFloat_Check(obj)) {
        *out = PyFloat_AS_DOUBLE(obj);
        return 1;
    }
    if (PyLong_Check(obj)) {
        *out = PyLong_AsDouble(obj);
        if (*out == -1.0 && PyErr_Occurred()) return 0;
        return 1;
    }
    /* numpy scalars, 0-d arrays, 1-element arrays via __float__ */
    {
        PyObject *flt = PyNumber_Float(obj);
        if (flt) {
            *out = PyFloat_AS_DOUBLE(flt);
            Py_DECREF(flt);
            return 1;
        }
        PyErr_Clear();
    }
    return 0;
}

/* ---- tp slots ---- */

static int Dual_init(PyDualObject *self, PyObject *args, PyObject *kwds) {
    static char *kwlist[] = {"value", "seed", NULL};
    double value = 0.0;
    int seed = 1;

    if (!PyArg_ParseTupleAndKeywords(args, kwds, "d|p", kwlist, &value, &seed))
        return -1;

    self->val = value;
    sg_dealloc(&self->grad);
    if (seed) {
        sg_init_seed(&self->grad);
        self->var_id = self->grad.ids[0];
    } else {
        sg_init(&self->grad);
        self->var_id = -1;
    }
    return 0;
}

static void Dual_dealloc(PyDualObject *self) {
    sg_dealloc(&self->grad);
    Py_TYPE(self)->tp_free((PyObject *)self);
}

static PyObject *Dual_repr(PyDualObject *self) {
    char buf[64];
    snprintf(buf, sizeof(buf), "Dual(%.17g)", self->val);
    return PyUnicode_FromString(buf);
}

static Py_hash_t Dual_hash(PyDualObject *self) {
    Py_hash_t h = _Py_HashDouble((PyObject *)self, self->val);
    return h;
}

static PyObject *Dual_richcompare(PyObject *a, PyObject *b, int op) {
    double va, vb;
    if (!as_double(a, &va) || !as_double(b, &vb))
        Py_RETURN_NOTIMPLEMENTED;

    int r;
    switch (op) {
        case Py_LT: r = va <  vb; break;
        case Py_LE: r = va <= vb; break;
        case Py_EQ: r = va == vb; break;
        case Py_NE: r = va != vb; break;
        case Py_GT: r = va >  vb; break;
        case Py_GE: r = va >= vb; break;
        default: Py_RETURN_NOTIMPLEMENTED;
    }
    if (r) Py_RETURN_TRUE;
    Py_RETURN_FALSE;
}

/* ---- Number protocol ---- */

static PyObject *Dual_add(PyObject *a, PyObject *b) {
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        return (PyObject *)PyDual_FromMerge(da->val + db->val,
                                             &da->grad, 1.0, &db->grad, 1.0);
    }
    if (a_dual && as_double(b, &vb)) {
        PyDualObject *da = (PyDualObject *)a;
        return (PyObject *)PyDual_FromScale(da->val + vb, &da->grad, 1.0);
    }
    if (b_dual && as_double(a, &va)) {
        PyDualObject *db = (PyDualObject *)b;
        return (PyObject *)PyDual_FromScale(va + db->val, &db->grad, 1.0);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_sub(PyObject *a, PyObject *b) {
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        return (PyObject *)PyDual_FromMerge(da->val - db->val,
                                             &da->grad, 1.0, &db->grad, -1.0);
    }
    if (a_dual && as_double(b, &vb)) {
        PyDualObject *da = (PyDualObject *)a;
        return (PyObject *)PyDual_FromScale(da->val - vb, &da->grad, 1.0);
    }
    if (b_dual && as_double(a, &va)) {
        PyDualObject *db = (PyDualObject *)b;
        return (PyObject *)PyDual_FromScale(va - db->val, &db->grad, -1.0);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_mul(PyObject *a, PyObject *b) {
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        /* d(u*v) = u'*v + u*v' */
        return (PyObject *)PyDual_FromMerge(da->val * db->val,
                                             &da->grad, db->val,
                                             &db->grad, da->val);
    }
    if (a_dual && as_double(b, &vb)) {
        PyDualObject *da = (PyDualObject *)a;
        return (PyObject *)PyDual_FromScale(da->val * vb, &da->grad, vb);
    }
    if (b_dual && as_double(a, &va)) {
        PyDualObject *db = (PyDualObject *)b;
        return (PyObject *)PyDual_FromScale(va * db->val, &db->grad, va);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_truediv(PyObject *a, PyObject *b) {
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        if (db->val == 0.0) {
            PyErr_SetString(PyExc_ZeroDivisionError, "Dual division by zero");
            return NULL;
        }
        double inv = 1.0 / db->val;
        /* d(u/v) = (u'*v - u*v') / v^2 = u'/v - u*v'/v^2 */
        return (PyObject *)PyDual_FromMerge(da->val * inv,
                                             &da->grad, inv,
                                             &db->grad, -da->val * inv * inv);
    }
    if (a_dual && as_double(b, &vb)) {
        if (vb == 0.0) {
            PyErr_SetString(PyExc_ZeroDivisionError, "Dual division by zero");
            return NULL;
        }
        PyDualObject *da = (PyDualObject *)a;
        return (PyObject *)PyDual_FromScale(da->val / vb, &da->grad, 1.0 / vb);
    }
    if (b_dual && as_double(a, &va)) {
        PyDualObject *db = (PyDualObject *)b;
        if (db->val == 0.0) {
            PyErr_SetString(PyExc_ZeroDivisionError, "Dual division by zero");
            return NULL;
        }
        double inv = 1.0 / db->val;
        /* d(c/v) = -c*v'/v^2 */
        return (PyObject *)PyDual_FromScale(va * inv,
                                             &db->grad, -va * inv * inv);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_pow(PyObject *a, PyObject *b, PyObject *mod) {
    if (mod != Py_None) {
        PyErr_SetString(PyExc_ValueError, "Dual pow() does not support modulus");
        return NULL;
    }

    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && !b_dual) {
        if (!as_double(b, &vb)) Py_RETURN_NOTIMPLEMENTED;
        PyDualObject *da = (PyDualObject *)a;
        double r = pow(da->val, vb);
        /* d(x^p) = p * x^(p-1) * x' */
        double dv = vb * pow(da->val, vb - 1.0);
        return (PyObject *)PyDual_FromScale(r, &da->grad, dv);
    }
    if (!a_dual && b_dual) {
        if (!as_double(a, &va)) Py_RETURN_NOTIMPLEMENTED;
        PyDualObject *db = (PyDualObject *)b;
        double r = pow(va, db->val);
        /* d(c^y) = c^y * ln(c) * y' */
        double dv = r * log(va);
        return (PyObject *)PyDual_FromScale(r, &db->grad, dv);
    }
    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        double r = pow(da->val, db->val);
        /* d(x^y) = x^y * (y' * ln(x) + y * x'/x) */
        double sa = db->val * pow(da->val, db->val - 1.0);  /* y * x^(y-1) */
        double sb = r * log(da->val);                         /* x^y * ln(x) */
        return (PyObject *)PyDual_FromMerge(r, &da->grad, sa, &db->grad, sb);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_neg(PyObject *a) {
    PyDualObject *da = (PyDualObject *)a;
    return (PyObject *)PyDual_FromScale(-da->val, &da->grad, -1.0);
}

static PyObject *Dual_pos(PyObject *a) {
    PyDualObject *da = (PyDualObject *)a;
    return (PyObject *)PyDual_FromScale(da->val, &da->grad, 1.0);
}

static PyObject *Dual_abs(PyObject *a) {
    PyDualObject *da = (PyDualObject *)a;
    if (da->val > 0)
        return (PyObject *)PyDual_FromScale(da->val, &da->grad, 1.0);
    else if (da->val < 0)
        return (PyObject *)PyDual_FromScale(-da->val, &da->grad, -1.0);
    else
        return (PyObject *)PyDual_FromScale(0.0, &da->grad, 0.0);
}

static PyObject *Dual_float(PyObject *a) {
    return PyFloat_FromDouble(((PyDualObject *)a)->val);
}

static PyObject *Dual_int(PyObject *a) {
    return PyLong_FromDouble(((PyDualObject *)a)->val);
}

static int Dual_bool(PyObject *a) {
    return ((PyDualObject *)a)->val != 0.0;
}

static PyObject *Dual_complex(PyObject *a) {
    Py_complex c = {((PyDualObject *)a)->val, 0.0};
    return PyComplex_FromCComplex(c);
}

/* ---- Transcendental methods ---- */

#define DUAL_UNARY_METHOD(name, func, dfunc)                            \
static PyObject *Dual_##name(PyDualObject *self, PyObject *Py_UNUSED(ignored)) { \
    double v = func(self->val);                                         \
    double dv = dfunc;                                                  \
    return (PyObject *)PyDual_FromScale(v, &self->grad, dv);            \
}

DUAL_UNARY_METHOD(sin,    sin,   cos(self->val))
DUAL_UNARY_METHOD(cos,    cos,  -sin(self->val))
DUAL_UNARY_METHOD(tan,    tan,   1.0 / (cos(self->val) * cos(self->val)))
DUAL_UNARY_METHOD(exp,    exp,   exp(self->val))
DUAL_UNARY_METHOD(log,    log,   1.0 / self->val)
DUAL_UNARY_METHOD(log2,   log2,  1.0 / (self->val * log(2.0)))
DUAL_UNARY_METHOD(log10,  log10, 1.0 / (self->val * log(10.0)))
DUAL_UNARY_METHOD(sqrt,   sqrt,  0.5 / sqrt(self->val))
DUAL_UNARY_METHOD(arcsin, asin,  1.0 / sqrt(1.0 - self->val * self->val))
DUAL_UNARY_METHOD(arccos, acos, -1.0 / sqrt(1.0 - self->val * self->val))
DUAL_UNARY_METHOD(arctan, atan,  1.0 / (1.0 + self->val * self->val))
DUAL_UNARY_METHOD(sinh,   sinh,  cosh(self->val))
DUAL_UNARY_METHOD(cosh,   cosh,  sinh(self->val))
DUAL_UNARY_METHOD(tanh,   tanh,  1.0 - tanh(self->val) * tanh(self->val))
DUAL_UNARY_METHOD(arcsinh, asinh, 1.0 / sqrt(self->val * self->val + 1.0))
DUAL_UNARY_METHOD(arccosh, acosh, 1.0 / sqrt(self->val * self->val - 1.0))
DUAL_UNARY_METHOD(arctanh, atanh, 1.0 / (1.0 - self->val * self->val))
DUAL_UNARY_METHOD(exp2,   exp2,  exp2(self->val) * log(2.0))
DUAL_UNARY_METHOD(log1p,  log1p, 1.0 / (1.0 + self->val))
DUAL_UNARY_METHOD(expm1,  expm1, exp(self->val))
/* square — can't use the macro since val = x^2 is not a single func(x) call */
static PyObject *Dual_square(PyDualObject *self, PyObject *Py_UNUSED(ignored)) {
    double v = self->val * self->val;
    double dv = 2.0 * self->val;
    return (PyObject *)PyDual_FromScale(v, &self->grad, dv);
}
DUAL_UNARY_METHOD(cbrt,   cbrt,  1.0 / (3.0 * cbrt(self->val) * cbrt(self->val)))

static PyObject *Dual_sign(PyDualObject *self, PyObject *Py_UNUSED(ignored)) {
    double s = (self->val > 0.0) ? 1.0 : (self->val < 0.0) ? -1.0 : 0.0;
    return (PyObject *)PyDual_New(s);  /* derivative is 0 everywhere */
}

static PyObject *Dual_m_abs(PyDualObject *self, PyObject *Py_UNUSED(ignored)) {
    return Dual_abs((PyObject *)self);
}

static PyObject *Dual_conjugate(PyDualObject *self, PyObject *Py_UNUSED(ignored)) {
    return (PyObject *)PyDual_FromScale(self->val, &self->grad, 1.0);
}

/* ---- Floor / Ceil (piecewise constant, derivative = 0) ---- */

static PyObject *Dual_floor(PyDualObject *self, PyObject *Py_UNUSED(ignored)) {
    return (PyObject *)PyDual_New(floor(self->val));
}

static PyObject *Dual_ceil(PyDualObject *self, PyObject *Py_UNUSED(ignored)) {
    return (PyObject *)PyDual_New(ceil(self->val));
}

/* ---- __format__ ---- */

static PyObject *Dual_format(PyDualObject *self, PyObject *fmt_spec) {
    PyObject *fv = PyFloat_FromDouble(self->val);
    if (!fv) return NULL;
    PyObject *result = PyObject_Format(fv, fmt_spec);
    Py_DECREF(fv);
    return result;
}

/* ---- __round__ ---- */

static PyObject *Dual_round(PyDualObject *self, PyObject *args) {
    PyObject *ndigits = NULL;
    if (!PyArg_ParseTuple(args, "|O", &ndigits)) return NULL;

    /* Delegate to float.__round__ for correct behavior */
    PyObject *fv = PyFloat_FromDouble(self->val);
    if (!fv) return NULL;

    PyObject *result;
    if (ndigits == NULL || ndigits == Py_None) {
        result = PyObject_CallMethod(fv, "__round__", NULL);
    } else {
        result = PyObject_CallMethod(fv, "__round__", "O", ndigits);
    }
    Py_DECREF(fv);
    return result;  /* int when no ndigits, float when ndigits given */
}

/* ---- __floordiv__ ---- */

static PyObject *Dual_floordiv(PyObject *a, PyObject *b) {
    double va, vb;
    if (!as_double(a, &va) || !as_double(b, &vb))
        Py_RETURN_NOTIMPLEMENTED;
    if (vb == 0.0) {
        PyErr_SetString(PyExc_ZeroDivisionError, "Dual floor division by zero");
        return NULL;
    }
    return (PyObject *)PyDual_New(floor(va / vb));  /* derivative = 0 */
}

/* ---- __mod__ ---- */

static PyObject *Dual_mod(PyObject *a, PyObject *b) {
    double va, vb;
    if (!as_double(a, &va) || !as_double(b, &vb))
        Py_RETURN_NOTIMPLEMENTED;
    if (vb == 0.0) {
        PyErr_SetString(PyExc_ZeroDivisionError, "Dual modulo by zero");
        return NULL;
    }
    return (PyObject *)PyDual_New(fmod(va, vb));  /* derivative = 0 */
}

/* ---- __divmod__ ---- */

static PyObject *Dual_divmod(PyObject *a, PyObject *b) {
    double va, vb;
    if (!as_double(a, &va) || !as_double(b, &vb))
        Py_RETURN_NOTIMPLEMENTED;
    if (vb == 0.0) {
        PyErr_SetString(PyExc_ZeroDivisionError, "Dual divmod by zero");
        return NULL;
    }
    PyObject *q = (PyObject *)PyDual_New(floor(va / vb));
    PyObject *r = (PyObject *)PyDual_New(fmod(va, vb));
    if (!q || !r) { Py_XDECREF(q); Py_XDECREF(r); return NULL; }
    PyObject *tup = PyTuple_Pack(2, q, r);
    Py_DECREF(q);
    Py_DECREF(r);
    return tup;
}

/* ---- __reduce__ (pickle support) ---- */

static PyObject *Dual_reduce(PyDualObject *self, PyObject *Py_UNUSED(ignored)) {
    PyObject *args = Py_BuildValue("(di)", self->val, 0);
    if (!args) return NULL;
    PyObject *result = Py_BuildValue("(OO)", Py_TYPE(self), args);
    Py_DECREF(args);
    return result;
}

/* ---- __copy__ / __deepcopy__ ---- */

static PyObject *Dual_copy(PyDualObject *self, PyObject *Py_UNUSED(ignored)) {
    return (PyObject *)PyDual_FromScale(self->val, &self->grad, 1.0);
}

static PyObject *Dual_deepcopy(PyDualObject *self, PyObject *Py_UNUSED(memo)) {
    return (PyObject *)PyDual_FromScale(self->val, &self->grad, 1.0);
}

/* ---- Binary ufunc functions ---- */

static PyObject *Dual_maximum(PyObject *a, PyObject *b) {
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        if (da->val >= db->val)
            return (PyObject *)PyDual_FromScale(da->val, &da->grad, 1.0);
        else
            return (PyObject *)PyDual_FromScale(db->val, &db->grad, 1.0);
    }
    if (a_dual && as_double(b, &vb)) {
        PyDualObject *da = (PyDualObject *)a;
        return da->val >= vb
            ? (PyObject *)PyDual_FromScale(da->val, &da->grad, 1.0)
            : (PyObject *)PyDual_New(vb);
    }
    if (b_dual && as_double(a, &va)) {
        PyDualObject *db = (PyDualObject *)b;
        return va >= db->val
            ? (PyObject *)PyDual_New(va)
            : (PyObject *)PyDual_FromScale(db->val, &db->grad, 1.0);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_minimum(PyObject *a, PyObject *b) {
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        if (da->val <= db->val)
            return (PyObject *)PyDual_FromScale(da->val, &da->grad, 1.0);
        else
            return (PyObject *)PyDual_FromScale(db->val, &db->grad, 1.0);
    }
    if (a_dual && as_double(b, &vb)) {
        PyDualObject *da = (PyDualObject *)a;
        return da->val <= vb
            ? (PyObject *)PyDual_FromScale(da->val, &da->grad, 1.0)
            : (PyObject *)PyDual_New(vb);
    }
    if (b_dual && as_double(a, &va)) {
        PyDualObject *db = (PyDualObject *)b;
        return va <= db->val
            ? (PyObject *)PyDual_New(va)
            : (PyObject *)PyDual_FromScale(db->val, &db->grad, 1.0);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_arctan2(PyObject *a, PyObject *b) {
    /* arctan2(y, x): a = y, b = x */
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && b_dual) {
        PyDualObject *dy = (PyDualObject *)a, *dx = (PyDualObject *)b;
        double denom = dx->val * dx->val + dy->val * dy->val;
        return (PyObject *)PyDual_FromMerge(atan2(dy->val, dx->val),
            &dy->grad,  dx->val / denom,    /* d/dy = x/(x²+y²) */
            &dx->grad, -dy->val / denom);   /* d/dx = -y/(x²+y²) */
    }
    if (a_dual && as_double(b, &vb)) {
        PyDualObject *dy = (PyDualObject *)a;
        double denom = vb * vb + dy->val * dy->val;
        return (PyObject *)PyDual_FromScale(atan2(dy->val, vb),
            &dy->grad, vb / denom);
    }
    if (b_dual && as_double(a, &va)) {
        PyDualObject *dx = (PyDualObject *)b;
        double denom = dx->val * dx->val + va * va;
        return (PyObject *)PyDual_FromScale(atan2(va, dx->val),
            &dx->grad, -va / denom);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_hypot(PyObject *a, PyObject *b) {
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        double h = hypot(da->val, db->val);
        double inv = (h == 0.0) ? 0.0 : 1.0 / h;
        return (PyObject *)PyDual_FromMerge(h,
            &da->grad, da->val * inv,
            &db->grad, db->val * inv);
    }
    if (a_dual && as_double(b, &vb)) {
        PyDualObject *da = (PyDualObject *)a;
        double h = hypot(da->val, vb);
        double inv = (h == 0.0) ? 0.0 : 1.0 / h;
        return (PyObject *)PyDual_FromScale(h, &da->grad, da->val * inv);
    }
    if (b_dual && as_double(a, &va)) {
        PyDualObject *db = (PyDualObject *)b;
        double h = hypot(va, db->val);
        double inv = (h == 0.0) ? 0.0 : 1.0 / h;
        return (PyObject *)PyDual_FromScale(h, &db->grad, db->val * inv);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *Dual_copysign(PyObject *a, PyObject *b) {
    /* copysign(a, b) = |a| * sign(b), d/da = sign(b) * sign(a), d/db = 0 */
    double va, vb;
    int a_dual = PyDual_Check(a), b_dual = PyDual_Check(b);

    if (a_dual && as_double(b, &vb)) {
        PyDualObject *da = (PyDualObject *)a;
        double sign_a = (da->val > 0.0) ? 1.0 : (da->val < 0.0) ? -1.0 : 0.0;
        double sign_b = (vb >= 0.0) ? 1.0 : -1.0;
        return (PyObject *)PyDual_FromScale(copysign(da->val, vb),
            &da->grad, sign_b * sign_a);
    }
    if (b_dual && as_double(a, &va)) {
        /* d/db = 0 */
        return (PyObject *)PyDual_New(copysign(va, ((PyDualObject *)b)->val));
    }
    if (a_dual && b_dual) {
        PyDualObject *da = (PyDualObject *)a, *db = (PyDualObject *)b;
        double sign_a = (da->val > 0.0) ? 1.0 : (da->val < 0.0) ? -1.0 : 0.0;
        double sign_b = (db->val >= 0.0) ? 1.0 : -1.0;
        return (PyObject *)PyDual_FromScale(copysign(da->val, db->val),
            &da->grad, sign_b * sign_a);  /* d/db = 0 */
    }
    Py_RETURN_NOTIMPLEMENTED;
}

/* .real property — for real-valued Duals, returns self (copy) */
static PyObject *Dual_get_real(PyDualObject *self, void *Py_UNUSED(closure)) {
    return (PyObject *)PyDual_FromScale(self->val, &self->grad, 1.0);
}

/* .imag property — for real-valued Duals, returns zero constant */
static PyObject *Dual_get_imag(PyDualObject *self, void *Py_UNUSED(closure)) {
    return (PyObject *)PyDual_New(0.0);
}

/* der(wrt) — get partial derivative w.r.t. a seed Dual */
static PyObject *Dual_der(PyDualObject *self, PyObject *args) {
    PyObject *wrt;
    if (!PyArg_ParseTuple(args, "O", &wrt)) return NULL;

    if (!PyDual_Check(wrt)) {
        PyErr_SetString(PyExc_TypeError, "der() argument must be a Dual");
        return NULL;
    }
    int32_t target_id = ((PyDualObject *)wrt)->var_id;
    if (target_id < 0) {
        return PyFloat_FromDouble(0.0);
    }
    /* Binary search in sorted ids */
    int32_t lo = 0, hi = self->grad.len - 1;
    while (lo <= hi) {
        int32_t mid = (lo + hi) / 2;
        if (self->grad.ids[mid] == target_id)
            return PyFloat_FromDouble(self->grad.derivs[mid]);
        else if (self->grad.ids[mid] < target_id)
            lo = mid + 1;
        else
            hi = mid - 1;
    }
    return PyFloat_FromDouble(0.0);
}

/* grad property — returns dict {var_id: deriv} */
static PyObject *Dual_get_grad(PyDualObject *self, void *Py_UNUSED(closure)) {
    PyObject *d = PyDict_New();
    if (!d) return NULL;
    for (int32_t i = 0; i < self->grad.len; i++) {
        PyObject *key = PyLong_FromLong(self->grad.ids[i]);
        PyObject *val = PyFloat_FromDouble(self->grad.derivs[i]);
        if (!key || !val || PyDict_SetItem(d, key, val) < 0) {
            Py_XDECREF(key);
            Py_XDECREF(val);
            Py_DECREF(d);
            return NULL;
        }
        Py_DECREF(key);
        Py_DECREF(val);
    }
    return d;
}

/* ---- __array_ufunc__ ---- */

static PyObject *Dual_array_ufunc(PyDualObject *self, PyObject *args, PyObject *kwds) {
    PyObject *ufunc, *method_name;
    /* Signature: __array_ufunc__(self, ufunc, method, *inputs, **kwargs) */
    /* But CPython packs it as (ufunc, method, *inputs) with **kwargs separate */

    Py_ssize_t nargs = PyTuple_GET_SIZE(args);
    if (nargs < 2) {
        PyErr_SetString(PyExc_TypeError, "__array_ufunc__ requires at least 2 arguments");
        return NULL;
    }

    ufunc = PyTuple_GET_ITEM(args, 0);
    method_name = PyTuple_GET_ITEM(args, 1);

    /* Only support __call__ */
    const char *method_str = PyUnicode_AsUTF8(method_name);
    if (!method_str) return NULL;
    if (strcmp(method_str, "__call__") != 0) {
        Py_RETURN_NOTIMPLEMENTED;
    }

    /* Check for 'out' kwarg — not supported */
    if (kwds && PyDict_GetItemString(kwds, "out")) {
        Py_RETURN_NOTIMPLEMENTED;
    }

    /* Get ufunc name */
    PyObject *ufunc_name_obj = PyObject_GetAttrString(ufunc, "__name__");
    if (!ufunc_name_obj) return NULL;
    const char *ufunc_name = PyUnicode_AsUTF8(ufunc_name_obj);
    if (!ufunc_name) { Py_DECREF(ufunc_name_obj); return NULL; }

    /* Dispatch table for unary ufuncs */
    PyObject *result = NULL;

    if (nargs == 3) {
        /* Unary ufunc: inputs[0] is the Dual */
        PyObject *input = PyTuple_GET_ITEM(args, 2);
        if (!PyDual_Check(input)) {
            Py_DECREF(ufunc_name_obj);
            Py_RETURN_NOTIMPLEMENTED;
        }
        PyDualObject *d = (PyDualObject *)input;

        if (strcmp(ufunc_name, "sin") == 0)           result = Dual_sin(d, NULL);
        else if (strcmp(ufunc_name, "cos") == 0)      result = Dual_cos(d, NULL);
        else if (strcmp(ufunc_name, "tan") == 0)      result = Dual_tan(d, NULL);
        else if (strcmp(ufunc_name, "exp") == 0)      result = Dual_exp(d, NULL);
        else if (strcmp(ufunc_name, "log") == 0)      result = Dual_log(d, NULL);
        else if (strcmp(ufunc_name, "log2") == 0)     result = Dual_log2(d, NULL);
        else if (strcmp(ufunc_name, "log10") == 0)    result = Dual_log10(d, NULL);
        else if (strcmp(ufunc_name, "sqrt") == 0)     result = Dual_sqrt(d, NULL);
        else if (strcmp(ufunc_name, "arcsin") == 0)   result = Dual_arcsin(d, NULL);
        else if (strcmp(ufunc_name, "arccos") == 0)   result = Dual_arccos(d, NULL);
        else if (strcmp(ufunc_name, "arctan") == 0)   result = Dual_arctan(d, NULL);
        else if (strcmp(ufunc_name, "sinh") == 0)     result = Dual_sinh(d, NULL);
        else if (strcmp(ufunc_name, "cosh") == 0)     result = Dual_cosh(d, NULL);
        else if (strcmp(ufunc_name, "tanh") == 0)     result = Dual_tanh(d, NULL);
        else if (strcmp(ufunc_name, "absolute") == 0) result = Dual_abs((PyObject *)d);
        else if (strcmp(ufunc_name, "negative") == 0) result = Dual_neg((PyObject *)d);
        else if (strcmp(ufunc_name, "positive") == 0) result = Dual_pos((PyObject *)d);
        else if (strcmp(ufunc_name, "conjugate") == 0) result = Dual_conjugate(d, NULL);
        else if (strcmp(ufunc_name, "arcsinh") == 0)  result = Dual_arcsinh(d, NULL);
        else if (strcmp(ufunc_name, "arccosh") == 0)  result = Dual_arccosh(d, NULL);
        else if (strcmp(ufunc_name, "arctanh") == 0)  result = Dual_arctanh(d, NULL);
        else if (strcmp(ufunc_name, "exp2") == 0)     result = Dual_exp2(d, NULL);
        else if (strcmp(ufunc_name, "log1p") == 0)    result = Dual_log1p(d, NULL);
        else if (strcmp(ufunc_name, "expm1") == 0)    result = Dual_expm1(d, NULL);
        else if (strcmp(ufunc_name, "square") == 0)   result = Dual_square(d, NULL);
        else if (strcmp(ufunc_name, "cbrt") == 0)     result = Dual_cbrt(d, NULL);
        else if (strcmp(ufunc_name, "sign") == 0)     result = Dual_sign(d, NULL);
        else if (strcmp(ufunc_name, "fabs") == 0)     result = Dual_abs((PyObject *)d);
        else if (strcmp(ufunc_name, "floor") == 0)    result = Dual_floor(d, NULL);
        else if (strcmp(ufunc_name, "ceil") == 0)     result = Dual_ceil(d, NULL);
        else if (strcmp(ufunc_name, "isfinite") == 0) {
            result = PyBool_FromLong(isfinite(d->val));
        }
        else if (strcmp(ufunc_name, "isinf") == 0) {
            result = PyBool_FromLong(isinf(d->val));
        }
        else if (strcmp(ufunc_name, "isnan") == 0) {
            result = PyBool_FromLong(isnan(d->val));
        }
        else {
            Py_DECREF(ufunc_name_obj);
            Py_RETURN_NOTIMPLEMENTED;
        }
    } else if (nargs == 4) {
        /* Binary ufunc */
        PyObject *lhs = PyTuple_GET_ITEM(args, 2);
        PyObject *rhs = PyTuple_GET_ITEM(args, 3);

        if (strcmp(ufunc_name, "add") == 0)            result = Dual_add(lhs, rhs);
        else if (strcmp(ufunc_name, "subtract") == 0)  result = Dual_sub(lhs, rhs);
        else if (strcmp(ufunc_name, "multiply") == 0)  result = Dual_mul(lhs, rhs);
        else if (strcmp(ufunc_name, "true_divide") == 0 ||
                 strcmp(ufunc_name, "divide") == 0) result = Dual_truediv(lhs, rhs);
        else if (strcmp(ufunc_name, "power") == 0)     result = Dual_pow(lhs, rhs, Py_None);
        else if (strcmp(ufunc_name, "maximum") == 0)   result = Dual_maximum(lhs, rhs);
        else if (strcmp(ufunc_name, "minimum") == 0)   result = Dual_minimum(lhs, rhs);
        else if (strcmp(ufunc_name, "arctan2") == 0)   result = Dual_arctan2(lhs, rhs);
        else if (strcmp(ufunc_name, "hypot") == 0)     result = Dual_hypot(lhs, rhs);
        else if (strcmp(ufunc_name, "copysign") == 0)  result = Dual_copysign(lhs, rhs);
        else if (strcmp(ufunc_name, "floor_divide") == 0) result = Dual_floordiv(lhs, rhs);
        else if (strcmp(ufunc_name, "remainder") == 0 ||
                 strcmp(ufunc_name, "mod") == 0)       result = Dual_mod(lhs, rhs);
        else {
            Py_DECREF(ufunc_name_obj);
            Py_RETURN_NOTIMPLEMENTED;
        }
    } else {
        Py_DECREF(ufunc_name_obj);
        Py_RETURN_NOTIMPLEMENTED;
    }

    Py_DECREF(ufunc_name_obj);
    return result;
}

/* ---- Method table ---- */

static PyMethodDef Dual_methods[] = {
    {"sin",       (PyCFunction)Dual_sin,       METH_NOARGS,  "sin(self)"},
    {"cos",       (PyCFunction)Dual_cos,       METH_NOARGS,  "cos(self)"},
    {"tan",       (PyCFunction)Dual_tan,       METH_NOARGS,  "tan(self)"},
    {"exp",       (PyCFunction)Dual_exp,       METH_NOARGS,  "exp(self)"},
    {"log",       (PyCFunction)Dual_log,       METH_NOARGS,  "log(self) — natural log"},
    {"log2",      (PyCFunction)Dual_log2,      METH_NOARGS,  "log2(self)"},
    {"log10",     (PyCFunction)Dual_log10,     METH_NOARGS,  "log10(self)"},
    {"sqrt",      (PyCFunction)Dual_sqrt,      METH_NOARGS,  "sqrt(self)"},
    {"arcsin",    (PyCFunction)Dual_arcsin,    METH_NOARGS,  "arcsin(self)"},
    {"arccos",    (PyCFunction)Dual_arccos,    METH_NOARGS,  "arccos(self)"},
    {"arctan",    (PyCFunction)Dual_arctan,    METH_NOARGS,  "arctan(self)"},
    {"sinh",      (PyCFunction)Dual_sinh,      METH_NOARGS,  "sinh(self)"},
    {"cosh",      (PyCFunction)Dual_cosh,      METH_NOARGS,  "cosh(self)"},
    {"tanh",      (PyCFunction)Dual_tanh,      METH_NOARGS,  "tanh(self)"},
    {"arcsinh",   (PyCFunction)Dual_arcsinh,   METH_NOARGS,  "arcsinh(self)"},
    {"arccosh",   (PyCFunction)Dual_arccosh,   METH_NOARGS,  "arccosh(self)"},
    {"arctanh",   (PyCFunction)Dual_arctanh,   METH_NOARGS,  "arctanh(self)"},
    {"exp2",      (PyCFunction)Dual_exp2,      METH_NOARGS,  "exp2(self)"},
    {"log1p",     (PyCFunction)Dual_log1p,     METH_NOARGS,  "log1p(self)"},
    {"expm1",     (PyCFunction)Dual_expm1,     METH_NOARGS,  "expm1(self)"},
    {"square",    (PyCFunction)Dual_square,    METH_NOARGS,  "square(self)"},
    {"cbrt",      (PyCFunction)Dual_cbrt,      METH_NOARGS,  "cbrt(self)"},
    {"sign",      (PyCFunction)Dual_sign,      METH_NOARGS,  "sign(self)"},
    {"__abs__",   (PyCFunction)Dual_m_abs,     METH_NOARGS,  "abs(self)"},
    {"conjugate", (PyCFunction)Dual_conjugate, METH_NOARGS,  "conjugate(self)"},
    {"__complex__", (PyCFunction)Dual_complex,  METH_NOARGS,  "complex(self)"},
    {"der",       (PyCFunction)Dual_der,       METH_VARARGS, "der(wrt) — partial derivative"},
    {"__array_ufunc__", (PyCFunction)Dual_array_ufunc, METH_VARARGS | METH_KEYWORDS,
     "numpy ufunc dispatch"},
    {"__format__",  (PyCFunction)Dual_format,   METH_O,       "format(self, spec)"},
    {"__round__",   (PyCFunction)Dual_round,    METH_VARARGS, "round(self, ndigits=None)"},
    {"__floor__",   (PyCFunction)Dual_floor,    METH_NOARGS,  "math.floor(self)"},
    {"__ceil__",    (PyCFunction)Dual_ceil,     METH_NOARGS,  "math.ceil(self)"},
    {"__reduce__",  (PyCFunction)Dual_reduce,   METH_NOARGS,  "pickle support"},
    {"__copy__",    (PyCFunction)Dual_copy,     METH_NOARGS,  "copy.copy(self)"},
    {"__deepcopy__",(PyCFunction)Dual_deepcopy, METH_O,       "copy.deepcopy(self)"},
    {"floor",       (PyCFunction)Dual_floor,    METH_NOARGS,  "floor(self)"},
    {"ceil",        (PyCFunction)Dual_ceil,     METH_NOARGS,  "ceil(self)"},
    {"fabs",        (PyCFunction)Dual_m_abs,    METH_NOARGS,  "fabs(self)"},
    {NULL}
};

/* ---- Members ---- */

static PyMemberDef Dual_members[] = {
    {"val",    Py_T_DOUBLE, offsetof(PyDualObject, val),    Py_READONLY, "primal value"},
    {"var_id", Py_T_INT,    offsetof(PyDualObject, var_id), Py_READONLY, "variable ID (-1 if derived)"},
    {NULL}
};

/* ---- Properties ---- */

static PyGetSetDef Dual_getset[] = {
    {"grad", (getter)Dual_get_grad, NULL, "gradient dict {var_id: deriv}", NULL},
    {"real", (getter)Dual_get_real, NULL, "real part (self for real Duals)", NULL},
    {"imag", (getter)Dual_get_imag, NULL, "imaginary part (0 for real Duals)", NULL},
    {NULL}
};

/* ---- Number methods struct ---- */

static PyNumberMethods Dual_as_number = {
    .nb_add           = Dual_add,
    .nb_subtract      = Dual_sub,
    .nb_multiply      = Dual_mul,
    .nb_true_divide   = Dual_truediv,
    .nb_floor_divide  = Dual_floordiv,
    .nb_remainder     = Dual_mod,
    .nb_divmod        = Dual_divmod,
    .nb_power         = Dual_pow,
    .nb_negative      = Dual_neg,
    .nb_positive      = Dual_pos,
    .nb_absolute      = Dual_abs,
    .nb_float         = Dual_float,
    .nb_int           = Dual_int,
    .nb_bool          = (inquiry)Dual_bool,
};

/* ---- Type object ---- */

static PyTypeObject PyDual_Type = {
    PyVarObject_HEAD_INIT(NULL, 0)
    .tp_name      = "fastdual._fastdual.Dual",
    .tp_basicsize = sizeof(PyDualObject),
    .tp_flags     = Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE,
    .tp_doc       = "Dual number for forward-mode automatic differentiation",
    .tp_new       = PyType_GenericNew,
    .tp_init      = (initproc)Dual_init,
    .tp_dealloc   = (destructor)Dual_dealloc,
    .tp_repr      = (reprfunc)Dual_repr,
    .tp_hash      = (hashfunc)Dual_hash,
    .tp_richcompare = Dual_richcompare,
    .tp_as_number = &Dual_as_number,
    .tp_methods   = Dual_methods,
    .tp_members   = Dual_members,
    .tp_getset    = Dual_getset,
};

/* ---- Module-level functions ---- */

static PyObject *mod_reset(PyObject *Py_UNUSED(self), PyObject *Py_UNUSED(args)) {
    reset_var_id();
    Py_RETURN_NONE;
}

/* seed_array(values) -> list of seed Duals */
static PyObject *mod_seed_array(PyObject *Py_UNUSED(self), PyObject *arg) {
    /* Accept any sequence/iterable of floats */
    PyObject *seq = PySequence_Fast(arg, "seed_array expects a sequence");
    if (!seq) return NULL;

    Py_ssize_t n = PySequence_Fast_GET_SIZE(seq);
    PyObject *result = PyList_New(n);
    if (!result) { Py_DECREF(seq); return NULL; }

    for (Py_ssize_t i = 0; i < n; i++) {
        PyObject *item = PySequence_Fast_GET_ITEM(seq, i);  /* borrowed */
        double v = PyFloat_AsDouble(item);
        if (v == -1.0 && PyErr_Occurred()) {
            Py_DECREF(result);
            Py_DECREF(seq);
            return NULL;
        }
        PyDualObject *d = (PyDualObject *)PyDual_Type.tp_alloc(&PyDual_Type, 0);
        if (!d) { Py_DECREF(result); Py_DECREF(seq); return NULL; }
        d->val = v;
        sg_init_seed(&d->grad);
        d->var_id = d->grad.ids[0];
        PyList_SET_ITEM(result, i, (PyObject *)d);  /* steals ref */
    }
    Py_DECREF(seq);
    return result;
}

/* val_array(seq) -> list of primal doubles */
static PyObject *mod_val_array(PyObject *Py_UNUSED(self), PyObject *arg) {
    PyObject *seq = PySequence_Fast(arg, "val_array expects a sequence");
    if (!seq) return NULL;

    Py_ssize_t n = PySequence_Fast_GET_SIZE(seq);
    PyObject *result = PyList_New(n);
    if (!result) { Py_DECREF(seq); return NULL; }

    for (Py_ssize_t i = 0; i < n; i++) {
        PyObject *item = PySequence_Fast_GET_ITEM(seq, i);
        double v;
        if (PyDual_Check(item)) {
            v = ((PyDualObject *)item)->val;
        } else {
            v = PyFloat_AsDouble(item);
            if (v == -1.0 && PyErr_Occurred()) {
                Py_DECREF(result); Py_DECREF(seq); return NULL;
            }
        }
        PyObject *fv = PyFloat_FromDouble(v);
        if (!fv) { Py_DECREF(result); Py_DECREF(seq); return NULL; }
        PyList_SET_ITEM(result, i, fv);
    }
    Py_DECREF(seq);
    return result;
}

/* Helper: binary search for var_id in a SparseGrad, return deriv or 0.0 */
static inline double sg_lookup(const SparseGrad *g, int32_t target_id) {
    int32_t lo = 0, hi = g->len - 1;
    while (lo <= hi) {
        int32_t mid = (lo + hi) / 2;
        if (g->ids[mid] == target_id) return g->derivs[mid];
        else if (g->ids[mid] < target_id) lo = mid + 1;
        else hi = mid - 1;
    }
    return 0.0;
}

/* der_array(results_seq, wrt_dual) -> list of doubles
   Vectorized: get partial derivative of each result w.r.t. a single seed. */
static PyObject *mod_der_array(PyObject *Py_UNUSED(self), PyObject *args) {
    PyObject *results_seq, *wrt;
    if (!PyArg_ParseTuple(args, "OO", &results_seq, &wrt)) return NULL;

    if (!PyDual_Check(wrt)) {
        PyErr_SetString(PyExc_TypeError, "wrt must be a Dual");
        return NULL;
    }
    int32_t target_id = ((PyDualObject *)wrt)->var_id;

    PyObject *seq = PySequence_Fast(results_seq, "results must be a sequence");
    if (!seq) return NULL;
    Py_ssize_t n = PySequence_Fast_GET_SIZE(seq);

    PyObject *result = PyList_New(n);
    if (!result) { Py_DECREF(seq); return NULL; }

    for (Py_ssize_t i = 0; i < n; i++) {
        PyObject *item = PySequence_Fast_GET_ITEM(seq, i);
        double d = 0.0;
        if (PyDual_Check(item) && target_id >= 0) {
            d = sg_lookup(&((PyDualObject *)item)->grad, target_id);
        }
        PyObject *fv = PyFloat_FromDouble(d);
        if (!fv) { Py_DECREF(result); Py_DECREF(seq); return NULL; }
        PyList_SET_ITEM(result, i, fv);
    }
    Py_DECREF(seq);
    return result;
}

/* jac_matrix(results_seq, seeds_seq) -> flat list of doubles (row-major, n_results x n_seeds)
   Computes J[i,j] = d(results[i]) / d(seeds[j]) entirely in C. */
static PyObject *mod_jac_matrix(PyObject *Py_UNUSED(self), PyObject *args) {
    PyObject *results_obj, *seeds_obj;
    if (!PyArg_ParseTuple(args, "OO", &results_obj, &seeds_obj)) return NULL;

    PyObject *results_seq = PySequence_Fast(results_obj, "results must be a sequence");
    if (!results_seq) return NULL;
    PyObject *seeds_seq = PySequence_Fast(seeds_obj, "seeds must be a sequence");
    if (!seeds_seq) { Py_DECREF(results_seq); return NULL; }

    Py_ssize_t nr = PySequence_Fast_GET_SIZE(results_seq);
    Py_ssize_t ns = PySequence_Fast_GET_SIZE(seeds_seq);

    /* Extract seed var_ids into a C array for fast access */
    int32_t *seed_ids = (int32_t *)PyMem_Malloc(ns * sizeof(int32_t));
    if (!seed_ids) {
        Py_DECREF(results_seq); Py_DECREF(seeds_seq);
        return PyErr_NoMemory();
    }
    for (Py_ssize_t j = 0; j < ns; j++) {
        PyObject *s = PySequence_Fast_GET_ITEM(seeds_seq, j);
        if (!PyDual_Check(s)) {
            PyMem_Free(seed_ids);
            Py_DECREF(results_seq); Py_DECREF(seeds_seq);
            PyErr_SetString(PyExc_TypeError, "all seeds must be Dual");
            return NULL;
        }
        seed_ids[j] = ((PyDualObject *)s)->var_id;
    }

    /* Allocate flat result buffer */
    double *buf = (double *)PyMem_Malloc(nr * ns * sizeof(double));
    if (!buf) {
        PyMem_Free(seed_ids);
        Py_DECREF(results_seq); Py_DECREF(seeds_seq);
        return PyErr_NoMemory();
    }

    /* Fill the Jacobian: for each result, look up each seed_id */
    for (Py_ssize_t i = 0; i < nr; i++) {
        PyObject *r = PySequence_Fast_GET_ITEM(results_seq, i);
        if (PyDual_Check(r)) {
            const SparseGrad *g = &((PyDualObject *)r)->grad;
            /* For each seed, binary-search in this result's grad */
            for (Py_ssize_t j = 0; j < ns; j++) {
                buf[i * ns + j] = (seed_ids[j] >= 0) ? sg_lookup(g, seed_ids[j]) : 0.0;
            }
        } else {
            /* Non-Dual result: all derivatives are 0 */
            for (Py_ssize_t j = 0; j < ns; j++) {
                buf[i * ns + j] = 0.0;
            }
        }
    }

    /* Build a flat Python list of doubles */
    PyObject *result = PyList_New(nr * ns);
    if (!result) {
        PyMem_Free(buf); PyMem_Free(seed_ids);
        Py_DECREF(results_seq); Py_DECREF(seeds_seq);
        return NULL;
    }
    for (Py_ssize_t k = 0; k < nr * ns; k++) {
        PyObject *fv = PyFloat_FromDouble(buf[k]);
        if (!fv) {
            Py_DECREF(result); PyMem_Free(buf); PyMem_Free(seed_ids);
            Py_DECREF(results_seq); Py_DECREF(seeds_seq);
            return NULL;
        }
        PyList_SET_ITEM(result, k, fv);
    }

    PyMem_Free(buf);
    PyMem_Free(seed_ids);
    Py_DECREF(results_seq);
    Py_DECREF(seeds_seq);

    /* Return (flat_list, nr, ns) so Python can reshape */
    return Py_BuildValue("(Onn)", result, nr, ns);
}

/* ======================================================================
 * Array-level batch dispatch (for DualArray)
 * ====================================================================== */

typedef PyObject *(*unary_fn)(PyDualObject *, PyObject *);

static PyObject *wrap_neg(PyDualObject *d, PyObject *ign) { return Dual_neg((PyObject *)d); }
static PyObject *wrap_pos(PyDualObject *d, PyObject *ign) { return Dual_pos((PyObject *)d); }
static PyObject *wrap_abs(PyDualObject *d, PyObject *ign) { return Dual_abs((PyObject *)d); }

typedef struct { const char *name; unary_fn fn; } unary_entry;

static const unary_entry unary_table[] = {
    {"sin",       (unary_fn)Dual_sin},
    {"cos",       (unary_fn)Dual_cos},
    {"tan",       (unary_fn)Dual_tan},
    {"exp",       (unary_fn)Dual_exp},
    {"log",       (unary_fn)Dual_log},
    {"log2",      (unary_fn)Dual_log2},
    {"log10",     (unary_fn)Dual_log10},
    {"sqrt",      (unary_fn)Dual_sqrt},
    {"arcsin",    (unary_fn)Dual_arcsin},
    {"arccos",    (unary_fn)Dual_arccos},
    {"arctan",    (unary_fn)Dual_arctan},
    {"sinh",      (unary_fn)Dual_sinh},
    {"cosh",      (unary_fn)Dual_cosh},
    {"tanh",      (unary_fn)Dual_tanh},
    {"arcsinh",   (unary_fn)Dual_arcsinh},
    {"arccosh",   (unary_fn)Dual_arccosh},
    {"arctanh",   (unary_fn)Dual_arctanh},
    {"exp2",      (unary_fn)Dual_exp2},
    {"log1p",     (unary_fn)Dual_log1p},
    {"expm1",     (unary_fn)Dual_expm1},
    {"square",    (unary_fn)Dual_square},
    {"cbrt",      (unary_fn)Dual_cbrt},
    {"sign",      (unary_fn)Dual_sign},
    {"absolute",  (unary_fn)wrap_abs},
    {"negative",  (unary_fn)wrap_neg},
    {"positive",  (unary_fn)wrap_pos},
    {"conjugate", (unary_fn)Dual_conjugate},
    {"fabs",      (unary_fn)wrap_abs},
    {"floor",     (unary_fn)Dual_floor},
    {"ceil",      (unary_fn)Dual_ceil},
    {NULL, NULL}
};

/* apply_unary_array(name, arr) -> result_ndarray or None */
static PyObject *mod_apply_unary_array(PyObject *Py_UNUSED(self), PyObject *args) {
    const char *name;
    PyObject *arr_obj;
    if (!PyArg_ParseTuple(args, "sO", &name, &arr_obj)) return NULL;

    /* Predicate ufuncs: return bool array, not Dual array */
    int predicate = 0;
    int pred_type = 0;  /* 0=isfinite, 1=isinf, 2=isnan */
    if (strcmp(name, "isfinite") == 0) { predicate = 1; pred_type = 0; }
    else if (strcmp(name, "isinf") == 0) { predicate = 1; pred_type = 1; }
    else if (strcmp(name, "isnan") == 0) { predicate = 1; pred_type = 2; }

    if (predicate) {
        PyArrayObject *arr = (PyArrayObject *)PyArray_FROM_OTF(
            arr_obj, NPY_OBJECT, NPY_ARRAY_IN_ARRAY);
        if (!arr) return NULL;

        npy_intp size = PyArray_SIZE(arr);
        int ndim = PyArray_NDIM(arr);
        npy_intp *shape = PyArray_DIMS(arr);

        PyArrayObject *result = (PyArrayObject *)PyArray_SimpleNew(ndim, shape, NPY_BOOL);
        if (!result) { Py_DECREF(arr); return NULL; }

        PyObject **src = (PyObject **)PyArray_DATA(arr);
        npy_bool *dst = (npy_bool *)PyArray_DATA(result);

        for (npy_intp i = 0; i < size; i++) {
            if (!PyDual_Check(src[i])) {
                PyErr_SetString(PyExc_TypeError, "array elements must be Dual");
                Py_DECREF(arr); Py_DECREF(result);
                return NULL;
            }
            double v = ((PyDualObject *)src[i])->val;
            switch (pred_type) {
                case 0: dst[i] = isfinite(v) ? NPY_TRUE : NPY_FALSE; break;
                case 1: dst[i] = isinf(v) ? NPY_TRUE : NPY_FALSE; break;
                case 2: dst[i] = isnan(v) ? NPY_TRUE : NPY_FALSE; break;
            }
        }
        Py_DECREF(arr);
        return (PyObject *)result;
    }

    unary_fn fn = NULL;
    for (const unary_entry *e = unary_table; e->name; e++) {
        if (strcmp(name, e->name) == 0) { fn = e->fn; break; }
    }
    if (!fn) Py_RETURN_NONE;

    PyArrayObject *arr = (PyArrayObject *)PyArray_FROM_OTF(
        arr_obj, NPY_OBJECT, NPY_ARRAY_IN_ARRAY);
    if (!arr) return NULL;

    npy_intp size = PyArray_SIZE(arr);
    int ndim = PyArray_NDIM(arr);
    npy_intp *shape = PyArray_DIMS(arr);

    PyArrayObject *result = (PyArrayObject *)PyArray_SimpleNew(ndim, shape, NPY_OBJECT);
    if (!result) { Py_DECREF(arr); return NULL; }

    /* Contiguous object arrays: direct pointer access */
    PyObject **src = (PyObject **)PyArray_DATA(arr);
    PyObject **dst = (PyObject **)PyArray_DATA(result);

    for (npy_intp i = 0; i < size; i++) {
        if (!PyDual_Check(src[i])) {
            PyErr_SetString(PyExc_TypeError, "array elements must be Dual");
            Py_DECREF(arr); Py_DECREF(result);
            return NULL;
        }
        PyObject *r = fn((PyDualObject *)src[i], NULL);
        if (!r) { Py_DECREF(arr); Py_DECREF(result); return NULL; }
        dst[i] = r;
    }

    Py_DECREF(arr);
    return (PyObject *)result;
}

/* Binary dispatch */
typedef PyObject *(*binary_fn)(PyObject *, PyObject *);

typedef struct { const char *name; binary_fn fn; int is_pow; } binary_entry;

static const binary_entry binary_table[] = {
    {"add",           (binary_fn)Dual_add,      0},
    {"subtract",      (binary_fn)Dual_sub,      0},
    {"multiply",      (binary_fn)Dual_mul,      0},
    {"true_divide",   (binary_fn)Dual_truediv,  0},
    {"divide",        (binary_fn)Dual_truediv,  0},
    {"power",         NULL,                     1},
    {"maximum",       (binary_fn)Dual_maximum,  0},
    {"minimum",       (binary_fn)Dual_minimum,  0},
    {"arctan2",       (binary_fn)Dual_arctan2,  0},
    {"hypot",         (binary_fn)Dual_hypot,    0},
    {"copysign",      (binary_fn)Dual_copysign, 0},
    {"floor_divide",  (binary_fn)Dual_floordiv, 0},
    {"remainder",     (binary_fn)Dual_mod,      0},
    {NULL, NULL, 0}
};

/* apply_binary_array(name, lhs, rhs) -> result_ndarray or None */
static PyObject *mod_apply_binary_array(PyObject *Py_UNUSED(self), PyObject *args) {
    const char *name;
    PyObject *lhs_obj, *rhs_obj;
    if (!PyArg_ParseTuple(args, "sOO", &name, &lhs_obj, &rhs_obj)) return NULL;

    binary_fn fn = NULL;
    int is_pow = 0;
    for (const binary_entry *e = binary_table; e->name; e++) {
        if (strcmp(name, e->name) == 0) { fn = e->fn; is_pow = e->is_pow; break; }
    }
    if (!fn && !is_pow) Py_RETURN_NONE;

    int lhs_is_arr = PyArray_Check(lhs_obj);
    int rhs_is_arr = PyArray_Check(rhs_obj);

    if (lhs_is_arr && rhs_is_arr) {
        PyArrayObject *la = (PyArrayObject *)PyArray_FROM_OTF(
            lhs_obj, NPY_OBJECT, NPY_ARRAY_IN_ARRAY);
        PyArrayObject *ra = (PyArrayObject *)PyArray_FROM_OTF(
            rhs_obj, NPY_OBJECT, NPY_ARRAY_IN_ARRAY);
        if (!la || !ra) { Py_XDECREF(la); Py_XDECREF(ra); return NULL; }

        npy_intp lsize = PyArray_SIZE(la);
        npy_intp rsize = PyArray_SIZE(ra);
        if (lsize != rsize) {
            Py_DECREF(la); Py_DECREF(ra);
            Py_RETURN_NONE;
        }

        int ndim = PyArray_NDIM(la);
        npy_intp *shape = PyArray_DIMS(la);
        PyArrayObject *result = (PyArrayObject *)PyArray_SimpleNew(ndim, shape, NPY_OBJECT);
        if (!result) { Py_DECREF(la); Py_DECREF(ra); return NULL; }

        PyObject **ls = (PyObject **)PyArray_DATA(la);
        PyObject **rs = (PyObject **)PyArray_DATA(ra);
        PyObject **ds = (PyObject **)PyArray_DATA(result);

        for (npy_intp i = 0; i < lsize; i++) {
            PyObject *r;
            if (is_pow) r = Dual_pow(ls[i], rs[i], Py_None);
            else        r = fn(ls[i], rs[i]);
            if (!r) { Py_DECREF(la); Py_DECREF(ra); Py_DECREF(result); return NULL; }
            ds[i] = r;
        }
        Py_DECREF(la); Py_DECREF(ra);
        return (PyObject *)result;
    }

    if (lhs_is_arr && !rhs_is_arr) {
        PyArrayObject *la = (PyArrayObject *)PyArray_FROM_OTF(
            lhs_obj, NPY_OBJECT, NPY_ARRAY_IN_ARRAY);
        if (!la) return NULL;

        npy_intp size = PyArray_SIZE(la);
        int ndim = PyArray_NDIM(la);
        npy_intp *shape = PyArray_DIMS(la);
        PyArrayObject *result = (PyArrayObject *)PyArray_SimpleNew(ndim, shape, NPY_OBJECT);
        if (!result) { Py_DECREF(la); return NULL; }

        PyObject **ls = (PyObject **)PyArray_DATA(la);
        PyObject **ds = (PyObject **)PyArray_DATA(result);

        for (npy_intp i = 0; i < size; i++) {
            PyObject *r;
            if (is_pow) r = Dual_pow(ls[i], rhs_obj, Py_None);
            else        r = fn(ls[i], rhs_obj);
            if (!r) { Py_DECREF(la); Py_DECREF(result); return NULL; }
            ds[i] = r;
        }
        Py_DECREF(la);
        return (PyObject *)result;
    }

    if (!lhs_is_arr && rhs_is_arr) {
        PyArrayObject *ra = (PyArrayObject *)PyArray_FROM_OTF(
            rhs_obj, NPY_OBJECT, NPY_ARRAY_IN_ARRAY);
        if (!ra) return NULL;

        npy_intp size = PyArray_SIZE(ra);
        int ndim = PyArray_NDIM(ra);
        npy_intp *shape = PyArray_DIMS(ra);
        PyArrayObject *result = (PyArrayObject *)PyArray_SimpleNew(ndim, shape, NPY_OBJECT);
        if (!result) { Py_DECREF(ra); return NULL; }

        PyObject **rs = (PyObject **)PyArray_DATA(ra);
        PyObject **ds = (PyObject **)PyArray_DATA(result);

        for (npy_intp i = 0; i < size; i++) {
            PyObject *r;
            if (is_pow) r = Dual_pow(lhs_obj, rs[i], Py_None);
            else        r = fn(lhs_obj, rs[i]);
            if (!r) { Py_DECREF(ra); Py_DECREF(result); return NULL; }
            ds[i] = r;
        }
        Py_DECREF(ra);
        return (PyObject *)result;
    }

    Py_RETURN_NONE;
}

static PyMethodDef module_methods[] = {
    {"reset",      mod_reset,      METH_NOARGS,  "Reset the variable ID counter"},
    {"seed_array", mod_seed_array, METH_O,       "Create a list of seed Duals from a sequence of floats"},
    {"val_array",  mod_val_array,  METH_O,       "Extract primal values from a sequence of Duals"},
    {"der_array",  mod_der_array,  METH_VARARGS, "Get derivatives of a sequence of Duals w.r.t. a seed"},
    {"jac_matrix", mod_jac_matrix, METH_VARARGS, "Compute Jacobian matrix (flat) from results and seeds"},
    {"apply_unary_array",  mod_apply_unary_array,  METH_VARARGS, "Apply unary ufunc to object array of Duals"},
    {"apply_binary_array", mod_apply_binary_array, METH_VARARGS, "Apply binary ufunc to object array(s) of Duals"},
    {NULL}
};

/* ---- Module init ---- */

static int module_exec(PyObject *m) {
    if (_import_array() < 0) return -1;
    if (PyType_Ready(&PyDual_Type) < 0) return -1;

    /* Set __array_priority__ via tp_dict (static types are immutable in 3.12+) */
    PyObject *prio = PyFloat_FromDouble(20.0);
    if (!prio) return -1;
    if (PyDict_SetItemString(PyDual_Type.tp_dict, "__array_priority__", prio) < 0) {
        Py_DECREF(prio);
        return -1;
    }
    Py_DECREF(prio);

    Py_INCREF(&PyDual_Type);
    if (PyModule_AddObject(m, "Dual", (PyObject *)&PyDual_Type) < 0) {
        Py_DECREF(&PyDual_Type);
        return -1;
    }
    return 0;
}

static PyModuleDef_Slot module_slots[] = {
    {Py_mod_exec, module_exec},
    {0, NULL}
};

static struct PyModuleDef fastdual_module = {
    PyModuleDef_HEAD_INIT,
    .m_name    = "_fastdual",
    .m_doc     = "C extension for dual number automatic differentiation",
    .m_size    = 0,
    .m_methods = module_methods,
    .m_slots   = module_slots,
};

PyMODINIT_FUNC PyInit__fastdual(void) {
    return PyModuleDef_Init(&fastdual_module);
}
