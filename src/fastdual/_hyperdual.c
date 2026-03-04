#define PY_SSIZE_T_CLEAN
#include <Python.h>
#include <structmember.h>
#include <math.h>

/* Python 3.10/3.11 compat — these were added in 3.12 */
#ifndef Py_T_DOUBLE
#define Py_T_DOUBLE T_DOUBLE
#endif
#ifndef Py_READONLY
#define Py_READONLY READONLY
#endif

#define NPY_NO_DEPRECATED_API NPY_1_7_API_VERSION
#include <numpy/arrayobject.h>

/* ======================================================================
 * PyHyperDualObject — 48 bytes: PyObject_HEAD + 4 doubles
 * ====================================================================== */

typedef struct {
    PyObject_HEAD
    double f, f1, f2, f12;
} PyHyperDualObject;

static PyTypeObject PyHyperDual_Type;  /* forward declaration */

/* ---- freelist ---- */

#define HD_FREELIST_MAX 64
static PyHyperDualObject *hd_freelist[HD_FREELIST_MAX];
static int hd_freelist_count = 0;

static void
HyperDual_dealloc(PyHyperDualObject *self)
{
    if (hd_freelist_count < HD_FREELIST_MAX) {
        hd_freelist[hd_freelist_count++] = self;
    } else {
        Py_TYPE(self)->tp_free((PyObject *)self);
    }
}

/* ---- helpers ---- */

/* Error check after PyFloat_AsDouble / PyLong_AsDouble */
#define HD_CONV_FAILED(d) ((d) == -1.0 && PyErr_Occurred())

static inline double hd_as_double(PyObject *obj) {
    if (Py_TYPE(obj) == &PyHyperDual_Type)
        return ((PyHyperDualObject *)obj)->f;
    if (PyFloat_Check(obj))
        return PyFloat_AS_DOUBLE(obj);
    if (PyLong_Check(obj))
        return PyLong_AsDouble(obj);
    return PyFloat_AsDouble(obj);
}

static inline PyHyperDualObject *
PyHyperDual_New(double f, double f1, double f2, double f12) {
    PyHyperDualObject *self;
    if (hd_freelist_count > 0) {
        self = hd_freelist[--hd_freelist_count];
        Py_SET_TYPE(self, &PyHyperDual_Type);
        Py_SET_REFCNT(self, 1);
    } else {
        self = PyObject_New(PyHyperDualObject, &PyHyperDual_Type);
        if (!self) return NULL;
    }
    self->f = f;
    self->f1 = f1;
    self->f2 = f2;
    self->f12 = f12;
    return self;
}

/* ---- tp_init ---- */

static int
HyperDual_init(PyHyperDualObject *self, PyObject *args, PyObject *kwds)
{
    static char *kwlist[] = {"f", "f1", "f2", "f12", NULL};
    PyObject *f_obj = NULL;
    double f1 = 0.0, f2 = 0.0, f12 = 0.0;

    if (!PyArg_ParseTupleAndKeywords(args, kwds, "O|ddd", kwlist,
                                     &f_obj, &f1, &f2, &f12))
        return -1;

    double f = PyFloat_AsDouble(f_obj);
    if (PyErr_Occurred()) return -1;

    self->f = f;
    self->f1 = f1;
    self->f2 = f2;
    self->f12 = f12;
    return 0;
}

static PyObject *
HyperDual_new(PyTypeObject *type, PyObject *args, PyObject *kwds)
{
    PyHyperDualObject *self = (PyHyperDualObject *)type->tp_alloc(type, 0);
    if (self) {
        self->f = 0.0;
        self->f1 = 0.0;
        self->f2 = 0.0;
        self->f12 = 0.0;
    }
    return (PyObject *)self;
}

/* ---- repr ---- */

static PyObject *
HyperDual_repr(PyHyperDualObject *self)
{
    char buf[128];
    snprintf(buf, sizeof(buf), "HyperDual(%g, f1=%g, f2=%g, f12=%g)",
             self->f, self->f1, self->f2, self->f12);
    return PyUnicode_FromString(buf);
}

/* ---- conversions ---- */

static PyObject *
HyperDual_float(PyHyperDualObject *self)
{
    return PyFloat_FromDouble(self->f);
}

