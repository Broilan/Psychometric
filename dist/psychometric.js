function m(r) {
  if (r.length === 0)
    return 0;
  var t = r[0], e = 0, a;
  if (typeof t != "number")
    return Number.NaN;
  for (var n = 1; n < r.length; n++) {
    if (typeof r[n] != "number")
      return Number.NaN;
    a = t + r[n], Math.abs(t) >= Math.abs(r[n]) ? e += t - a + r[n] : e += r[n] - a + t, t = a;
  }
  return t + e;
}
function h(r) {
  if (r.length === 0)
    throw new Error("mean requires at least one data point");
  return m(r) / r.length;
}
function p(r, t) {
  var e = h(r), a = 0, n, o;
  for (o = 0; o < r.length; o++)
    n = r[o] - e, a += n * n;
  return a;
}
function w(r) {
  if (r.length === 0)
    throw new Error("variance requires at least one data point");
  return p(r) / r.length;
}
function u(r) {
  if (r.length === 1)
    return 0;
  var t = w(r);
  return Math.sqrt(t);
}
function g(r, t) {
  if (r.length !== t.length)
    throw new Error("sampleCovariance requires samples with equal lengths");
  if (r.length < 2)
    throw new Error(
      "sampleCovariance requires at least two data points in each sample"
    );
  for (var e = h(r), a = h(t), n = 0, o = 0; o < r.length; o++)
    n += (r[o] - e) * (t[o] - a);
  var i = r.length - 1;
  return n / i;
}
function q(r, t, e, a, n) {
  if ((!r || !t) && (e === void 0 || a === void 0 || n === void 0))
    throw new Error("Either provide datasets x and y, or provide stdDevX, stdDevY, and cov.");
  const o = e ?? (r ? u(r) : void 0), i = a ?? (t ? u(t) : void 0), d = n ?? (r && t ? g(r, t) : void 0);
  if (o === void 0 || i === void 0 || d === void 0)
    throw new Error("Insufficient data to calculate Pearson correlation coefficient.");
  return d / (o * i);
}
function C(r, t, e, a) {
  if ((!r || !t) && (!e || !a))
    throw new Error("Either provide datasets x and y, or provide rankX and rankY.");
  const n = (s) => s.map((l, c) => ({ val: l, index: c })).sort((l, c) => l.val - c.val).map((l, c) => ({ ...l, rank: c + 1 })).sort((l, c) => l.index - c.index).map((l) => l.rank), o = e ?? (r ? n(r) : void 0), i = a ?? (t ? n(t) : void 0);
  if (!o || !i)
    throw new Error("Insufficient data to calculate Spearman correlation coefficient.");
  const d = o.reduce((s, l, c) => s + (l - i[c]) ** 2, 0), f = o.length;
  return 1 - 6 * d / (f * (f ** 2 - 1));
}
function M(r, t, e, a, n) {
  if ((!r || !t) && (e === void 0 || a === void 0 || n === void 0))
    throw new Error("Either provide binary and continuous arrays, or provide mean1, mean0, and overallSD.");
  const o = (r == null ? void 0 : r.length) ?? (t == null ? void 0 : t.length) ?? 0, i = r ? r.filter((c) => c === 1).length : void 0, d = o - (i ?? 0), f = e ?? (r && t ? h(t.filter((c, v) => r[v] === 1)) : void 0), s = a ?? (r && t ? h(t.filter((c, v) => r[v] === 0)) : void 0), l = n ?? (t ? u(t) : void 0);
  if (f === void 0 || s === void 0 || l === void 0 || i === void 0 || d === void 0)
    throw new Error("Insufficient data to calculate point-biserial correlation coefficient.");
  return (f - s) / l * Math.sqrt(i * d / o ** 2);
}
function R(r, t, e, a, n) {
  if (n) {
    if (n.length !== 2 || n[0].length !== 2 || n[1].length !== 2)
      throw new Error("Table must be a 2x2 array.");
    [r, t] = n[0], [e, a] = n[1];
  }
  if (r === void 0 || t === void 0 || e === void 0 || a === void 0)
    throw new Error("Insufficient data to calculate phi coefficient. Provide a, b, c, and d, or a 2x2 table.");
  const o = r * a - t * e, i = Math.sqrt((r + t) * (r + e) * (t + a) * (e + a));
  if (i === 0)
    throw new Error("Denominator is zero, cannot calculate phi coefficient.");
  return o / i;
}
function E(r, t, e = 1.96, a) {
  const n = a ?? (r !== void 0 && t !== void 0 ? r / Math.sqrt(t) : void 0);
  if (n === void 0)
    throw new Error("Insufficient data to calculate margin of error. Provide either stdDev and sampleSize, or a pre-calculated standardError.");
  return e * n;
}
function I(r, t, e, a = 1.96, n) {
  const o = n ?? (t !== void 0 && e !== void 0 ? E(t, e, a) : void 0);
  if (o === void 0)
    throw new Error("Insufficient data to calculate confidence interval. Provide either stdDev, sampleSize, and zScore or a pre-calculated moe.");
  return {
    lower: r - o,
    upper: r + o
  };
}
function S(r, t, e, a) {
  if (!e && (!r || !t))
    throw new Error("Provide either observed and predicted arrays or a pre-calculated rss with the number of observations.");
  if (r && t && r.length !== t.length)
    throw new Error("Observed and predicted arrays must be of the same length.");
  const n = e ?? (r && t ? r.reduce((i, d, f) => i + (d - t[f]) ** 2, 0) : void 0), o = a ?? (r == null ? void 0 : r.length);
  if (n === void 0 || o === void 0)
    throw new Error("Insufficient data to calculate standard error of estimate. Provide complete data or calculated values.");
  return Math.sqrt(n / (o - 2));
}
function D(r, t, e) {
  const a = t ?? (r ? u(r) : void 0), n = e ?? (r == null ? void 0 : r.length);
  if (a === void 0 || n === void 0 || n === 0)
    throw new Error("Insufficient data to calculate standard error. Provide either values or both stdDev and n.");
  return a / Math.sqrt(n);
}
function N(r, t, e) {
  if (!e) throw new Error("A correlation function must be provided.");
  if (r.length !== t.length) throw new Error("Both forms must have the same number of scores.");
  return e(r, t);
}
function P(r) {
  const t = r.length;
  r[0].length;
  const e = r.map((o) => w(o)), a = w(
    r[0].map((o, i) => h(r.map((d) => d[i])))
  ), n = e.reduce((o, i) => o + i, 0);
  return t / (t - 1) * (1 - n / a);
}
function V(r, t) {
  if (!t) throw new Error("A correlation function must be provided.");
  const e = r.filter((n, o) => o % 2 === 0), a = r.filter((n, o) => o % 2 !== 0);
  return t(e, a);
}
function k(r, t, e) {
  if (!e) throw new Error("A correlation function must be provided.");
  if (r.length !== t.length) throw new Error("Both test administrations must have the same number of scores.");
  return e(r, t);
}
function O(r, t, e) {
  if (!e) throw new Error("A correlation function must be provided.");
  if (r.length !== t.length) throw new Error("Both forms must have the same number of scores.");
  return e(r, t);
}
function b(r, t) {
  if (!t) throw new Error("A correlation function must be provided.");
  const e = r.length;
  let a = 0, n = 0;
  for (let o = 0; o < e - 1; o++)
    for (let i = o + 1; i < e; i++)
      a += t(r[o], r[i]), n++;
  return a / n;
}
function _(r, t) {
  const e = r.reduce((o, i) => o + i, 0) / r.length, a = t.reduce((o, i) => o + i, 0) / t.length, n = e - a;
  return { averageConvergent: e, averageDiscriminant: a, constructValidityIndex: n };
}
function A(r, t, e) {
  if (r.length !== t.length) throw new Error("Scores arrays must be of the same length.");
  return e(r, t);
}
export {
  N as alternateFormsReliability,
  I as confidenceInterval,
  _ as constructValidity,
  A as criterionRelatedValidity,
  P as cronbachsAlpha,
  b as interRaterReliability,
  E as marginOfError,
  O as parallelFormsReliability,
  q as pearsonCorrelationCoefficient,
  R as phiCoefficient,
  M as pointBiserialCorrelation,
  C as spearmanRankCorrelationCoefficient,
  V as splitHalfReliability,
  D as standardErrorMean,
  S as standardErrorOfEstimate,
  k as testRetestReliability
};
