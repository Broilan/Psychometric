function G(e) {
  return typeof e == "number" && Number.isFinite(e);
}
function pe(e, n = "value") {
  if (!G(e))
    throw new TypeError(`${n} must be a finite number`);
}
function b(e, n = "values") {
  if (!Array.isArray(e))
    throw new TypeError(`${n} must be an array`);
  const t = e.filter(G);
  if (!t.length)
    throw new RangeError(`${n} must contain at least one finite number`);
  return t;
}
function A(e, n, t = "arrays") {
  if (e.length !== n.length)
    throw new RangeError(`${t} must have the same length`);
}
function T(e) {
  return e.reduce((n, t) => n + t, 0);
}
function N(e, n, t) {
  return Math.min(Math.max(e, n), t);
}
function ze(e, n = 6) {
  const t = 10 ** n;
  return Math.round(e * t) / t;
}
function W(e) {
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
function J(e) {
  return [...e].sort((n, t) => n - t);
}
function S(e) {
  const n = b(e);
  return T(n) / n.length;
}
function F(e) {
  return V(e, 0.5);
}
function _(e, n = !0) {
  const t = b(e);
  if (t.length < 2)
    return 0;
  const r = S(t), s = n ? t.length - 1 : t.length;
  return T(t.map((o) => (o - r) ** 2)) / s;
}
function x(e, n = !0) {
  return Math.sqrt(_(e, n));
}
function ye(e) {
  return Math.min(...b(e));
}
function ve(e) {
  return Math.max(...b(e));
}
function V(e, n) {
  const t = J(b(e)), r = N(n, 0, 1), s = (t.length - 1) * r, o = Math.floor(s), l = Math.ceil(s);
  if (o === l)
    return t[o];
  const a = s - o;
  return t[o] * (1 - a) + t[l] * a;
}
function Fe(e) {
  return V(e, 0.75) - V(e, 0.25);
}
function be(e) {
  const n = F(e);
  return F(e.map((t) => Math.abs(t - n)));
}
function De(e) {
  const n = b(e), t = V(n, 0.25), r = V(n, 0.75);
  return {
    count: n.length,
    mean: S(n),
    median: F(n),
    variance: _(n),
    standardDeviation: x(n),
    min: ye(n),
    max: ve(n),
    q1: t,
    q3: r,
    iqr: r - t,
    mad: be(n)
  };
}
function Be(e) {
  const n = b(e), t = S(n), r = x(n);
  return r ? n.map((s) => (s - t) / r) : n.map(() => 0);
}
function $e(e) {
  const n = b(e), t = n.map((o, l) => ({ value: o, index: l })).sort((o, l) => o.value - l.value), r = Array.from({ length: n.length }, () => 0);
  let s = 0;
  for (; s < t.length; ) {
    let o = s;
    for (; o + 1 < t.length && t[o + 1].value === t[s].value; )
      o += 1;
    const l = (s + o + 2) / 2;
    for (let a = s; a <= o; a += 1)
      r[t[a].index] = l;
    s = o + 1;
  }
  return r;
}
function Se(e, n) {
  const t = J(b(e)), r = t.filter((o) => o < n).length, s = t.filter((o) => o === n).length;
  return (r + 0.5 * s) / t.length * 100;
}
function Ge(e, n = 0.1) {
  const t = J(b(e)), r = Math.floor(t.length * N(n, 0, 0.49));
  return t.slice(r, t.length - r);
}
function Je(e, n = 0.1) {
  const t = J(b(e)), r = Math.floor(t.length * N(n, 0, 0.49));
  if (!r)
    return t;
  const s = t[r], o = t[t.length - r - 1];
  return t.map((l, a) => a < r ? s : a >= t.length - r ? o : l);
}
function He(e) {
  const n = N(e, 1e-10, 0.9999999999), t = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924], r = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857], s = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878], o = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742], l = 0.02425, a = 1 - l;
  if (n < l) {
    const c = Math.sqrt(-2 * Math.log(n));
    return (((((s[0] * c + s[1]) * c + s[2]) * c + s[3]) * c + s[4]) * c + s[5]) / ((((o[0] * c + o[1]) * c + o[2]) * c + o[3]) * c + 1);
  }
  if (n > a) {
    const c = Math.sqrt(-2 * Math.log(1 - n));
    return -(((((s[0] * c + s[1]) * c + s[2]) * c + s[3]) * c + s[4]) * c + s[5]) / ((((o[0] * c + o[1]) * c + o[2]) * c + o[3]) * c + 1);
  }
  const u = n - 0.5, m = u * u;
  return (((((t[0] * m + t[1]) * m + t[2]) * m + t[3]) * m + t[4]) * m + t[5]) * u / (((((r[0] * m + r[1]) * m + r[2]) * m + r[3]) * m + r[4]) * m + 1);
}
function Me(e, n = 0.95) {
  const t = b(e), r = S(t), s = x(t) / Math.sqrt(t.length), l = He(0.5 + n / 2) * s;
  return {
    level: n,
    estimate: r,
    margin: l,
    lower: r - l,
    upper: r + l
  };
}
function we(e, n, t = 1e3, r = 0.95) {
  const s = b(e), o = n(s), l = Array.from({ length: t }, () => {
    const a = Array.from({ length: s.length }, () => s[Math.floor(Math.random() * s.length)]);
    return n(a);
  });
  return {
    observed: o,
    replicates: l,
    confidenceInterval: {
      level: r,
      estimate: o,
      margin: 0,
      lower: V(l, (1 - r) / 2),
      upper: V(l, 1 - (1 - r) / 2)
    }
  };
}
function Ce(e, n, t, r = 1e3) {
  const s = b(e, "left"), o = b(n, "right"), l = t(s, o), a = [...s, ...o], u = Array.from({ length: r }, () => {
    const c = [...a].sort(() => Math.random() - 0.5), h = c.slice(0, s.length), g = c.slice(s.length);
    return t(h, g);
  }), m = u.filter((c) => Math.abs(c) >= Math.abs(l)).length;
  return {
    observed: l,
    nullDistribution: u,
    pValue: (m + 1) / (r + 1)
  };
}
function Q(e, n, t = !0) {
  const r = b(e, "left"), s = b(n, "right");
  A(r, s, "left and right");
  const o = S(r), l = S(s), a = t ? r.length - 1 : r.length;
  return a <= 0 ? 0 : T(r.map((u, m) => (u - o) * (s[m] - l))) / a;
}
function k(e, n) {
  const t = x(e), r = x(n);
  return !t || !r ? 0 : Q(e, n) / (t * r);
}
function Te(e, n) {
  const t = b(e, "binary"), r = b(n, "continuous");
  A(t, r, "binary and continuous");
  const s = r.filter((m, c) => t[c] === 1), o = r.filter((m, c) => t[c] === 0);
  if (!s.length || !o.length)
    return 0;
  const l = s.length / t.length, a = 1 - l, u = x(r);
  return u ? (S(s) - S(o)) / u * Math.sqrt(l * a) : 0;
}
function O(e) {
  const n = e.reactionTimeMs ?? e.latencyMs ?? null;
  return typeof n == "number" && Number.isFinite(n) ? n : null;
}
function I(e) {
  const n = e.filter((s) => typeof s == "number" && Number.isFinite(s));
  if (!n.length)
    return {
      meanMs: null,
      medianMs: null,
      standardDeviationMs: null,
      coefficientOfVariation: null
    };
  const t = S(n), r = n.length > 1 ? x(n) : 0;
  return {
    meanMs: t,
    medianMs: F(n),
    standardDeviationMs: n.length > 1 ? r : 0,
    coefficientOfVariation: t ? r / t : null
  };
}
function R(e, n, t = {}) {
  const r = n.map((c) => ({ trial: c, classification: w(c, t) })), s = r.filter(({ classification: c }) => c.isValid), o = s.filter(({ classification: c }) => c.isCorrect).map(({ trial: c }) => O(c)).filter((c) => c !== null), l = r.filter(({ classification: c }) => !c.isCorrect && !c.isOmission), a = r.filter(({ classification: c }) => c.isOmission), u = r.filter(({ classification: c }) => c.isAnticipation), m = r.filter(({ classification: c }) => c.isLapse);
  return {
    label: e,
    counts: {
      total: n.length,
      valid: s.length,
      invalid: n.length - s.length,
      correct: r.filter(({ classification: c }) => c.isCorrect).length,
      incorrect: l.length,
      omissions: a.length,
      anticipations: u.length,
      lapses: m.length
    },
    rates: {
      accuracy: n.length ? r.filter(({ classification: c }) => c.isCorrect).length / n.length : 0,
      error: n.length ? l.length / n.length : 0,
      omission: n.length ? a.length / n.length : 0,
      anticipation: n.length ? u.length / n.length : 0
    },
    timing: I(o)
  };
}
function $(e, n, t = {}) {
  const r = /* @__PURE__ */ new Map();
  if (e.forEach((s) => {
    const o = n(s);
    o && r.set(o, [...r.get(o) ?? [], s]);
  }), !!r.size)
    return Object.fromEntries(
      [...r.entries()].map(([s, o]) => [s, R(s, o, t)])
    );
}
function z(e, n, t) {
  const r = e === null || n === null ? null : e - n, s = r === null || n === null || n === 0 ? null : r / n, o = r === null || !t.standardizer ? null : r / t.standardizer;
  return {
    leftLabel: t.leftLabel,
    rightLabel: t.rightLabel,
    metric: t.metric,
    leftValue: e,
    rightValue: n,
    rawDifference: r,
    proportionalDifference: s,
    standardizedDifference: o
  };
}
function w(e, n = {}) {
  const t = n.anticipationThresholdMs ?? 150, r = n.lapseThresholdMs ?? 2e3, s = O(e), o = e.isOmission ?? s === null, l = e.isAnticipation ?? (!o && s !== null && s < t), a = !o && s !== null && s > r, u = !!e.isTimeout, m = !!e.isInvalid || u, c = e.isCorrect ?? (e.expectedResponse !== void 0 && e.response === e.expectedResponse), h = !e.isPractice && !o && !l && !m;
  return {
    isPractice: !!e.isPractice,
    isCorrect: !!c,
    isOmission: o,
    isAnticipation: l,
    isLapse: a,
    isTimeout: u,
    isInvalid: m,
    isValid: h
  };
}
function Ke(e, n, t = {}) {
  return $(t.includePractice ? e : e.filter((r) => !r.isPractice), n, t);
}
function Xe(e, n = {}) {
  var ue, me;
  const t = n.includePractice ?? !1, r = e.filter((p) => t || !p.isPractice), s = r.map((p) => ({ trial: p, classification: w(p, n) })), o = s.filter(({ classification: p }) => p.isValid), l = s.filter(({ classification: p }) => !p.isValid), a = s.filter(({ classification: p }) => p.isCorrect), u = s.filter(({ classification: p }) => !p.isCorrect && !p.isOmission), m = s.filter(({ classification: p }) => p.isOmission), c = s.filter(({ classification: p }) => p.isAnticipation), h = s.filter(({ classification: p }) => p.isLapse), g = o.filter(({ classification: p }) => p.isCorrect).map(({ trial: p }) => O(p)).filter((p) => p !== null), i = ((ue = n.blockLabels) == null ? void 0 : ue.early) ?? "early", f = ((me = n.blockLabels) == null ? void 0 : me.late) ?? "late", d = o.filter(({ trial: p }) => (p.blockId ?? i) === i).map(({ trial: p }) => O(p) ?? 0), y = o.filter(({ trial: p }) => (p.blockId ?? f) === f).map(({ trial: p }) => O(p) ?? 0), M = o.filter(({ trial: p }) => {
    var P;
    return (((P = p.labels) == null ? void 0 : P.responseSide) ?? p.stimulusSide) === "left";
  }).map(({ trial: p }) => O(p) ?? 0), E = o.filter(({ trial: p }) => {
    var P;
    return (((P = p.labels) == null ? void 0 : P.responseSide) ?? p.stimulusSide) === "right";
  }).map(({ trial: p }) => O(p) ?? 0), D = r.length ? m.length / r.length : 0, B = r.length ? c.length / r.length : 0, v = r.length ? u.length / r.length : 0, C = r.length ? a.length / r.length : 0, L = I(g), je = {
    ...L,
    medianCorrectRtMs: L.medianMs ?? null,
    meanCorrectRtMs: L.meanMs,
    rtSdMs: L.standardDeviationMs ?? null
  }, oe = [], ie = n.minimumValidTrials ?? 10;
  o.length < ie && oe.push({
    code: "insufficient-valid-trials",
    severity: "warning",
    message: "Valid trial count is below the configured minimum.",
    observed: o.length,
    threshold: ie,
    source: "behavioral.reaction-time"
  });
  const ce = Math.ceil(r.length / 2), ae = r.slice(0, ce), le = r.slice(ce);
  return {
    summaryType: "reaction-time",
    practiceIncluded: t,
    counts: {
      total: r.length,
      valid: o.length,
      invalid: l.length,
      correct: a.length,
      incorrect: u.length,
      omissions: m.length,
      anticipations: c.length,
      lapses: h.length
    },
    rates: {
      accuracy: C,
      error: v,
      omission: D,
      anticipation: B
    },
    timing: je,
    comparisons: {
      earlyLateDifferenceMs: d.length && y.length ? S(y) - S(d) : null,
      leftRightAsymmetryMs: M.length && E.length ? S(E) - S(M) : null
    },
    conditionSummaries: $(r, (p) => {
      var P, ge, fe, de;
      return ((P = n.conditionSelector) == null ? void 0 : P.call(n, p)) ?? ((ge = p.labels) == null ? void 0 : ge.condition) ?? ((de = (fe = p.metadata) == null ? void 0 : fe.condition) == null ? void 0 : de.toString());
    }, n),
    blockSummaries: $(r, (p) => p.blockId, n),
    phaseSummaries: $(r, (p) => p.phase, n),
    halfSummaries: {
      early: ae.length ? R("early-half", ae, n) : null,
      late: le.length ? R("late-half", le, n) : null
    },
    practiceSummary: e.some((p) => p.isPractice) ? R("practice", e.filter((p) => p.isPractice), { ...n }) : null,
    scoredSummary: r.length ? R("scored", r, n) : null,
    totalTrials: r.length,
    validTrialCount: o.length,
    invalidTrialCount: l.length,
    medianCorrectRt: L.medianMs ?? null,
    meanCorrectRt: L.meanMs,
    rtSd: L.standardDeviationMs ?? null,
    coefficientOfVariation: L.coefficientOfVariation ?? null,
    accuracy: C,
    errorRate: v,
    omissionRate: D,
    anticipationRate: B,
    earlyLateDifferenceMs: d.length && y.length ? S(y) - S(d) : null,
    leftRightAsymmetryMs: M.length && E.length ? S(E) - S(M) : null,
    qualityFlags: oe
  };
}
function We(e, n = {}) {
  const t = n.includePractice ? e : e.filter((d) => !d.isPractice), r = t.filter((d) => {
    var y, M;
    return (((y = d.labels) == null ? void 0 : y.goNoGoType) ?? ((M = d.metadata) == null ? void 0 : M.goNoGoType)) === "go";
  }), s = t.filter((d) => {
    var y, M;
    return (((y = d.labels) == null ? void 0 : y.goNoGoType) ?? ((M = d.metadata) == null ? void 0 : M.goNoGoType)) === "no-go";
  }), o = t.filter((d) => {
    var y, M;
    return (((y = d.labels) == null ? void 0 : y.stopSignalType) ?? ((M = d.metadata) == null ? void 0 : M.stopSignalType)) === "stop";
  }), l = r.length ? R("go", r, n) : void 0, a = s.length ? R("no-go", s, n) : void 0, u = o.length ? R("stop", o, n) : void 0, m = s.filter((d) => d.response !== null && d.response !== void 0 && !d.isCorrect).length, c = r.filter((d) => w(d, n).isOmission).length, h = [...r, ...s].map((d) => O(d)).filter((d) => d !== null), g = {
    accuracy: t.length ? t.filter((d) => w(d, n).isCorrect).length / t.length : 0,
    error: t.length ? t.filter((d) => !w(d, n).isCorrect).length / t.length : 0,
    omission: t.length ? t.filter((d) => w(d, n).isOmission).length / t.length : 0,
    anticipation: t.length ? t.filter((d) => w(d, n).isAnticipation).length / t.length : 0,
    commissionError: s.length ? m / s.length : 0
  }, i = [];
  l && a && i.push(z(l.rates.accuracy, a.rates.accuracy, {
    leftLabel: "go",
    rightLabel: "no-go",
    metric: "accuracy"
  }));
  const f = [];
  return s.length && m / s.length > 0.3 && f.push({
    code: "excessive-no-go-false-alarms",
    severity: "warning",
    message: "False alarm rate on no-go trials exceeds threshold.",
    observed: m / s.length,
    threshold: 0.3,
    source: "behavioral.go-no-go"
  }), {
    summaryType: "go-no-go",
    counts: {
      total: t.length,
      valid: t.filter((d) => w(d, n).isValid).length,
      invalid: t.filter((d) => !w(d, n).isValid).length,
      correct: t.filter((d) => w(d, n).isCorrect).length,
      incorrect: t.filter((d) => !w(d, n).isCorrect).length,
      omissions: c,
      anticipations: t.filter((d) => w(d, n).isAnticipation).length,
      commissionErrors: m
    },
    rates: g,
    timing: I(h),
    conditionSummaries: {
      ...l ? { go: l } : {},
      ...a ? { "no-go": a } : {},
      ...u ? { stop: u } : {}
    },
    contrasts: i,
    qualityFlags: f,
    goSummary: l,
    noGoSummary: a,
    stopSummary: u,
    commissionErrors: m,
    omissionErrors: c,
    inhibitionSuccessRate: s.length ? 1 - m / s.length : 0,
    falseAlarmRate: s.length ? m / s.length : 0,
    ssrtMs: void 0
  };
}
function Qe(e, n = {}) {
  var E, D, B;
  const t = n.includePractice ? e : e.filter((v) => !v.isPractice), r = t.filter((v) => {
    var C;
    return ((C = v.labels) == null ? void 0 : C.congruency) === "congruent";
  }), s = t.filter((v) => {
    var C;
    return ((C = v.labels) == null ? void 0 : C.congruency) === "incongruent";
  }), o = t.filter((v) => {
    var C;
    return ((C = v.labels) == null ? void 0 : C.switchType) === "switch";
  }), l = t.filter((v) => {
    var C;
    return ((C = v.labels) == null ? void 0 : C.switchType) === "repeat";
  }), a = t.filter((v) => {
    var C;
    return ((C = v.labels) == null ? void 0 : C.cueValidity) === "valid";
  }), u = t.filter((v) => {
    var C;
    return ((C = v.labels) == null ? void 0 : C.cueValidity) === "invalid";
  }), m = r.length ? R("congruent", r, n) : void 0, c = s.length ? R("incongruent", s, n) : void 0, h = o.length ? R("switch", o, n) : void 0, g = l.length ? R("repeat", l, n) : void 0, i = a.length ? R("valid-cue", a, n) : void 0, f = u.length ? R("invalid-cue", u, n) : void 0, d = t.map((v) => O(v)).filter((v) => v !== null), y = I(d), M = [];
  return m && c && M.push(z(c.timing.meanMs, m.timing.meanMs, {
    leftLabel: "incongruent",
    rightLabel: "congruent",
    metric: "meanCorrectRtMs",
    standardizer: y.standardDeviationMs
  })), h && g && M.push(z(h.timing.meanMs, g.timing.meanMs, {
    leftLabel: "switch",
    rightLabel: "repeat",
    metric: "meanCorrectRtMs",
    standardizer: y.standardDeviationMs
  })), i && f && M.push(z(f.timing.meanMs, i.timing.meanMs, {
    leftLabel: "invalid-cue",
    rightLabel: "valid-cue",
    metric: "meanCorrectRtMs",
    standardizer: y.standardDeviationMs
  })), {
    summaryType: "interference-task",
    counts: {
      total: t.length,
      valid: t.filter((v) => w(v, n).isValid).length,
      invalid: t.filter((v) => !w(v, n).isValid).length,
      correct: t.filter((v) => w(v, n).isCorrect).length,
      incorrect: t.filter((v) => !w(v, n).isCorrect).length,
      omissions: t.filter((v) => w(v, n).isOmission).length,
      anticipations: t.filter((v) => w(v, n).isAnticipation).length
    },
    rates: {
      accuracy: t.length ? t.filter((v) => w(v, n).isCorrect).length / t.length : 0,
      error: t.length ? t.filter((v) => !w(v, n).isCorrect).length / t.length : 0,
      omission: t.length ? t.filter((v) => w(v, n).isOmission).length / t.length : 0,
      anticipation: t.length ? t.filter((v) => w(v, n).isAnticipation).length / t.length : 0
    },
    timing: y,
    conditionSummaries: {
      ...m ? { congruent: m } : {},
      ...c ? { incongruent: c } : {},
      ...h ? { switch: h } : {},
      ...g ? { repeat: g } : {},
      ...i ? { "valid-cue": i } : {},
      ...f ? { "invalid-cue": f } : {}
    },
    contrasts: M,
    qualityFlags: [],
    congruentSummary: m,
    incongruentSummary: c,
    switchSummary: h,
    repeatSummary: g,
    interferenceEffectMs: ((E = M.find((v) => v.leftLabel === "incongruent")) == null ? void 0 : E.rawDifference) ?? null,
    switchingCostMs: ((D = M.find((v) => v.leftLabel === "switch")) == null ? void 0 : D.rawDifference) ?? null,
    mixingCostMs: null,
    cueingBenefitMs: ((B = M.find((v) => v.leftLabel === "invalid-cue")) == null ? void 0 : B.rawDifference) ?? null
  };
}
function Re(e, n) {
  let t = 0, r = 0, s = 0, o = 0;
  const l = /* @__PURE__ */ new Set();
  return n.forEach((a, u) => {
    if (u >= e.length) {
      o += 1;
      return;
    }
    if (a === e[u]) {
      l.add(a);
      return;
    }
    e.includes(a) && a !== e[u] ? t += 1 : r += 1, l.has(a) && (s += 1), l.add(a);
  }), {
    orderErrors: t,
    substitutions: r,
    repetitions: s,
    prematureResponses: o,
    expectedLength: e.length,
    observedLength: n.length
  };
}
function Ue(e) {
  return {
    practice: e.filter((n) => n.isPractice),
    scored: e.filter((n) => !n.isPractice),
    practiceTrials: e.filter((n) => n.isPractice),
    scoredTrials: e.filter((n) => !n.isPractice)
  };
}
function Ye(e, n = {}) {
  const t = n.includePractice ? e : e.filter((i) => !i.isPractice), r = t.filter(
    (i) => i.isCorrect ?? JSON.stringify(i.expectedSequence ?? i.presentedSequence ?? []) === JSON.stringify(i.responseSequence ?? i.recalledSequence ?? [])
  ), s = [...new Set(t.map((i) => i.spanLevel).filter((i) => typeof i == "number"))], o = [...new Set(t.map((i) => {
    var f, d;
    return i.sequenceLength ?? ((f = i.expectedSequence) == null ? void 0 : f.length) ?? ((d = i.presentedSequence) == null ? void 0 : d.length);
  }).filter((i) => typeof i == "number"))], l = Object.fromEntries(
    s.map((i) => {
      const f = t.filter((y) => y.spanLevel === i), d = f.filter(
        (y) => y.isCorrect ?? JSON.stringify(y.expectedSequence ?? y.presentedSequence ?? []) === JSON.stringify(y.responseSequence ?? y.recalledSequence ?? [])
      );
      return [String(i), f.length ? d.length / f.length : 0];
    })
  ), a = Object.fromEntries(
    o.map((i) => {
      const f = t.filter((y) => {
        var M, E;
        return (y.sequenceLength ?? ((M = y.expectedSequence) == null ? void 0 : M.length) ?? ((E = y.presentedSequence) == null ? void 0 : E.length)) === i;
      }), d = f.filter(
        (y) => y.isCorrect ?? JSON.stringify(y.expectedSequence ?? y.presentedSequence ?? []) === JSON.stringify(y.responseSequence ?? y.recalledSequence ?? [])
      );
      return [String(i), f.length ? d.length / f.length : 0];
    })
  ), u = t.map((i) => i.latencyMs).filter((i) => typeof i == "number" && Number.isFinite(i)), m = t.map((i) => i.durationMs).filter((i) => typeof i == "number" && Number.isFinite(i)), c = t.map((i) => {
    const f = i.responses ?? i.recalledSequence ?? [];
    return f.length < 2 || !i.durationMs ? null : i.durationMs / (f.length - 1);
  }).filter((i) => typeof i == "number" && Number.isFinite(i)), h = r.filter((i) => {
    var f;
    return `${((f = i.metadata) == null ? void 0 : f.direction) ?? "forward"}` == "forward";
  }), g = r.filter((i) => {
    var f;
    return `${((f = i.metadata) == null ? void 0 : f.direction) ?? "forward"}` == "backward";
  });
  return {
    summaryType: "span-task",
    practiceIncluded: !!n.includePractice,
    counts: {
      total: t.length,
      correct: r.length,
      incorrect: t.length - r.length
    },
    timing: {
      firstResponseLatencyMeanMs: u.length ? S(u) : null,
      interResponseIntervalMeanMs: c.length ? S(c) : null,
      totalSequenceResponseTimeMeanMs: m.length ? S(m) : null
    },
    totalTrials: t.length,
    totalCorrectTrials: r.length,
    longestSpan: Math.max(0, ...r.map((i) => i.spanLevel ?? i.sequenceLength ?? 0)),
    accuracyBySpanLevel: l,
    accuracyBySequenceLength: a,
    firstResponseLatencyMean: u.length ? S(u) : null,
    interResponseIntervalMean: c.length ? S(c) : null,
    totalSequenceResponseTimeMean: m.length ? S(m) : null,
    forwardBackwardDelta: h.length && g.length ? S(h.map((i) => i.spanLevel ?? i.sequenceLength ?? 0)) - S(g.map((i) => i.spanLevel ?? i.sequenceLength ?? 0)) : null,
    manipulationCost: h.length && g.length ? S(g.map((i) => O(i) ?? 0)) - S(h.map((i) => O(i) ?? 0)) : null,
    errors: t.map(
      (i) => Re(
        i.expectedSequence ?? i.presentedSequence ?? [],
        i.responseSequence ?? i.recalledSequence ?? []
      )
    )
  };
}
function Ze(e, n = {}) {
  const t = n.includePractice ? e : e.filter((g) => !g.isPractice), r = t.map((g) => {
    const i = !!g.wasPreviouslySeen, f = g.response === !0 || g.response === "old" || g.response === "seen";
    return {
      trial: g,
      actualOld: i,
      respondedOld: f,
      hit: i && f,
      falseAlarm: !i && f,
      miss: i && !f,
      correctRejection: !i && !f
    };
  }), s = r.filter((g) => g.actualOld), o = r.filter((g) => !g.actualOld), l = s.length ? r.filter((g) => g.hit).length / s.length : 0, a = o.length ? r.filter((g) => g.falseAlarm).length / o.length : 0, u = /* @__PURE__ */ new Map();
  r.forEach((g) => {
    const i = g.trial.phase;
    i && u.set(i, [...u.get(i) ?? [], g]);
  });
  const m = u.size ? Object.fromEntries(
    [...u.entries()].map(([g, i]) => [
      g,
      {
        label: g,
        counts: {
          total: i.length,
          valid: i.length,
          invalid: 0,
          correct: i.filter((f) => f.hit || f.correctRejection).length,
          incorrect: i.filter((f) => f.miss || f.falseAlarm).length,
          omissions: 0,
          anticipations: 0,
          lapses: 0
        },
        rates: {
          accuracy: i.length ? i.filter((f) => f.hit || f.correctRejection).length / i.length : 0,
          error: i.length ? i.filter((f) => f.miss || f.falseAlarm).length / i.length : 0,
          omission: 0,
          anticipation: 0
        },
        timing: I(i.map((f) => O(f.trial)).filter((f) => f !== null))
      }
    ])
  ) : void 0, c = m == null ? void 0 : m.immediate, h = m == null ? void 0 : m.delayed;
  return {
    summaryType: "recognition-memory",
    counts: {
      total: t.length,
      hits: r.filter((g) => g.hit).length,
      falseAlarms: r.filter((g) => g.falseAlarm).length,
      misses: r.filter((g) => g.miss).length,
      correctRejections: r.filter((g) => g.correctRejection).length
    },
    rates: {
      accuracy: t.length ? r.filter((g) => g.hit || g.correctRejection).length / t.length : 0,
      hitRate: l,
      falseAlarmRate: a,
      correctedRecognition: l - a
    },
    timing: I(t.map((g) => O(g)).filter((g) => g !== null)),
    conditionSummaries: m,
    learningCurve: void 0,
    contrasts: c && h ? [
      z(h.rates.accuracy, c.rates.accuracy, {
        leftLabel: "delayed",
        rightLabel: "immediate",
        metric: "accuracy"
      })
    ] : [],
    qualityFlags: [],
    hitRate: l,
    falseAlarmRate: a,
    correctedRecognition: l - a,
    delayedChange: c && h ? h.rates.accuracy - c.rates.accuracy : null
  };
}
function en(e, n = {}) {
  const t = n.includePractice ? e : e.filter((u) => !u.isPractice), r = t.filter((u) => u.isCorrect).length, s = $(t, (u) => u.blockId, n), o = Object.keys(s ?? {}), l = o.length ? s == null ? void 0 : s[o[0]] : void 0, a = o.length ? s == null ? void 0 : s[o[o.length - 1]] : void 0;
  return {
    summaryType: "paired-associates",
    counts: {
      total: t.length,
      correct: r,
      incorrect: t.length - r
    },
    rates: {
      accuracy: t.length ? r / t.length : 0
    },
    timing: I(t.map((u) => O(u)).filter((u) => u !== null)),
    conditionSummaries: s,
    learningCurve: s ? Object.fromEntries(Object.entries(s).map(([u, m]) => [u, m.rates.accuracy])) : void 0,
    contrasts: [],
    qualityFlags: [],
    totalCorrect: r,
    learningGain: l && a ? a.rates.accuracy - l.rates.accuracy : null
  };
}
function nn(e, n = {}) {
  const t = e.filter((u) => u.response !== null && u.response !== void 0 || u.isCorrect !== void 0), r = e.filter((u) => u.isCorrect).length, s = n.durationMinutes ?? (() => {
    const u = e.map((m) => m.durationMs).filter((m) => typeof m == "number" && Number.isFinite(m));
    return u.length ? S(u) / 6e4 : null;
  })(), o = n.timeWindowSelector ?? ((u) => u.blockId), l = /* @__PURE__ */ new Map();
  e.forEach((u) => {
    const m = o(u);
    m && l.set(m, [...l.get(m) ?? [], u]);
  });
  const a = l.size ? Object.fromEntries([...l.entries()].map(([u, m]) => {
    const c = m.filter((f) => f.isCorrect).length, h = m.filter((f) => f.response !== null && f.response !== void 0 || f.isCorrect !== void 0).length, g = m.map((f) => f.durationMs).filter((f) => typeof f == "number" && Number.isFinite(f)), i = g.length ? S(g) / 6e4 : null;
    return [u, {
      counts: {
        total: m.length,
        attempted: h,
        correct: c,
        incorrect: h - c
      },
      rates: {
        accuracy: h ? c / h : 0
      },
      throughputPerMinute: i ? c / i : void 0
    }];
  })) : void 0;
  return {
    summaryType: "processing-speed",
    counts: {
      totalAttempted: t.length,
      totalCorrect: r,
      totalIncorrect: t.length - r
    },
    rates: {
      accuracy: t.length ? r / t.length : 0,
      throughputPerMinute: s ? r / s : 0
    },
    timing: {
      durationMinutes: s
    },
    blockSummaries: a,
    qualityFlags: []
  };
}
function tn(e) {
  const n = b(e);
  return {
    mean: S(n),
    median: F(n),
    standardDeviation: x(n)
  };
}
const ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  classifyReactionTimeTrial: w,
  classifySequenceErrors: Re,
  computeConditionContrast: z,
  scoreSpanTask: Ye,
  separatePracticeTrials: Ue,
  summarizeConditionedReactionTime: Ke,
  summarizeGoNoGo: We,
  summarizeInterferenceTask: Qe,
  summarizeLatency: tn,
  summarizePairedAssociates: en,
  summarizeProcessingSpeed: nn,
  summarizeReactionTime: Xe,
  summarizeRecognitionMemory: Ze
}, Symbol.toStringTag, { value: "Module" }));
function U(e, n, t = !0) {
  const r = b(e, "left"), s = b(n, "right");
  if (!r.length || !s.length)
    return 0;
  const o = Math.sqrt(t ? ((r.length - 1) * _(r) + (s.length - 1) * _(s)) / (r.length + s.length - 2) || 0 : (_(r) + _(s)) / 2);
  return o ? (S(r) - S(s)) / o : 0;
}
function rn(e, n) {
  const t = U(e, n), r = e.length + n.length;
  return r <= 3 ? t : t * (1 - 3 / (4 * r - 9));
}
function sn(e, n) {
  return A(e, n, "binary and continuous"), k(e, n);
}
function on(e, n) {
  const t = b(e, "baseline"), r = b(n, "followUp");
  A(t, r, "baseline and followUp");
  const s = r.map((l, a) => l - t[a]), o = x(s);
  return o ? S(s) / o : 0;
}
function Y(e, n = {}) {
  var t;
  return e == null ? !0 : ((t = n.treatAsMissing) == null ? void 0 : t.includes(e)) ?? !1;
}
function cn(e, n = {}) {
  return e.filter((t) => !Y(t, n) && G(t));
}
function Z(e, n = {}) {
  return e.filter((t) => Y(t, n) || !G(t)).length;
}
function K(e, n = {}) {
  return e.length ? Z(e, n) / e.length : 0;
}
const at = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assertFiniteNumber: pe,
  assertSameLength: A,
  bootstrap: we,
  clamp: N,
  cohensD: U,
  compactNumbers: cn,
  confidenceIntervalMean: Me,
  correlation: k,
  countMissing: Z,
  covariance: Q,
  ensureFiniteNumbers: b,
  hedgesG: rn,
  iqr: Fe,
  isFiniteNumber: G,
  isMissingValue: Y,
  mad: be,
  max: ve,
  mean: S,
  median: F,
  min: ye,
  missingRate: K,
  numericSort: J,
  percentileOfScore: Se,
  permutationTest: Ce,
  pointBiserial: Te,
  pointBiserialFromGroups: sn,
  quantile: V,
  rank: $e,
  round: ze,
  standardDeviation: x,
  standardizedMeanDifference: on,
  sum: T,
  summarize: De,
  transposeMatrix: W,
  trim: Ge,
  variance: _,
  winsorize: Je,
  zScores: Be
}, Symbol.toStringTag, { value: "Module" })), an = "psychometric", ln = "1.0.0", un = "1.0.0", mn = "1.0.0", gn = "1.0.0", X = "1.0.0", fn = "1.0.0", dn = "1.0.0";
function j(e, n, t) {
  return {
    kind: e,
    exportVersion: ln,
    schemaVersion: t,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    packageName: an,
    packageVersion: n
  };
}
function q(e, n) {
  return { metadata: n, payload: e };
}
function hn(e, n) {
  return q(e, j("session-summary", n, un));
}
function pn(e, n) {
  return q(e, j("trial-records", n, mn));
}
function yn(e, n) {
  return q(e, j("scale-scores", n, gn));
}
function vn(e, n) {
  return q(e, j("norm-lookup", n, X));
}
function bn(e, n) {
  return q(e, j("quality-flags", n, fn));
}
function Sn(e, n) {
  return q(e, j("session-comparison", n, dn));
}
function Mn(e, n) {
  return JSON.stringify(q(e, n), null, 2);
}
function wn(e, n) {
  return JSON.stringify(q(e, n), null, 2);
}
function Cn(e, n) {
  return JSON.stringify(q(e, n), null, 2);
}
function Tn(e, n) {
  return JSON.stringify(q(e, n), null, 2);
}
function Rn(e) {
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
const lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createExportEnvelope: q,
  createExportMetadata: j,
  createNormLookupExport: vn,
  createQualityFlagsExport: bn,
  createScaleScoresExport: yn,
  createSessionComparisonExport: Sn,
  createSessionSummaryExport: hn,
  createTrialRecordsExport: pn,
  exportCsv: Rn,
  exportEnvelope: Tn,
  exportScaleScoresJson: Cn,
  exportSessionSummaryJson: Mn,
  exportTrialsJson: wn
}, Symbol.toStringTag, { value: "Module" }));
function Oe(e, n, t) {
  return pe(e, "value"), t + n - e;
}
function ee(e, n) {
  return Object.fromEntries(
    n.map((t) => {
      const r = e[t.id];
      return t.reverse && typeof r == "number" && t.min !== void 0 && t.max !== void 0 ? [t.id, Oe(r, t.min, t.max)] : [t.id, r];
    })
  );
}
function On(e) {
  return T(b(e));
}
function xn(e, n) {
  const t = b(e, "values"), r = b(n, "weights");
  if (t.length !== r.length)
    throw new RangeError("values and weights must have the same length");
  return T(t.map((s, o) => s * r[o]));
}
function ne(e, n, t = n) {
  const r = e.filter((s) => typeof s == "number" && Number.isFinite(s));
  return r.length < t || !n ? null : T(r) / r.length * n;
}
function qn(e, n, t = !1) {
  const r = e - n;
  return t ? Math.abs(r) : r;
}
function En(e, n) {
  return n - e;
}
function xe(e, n, t) {
  return t ? (e - n) / t : 0;
}
function te(e, n = 50, t = 10) {
  return n + e * t;
}
function re(e, n = 10, t = 3) {
  return n + e * t;
}
function qe(e) {
  return N(50 + e * 34.1344746, 0, 100);
}
function se(e) {
  return N(Math.round(e * 2 + 5), 1, 9);
}
function Ee(e, n, t, r) {
  if (t <= 0 || r < 0 || r > 1)
    return null;
  const s = t * Math.sqrt(2 * (1 - r));
  return s ? (n - e) / s : null;
}
function _n(e, n, t = 0.95) {
  const r = [e - n, e, e + n], s = Me(r, t);
  return {
    lower: e - s.margin,
    upper: e + s.margin,
    level: t
  };
}
function An(e, n, t, r, s = {}) {
  const o = n.map((u) => t[u]).filter((u) => typeof u == "number" && Number.isFinite(u)), l = s.prorate ? ne(o, n.length, s.minAnswered ?? n.length) : o.length >= (s.minAnswered ?? n.length) ? T(o) : null, a = l === null ? void 0 : _e(l, s.mean, s.standardDeviation);
  return {
    id: e,
    itemIds: [...n],
    raw: l,
    answeredCount: o.length,
    missingCount: n.length - o.length,
    maxPossible: n.reduce((u, m) => {
      var c;
      return u + (((c = r.get(m)) == null ? void 0 : c.max) ?? 0);
    }, 0),
    transforms: a,
    transformed: a
  };
}
function _e(e, n, t) {
  if (n === void 0 || t === void 0 || !t)
    return;
  const r = xe(e, n, t);
  return {
    z: r,
    t: te(r),
    scaled: re(r),
    percentile: qe(r),
    stanine: se(r)
  };
}
function Ae(e, n, t = {}) {
  const r = ee(n, e.items), s = new Map(e.items.map((o) => [o.id, o]));
  return Object.entries(e.subscales ?? {}).map(
    ([o, l]) => An(o, l, r, s, t)
  );
}
function Le(e, n, t) {
  const r = n.filter((o) => t.includes(o.id)), s = r.map((o) => o.raw).filter((o) => o !== null);
  return {
    id: e,
    itemIds: t.slice(),
    raw: s.length === r.length ? T(s) : null,
    answeredCount: s.length,
    missingCount: r.length - s.length
  };
}
function Pe(e, n, t = {}) {
  var i, f, d;
  const r = {
    ...t,
    minAnswered: t.minAnswered ?? ((i = e.scoring) == null ? void 0 : i.minAnswered),
    prorate: t.prorate ?? ((f = e.scoring) == null ? void 0 : f.allowProrating)
  }, s = ee(n, e.items), o = e.items.map((y) => s[y.id]).filter((y) => typeof y == "number" && Number.isFinite(y)), l = Z(e.items.map((y) => s[y.id])), a = r.minAnswered ?? e.items.length, u = r.prorate ? ne(o, e.items.length, a) : o.length >= a ? T(o) : null, m = Ae(e, n, r), c = Object.entries(e.composites ?? {}).map(
    ([y, M]) => Le(y, m, M)
  ), h = [];
  if (l > 0 && ((d = e.scoring) == null ? void 0 : d.maxMissingRate) !== void 0) {
    const y = l / e.items.length;
    y > e.scoring.maxMissingRate && h.push({
      code: "too-much-missing-item-data",
      severity: "warning",
      message: "Missing item rate exceeds configured threshold.",
      observed: y,
      threshold: e.scoring.maxMissingRate,
      source: e.id
    });
  }
  const g = u === null ? void 0 : _e(u, r.mean, r.standardDeviation);
  return {
    scaleId: e.id,
    raw: u,
    transforms: g,
    transformed: g,
    answeredCount: o.length,
    missingCount: l,
    itemCount: e.items.length,
    subscales: m,
    composites: c,
    qualityFlags: h
  };
}
function Ln(e, n, t = {}) {
  return e.map((r) => Pe(r, n[r.id] ?? {}, t));
}
function Pn(e, n) {
  return Se(n, e);
}
function Vn(e) {
  const n = b(e);
  return {
    mean: n.reduce((t, r) => t + r, 0) / n.length,
    standardDeviation: x(n)
  };
}
const ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyReverseScoring: ee,
  changeScore: En,
  discrepancyScore: qn,
  percentileRankFromNormSample: Pn,
  prorateScore: ne,
  reliableChangeIndex: Ee,
  reverseScore: Oe,
  scoreBattery: Ln,
  scoreComposite: Le,
  scoreConfidenceInterval: _n,
  scoreDistributionSummary: Vn,
  scoreLikertScale: Pe,
  scoreSubscales: Ae,
  standardizeZ: xe,
  sumScore: On,
  toPercentileRank: qe,
  toScaledScore: re,
  toStanine: se,
  toTScore: te,
  weightedSumScore: xn
}, Symbol.toStringTag, { value: "Module" }));
function H(e, n) {
  return !e || n === void 0 ? !0 : !(e.min !== void 0 && n < e.min || e.max !== void 0 && n > e.max);
}
function Ve(e, n, t = {}) {
  const r = [], s = e.rows.find(
    (o) => (o.rawMin === void 0 || n >= o.rawMin) && (o.rawMax === void 0 || n <= o.rawMax) && H(o.ageBand, t.age) && H(o.educationBand, t.education) && (o.sex === void 0 || o.sex === t.sex)
  );
  return s ? {
    schemaVersion: X,
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
    interpretation: Ne(e.interpretationBands ?? [], s),
    row: s,
    qualityFlags: r
  } : (r.push({
    code: "norm-mismatch",
    severity: "warning",
    message: "No matching norm row was found for the supplied raw score and context.",
    source: e.id
  }), {
    schemaVersion: X,
    matched: !1,
    tableId: e.id,
    tableVersion: e.version,
    raw: n,
    qualityFlags: r
  });
}
function Nn(e, n) {
  return e.filter((t) => H(t.ageBand, n));
}
function kn(e, n) {
  return e.filter((t) => H(t.educationBand, n));
}
function In(e) {
  return {
    z: e.z,
    t: e.t,
    scaled: e.scaled,
    percentile: e.percentile,
    stanine: e.stanine,
    standardScore: e.standardScore
  };
}
function jn(e, n, t = {}) {
  var r;
  return (r = Ve(e, n, t).normed) == null ? void 0 : r.percentile;
}
function zn(e) {
  return {
    z: e,
    t: te(e),
    scaled: re(e),
    percentile: N(50 + e * 34.1344746, 0, 100),
    stanine: se(e)
  };
}
function Ne(e, n) {
  const t = n.t ?? n.scaled ?? n.standardScore ?? n.percentile ?? n.z;
  if (t !== void 0)
    return e.find(
      (r) => (r.min === void 0 || t >= r.min) && (r.max === void 0 || t <= r.max)
    );
}
const mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  convertZToNorms: zn,
  interpretNorm: Ne,
  lookupAgeBand: Nn,
  lookupEducationBand: kn,
  lookupNorm: Ve,
  percentileLookup: jn,
  rawToNormed: In
}, Symbol.toStringTag, { value: "Module" }));
function Fn(e) {
  var m, c;
  const n = [], t = e.minimumValidTrials ?? 10, r = e.maxMissingRate ?? 0.2, s = e.maxOmissionRate ?? 0.15, o = e.maxAnticipationRate ?? 0.1, l = e.minimumConditionTrials ?? 3, a = e.maxCommissionErrorRate ?? 0.3, u = e.maxBlockInstability ?? 0.3;
  if (e.reactionTimeSummary && e.reactionTimeSummary.validTrialCount < t && n.push({
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
  }), e.commissionErrorRate !== void 0 && e.commissionErrorRate > a && n.push({
    code: "excessive-commission-errors",
    severity: "warning",
    message: "Commission error rate exceeds threshold.",
    observed: e.commissionErrorRate,
    threshold: a,
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
  }), e.responses && K(e.responses) > r && n.push({
    code: "too-much-missing-item-data",
    severity: "warning",
    message: "Missing item rate exceeds threshold.",
    observed: K(e.responses),
    threshold: r,
    source: "qc"
  }), e.conditionCounts && (Object.entries(e.conditionCounts).forEach(([h, g]) => {
    g < l && n.push({
      code: "insufficient-trials-per-condition",
      severity: "warning",
      message: `Condition ${h} has too few trials.`,
      observed: g,
      threshold: l,
      source: "qc",
      metadata: { condition: h }
    });
  }), Object.keys(e.conditionCounts).length || n.push({
    code: "missing-condition-coverage",
    severity: "warning",
    message: "No condition coverage metadata was supplied.",
    source: "qc"
  })), e.blockMetricValues && e.blockMetricValues.length > 1) {
    const h = Math.min(...e.blockMetricValues), g = Math.max(...e.blockMetricValues), i = g === 0 ? 0 : (g - h) / Math.abs(g);
    i > u && n.push({
      code: "unstable-block-performance",
      severity: "warning",
      message: "Block-to-block variability exceeds threshold.",
      observed: i,
      threshold: u,
      source: "qc"
    });
  }
  if ((m = e.observedLatenciesMs) != null && m.length) {
    const h = e.minLatencyMs, g = e.maxLatencyMs, i = h !== void 0 && e.observedLatenciesMs.some((d) => d < h), f = g !== void 0 && e.observedLatenciesMs.some((d) => d > g);
    (i || f) && n.push({
      code: "implausible-latency-values",
      severity: "warning",
      message: "Observed latencies fall outside configured plausibility bounds.",
      source: "qc"
    });
  }
  return e.requiredDelayedPhase && e.hasDelayedPhase === !1 && n.push({
    code: "incomplete-delayed-memory-phase",
    severity: "warning",
    message: "A delayed-memory phase was expected but not completed.",
    source: "qc"
  }), ((c = e.device) == null ? void 0 : c.deviceType) === "mobile" && n.push({
    code: "unsupported-device-metadata",
    severity: "info",
    message: "Mobile device usage may affect timing precision for some tasks.",
    source: "qc"
  }), n;
}
function Dn(e, n = 0.7) {
  return e >= n ? null : {
    code: "unusually-low-reliability",
    severity: "warning",
    message: "Reliability estimate falls below the configured threshold.",
    observed: e,
    threshold: n,
    source: "qc"
  };
}
const gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildQualityFlags: Fn,
  reliabilityWarning: Dn
}, Symbol.toStringTag, { value: "Module" }));
function ke(e) {
  const n = e.map((a) => b(a, "row"));
  if (n.length < 2 || n[0].length < 2)
    return 0;
  const t = n[0].length, r = W(n), s = T(r.map((a) => _(a))), o = n.map((a) => T(a)), l = _(o);
  return l ? t / (t - 1) * (1 - s / l) : 0;
}
function Bn(e, n = "odd-even") {
  const t = e.map((o) => b(o, "row")), r = t.map(
    (o) => o.filter((l, a) => n === "odd-even" ? a % 2 === 0 : a < o.length / 2).reduce((l, a) => l + a, 0)
  ), s = t.map(
    (o) => o.filter((l, a) => n === "odd-even" ? a % 2 === 1 : a >= o.length / 2).reduce((l, a) => l + a, 0)
  );
  return Ie(k(r, s), 2);
}
function Ie(e, n = 2) {
  return e <= -1 || n <= 0 ? 0 : n * e / (1 + (n - 1) * e);
}
function $n(e, n) {
  return k(e, n);
}
function Gn(e, n) {
  return k(e, n);
}
function Jn(e, n) {
  return k(e, n);
}
function Hn(e, n) {
  A(e, n, "raterA and raterB");
  const t = [.../* @__PURE__ */ new Set([...e, ...n])], r = e.filter((o, l) => o === n[l]).length / e.length, s = t.reduce((o, l) => {
    const a = e.filter((m) => m === l).length / e.length, u = n.filter((m) => m === l).length / n.length;
    return o + a * u;
  }, 0);
  return s === 1 ? 1 : (r - s) / (1 - s);
}
function Kn(e) {
  var r;
  const n = e.map((s) => b(s, "row")), t = ((r = n[0]) == null ? void 0 : r.length) ?? 0;
  return Array.from({ length: t }, (s, o) => {
    const l = n.map((u) => u[o]), a = n.map((u) => T(u) - u[o]);
    return {
      itemIndex: o,
      correlation: k(l, a)
    };
  });
}
function Xn(e) {
  var r;
  const n = e.map((s) => b(s, "row")), t = ((r = n[0]) == null ? void 0 : r.length) ?? 0;
  return Array.from({ length: t }, (s, o) => ({
    itemIndex: o,
    correlation: ke(n.map((l) => l.filter((a, u) => u !== o)))
  }));
}
function Wn(e, n) {
  return e < 0 || n < 0 || n > 1 ? 0 : e * Math.sqrt(1 - n);
}
function Qn(e, n, t = 1.96) {
  return {
    lower: e - t * n,
    upper: e + t * n
  };
}
function Un(e) {
  const n = W(e.map((r) => b(r, "row"))), t = [];
  for (let r = 0; r < n.length; r += 1)
    for (let s = r + 1; s < n.length; s += 1)
      t.push(Q(n[r], n[s]));
  return t.length ? S(t) : 0;
}
const ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  alphaIfItemDeleted: Xn,
  alternateFormsReliability: Gn,
  averageInterItemCovariance: Un,
  cohensKappa: Hn,
  cronbachAlpha: ke,
  interRaterAgreement: Jn,
  itemTotalCorrelations: Kn,
  scoreConfidenceIntervalFromSem: Qn,
  spearmanBrown: Ie,
  splitHalfReliability: Bn,
  standardErrorOfMeasurement: Wn,
  testRetestReliability: $n
}, Symbol.toStringTag, { value: "Module" }));
function Yn(e, n, t = {}) {
  var u, m;
  const r = [.../* @__PURE__ */ new Set([...Object.keys(e.metrics), ...Object.keys(n.metrics)])], s = e.protocolId === void 0 || n.protocolId === void 0 || e.protocolId === n.protocolId && (e.protocolVersion === void 0 || n.protocolVersion === void 0 || e.protocolVersion === n.protocolVersion), o = s ? [] : ["Protocol identifiers or versions do not match across sessions."], l = [];
  s || l.push({
    code: "protocol-mismatch",
    severity: "warning",
    message: "Sessions use incompatible protocol metadata.",
    source: "longitudinal"
  });
  const a = r.map((c) => {
    const h = e.metrics[c] ?? null, g = n.metrics[c] ?? null, i = h === null || g === null ? null : g - h, f = i === null || h === null || h === 0 ? null : i / h, d = i === null || t.standardDeviation === void 0 || t.reliability === void 0 ? null : Ee(h, g, t.standardDeviation, t.reliability);
    return {
      key: c,
      baseline: h,
      followUp: g,
      change: i,
      percentChange: f,
      reliableChangeIndex: d
    };
  });
  return {
    summaryType: "session-comparison",
    baselineSessionId: e.sessionId,
    followUpSessionId: n.sessionId,
    protocolCompatible: s,
    protocolMessages: o,
    metrics: a,
    practiceEffect: t.practiceMetricKey ? ((u = a.find((c) => c.key === t.practiceMetricKey)) == null ? void 0 : u.change) ?? null : null,
    fatigueEffect: t.fatigueMetricKey ? ((m = a.find((c) => c.key === t.fatigueMetricKey)) == null ? void 0 : m.change) ?? null : null,
    qualityFlags: l
  };
}
const dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compareSessions: Yn
}, Symbol.toStringTag, { value: "Module" }));
function Zn(e) {
  const n = b(e.loadings, "loadings"), t = b(e.errorVariances, "errorVariances");
  A(n, t, "loadings and errorVariances");
  const r = T(n) ** 2, s = r + T(t);
  return s ? r / s : null;
}
function et(e, n) {
  const t = b(e, "convergent"), r = b(n, "discriminant"), s = S(t), o = S(r);
  return {
    averageConvergent: s,
    averageDiscriminant: o,
    contrast: s - o
  };
}
function nt(e, n) {
  return k(e, n);
}
function tt(e, n) {
  const t = b(e, "groupA"), r = b(n, "groupB");
  return {
    meanDifference: S(t) - S(r),
    effectSizeD: U(t, r)
  };
}
function rt(e, n) {
  const t = n.length, r = e.map((s, o) => [...s, n[o]]);
  for (let s = 0; s < t; s += 1) {
    let o = s;
    for (let a = s + 1; a < t; a += 1)
      Math.abs(r[a][s]) > Math.abs(r[o][s]) && (o = a);
    [r[s], r[o]] = [r[o], r[s]];
    const l = r[s][s];
    if (!l)
      return Array.from({ length: t }, () => 0);
    for (let a = s; a <= t; a += 1)
      r[s][a] /= l;
    for (let a = 0; a < t; a += 1) {
      if (a === s)
        continue;
      const u = r[a][s];
      for (let m = s; m <= t; m += 1)
        r[a][m] -= u * r[s][m];
    }
  }
  return r.map((s) => s[t]);
}
function he(e, n) {
  const t = b(e, "outcome"), r = n.map((g) => b(g, "predictor"));
  r.forEach((g) => A(t, g, "outcome and predictor"));
  const s = t.map((g, i) => [1, ...r.map((f) => f[i])]), o = Array.from(
    { length: s[0].length },
    (g, i) => Array.from(
      { length: s[0].length },
      (f, d) => T(s.map((y) => y[i] * y[d]))
    )
  ), l = Array.from(
    { length: s[0].length },
    (g, i) => T(s.map((f, d) => f[i] * t[d]))
  ), a = rt(o, l), u = s.map((g) => T(g.map((i, f) => i * a[f]))), m = S(t), c = T(t.map((g) => (g - m) ** 2)), h = T(t.map((g, i) => (g - u[i]) ** 2));
  return {
    r2: c ? 1 - h / c : 0,
    coefficients: a
  };
}
function st(e, n, t) {
  const r = he(e, n), s = he(e, [...n, ...t]);
  return {
    baselineR2: r.r2,
    fullModelR2: s.r2,
    deltaR2: s.r2 - r.r2
  };
}
function ot(e, n) {
  const t = b(e, "scores"), r = b(n, "labels");
  A(t, r, "scores and labels");
  const s = [...new Set(t)].sort((c, h) => h - c), o = r.filter((c) => c === 1).length, l = r.filter((c) => c === 0).length, a = s.map((c) => {
    let h = 0, g = 0;
    return t.forEach((i, f) => {
      const d = i >= c, y = r[f] === 1;
      d && y && (h += 1), !d && !y && (g += 1);
    }), {
      threshold: c,
      sensitivity: o ? h / o : 0,
      specificity: l ? g / l : 0
    };
  }), u = [...a].sort((c, h) => 1 - c.specificity - (1 - h.specificity));
  let m = 0;
  for (let c = 1; c < u.length; c += 1) {
    const h = 1 - u[c - 1].specificity, g = 1 - u[c].specificity, i = u[c - 1].sensitivity, f = u[c].sensitivity;
    m += (i + f) / 2 * (g - h);
  }
  return { points: a, auc: m };
}
function it(e, n) {
  return Te(n, e);
}
const ht = {
  bootstrap: we,
  permutationTest: Ce,
  omegaTotal: Zn,
  convergentDiscriminantSummary: et,
  criterionCorrelation: nt,
  knownGroupsComparison: tt,
  incrementalValidity: st,
  rocCurve: ot,
  screeningAssociation: it
};
export {
  ln as EXPORT_FORMAT_VERSION,
  X as NORM_LOOKUP_EXPORT_SCHEMA_VERSION,
  an as PACKAGE_NAME,
  fn as QUALITY_FLAGS_EXPORT_SCHEMA_VERSION,
  gn as SCALE_SCORE_EXPORT_SCHEMA_VERSION,
  dn as SESSION_COMPARISON_SCHEMA_VERSION,
  un as SESSION_SUMMARY_SCHEMA_VERSION,
  mn as TRIAL_RECORD_EXPORT_SCHEMA_VERSION,
  Xn as alphaIfItemDeleted,
  Gn as alternateFormsReliability,
  ee as applyReverseScoring,
  ct as behavioral,
  Fn as buildQualityFlags,
  En as changeScore,
  w as classifyReactionTimeTrial,
  U as cohensD,
  Hn as cohensKappa,
  Yn as compareSessions,
  z as computeConditionContrast,
  Me as confidenceIntervalMean,
  zn as convertZToNorms,
  at as core,
  q as createExportEnvelope,
  j as createExportMetadata,
  vn as createNormLookupExport,
  bn as createQualityFlagsExport,
  yn as createScaleScoresExport,
  Sn as createSessionComparisonExport,
  hn as createSessionSummaryExport,
  pn as createTrialRecordsExport,
  ke as cronbachAlpha,
  qn as discrepancyScore,
  ht as experimental,
  Rn as exportCsv,
  Tn as exportEnvelope,
  Cn as exportScaleScoresJson,
  Mn as exportSessionSummaryJson,
  wn as exportTrialsJson,
  lt as exports,
  rn as hedgesG,
  Jn as interRaterAgreement,
  Ne as interpretNorm,
  Kn as itemTotalCorrelations,
  dt as longitudinal,
  Nn as lookupAgeBand,
  kn as lookupEducationBand,
  Ve as lookupNorm,
  mt as norms,
  jn as percentileLookup,
  Pn as percentileRankFromNormSample,
  ne as prorateScore,
  gt as qc,
  In as rawToNormed,
  ft as reliability,
  Dn as reliabilityWarning,
  Ee as reliableChangeIndex,
  Oe as reverseScore,
  Ln as scoreBattery,
  Le as scoreComposite,
  _n as scoreConfidenceInterval,
  Qn as scoreConfidenceIntervalFromSem,
  Vn as scoreDistributionSummary,
  Pe as scoreLikertScale,
  Ye as scoreSpanTask,
  Ae as scoreSubscales,
  ut as scores,
  Ue as separatePracticeTrials,
  Ie as spearmanBrown,
  Bn as splitHalfReliability,
  Wn as standardErrorOfMeasurement,
  xe as standardizeZ,
  De as summarize,
  Ke as summarizeConditionedReactionTime,
  We as summarizeGoNoGo,
  Qe as summarizeInterferenceTask,
  tn as summarizeLatency,
  en as summarizePairedAssociates,
  nn as summarizeProcessingSpeed,
  Xe as summarizeReactionTime,
  Ze as summarizeRecognitionMemory,
  $n as testRetestReliability,
  qe as toPercentileRank,
  re as toScaledScore,
  se as toStanine,
  te as toTScore,
  xn as weightedSumScore
};