static PyObject *
HyperDual_int(PyHyperDualObject *self)
{
    return PyLong_FromDouble(self->f);
}

static int
HyperDual_bool(PyHyperDualObject *self)
{
    return self->f != 0.0;
}

/* ======================================================================
 * Number protocol — arithmetic
 * ====================================================================== */

static PyObject *
HyperDual_add(PyObject *left, PyObject *right)
{
    int l_hd = Py_TYPE(left) == &PyHyperDual_Type;
    int r_hd = Py_TYPE(right) == &PyHyperDual_Type;

    if (l_hd && r_hd) {
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        return (PyObject *)PyHyperDual_New(
            a->f + b->f, a->f1 + b->f1, a->f2 + b->f2, a->f12 + b->f12);
    }
    if (l_hd) {
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        double b = hd_as_double(right);
        if (HD_CONV_FAILED(b)) return NULL;
        return (PyObject *)PyHyperDual_New(a->f + b, a->f1, a->f2, a->f12);
    }
    if (r_hd) {
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        double a = hd_as_double(left);
        if (HD_CONV_FAILED(a)) return NULL;
        return (PyObject *)PyHyperDual_New(a + b->f, b->f1, b->f2, b->f12);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *
HyperDual_sub(PyObject *left, PyObject *right)
{
    int l_hd = Py_TYPE(left) == &PyHyperDual_Type;
    int r_hd = Py_TYPE(right) == &PyHyperDual_Type;

    if (l_hd && r_hd) {
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        return (PyObject *)PyHyperDual_New(
            a->f - b->f, a->f1 - b->f1, a->f2 - b->f2, a->f12 - b->f12);
    }
    if (l_hd) {
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        double b = hd_as_double(right);
        if (HD_CONV_FAILED(b)) return NULL;
        return (PyObject *)PyHyperDual_New(a->f - b, a->f1, a->f2, a->f12);
    }
    if (r_hd) {
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        double a = hd_as_double(left);
        if (HD_CONV_FAILED(a)) return NULL;
        return (PyObject *)PyHyperDual_New(a - b->f, -b->f1, -b->f2, -b->f12);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *
HyperDual_mul(PyObject *left, PyObject *right)
{
    int l_hd = Py_TYPE(left) == &PyHyperDual_Type;
    int r_hd = Py_TYPE(right) == &PyHyperDual_Type;

    if (l_hd && r_hd) {
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        return (PyObject *)PyHyperDual_New(
            a->f * b->f,
            a->f1 * b->f + a->f * b->f1,
            a->f2 * b->f + a->f * b->f2,
            a->f12 * b->f + a->f1 * b->f2 + a->f2 * b->f1 + a->f * b->f12);
    }
    if (l_hd) {
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        double b = hd_as_double(right);
        if (HD_CONV_FAILED(b)) return NULL;
        return (PyObject *)PyHyperDual_New(
            a->f * b, a->f1 * b, a->f2 * b, a->f12 * b);
    }
    if (r_hd) {
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        double a = hd_as_double(left);
        if (HD_CONV_FAILED(a)) return NULL;
        return (PyObject *)PyHyperDual_New(
            a * b->f, a * b->f1, a * b->f2, a * b->f12);
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *
HyperDual_truediv(PyObject *left, PyObject *right)
{
    int l_hd = Py_TYPE(left) == &PyHyperDual_Type;
    int r_hd = Py_TYPE(right) == &PyHyperDual_Type;

    if (l_hd && r_hd) {
        /* a/b via quotient rule: compute 1/b then multiply */
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        double inv = 1.0 / b->f;
        double inv2 = inv * inv;
        double inv3 = inv2 * inv;
        /* 1/b */
        double rf  = inv;
        double rf1 = -inv2 * b->f1;
        double rf2 = -inv2 * b->f2;
        double rf12 = 2.0 * inv3 * b->f1 * b->f2 - inv2 * b->f12;
        /* a * (1/b) */
        return (PyObject *)PyHyperDual_New(
            a->f * rf,
            a->f1 * rf + a->f * rf1,
            a->f2 * rf + a->f * rf2,
            a->f12 * rf + a->f1 * rf2 + a->f2 * rf1 + a->f * rf12);
    }
    if (l_hd) {
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        double b = hd_as_double(right);
        if (HD_CONV_FAILED(b)) return NULL;
        double inv = 1.0 / b;
        return (PyObject *)PyHyperDual_New(
            a->f * inv, a->f1 * inv, a->f2 * inv, a->f12 * inv);
    }
    if (r_hd) {
        /* scalar / HyperDual */
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        double a = hd_as_double(left);
        if (HD_CONV_FAILED(a)) return NULL;
        double inv = 1.0 / b->f;
        double inv2 = inv * inv;
        double inv3 = inv2 * inv;
        return (PyObject *)PyHyperDual_New(
            a * inv,
            -a * inv2 * b->f1,
            -a * inv2 * b->f2,
            a * (2.0 * inv3 * b->f1 * b->f2 - inv2 * b->f12));
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *
HyperDual_pow(PyObject *left, PyObject *right, PyObject *mod)
{
    int l_hd = Py_TYPE(left) == &PyHyperDual_Type;
    int r_hd = Py_TYPE(right) == &PyHyperDual_Type;

    if (l_hd && r_hd) {
        /* a^b = exp(b * ln(a)) — delegate to methods */
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        /* ln(a) */
        double la = log(a->f);
        double inv = 1.0 / a->f;
        double inv2 = inv * inv;
        double la_f1 = a->f1 * inv;
        double la_f2 = a->f2 * inv;
        double la_f12 = a->f12 * inv - a->f1 * a->f2 * inv2;
        /* b * ln(a) */
        double m_f = b->f * la;
        double m_f1 = b->f1 * la + b->f * la_f1;
        double m_f2 = b->f2 * la + b->f * la_f2;
        double m_f12 = b->f12 * la + b->f1 * la_f2 + b->f2 * la_f1 + b->f * la_f12;
        /* exp(b * ln(a)) */
        double e = exp(m_f);
        return (PyObject *)PyHyperDual_New(
            e,
            e * m_f1,
            e * m_f2,
            e * (m_f12 + m_f1 * m_f2));
    }
    if (l_hd) {
        /* HD ^ scalar: f(x) = x^p */
        PyHyperDualObject *a = (PyHyperDualObject *)left;
        double p = hd_as_double(right);
        if (HD_CONV_FAILED(p)) return NULL;
        double val = pow(a->f, p);
        double gp = p * pow(a->f, p - 1.0);
        double gpp = p * (p - 1.0) * pow(a->f, p - 2.0);
        return (PyObject *)PyHyperDual_New(
            val,
            gp * a->f1,
            gp * a->f2,
            gpp * a->f1 * a->f2 + gp * a->f12);
    }
    if (r_hd) {
        /* scalar ^ HD: c^y = exp(y * ln(c)) */
        PyHyperDualObject *b = (PyHyperDualObject *)right;
        double c = hd_as_double(left);
        if (HD_CONV_FAILED(c)) return NULL;
        double lnc = log(c);
        /* y * ln(c) */
        double m_f = b->f * lnc;
        double m_f1 = b->f1 * lnc;
        double m_f2 = b->f2 * lnc;
        double m_f12 = b->f12 * lnc;
        /* exp */
        double e = exp(m_f);
        return (PyObject *)PyHyperDual_New(
            e,
            e * m_f1,
            e * m_f2,
            e * (m_f12 + m_f1 * m_f2));
    }
    Py_RETURN_NOTIMPLEMENTED;
}

static PyObject *
HyperDual_neg(PyHyperDualObject *self)
{
    return (PyObject *)PyHyperDual_New(-self->f, -self->f1, -self->f2, -self->f12);
}

static PyObject *
HyperDual_pos(PyHyperDualObject *self)
{
    return (PyObject *)PyHyperDual_New(self->f, self->f1, self->f2, self->f12);
}

static PyObject *
HyperDual_abs(PyHyperDualObject *self)
{
    if (self->f >= 0.0)
        return (PyObject *)PyHyperDual_New(self->f, self->f1, self->f2, self->f12);
    return (PyObject *)PyHyperDual_New(-self->f, -self->f1, -self->f2, -self->f12);
}

static PyNumberMethods HyperDual_as_number = {
    .nb_add         = HyperDual_add,
    .nb_subtract    = HyperDual_sub,
    .nb_multiply    = HyperDual_mul,
    .nb_true_divide = HyperDual_truediv,
    .nb_power       = HyperDual_pow,
    .nb_negative    = (unaryfunc)HyperDual_neg,
    .nb_positive    = (unaryfunc)HyperDual_pos,
    .nb_absolute    = (unaryfunc)HyperDual_abs,
    .nb_bool        = (inquiry)HyperDual_bool,
    .nb_float       = (unaryfunc)HyperDual_float,
    .nb_int         = (unaryfunc)HyperDual_int,
};

/* ======================================================================
 * Transcendental methods — macro-based
 * ====================================================================== */

/* sin: g=sin, g'=cos, g''=-sin */
static PyObject *
HyperDual_sin(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double s = sin(x), c = cos(x);
    return (PyObject *)PyHyperDual_New(
        s, c * self->f1, c * self->f2,
        c * self->f12 - s * self->f1 * self->f2);
}

/* cos: g=cos, g'=-sin, g''=-cos */
static PyObject *
HyperDual_cos(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double s = sin(x), c = cos(x);
    return (PyObject *)PyHyperDual_New(
        c, -s * self->f1, -s * self->f2,
        -s * self->f12 - c * self->f1 * self->f2);
}

/* tan: g=tan, g'=sec^2, g''=2*tan*sec^2 */
static PyObject *
HyperDual_tan(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double t = tan(self->f);
    double sec2 = 1.0 + t * t;
    double gpp = 2.0 * t * sec2;
    return (PyObject *)PyHyperDual_New(
        t, sec2 * self->f1, sec2 * self->f2,
        gpp * self->f1 * self->f2 + sec2 * self->f12);
}

/* exp: g=exp, g'=exp, g''=exp */
static PyObject *
HyperDual_exp(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double e = exp(self->f);
    return (PyObject *)PyHyperDual_New(
        e, e * self->f1, e * self->f2,
        e * (self->f12 + self->f1 * self->f2));
}

/* log: g=log, g'=1/x, g''=-1/x^2 */
static PyObject *
HyperDual_log(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double inv = 1.0 / self->f;
    double inv2 = inv * inv;
    return (PyObject *)PyHyperDual_New(
        log(self->f),
        self->f1 * inv,
        self->f2 * inv,
        self->f12 * inv - self->f1 * self->f2 * inv2);
}

/* sqrt: g=sqrt, g'=1/(2*sqrt), g''=-1/(4*x^(3/2)) */
static PyObject *
HyperDual_sqrt(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double s = sqrt(self->f);
    double inv2s = 0.5 / s;
    return (PyObject *)PyHyperDual_New(
        s,
        inv2s * self->f1,
        inv2s * self->f2,
        inv2s * self->f12 - 0.25 / (s * self->f) * self->f1 * self->f2);
}

/* arcsin: g'=1/sqrt(1-x^2), g''=x/(1-x^2)^(3/2) */
static PyObject *
HyperDual_arcsin(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double omx2 = 1.0 - x * x;
    double s = sqrt(omx2);
    double gp = 1.0 / s;
    double gpp = x / (omx2 * s);
    return (PyObject *)PyHyperDual_New(
        asin(x), gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* arccos: g'=-1/sqrt(1-x^2), g''=-x/(1-x^2)^(3/2) */
static PyObject *
HyperDual_arccos(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double omx2 = 1.0 - x * x;
    double s = sqrt(omx2);
    double gp = -1.0 / s;
    double gpp = -x / (omx2 * s);
    return (PyObject *)PyHyperDual_New(
        acos(x), gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* arctan: g'=1/(1+x^2), g''=-2x/(1+x^2)^2 */
static PyObject *
HyperDual_arctan(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double opx2 = 1.0 + x * x;
    double gp = 1.0 / opx2;
    double gpp = -2.0 * x * gp * gp;
    return (PyObject *)PyHyperDual_New(
        atan(x), gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* sinh: g'=cosh, g''=sinh */
static PyObject *
HyperDual_sinh(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double s = sinh(self->f);
    double c = cosh(self->f);
    return (PyObject *)PyHyperDual_New(
        s, c * self->f1, c * self->f2,
        c * self->f12 + s * self->f1 * self->f2);
}

/* cosh: g'=sinh, g''=cosh */
static PyObject *
HyperDual_cosh(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double s = sinh(self->f);
    double c = cosh(self->f);
    return (PyObject *)PyHyperDual_New(
        c, s * self->f1, s * self->f2,
        s * self->f12 + c * self->f1 * self->f2);
}

/* tanh: g'=sech^2=1-tanh^2, g''=-2*tanh*sech^2 */
static PyObject *
HyperDual_tanh(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double t = tanh(self->f);
    double sech2 = 1.0 - t * t;
    return (PyObject *)PyHyperDual_New(
        t, sech2 * self->f1, sech2 * self->f2,
        sech2 * self->f12 - 2.0 * t * sech2 * self->f1 * self->f2);
}

/* arcsinh: g'=1/sqrt(1+x^2), g''=-x/(1+x^2)^(3/2) */
static PyObject *
HyperDual_arcsinh(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double opx2 = 1.0 + x * x;
    double s = sqrt(opx2);
    double gp = 1.0 / s;
    double gpp = -x / (opx2 * s);
    return (PyObject *)PyHyperDual_New(
        asinh(x), gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* arccosh: g'=1/sqrt(x^2-1), g''=-x/(x^2-1)^(3/2) */
static PyObject *
HyperDual_arccosh(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double xm1 = x * x - 1.0;
    double s = sqrt(xm1);
    double gp = 1.0 / s;
    double gpp = -x / (xm1 * s);
    return (PyObject *)PyHyperDual_New(
        acosh(x), gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* arctanh: g'=1/(1-x^2), g''=2x/(1-x^2)^2 */
static PyObject *
HyperDual_arctanh(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double omx2 = 1.0 - x * x;
    double gp = 1.0 / omx2;
    double gpp = 2.0 * x * gp * gp;
    return (PyObject *)PyHyperDual_New(
        atanh(x), gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* log2: log(x)/log(2) */
static PyObject *
HyperDual_log2(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double ln2 = log(2.0);
    double inv_ln2 = 1.0 / ln2;
    double inv = 1.0 / self->f;
    double inv2 = inv * inv;
    return (PyObject *)PyHyperDual_New(
        log(self->f) * inv_ln2,
        self->f1 * inv * inv_ln2,
        self->f2 * inv * inv_ln2,
        (self->f12 * inv - self->f1 * self->f2 * inv2) * inv_ln2);
}

/* log10: log(x)/log(10) */
static PyObject *
HyperDual_log10(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double ln10 = log(10.0);
    double inv_ln10 = 1.0 / ln10;
    double inv = 1.0 / self->f;
    double inv2 = inv * inv;
    return (PyObject *)PyHyperDual_New(
        log(self->f) * inv_ln10,
        self->f1 * inv * inv_ln10,
        self->f2 * inv * inv_ln10,
        (self->f12 * inv - self->f1 * self->f2 * inv2) * inv_ln10);
}

/* exp2: 2^x, g'=ln2*2^x, g''=(ln2)^2*2^x */
static PyObject *
HyperDual_exp2(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    static const double LN2 = 0.6931471805599453;  /* log(2) */
    double val = exp2(x);
    double gp = LN2 * val;
    double gpp = LN2 * gp;
    return (PyObject *)PyHyperDual_New(
        val, gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* log1p: g=log(1+x), g'=1/(1+x), g''=-1/(1+x)^2 */
static PyObject *
HyperDual_log1p(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double opx = 1.0 + x;
    double gp = 1.0 / opx;
    double gpp = -gp * gp;
    return (PyObject *)PyHyperDual_New(
        log1p(x), gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* expm1: g=exp(x)-1, g'=exp(x), g''=exp(x) */
static PyObject *
HyperDual_expm1(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double e = exp(self->f);
    return (PyObject *)PyHyperDual_New(
        e - 1.0, e * self->f1, e * self->f2,
        e * (self->f12 + self->f1 * self->f2));
}

/* cbrt: g=x^(1/3), g'=(1/3)*x^(-2/3), g''=(-2/9)*x^(-5/3) */
static PyObject *
HyperDual_cbrt(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double x = self->f;
    double c = cbrt(x);
    /* g' = 1/(3*x^(2/3)) = 1/(3*c^2) */
    double c2 = c * c;
    double gp = 1.0 / (3.0 * c2);
    /* g'' = -2/(9*x^(5/3)) = -2*gp/(3*x) */
    double gpp = -2.0 * gp / (3.0 * x);
    return (PyObject *)PyHyperDual_New(
        c, gp * self->f1, gp * self->f2,
        gpp * self->f1 * self->f2 + gp * self->f12);
}

/* ---- manual methods ---- */

static PyObject *
HyperDual_square(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    return (PyObject *)PyHyperDual_New(
        self->f * self->f,
        2.0 * self->f * self->f1,
        2.0 * self->f * self->f2,
        2.0 * (self->f * self->f12 + self->f1 * self->f2));
}

static PyObject *
HyperDual_sign(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    double s = (self->f > 0.0) ? 1.0 : ((self->f < 0.0) ? -1.0 : 0.0);
    return (PyObject *)PyHyperDual_New(s, 0.0, 0.0, 0.0);
}

static PyObject *
HyperDual_conjugate(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    return (PyObject *)PyHyperDual_New(self->f, self->f1, self->f2, self->f12);
}

static PyObject *
HyperDual_floor(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    return (PyObject *)PyHyperDual_New(floor(self->f), 0.0, 0.0, 0.0);
}

static PyObject *
HyperDual_ceil(PyHyperDualObject *self, PyObject *Py_UNUSED(ig))
{
    return (PyObject *)PyHyperDual_New(ceil(self->f), 0.0, 0.0, 0.0);
}

/* ======================================================================
 * Rich comparison — on primal only
 * ====================================================================== */

static PyObject *
HyperDual_richcompare(PyObject *self, PyObject *other, int op)
{
    double a = ((PyHyperDualObject *)self)->f;
    double b;
    if (Py_TYPE(other) == &PyHyperDual_Type)
        b = ((PyHyperDualObject *)other)->f;
    else {
        b = PyFloat_AsDouble(other);
        if (HD_CONV_FAILED(b)) {
            PyErr_Clear();
            Py_RETURN_NOTIMPLEMENTED;
        }
    }
    int result;
    switch (op) {
        case Py_LT: result = a < b;  break;
        case Py_LE: result = a <= b; break;
        case Py_EQ: result = a == b; break;
        case Py_NE: result = a != b; break;
        case Py_GT: result = a > b;  break;
        case Py_GE: result = a >= b; break;
        default: Py_RETURN_NOTIMPLEMENTED;
    }
    if (result) Py_RETURN_TRUE;
    Py_RETURN_FALSE;
}

/* ======================================================================
 * Members & methods
 * ====================================================================== */

static PyMemberDef HyperDual_members[] = {
    {"f",   Py_T_DOUBLE, offsetof(PyHyperDualObject, f),   Py_READONLY, "primal value"},
    {"f1",  Py_T_DOUBLE, offsetof(PyHyperDualObject, f1),  Py_READONLY, "first derivative direction 1"},
    {"f2",  Py_T_DOUBLE, offsetof(PyHyperDualObject, f2),  Py_READONLY, "first derivative direction 2"},
    {"f12", Py_T_DOUBLE, offsetof(PyHyperDualObject, f12), Py_READONLY, "mixed second derivative"},
    {NULL}
};

static PyMethodDef HyperDual_methods[] = {
    {"sin",       (PyCFunction)HyperDual_sin,       METH_NOARGS, NULL},
    {"cos",       (PyCFunction)HyperDual_cos,       METH_NOARGS, NULL},
    {"tan",       (PyCFunction)HyperDual_tan,       METH_NOARGS, NULL},
    {"exp",       (PyCFunction)HyperDual_exp,       METH_NOARGS, NULL},
    {"log",       (PyCFunction)HyperDual_log,       METH_NOARGS, NULL},
    {"sqrt",      (PyCFunction)HyperDual_sqrt,      METH_NOARGS, NULL},
    {"square",    (PyCFunction)HyperDual_square,    METH_NOARGS, NULL},
    {"arcsin",    (PyCFunction)HyperDual_arcsin,    METH_NOARGS, NULL},
    {"arccos",    (PyCFunction)HyperDual_arccos,    METH_NOARGS, NULL},
    {"arctan",    (PyCFunction)HyperDual_arctan,    METH_NOARGS, NULL},
    {"sinh",      (PyCFunction)HyperDual_sinh,      METH_NOARGS, NULL},
    {"cosh",      (PyCFunction)HyperDual_cosh,      METH_NOARGS, NULL},
    {"tanh",      (PyCFunction)HyperDual_tanh,      METH_NOARGS, NULL},
    {"arcsinh",   (PyCFunction)HyperDual_arcsinh,   METH_NOARGS, NULL},
    {"arccosh",   (PyCFunction)HyperDual_arccosh,   METH_NOARGS, NULL},
    {"arctanh",   (PyCFunction)HyperDual_arctanh,   METH_NOARGS, NULL},
    {"log2",      (PyCFunction)HyperDual_log2,      METH_NOARGS, NULL},
    {"log10",     (PyCFunction)HyperDual_log10,     METH_NOARGS, NULL},
    {"exp2",      (PyCFunction)HyperDual_exp2,      METH_NOARGS, NULL},
    {"log1p",     (PyCFunction)HyperDual_log1p,     METH_NOARGS, NULL},
    {"expm1",     (PyCFunction)HyperDual_expm1,     METH_NOARGS, NULL},
    {"cbrt",      (PyCFunction)HyperDual_cbrt,      METH_NOARGS, NULL},
    {"sign",      (PyCFunction)HyperDual_sign,      METH_NOARGS, NULL},
    {"conjugate", (PyCFunction)HyperDual_conjugate, METH_NOARGS, NULL},
    {"floor",     (PyCFunction)HyperDual_floor,     METH_NOARGS, NULL},
    {"ceil",      (PyCFunction)HyperDual_ceil,      METH_NOARGS, NULL},
    {"fabs",      (PyCFunction)HyperDual_abs,       METH_NOARGS, NULL},
    {NULL}
};

/* ======================================================================
 * Type object
 * ====================================================================== */

static PyTypeObject PyHyperDual_Type = {
    PyVarObject_HEAD_INIT(NULL, 0)
    .tp_name      = "fastdual._hyperdual.HyperDual",
    .tp_basicsize = sizeof(PyHyperDualObject),
    .tp_dealloc   = (destructor)HyperDual_dealloc,
    .tp_flags     = Py_TPFLAGS_DEFAULT,
    .tp_doc       = "Hyper-dual number (f, f1, f2, f12) for second-order derivatives",
    .tp_new       = HyperDual_new,
    .tp_init      = (initproc)HyperDual_init,
    .tp_repr      = (reprfunc)HyperDual_repr,
    .tp_as_number = &HyperDual_as_number,
    .tp_richcompare = HyperDual_richcompare,
    .tp_members   = HyperDual_members,
    .tp_methods   = HyperDual_methods,
};

/* ======================================================================
 * Module function: hessian_matrix(fun, x)
 *
 * Moves the n*(n+1)/2 seed-construction loop into C.
 * ====================================================================== */

static PyObject *
mod_hessian_matrix(PyObject *module, PyObject *args)
{
    PyObject *fun;
    PyArrayObject *x_arr = NULL;

    if (!PyArg_ParseTuple(args, "OO&", &fun,
                          PyArray_Converter, &x_arr))
        return NULL;

    /* Ensure contiguous double array */
    PyArrayObject *x = (PyArrayObject *)PyArray_FROM_OTF(
        (PyObject *)x_arr, NPY_DOUBLE, NPY_ARRAY_IN_ARRAY);
    Py_DECREF(x_arr);
    if (!x) return NULL;

    npy_intp n = PyArray_SIZE(x);
    double *xd = (double *)PyArray_DATA(x);

    /* Create output H (n x n) */
    npy_intp dims[2] = {n, n};
    PyArrayObject *H = (PyArrayObject *)PyArray_ZEROS(2, dims, NPY_DOUBLE, 0);
    if (!H) { Py_DECREF(x); return NULL; }
    double *hd = (double *)PyArray_DATA(H);

    /* Pre-allocate seed list and n HyperDual objects once */
    PyObject *hx = PyList_New(n);
    if (!hx) { Py_DECREF(x); Py_DECREF(H); return NULL; }

    PyHyperDualObject **seeds = (PyHyperDualObject **)PyMem_Malloc(
        n * sizeof(PyHyperDualObject *));
    if (!seeds) { Py_DECREF(hx); Py_DECREF(x); Py_DECREF(H); return NULL; }

    for (npy_intp k = 0; k < n; k++) {
        seeds[k] = PyHyperDual_New(xd[k], 0.0, 0.0, 0.0);
        if (!seeds[k]) {
            for (npy_intp m = 0; m < k; m++) Py_DECREF(seeds[m]);
            PyMem_Free(seeds);
            Py_DECREF(hx); Py_DECREF(x); Py_DECREF(H);
            return NULL;
        }
        Py_INCREF(seeds[k]);  /* list will borrow, we keep our own ref */
        PyList_SET_ITEM(hx, k, (PyObject *)seeds[k]);
    }

    for (npy_intp i = 0; i < n; i++) {
        for (npy_intp j = i; j < n; j++) {
            /* Mutate seeds in-place: set f1/f2 for this (i,j) pair */
            seeds[i]->f1 = 1.0;
            seeds[j]->f2 = 1.0;

            /* Call fun(hx) */
            PyObject *result = PyObject_CallOneArg(fun, hx);
            if (!result) {
                for (npy_intp k = 0; k < n; k++) Py_DECREF(seeds[k]);
                PyMem_Free(seeds);
                Py_DECREF(hx); Py_DECREF(x); Py_DECREF(H);
                return NULL;
            }

            /* Extract f12 */
            double f12;
            if (Py_TYPE(result) == &PyHyperDual_Type) {
                f12 = ((PyHyperDualObject *)result)->f12;
            } else {
                PyObject *attr = PyObject_GetAttrString(result, "f12");
                if (!attr) {
                    Py_DECREF(result);
                    for (npy_intp k = 0; k < n; k++) Py_DECREF(seeds[k]);
                    PyMem_Free(seeds);
                    Py_DECREF(hx); Py_DECREF(x); Py_DECREF(H);
                    return NULL;
                }
                f12 = PyFloat_AsDouble(attr);
                Py_DECREF(attr);
                if (HD_CONV_FAILED(f12)) {
                    Py_DECREF(result);
                    for (npy_intp k = 0; k < n; k++) Py_DECREF(seeds[k]);
                    PyMem_Free(seeds);
                    Py_DECREF(hx); Py_DECREF(x); Py_DECREF(H);
                    return NULL;
                }
            }
            Py_DECREF(result);

            hd[i * n + j] = f12;
            hd[j * n + i] = f12;  /* symmetry */

            /* Reset seeds for next iteration */
            seeds[i]->f1 = 0.0;
            seeds[j]->f2 = 0.0;
        }
    }

    for (npy_intp k = 0; k < n; k++) Py_DECREF(seeds[k]);
    PyMem_Free(seeds);
    Py_DECREF(hx);

    Py_DECREF(x);
    return (PyObject *)H;
}

/* ======================================================================
 * Module definition — PEP 489 multi-phase
 * ====================================================================== */

static PyMethodDef module_methods[] = {
    {"hessian_matrix", mod_hessian_matrix, METH_VARARGS,
     "Compute Hessian matrix via hyper-dual numbers.\n\n"
     "Parameters: fun (callable), x (1-D array of floats)\n"
     "Returns: ndarray (n, n)"},
    {NULL}
};

static int module_exec(PyObject *m) {
    if (_import_array() < 0) return -1;
    if (PyType_Ready(&PyHyperDual_Type) < 0) return -1;

    Py_INCREF(&PyHyperDual_Type);
    if (PyModule_AddObject(m, "HyperDual", (PyObject *)&PyHyperDual_Type) < 0) {
        Py_DECREF(&PyHyperDual_Type);
        return -1;
    }
    return 0;
}

static PyModuleDef_Slot module_slots[] = {
    {Py_mod_exec, module_exec},
    {0, NULL}
};

static struct PyModuleDef hyperdual_module = {
    PyModuleDef_HEAD_INIT,
    .m_name    = "_hyperdual",
    .m_doc     = "C extension for hyper-dual number second-order automatic differentiation",
    .m_size    = 0,
    .m_methods = module_methods,
    .m_slots   = module_slots,
};

PyMODINIT_FUNC PyInit__hyperdual(void) {
    return PyModuleDef_Init(&hyperdual_module);
}
