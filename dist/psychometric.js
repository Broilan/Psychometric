function A(e) {
  return typeof e == "number" && Number.isFinite(e);
}
function j(e, n = "value") {
  if (!A(e))
    throw new TypeError(`${n} must be a finite number`);
}
function f(e, n = "values") {
  if (!Array.isArray(e))
    throw new TypeError(`${n} must be an array`);
  const t = e.filter(A);
  if (!t.length)
    throw new RangeError(`${n} must contain at least one finite number`);
  return t;
}
function T(e, n, t = "arrays") {
  if (e.length !== n.length)
    throw new RangeError(`${t} must have the same length`);
}
function v(e) {
  return e.reduce((n, t) => n + t, 0);
}
function R(e, n, t) {
  return Math.min(Math.max(e, n), t);
}
function fe(e, n = 6) {
  const t = 10 ** n;
  return Math.round(e * t) / t;
}
function L(e) {
  if (!e.length)
    return [];
  const n = e[0].length;
  return e.forEach((t, r) => {
    if (t.length !== n)
      throw new RangeError(`matrix row ${r} has inconsistent length`);
  }), Array.from(
    { length: n },
    (t, r) => e.map((s) => s[r])
  );
}
function N(e) {
  return [...e].sort((n, t) => n - t);
}
function p(e) {
  const n = f(e);
  return v(n) / n.length;
}
function q(e) {
  return x(e, 0.5);
}
function w(e, n = !0) {
  const t = f(e);
  if (t.length < 2)
    return 0;
  const r = p(t), s = n ? t.length - 1 : t.length;
  return v(t.map((o) => (o - r) ** 2)) / s;
}
function M(e, n = !0) {
  return Math.sqrt(w(e, n));
}
function $(e) {
  return Math.min(...f(e));
}
function G(e) {
  return Math.max(...f(e));
}
function x(e, n) {
  const t = N(f(e)), r = R(n, 0, 1), s = (t.length - 1) * r, o = Math.floor(s), c = Math.ceil(s);
  if (o === c)
    return t[o];
  const i = s - o;
  return t[o] * (1 - i) + t[c] * i;
}
function he(e) {
  return x(e, 0.75) - x(e, 0.25);
}
function W(e) {
  const n = q(e);
  return q(e.map((t) => Math.abs(t - n)));
}
function ge(e) {
  const n = f(e), t = x(n, 0.25), r = x(n, 0.75);
  return {
    count: n.length,
    mean: p(n),
    median: q(n),
    variance: w(n),
    standardDeviation: M(n),
    min: $(n),
    max: G(n),
    q1: t,
    q3: r,
    iqr: r - t,
    mad: W(n)
  };
}
function de(e) {
  const n = f(e), t = p(n), r = M(n);
  return r ? n.map((s) => (s - t) / r) : n.map(() => 0);
}
function pe(e) {
  const n = f(e), t = n.map((o, c) => ({ value: o, index: c })).sort((o, c) => o.value - c.value), r = Array.from({ length: n.length }, () => 0);
  let s = 0;
  for (; s < t.length; ) {
    let o = s;
    for (; o + 1 < t.length && t[o + 1].value === t[s].value; )
      o += 1;
    const c = (s + o + 2) / 2;
    for (let i = s; i <= o; i += 1)
      r[t[i].index] = c;
    s = o + 1;
  }
  return r;
}
function U(e, n) {
  const t = N(f(e)), r = t.filter((o) => o < n).length, s = t.filter((o) => o === n).length;
  return (r + 0.5 * s) / t.length * 100;
}
function ye(e, n = 0.1) {
  const t = N(f(e)), r = Math.floor(t.length * R(n, 0, 0.49));
  return t.slice(r, t.length - r);
}
function ve(e, n = 0.1) {
  const t = N(f(e)), r = Math.floor(t.length * R(n, 0, 0.49));
  if (!r)
    return t;
  const s = t[r], o = t[t.length - r - 1];
  return t.map((c, i) => i < r ? s : i >= t.length - r ? o : c);
}
function Z(e) {
  const n = R(e, 1e-10, 0.9999999999), t = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924], r = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857], s = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878], o = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742], c = 0.02425, i = 1 - c;
  if (n < c) {
    const l = Math.sqrt(-2 * Math.log(n));
    return (((((s[0] * l + s[1]) * l + s[2]) * l + s[3]) * l + s[4]) * l + s[5]) / ((((o[0] * l + o[1]) * l + o[2]) * l + o[3]) * l + 1);
  }
  if (n > i) {
    const l = Math.sqrt(-2 * Math.log(1 - n));
    return -(((((s[0] * l + s[1]) * l + s[2]) * l + s[3]) * l + s[4]) * l + s[5]) / ((((o[0] * l + o[1]) * l + o[2]) * l + o[3]) * l + 1);
  }
  const u = n - 0.5, h = u * u;
  return (((((t[0] * h + t[1]) * h + t[2]) * h + t[3]) * h + t[4]) * h + t[5]) * u / (((((r[0] * h + r[1]) * h + r[2]) * h + r[3]) * h + r[4]) * h + 1);
}
function H(e, n = 0.95) {
  const t = f(e), r = p(t), s = M(t) / Math.sqrt(t.length), c = Z(0.5 + n / 2) * s;
  return {
    level: n,
    estimate: r,
    margin: c,
    lower: r - c,
    upper: r + c
  };
}
function be(e, n, t = 1e3, r = 0.95) {
  const s = f(e), o = n(s), c = Array.from({ length: t }, () => {
    const i = Array.from({ length: s.length }, () => s[Math.floor(Math.random() * s.length)]);
    return n(i);
  });
  return {
    observed: o,
    replicates: c,
    confidenceInterval: {
      level: r,
      estimate: o,
      margin: 0,
      lower: x(c, (1 - r) / 2),
      upper: x(c, 1 - (1 - r) / 2)
    }
  };
}
function Me(e, n, t, r = 1e3) {
  const s = f(e, "left"), o = f(n, "right"), c = t(s, o), i = [...s, ...o], u = Array.from({ length: r }, () => {
    const l = [...i].sort(() => Math.random() - 0.5), a = l.slice(0, s.length), g = l.slice(s.length);
    return t(a, g);
  }), h = u.filter((l) => Math.abs(l) >= Math.abs(c)).length;
  return {
    observed: c,
    nullDistribution: u,
    pValue: (h + 1) / (r + 1)
  };
}
function B(e, n, t = !0) {
  const r = f(e, "left"), s = f(n, "right");
  T(r, s, "left and right");
  const o = p(r), c = p(s), i = t ? r.length - 1 : r.length;
  return i <= 0 ? 0 : v(r.map((u, h) => (u - o) * (s[h] - c))) / i;
}
function C(e, n) {
  const t = M(e), r = M(n);
  return !t || !r ? 0 : B(e, n) / (t * r);
}
function K(e, n) {
  const t = f(e, "binary"), r = f(n, "continuous");
  T(t, r, "binary and continuous");
  const s = r.filter((h, l) => t[l] === 1), o = r.filter((h, l) => t[l] === 0);
  if (!s.length || !o.length)
    return 0;
  const c = s.length / t.length, i = 1 - c, u = M(r);
  return u ? (p(s) - p(o)) / u * Math.sqrt(c * i) : 0;
}
function Q(e, n = {}) {
  const t = n.anticipationThresholdMs ?? 150, r = n.lapseThresholdMs ?? 2e3, s = e.reactionTimeMs ?? e.latencyMs ?? null, o = s == null || !Number.isFinite(s), c = !o && s < t, i = !o && s > r, u = e.isCorrect ?? (e.expectedResponse !== void 0 && e.response === e.expectedResponse), h = !e.isPractice && !o && !c;
  return {
    isPractice: !!e.isPractice,
    isCorrect: !!u,
    isOmission: o,
    isAnticipation: c,
    isLapse: i,
    isValid: h
  };
}
function Se(e, n = {}) {
  const t = n.includePractice ?? !1, r = e.filter((m) => t || !m.isPractice), s = r.map((m) => ({ trial: m, classification: Q(m, n) })), o = s.filter(({ classification: m }) => m.isValid), c = s.filter(({ classification: m }) => !m.isValid), i = o.filter(({ classification: m }) => m.isCorrect).map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs).filter((m) => typeof m == "number" && Number.isFinite(m)), u = o.filter(({ trial: m }) => (m.blockId ?? "early") === "early").map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs ?? 0), h = o.filter(({ trial: m }) => (m.blockId ?? "late") === "late").map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs ?? 0), l = o.filter(({ trial: m }) => m.stimulusSide === "left").map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs ?? 0), a = o.filter(({ trial: m }) => m.stimulusSide === "right").map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs ?? 0), g = r.length ? s.filter(({ classification: m }) => m.isOmission).length / r.length : 0, y = r.length ? s.filter(({ classification: m }) => m.isAnticipation).length / r.length : 0, d = r.length ? s.filter(({ classification: m }) => !m.isCorrect && !m.isOmission).length / r.length : 0, b = r.length ? s.filter(({ classification: m }) => m.isCorrect).length / r.length : 0, S = i.length ? p(i) : null, O = i.length > 1 ? M(i) : null, k = [], E = n.minimumValidTrials ?? 10;
  return o.length < E && k.push({
    code: "insufficient-valid-trials",
    severity: "warning",
    message: "Valid trial count is below the configured minimum.",
    observed: o.length,
    threshold: E,
    source: "behavioral.reaction-time"
  }), {
    totalTrials: r.length,
    validTrialCount: o.length,
    invalidTrialCount: c.length,
    medianCorrectRt: i.length ? q(i) : null,
    meanCorrectRt: S,
    rtSd: O,
    coefficientOfVariation: S && O ? O / S : null,
    accuracy: b,
    errorRate: d,
    omissionRate: g,
    anticipationRate: y,
    earlyLateDifferenceMs: u.length && h.length ? p(h) - p(u) : null,
    leftRightAsymmetryMs: l.length && a.length ? p(a) - p(l) : null,
    qualityFlags: k
  };
}
function X(e, n) {
  let t = 0, r = 0, s = 0, o = 0;
  const c = /* @__PURE__ */ new Set();
  return n.forEach((i, u) => {
    if (u >= e.length) {
      o += 1;
      return;
    }
    if (i === e[u]) {
      c.add(i);
      return;
    }
    e.includes(i) && i !== e[u] ? t += 1 : r += 1, c.has(i) && (s += 1), c.add(i);
  }), {
    orderErrors: t,
    substitutions: r,
    repetitions: s,
    prematureResponses: o,
    expectedLength: e.length,
    observedLength: n.length
  };
}
function we(e) {
  return {
    practiceTrials: e.filter((n) => n.isPractice),
    scoredTrials: e.filter((n) => !n.isPractice)
  };
}
function Te(e, n = {}) {
  const t = n.includePractice ? e : e.filter((a) => !a.isPractice), r = t.filter(
    (a) => a.isCorrect ?? JSON.stringify(a.expectedSequence ?? []) === JSON.stringify(a.responseSequence ?? [])
  ), s = [...new Set(t.map((a) => a.spanLevel).filter((a) => typeof a == "number"))], o = Object.fromEntries(
    s.map((a) => {
      const g = t.filter((d) => d.spanLevel === a), y = g.filter(
        (d) => d.isCorrect ?? JSON.stringify(d.expectedSequence ?? []) === JSON.stringify(d.responseSequence ?? [])
      );
      return [String(a), g.length ? y.length / g.length : 0];
    })
  ), c = t.map((a) => a.latencyMs).filter((a) => typeof a == "number" && Number.isFinite(a)), i = t.map((a) => a.durationMs).filter((a) => typeof a == "number" && Number.isFinite(a)), u = t.map((a) => {
    const g = a.responses ?? [];
    return g.length < 2 || !a.durationMs ? null : a.durationMs / (g.length - 1);
  }).filter((a) => typeof a == "number" && Number.isFinite(a)), h = r.filter((a) => {
    var g;
    return `${((g = a.metadata) == null ? void 0 : g.direction) ?? "forward"}` == "forward";
  }), l = r.filter((a) => {
    var g;
    return `${((g = a.metadata) == null ? void 0 : g.direction) ?? "forward"}` == "backward";
  });
  return {
    totalTrials: t.length,
    totalCorrectTrials: r.length,
    longestSpan: Math.max(0, ...r.map((a) => a.spanLevel ?? 0)),
    accuracyBySpanLevel: o,
    firstResponseLatencyMean: c.length ? p(c) : null,
    interResponseIntervalMean: u.length ? p(u) : null,
    totalSequenceResponseTimeMean: i.length ? p(i) : null,
    forwardBackwardDelta: h.length && l.length ? p(h.map((a) => a.spanLevel ?? 0)) - p(l.map((a) => a.spanLevel ?? 0)) : null,
    errors: t.map(
      (a) => X(a.expectedSequence ?? [], a.responseSequence ?? [])
    )
  };
}
function xe(e) {
  const n = f(e);
  return {
    mean: p(n),
    median: q(n),
    standardDeviation: M(n)
  };
}
function I(e, n, t = !0) {
  const r = f(e, "left"), s = f(n, "right");
  if (!r.length || !s.length)
    return 0;
  const o = Math.sqrt(t ? ((r.length - 1) * w(r) + (s.length - 1) * w(s)) / (r.length + s.length - 2) || 0 : (w(r) + w(s)) / 2);
  return o ? (p(r) - p(s)) / o : 0;
}
function Re(e, n) {
  const t = I(e, n), r = e.length + n.length;
  return r <= 3 ? t : t * (1 - 3 / (4 * r - 9));
}
function Ce(e, n) {
  return T(e, n, "binary and continuous"), C(e, n);
}
function qe(e, n) {
  const t = f(e, "baseline"), r = f(n, "followUp");
  T(t, r, "baseline and followUp");
  const s = r.map((c, i) => c - t[i]), o = M(s);
  return o ? p(s) / o : 0;
}
function D(e, n = {}) {
  var t;
  return e == null ? !0 : ((t = n.treatAsMissing) == null ? void 0 : t.includes(e)) ?? !1;
}
function Ve(e, n = {}) {
  return e.filter((t) => !D(t, n) && A(t));
}
function z(e, n = {}) {
  return e.filter((t) => D(t, n) || !A(t)).length;
}
function P(e, n = {}) {
  return e.length ? z(e, n) / e.length : 0;
}
function Ae(e, n = "1.0.0") {
  return {
    exportVersion: "1.0.0",
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    packageName: "psychometric",
    packageVersion: e,
    schemaVersion: n
  };
}
function Ne(e, n) {
  return JSON.stringify({ metadata: n, summary: e }, null, 2);
}
function Oe(e, n) {
  return JSON.stringify({ metadata: n, trials: e }, null, 2);
}
function ke(e, n) {
  return JSON.stringify({ metadata: n, scores: e }, null, 2);
}
function Ee(e, n) {
  return JSON.stringify({ metadata: n, payload: e }, null, 2);
}
function Pe(e) {
  if (!e.length)
    return "";
  const n = [...new Set(e.flatMap((r) => Object.keys(r)))], t = (r) => {
    const s = `${r ?? ""}`;
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    n.join(","),
    ...e.map((r) => n.map((s) => t(r[s])).join(","))
  ].join(`
`);
}
function Y(e, n, t) {
  return j(e, "value"), t + n - e;
}
function _(e, n) {
  return Object.fromEntries(
    n.map((t) => {
      const r = e[t.id];
      return t.reverse && typeof r == "number" && t.min !== void 0 && t.max !== void 0 ? [t.id, Y(r, t.min, t.max)] : [t.id, r];
    })
  );
}
function Fe(e) {
  return v(f(e));
}
function Le(e, n) {
  const t = f(e, "values"), r = f(n, "weights");
  if (t.length !== r.length)
    throw new RangeError("values and weights must have the same length");
  return v(t.map((s, o) => s * r[o]));
}
function J(e, n, t = n) {
  const r = f(e, "answeredValues");
  return r.length < t || !n ? null : v(r) / r.length * n;
}
function Be(e, n, t = !1) {
  const r = e - n;
  return t ? Math.abs(r) : r;
}
function Ie(e, n) {
  return n - e;
}
function De(e, n, t) {
  return t ? (e - n) / t : 0;
}
function ee(e, n = 50, t = 10) {
  return n + e * t;
}
function ne(e, n = 10, t = 3) {
  return n + e * t;
}
function ze(e) {
  return R(50 + e * 34.1344746, 0, 100);
}
function te(e) {
  return R(Math.round(e * 2 + 5), 1, 9);
}
function _e(e, n, t, r) {
  if (t <= 0 || r < 0 || r > 1)
    return null;
  const s = t * Math.sqrt(2 * (1 - r));
  return s ? (n - e) / s : null;
}
function Je(e, n, t = 0.95) {
  const r = [e - n, e, e + n], s = H(r, t);
  return {
    lower: e - s.margin,
    upper: e + s.margin,
    level: t
  };
}
function re(e, n, t, r, s = {}) {
  const o = n.map((i) => t[i]).filter((i) => typeof i == "number" && Number.isFinite(i)), c = s.prorate ? J(o, n.length, s.minAnswered ?? n.length) : o.length >= (s.minAnswered ?? n.length) ? v(o) : null;
  return {
    id: e,
    itemIds: [...n],
    raw: c,
    answeredCount: o.length,
    missingCount: n.length - o.length,
    maxPossible: n.reduce((i, u) => {
      var h;
      return i + (((h = r.get(u)) == null ? void 0 : h.max) ?? 0);
    }, 0)
  };
}
function se(e, n, t = {}) {
  const r = _(n, e.items), s = new Map(e.items.map((o) => [o.id, o]));
  return Object.entries(e.subscales ?? {}).map(
    ([o, c]) => re(o, c, r, s, t)
  );
}
function oe(e, n, t) {
  const r = n.filter((o) => t.includes(o.id)), s = r.map((o) => o.raw).filter((o) => o !== null);
  return {
    id: e,
    itemIds: t.slice(),
    raw: s.length === r.length ? v(s) : null,
    answeredCount: s.length,
    missingCount: r.length - s.length
  };
}
function ie(e, n, t = {}) {
  var a, g, y;
  const r = _(n, e.items), s = e.items.map((d) => r[d.id]).filter((d) => typeof d == "number" && Number.isFinite(d)), o = z(e.items.map((d) => r[d.id])), c = t.minAnswered ?? ((a = e.scoring) == null ? void 0 : a.minAnswered) ?? e.items.length, i = t.prorate || (g = e.scoring) != null && g.allowProrating ? J(s, e.items.length, c) : s.length >= c ? v(s) : null, u = se(e, r, t), h = Object.entries(e.composites ?? {}).map(
    ([d, b]) => oe(d, u, b)
  ), l = [];
  if (o > 0 && ((y = e.scoring) == null ? void 0 : y.maxMissingRate) !== void 0) {
    const d = o / e.items.length;
    d > e.scoring.maxMissingRate && l.push({
      code: "too-much-missing-item-data",
      severity: "warning",
      message: "Missing item rate exceeds configured threshold.",
      observed: d,
      threshold: e.scoring.maxMissingRate,
      source: e.id
    });
  }
  return {
    scaleId: e.id,
    raw: i,
    answeredCount: s.length,
    missingCount: o,
    itemCount: e.items.length,
    subscales: u,
    composites: h,
    qualityFlags: l
  };
}
function je(e, n, t = {}) {
  return e.map((r) => ie(r, n[r.id] ?? {}, t));
}
function $e(e, n) {
  return U(n, e);
}
function Ge(e) {
  const n = f(e);
  return {
    mean: n.reduce((t, r) => t + r, 0) / n.length,
    standardDeviation: M(n)
  };
}
function V(e, n) {
  return !e || n === void 0 ? !0 : !(e.min !== void 0 && n < e.min || e.max !== void 0 && n > e.max);
}
function ce(e, n, t = {}) {
  const r = [], s = e.rows.find(
    (o) => (o.rawMin === void 0 || n >= o.rawMin) && (o.rawMax === void 0 || n <= o.rawMax) && V(o.ageBand, t.age) && V(o.educationBand, t.education) && (o.sex === void 0 || o.sex === t.sex)
  );
  return s ? {
    matched: !0,
    tableId: e.id,
    tableVersion: e.version,
    raw: n,
    normed: {
      z: s.z,
      t: s.t,
      scaled: s.scaled,
      percentile: s.percentile,
      stanine: s.stanine,
      standardScore: s.standardScore
    },
    interpretation: ae(e.interpretationBands ?? [], s),
    row: s,
    qualityFlags: r
  } : (r.push({
    code: "norm-mismatch",
    severity: "warning",
    message: "No matching norm row was found for the supplied raw score and context.",
    source: e.id
  }), {
    matched: !1,
    tableId: e.id,
    tableVersion: e.version,
    raw: n,
    qualityFlags: r
  });
}
function We(e, n) {
  return e.filter((t) => V(t.ageBand, n));
}
function Ue(e, n) {
  return e.filter((t) => V(t.educationBand, n));
}
function Ze(e) {
  return {
    z: e.z,
    t: e.t,
    scaled: e.scaled,
    percentile: e.percentile,
    stanine: e.stanine,
    standardScore: e.standardScore
  };
}
function He(e, n, t = {}) {
  var r;
  return (r = ce(e, n, t).normed) == null ? void 0 : r.percentile;
}
function Ke(e) {
  return {
    z: e,
    t: ee(e),
    scaled: ne(e),
    percentile: R(50 + e * 34.1344746, 0, 100),
    stanine: te(e)
  };
}
function ae(e, n) {
  const t = n.t ?? n.scaled ?? n.standardScore ?? n.percentile ?? n.z;
  if (t !== void 0)
    return e.find(
      (r) => (r.min === void 0 || t >= r.min) && (r.max === void 0 || t <= r.max)
    );
}
function Qe(e) {
  var c;
  const n = [], t = e.minimumValidTrials ?? 10, r = e.maxMissingRate ?? 0.2, s = e.maxOmissionRate ?? 0.15, o = e.maxAnticipationRate ?? 0.1;
  return e.reactionTimeSummary && e.reactionTimeSummary.validTrialCount < t && n.push({
    code: "insufficient-valid-trials",
    severity: "warning",
    message: "Valid trial count is below threshold.",
    observed: e.reactionTimeSummary.validTrialCount,
    threshold: t,
    source: "qc"
  }), e.reactionTimeSummary && e.reactionTimeSummary.omissionRate > s && n.push({
    code: "excessive-omissions",
    severity: "warning",
    message: "Omission rate exceeds threshold.",
    observed: e.reactionTimeSummary.omissionRate,
    threshold: s,
    source: "qc"
  }), e.reactionTimeSummary && e.reactionTimeSummary.anticipationRate > o && n.push({
    code: "excessive-anticipations",
    severity: "warning",
    message: "Anticipation rate exceeds threshold.",
    observed: e.reactionTimeSummary.anticipationRate,
    threshold: o,
    source: "qc"
  }), e.focusInterruptions && e.focusInterruptions > 0 && n.push({
    code: "excessive-focus-interruptions",
    severity: e.focusInterruptions > 3 ? "warning" : "info",
    message: "Focus interruptions were recorded during the session.",
    observed: e.focusInterruptions,
    source: "qc"
  }), e.expectedProtocolVersion && e.actualProtocolVersion && e.expectedProtocolVersion !== e.actualProtocolVersion && n.push({
    code: "protocol-mismatch",
    severity: "error",
    message: "Observed protocol version does not match the expected version.",
    source: "qc"
  }), e.completed === !1 && n.push({
    code: "incomplete-session",
    severity: "warning",
    message: "Session did not complete normally.",
    source: "qc"
  }), e.responses && P(e.responses) > r && n.push({
    code: "too-much-missing-item-data",
    severity: "warning",
    message: "Missing item rate exceeds threshold.",
    observed: P(e.responses),
    threshold: r,
    source: "qc"
  }), ((c = e.device) == null ? void 0 : c.deviceType) === "mobile" && n.push({
    code: "unsupported-device-metadata",
    severity: "info",
    message: "Mobile device usage may affect timing precision for some tasks.",
    source: "qc"
  }), n;
}
function Xe(e, n = 0.7) {
  return e >= n ? null : {
    code: "unusually-low-reliability",
    severity: "warning",
    message: "Reliability estimate falls below the configured threshold.",
    observed: e,
    threshold: n,
    source: "qc"
  };
}
function le(e) {
  const n = e.map((i) => f(i, "row"));
  if (n.length < 2 || n[0].length < 2)
    return 0;
  const t = n[0].length, r = L(n), s = v(r.map((i) => w(i))), o = n.map((i) => v(i)), c = w(o);
  return c ? t / (t - 1) * (1 - s / c) : 0;
}
function Ye(e, n = "odd-even") {
  const t = e.map((o) => f(o, "row")), r = t.map(
    (o) => o.filter((c, i) => n === "odd-even" ? i % 2 === 0 : i < o.length / 2).reduce((c, i) => c + i, 0)
  ), s = t.map(
    (o) => o.filter((c, i) => n === "odd-even" ? i % 2 === 1 : i >= o.length / 2).reduce((c, i) => c + i, 0)
  );
  return ue(C(r, s), 2);
}
function ue(e, n = 2) {
  return e <= -1 || n <= 0 ? 0 : n * e / (1 + (n - 1) * e);
}
function en(e, n) {
  return C(e, n);
}
function nn(e, n) {
  return C(e, n);
}
function tn(e, n) {
  return C(e, n);
}
function rn(e, n) {
  T(e, n, "raterA and raterB");
  const t = [.../* @__PURE__ */ new Set([...e, ...n])], r = e.filter((o, c) => o === n[c]).length / e.length, s = t.reduce((o, c) => {
    const i = e.filter((h) => h === c).length / e.length, u = n.filter((h) => h === c).length / n.length;
    return o + i * u;
  }, 0);
  return s === 1 ? 1 : (r - s) / (1 - s);
}
function sn(e) {
  var r;
  const n = e.map((s) => f(s, "row")), t = ((r = n[0]) == null ? void 0 : r.length) ?? 0;
  return Array.from({ length: t }, (s, o) => {
    const c = n.map((u) => u[o]), i = n.map((u) => v(u) - u[o]);
    return {
      itemIndex: o,
      correlation: C(c, i)
    };
  });
}
function on(e) {
  var r;
  const n = e.map((s) => f(s, "row")), t = ((r = n[0]) == null ? void 0 : r.length) ?? 0;
  return Array.from({ length: t }, (s, o) => ({
    itemIndex: o,
    correlation: le(n.map((c) => c.filter((i, u) => u !== o)))
  }));
}
function cn(e, n) {
  return e < 0 || n < 0 || n > 1 ? 0 : e * Math.sqrt(1 - n);
}
function an(e, n, t = 1.96) {
  return {
    lower: e - t * n,
    upper: e + t * n
  };
}
function ln(e) {
  const n = f(e.loadings, "loadings"), t = f(e.errorVariances, "errorVariances");
  T(n, t, "loadings and errorVariances");
  const r = v(n) ** 2, s = r + v(t);
  return s ? r / s : null;
}
function un(e) {
  const n = L(e.map((r) => f(r, "row"))), t = [];
  for (let r = 0; r < n.length; r += 1)
    for (let s = r + 1; s < n.length; s += 1)
      t.push(B(n[r], n[s]));
  return t.length ? p(t) : 0;
}
function mn(e, n) {
  const t = f(e, "convergent"), r = f(n, "discriminant"), s = p(t), o = p(r);
  return {
    averageConvergent: s,
    averageDiscriminant: o,
    contrast: s - o
  };
}
function fn(e, n) {
  return C(e, n);
}
function hn(e, n) {
  const t = f(e, "groupA"), r = f(n, "groupB");
  return {
    meanDifference: p(t) - p(r),
    effectSizeD: I(t, r)
  };
}
function me(e, n) {
  const t = n.length, r = e.map((s, o) => [...s, n[o]]);
  for (let s = 0; s < t; s += 1) {
    let o = s;
    for (let i = s + 1; i < t; i += 1)
      Math.abs(r[i][s]) > Math.abs(r[o][s]) && (o = i);
    [r[s], r[o]] = [r[o], r[s]];
    const c = r[s][s];
    if (!c)
      return Array.from({ length: t }, () => 0);
    for (let i = s; i <= t; i += 1)
      r[s][i] /= c;
    for (let i = 0; i < t; i += 1) {
      if (i === s)
        continue;
      const u = r[i][s];
      for (let h = s; h <= t; h += 1)
        r[i][h] -= u * r[s][h];
    }
  }
  return r.map((s) => s[t]);
}
function F(e, n) {
  const t = f(e, "outcome"), r = n.map((g) => f(g, "predictor"));
  r.forEach((g) => T(t, g, "outcome and predictor"));
  const s = t.map((g, y) => [1, ...r.map((d) => d[y])]), o = Array.from(
    { length: s[0].length },
    (g, y) => Array.from(
      { length: s[0].length },
      (d, b) => v(s.map((S) => S[y] * S[b]))
    )
  ), c = Array.from(
    { length: s[0].length },
    (g, y) => v(s.map((d, b) => d[y] * t[b]))
  ), i = me(o, c), u = s.map((g) => v(g.map((y, d) => y * i[d]))), h = p(t), l = v(t.map((g) => (g - h) ** 2)), a = v(t.map((g, y) => (g - u[y]) ** 2));
  return {
    r2: l ? 1 - a / l : 0,
    coefficients: i
  };
}
function gn(e, n, t) {
  const r = F(e, n), s = F(e, [...n, ...t]);
  return {
    baselineR2: r.r2,
    fullModelR2: s.r2,
    deltaR2: s.r2 - r.r2
  };
}
function dn(e, n) {
  const t = f(e, "scores"), r = f(n, "labels");
  T(t, r, "scores and labels");
  const s = [...new Set(t)].sort((l, a) => a - l), o = r.filter((l) => l === 1).length, c = r.filter((l) => l === 0).length, i = s.map((l) => {
    let a = 0, g = 0;
    return t.forEach((y, d) => {
      const b = y >= l, S = r[d] === 1;
      b && S && (a += 1), !b && !S && (g += 1);
    }), {
      threshold: l,
      sensitivity: o ? a / o : 0,
      specificity: c ? g / c : 0
    };
  }), u = [...i].sort((l, a) => 1 - l.specificity - (1 - a.specificity));
  let h = 0;
  for (let l = 1; l < u.length; l += 1) {
    const a = 1 - u[l - 1].specificity, g = 1 - u[l].specificity, y = u[l - 1].sensitivity, d = u[l].sensitivity;
    h += (y + d) / 2 * (g - a);
  }
  return { points: i, auc: h };
}
function pn(e, n) {
  return K(n, e);
}
export {
  on as alphaIfItemDeleted,
  nn as alternateFormsReliability,
  _ as applyReverseScoring,
  j as assertFiniteNumber,
  T as assertSameLength,
  un as averageInterItemCovariance,
  be as bootstrap,
  Qe as buildQualityFlags,
  Ie as changeScore,
  R as clamp,
  Q as classifyReactionTimeTrial,
  X as classifySequenceErrors,
  I as cohensD,
  rn as cohensKappa,
  Ve as compactNumbers,
  H as confidenceIntervalMean,
  mn as convergentDiscriminantSummary,
  Ke as convertZToNorms,
  C as correlation,
  z as countMissing,
  B as covariance,
  Ae as createExportMetadata,
  fn as criterionCorrelation,
  le as cronbachAlpha,
  Be as discrepancyScore,
  f as ensureFiniteNumbers,
  Pe as exportCsv,
  Ee as exportEnvelope,
  ke as exportScaleScoresJson,
  Ne as exportSessionSummaryJson,
  Oe as exportTrialsJson,
  Re as hedgesG,
  gn as incrementalValidity,
  tn as interRaterAgreement,
  ae as interpretNorm,
  he as iqr,
  A as isFiniteNumber,
  D as isMissingValue,
  sn as itemTotalCorrelations,
  hn as knownGroupsComparison,
  We as lookupAgeBand,
  Ue as lookupEducationBand,
  ce as lookupNorm,
  W as mad,
  G as max,
  p as mean,
  q as median,
  $ as min,
  P as missingRate,
  N as numericSort,
  ln as omegaTotal,
  He as percentileLookup,
  U as percentileOfScore,
  $e as percentileRankFromNormSample,
  Me as permutationTest,
  K as pointBiserial,
  Ce as pointBiserialFromGroups,
  J as prorateScore,
  x as quantile,
  pe as rank,
  Ze as rawToNormed,
  Xe as reliabilityWarning,
  _e as reliableChangeIndex,
  Y as reverseScore,
  dn as rocCurve,
  fe as round,
  je as scoreBattery,
  oe as scoreComposite,
  Je as scoreConfidenceInterval,
  an as scoreConfidenceIntervalFromSem,
  Ge as scoreDistributionSummary,
  ie as scoreLikertScale,
  Te as scoreSpanTask,
  se as scoreSubscales,
  pn as screeningAssociation,
  we as separatePracticeTrials,
  ue as spearmanBrown,
  Ye as splitHalfReliability,
  M as standardDeviation,
  cn as standardErrorOfMeasurement,
  De as standardizeZ,
  qe as standardizedMeanDifference,
  v as sum,
  Fe as sumScore,
  ge as summarize,
  xe as summarizeLatency,
  Se as summarizeReactionTime,
  en as testRetestReliability,
  ze as toPercentileRank,
  ne as toScaledScore,
  te as toStanine,
  ee as toTScore,
  L as transposeMatrix,
  ye as trim,
  w as variance,
  Le as weightedSumScore,
  ve as winsorize,
  de as zScores
};
