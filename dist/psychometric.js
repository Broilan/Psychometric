function ne(e) {
  return typeof e == "number" && Number.isFinite(e);
}
function $e(e, n = "value") {
  if (!ne(e))
    throw new TypeError(`${n} must be a finite number`);
}
function v(e, n = "values") {
  if (!Array.isArray(e))
    throw new TypeError(`${n} must be an array`);
  const t = e.filter(ne);
  if (!t.length)
    throw new RangeError(`${n} must contain at least one finite number`);
  return t;
}
function D(e, n, t = "arrays") {
  if (e.length !== n.length)
    throw new RangeError(`${t} must have the same length`);
}
function w(e) {
  return e.reduce((n, t) => n + t, 0);
}
function $(e, n, t) {
  return Math.min(Math.max(e, n), t);
}
function pn(e, n = 6) {
  const t = 10 ** n;
  return Math.round(e * t) / t;
}
function fe(e) {
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
function te(e) {
  return [...e].sort((n, t) => n - t);
}
function S(e) {
  const n = v(e);
  return w(n) / n.length;
}
function Q(e) {
  return B(e, 0.5);
}
function j(e, n = !0) {
  const t = v(e);
  if (t.length < 2)
    return 0;
  const r = S(t), s = n ? t.length - 1 : t.length;
  return w(t.map((o) => (o - r) ** 2)) / s;
}
function V(e, n = !0) {
  return Math.sqrt(j(e, n));
}
function Ge(e) {
  return Math.min(...v(e));
}
function He(e) {
  return Math.max(...v(e));
}
function B(e, n) {
  const t = te(v(e)), r = $(n, 0, 1), s = (t.length - 1) * r, o = Math.floor(s), c = Math.ceil(s);
  if (o === c)
    return t[o];
  const i = s - o;
  return t[o] * (1 - i) + t[c] * i;
}
function yn(e) {
  return B(e, 0.75) - B(e, 0.25);
}
function Je(e) {
  const n = Q(e);
  return Q(e.map((t) => Math.abs(t - n)));
}
function bn(e) {
  const n = v(e), t = B(n, 0.25), r = B(n, 0.75);
  return {
    count: n.length,
    mean: S(n),
    median: Q(n),
    variance: j(n),
    standardDeviation: V(n),
    min: Ge(n),
    max: He(n),
    q1: t,
    q3: r,
    iqr: r - t,
    mad: Je(n)
  };
}
function vn(e) {
  const n = v(e), t = S(n), r = V(n);
  return r ? n.map((s) => (s - t) / r) : n.map(() => 0);
}
function Sn(e) {
  const n = v(e), t = n.map((o, c) => ({ value: o, index: c })).sort((o, c) => o.value - c.value), r = Array.from({ length: n.length }, () => 0);
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
function Ke(e, n) {
  const t = te(v(e)), r = t.filter((o) => o < n).length, s = t.filter((o) => o === n).length;
  return (r + 0.5 * s) / t.length * 100;
}
function Mn(e, n = 0.1) {
  const t = te(v(e)), r = Math.floor(t.length * $(n, 0, 0.49));
  return t.slice(r, t.length - r);
}
function Tn(e, n = 0.1) {
  const t = te(v(e)), r = Math.floor(t.length * $(n, 0, 0.49));
  if (!r)
    return t;
  const s = t[r], o = t[t.length - r - 1];
  return t.map((c, i) => i < r ? s : i >= t.length - r ? o : c);
}
function wn(e) {
  const n = $(e, 1e-10, 0.9999999999), t = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924], r = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857], s = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878], o = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742], c = 0.02425, i = 1 - c;
  if (n < c) {
    const a = Math.sqrt(-2 * Math.log(n));
    return (((((s[0] * a + s[1]) * a + s[2]) * a + s[3]) * a + s[4]) * a + s[5]) / ((((o[0] * a + o[1]) * a + o[2]) * a + o[3]) * a + 1);
  }
  if (n > i) {
    const a = Math.sqrt(-2 * Math.log(1 - n));
    return -(((((s[0] * a + s[1]) * a + s[2]) * a + s[3]) * a + s[4]) * a + s[5]) / ((((o[0] * a + o[1]) * a + o[2]) * a + o[3]) * a + 1);
  }
  const u = n - 0.5, m = u * u;
  return (((((t[0] * m + t[1]) * m + t[2]) * m + t[3]) * m + t[4]) * m + t[5]) * u / (((((r[0] * m + r[1]) * m + r[2]) * m + r[3]) * m + r[4]) * m + 1);
}
function Xe(e, n = 0.95) {
  const t = v(e), r = S(t), s = V(t) / Math.sqrt(t.length), c = wn(0.5 + n / 2) * s;
  return {
    level: n,
    estimate: r,
    margin: c,
    lower: r - c,
    upper: r + c
  };
}
function We(e, n, t = 1e3, r = 0.95) {
  const s = v(e), o = n(s), c = Array.from({ length: t }, () => {
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
      lower: B(c, (1 - r) / 2),
      upper: B(c, 1 - (1 - r) / 2)
    }
  };
}
function Qe(e, n, t, r = 1e3) {
  const s = v(e, "left"), o = v(n, "right"), c = t(s, o), i = [...s, ...o], u = Array.from({ length: r }, () => {
    const a = [...i].sort(() => Math.random() - 0.5), p = a.slice(0, s.length), g = a.slice(s.length);
    return t(p, g);
  }), m = u.filter((a) => Math.abs(a) >= Math.abs(c)).length;
  return {
    observed: c,
    nullDistribution: u,
    pValue: (m + 1) / (r + 1)
  };
}
function he(e, n, t = !0) {
  const r = v(e, "left"), s = v(n, "right");
  D(r, s, "left and right");
  const o = S(r), c = S(s), i = t ? r.length - 1 : r.length;
  return i <= 0 ? 0 : w(r.map((u, m) => (u - o) * (s[m] - c))) / i;
}
function G(e, n) {
  const t = V(e), r = V(n);
  return !t || !r ? 0 : he(e, n) / (t * r);
}
function Ue(e, n) {
  const t = v(e, "binary"), r = v(n, "continuous");
  D(t, r, "binary and continuous");
  const s = r.filter((m, a) => t[a] === 1), o = r.filter((m, a) => t[a] === 0);
  if (!s.length || !o.length)
    return 0;
  const c = s.length / t.length, i = 1 - c, u = V(r);
  return u ? (S(s) - S(o)) / u * Math.sqrt(c * i) : 0;
}
const F = "1.0.0";
function W(e) {
  return typeof e == "number" && Number.isFinite(e);
}
function O(e) {
  return e.filter((n) => W(n));
}
function P(e) {
  const n = e.reactionTimeMs ?? e.latencyMs ?? null;
  return W(n) ? n : null;
}
function Cn(e) {
  return e.correctResponse ?? e.expectedResponse;
}
function Z(e) {
  return e.observedResponse ?? e.response;
}
function R(e) {
  var n, t;
  return !!(e.isPractice || e.phase === "practice" || ((n = e.labels) == null ? void 0 : n.phase) === "practice" || ((t = e.labels) == null ? void 0 : t.scoringPhase) === "practice");
}
function z(e) {
  const n = O(e);
  if (!n.length)
    return {
      meanMs: null,
      medianMs: null,
      standardDeviationMs: null,
      coefficientOfVariation: null,
      minMs: null,
      maxMs: null
    };
  const t = S(n), r = n.length > 1 ? V(n) : 0;
  return {
    meanMs: t,
    medianMs: Q(n),
    standardDeviationMs: n.length > 1 ? r : 0,
    coefficientOfVariation: t ? r / t : null,
    minMs: Math.min(...n),
    maxMs: Math.max(...n)
  };
}
function q(e, n, t = {}, r = "reaction-time", s) {
  const o = n.map((l) => ({ trial: l, classification: x(l, t) })), c = o.filter(({ classification: l }) => l.isValid), i = c.filter(({ classification: l }) => l.isCorrect).map(({ trial: l }) => P(l)), u = o.filter(({ classification: l }) => !l.isCorrect && !l.isOmission), m = o.filter(({ classification: l }) => l.isOmission), a = o.filter(({ classification: l }) => l.isAnticipation), p = o.filter(({ classification: l }) => l.isLapse), g = o.filter(({ classification: l }) => l.isCorrect).length;
  return {
    label: e,
    schemaVersion: F,
    taskFamily: r,
    counts: {
      total: n.length,
      valid: c.length,
      invalid: n.length - c.length,
      correct: g,
      incorrect: u.length,
      omissions: m.length,
      anticipations: a.length,
      lapses: p.length
    },
    rates: {
      accuracy: n.length ? g / n.length : 0,
      error: n.length ? u.length / n.length : 0,
      omission: n.length ? m.length / n.length : 0,
      anticipation: n.length ? a.length / n.length : 0
    },
    timing: z(O(i)),
    metadata: s
  };
}
function ee(e, n) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    const s = n(r);
    s && t.set(s, [...t.get(s) ?? [], r]);
  }), t;
}
function N(e, n, t = {}, r = "reaction-time") {
  const s = ee(e, n);
  if (s.size)
    return Object.fromEntries(
      [...s.entries()].map(([o, c]) => [o, q(o, c, t, r)])
    );
}
function Rn(e, n) {
  var t, r, s, o, c, i;
  return ((t = n.conditionSelector) == null ? void 0 : t.call(n, e)) ?? ((r = e.labels) == null ? void 0 : r.condition) ?? ((s = e.labels) == null ? void 0 : s.congruency) ?? ((o = e.labels) == null ? void 0 : o.switchType) ?? ((c = e.labels) == null ? void 0 : c.cueValidity) ?? (typeof ((i = e.metadata) == null ? void 0 : i.condition) == "string" ? e.metadata.condition : void 0);
}
function le(e, n) {
  var t;
  return ((t = n.blockSelector) == null ? void 0 : t.call(n, e)) ?? e.blockId ?? (e.blockIndex !== void 0 ? `block-${e.blockIndex}` : void 0);
}
function Ye(e, n) {
  var t, r, s;
  return ((t = n.phaseSelector) == null ? void 0 : t.call(n, e)) ?? e.phase ?? ((r = e.labels) == null ? void 0 : r.phase) ?? ((s = e.labels) == null ? void 0 : s.scoringPhase) ?? (R(e) ? "practice" : "scored");
}
function ze(e, n) {
  var t, r;
  return ((t = n.responseSideSelector) == null ? void 0 : t.call(n, e)) ?? e.responseSide ?? ((r = e.labels) == null ? void 0 : r.responseSide) ?? e.stimulusSide;
}
function xn(e, n) {
  var t, r, s;
  return ((t = n.cueSelector) == null ? void 0 : t.call(n, e)) ?? ((r = e.labels) == null ? void 0 : r.cueValidity) ?? ((s = e.labels) == null ? void 0 : s.cueType) ?? e.cue;
}
function Fe(e, n = "meanMs") {
  return e ? n === "medianMs" ? e.timing.medianMs ?? null : e.timing.meanMs : null;
}
function On(e) {
  const n = e.filter((t) => !!t);
  if (n.length)
    return Object.fromEntries(n.map((t) => [t.contrastType ?? `${t.leftLabel}-vs-${t.rightLabel}`, t]));
}
function K(e, n, t) {
  return !e || !n ? null : re(Fe(e), Fe(n), t);
}
function Ln(e, n) {
  return e.length && n.length ? S(e) - S(n) : null;
}
function En(e, n = {}) {
  return e.filter((t) => x(t, n).isValid).map((t) => P(t)).filter((t) => t !== null);
}
function J(e, n = {}) {
  const t = En(e, n);
  return t.length ? S(t) : null;
}
function kn(e) {
  var n, t;
  return ((n = e.labels) == null ? void 0 : n.direction) ?? (typeof ((t = e.metadata) == null ? void 0 : t.direction) == "string" ? e.metadata.direction : void 0);
}
function X(e) {
  return e.expectedSequence ?? e.presentedSequence ?? [];
}
function ue(e) {
  return e.responseSequence ?? e.recalledSequence ?? [];
}
function se(e) {
  return e.isCorrect !== void 0 ? !!e.isCorrect : JSON.stringify(X(e)) === JSON.stringify(ue(e));
}
function qn(e) {
  const n = e.errorTaxonomy ?? {}, t = {};
  return Object.entries(n).forEach(([r, s]) => {
    if (typeof s == "number" && Number.isFinite(s)) {
      t[r] = s;
      return;
    }
    if (typeof s == "boolean") {
      t[r] = s ? 1 : 0;
      return;
    }
    if (typeof s == "string") {
      t[s] = (t[s] ?? 0) + 1;
      return;
    }
    Array.isArray(s) && s.forEach((o) => {
      const c = `${o}`;
      t[c] = (t[c] ?? 0) + 1;
    });
  }), t;
}
function me(e, n) {
  const t = n.filter((s) => se(s)), r = t.map((s) => s.spanLevel ?? s.sequenceLength ?? X(s).length).filter(W);
  return {
    label: e,
    totalTrials: n.length,
    totalCorrectTrials: t.length,
    longestSpan: r.length ? Math.max(...r) : 0,
    meanSpan: r.length ? S(r) : null,
    accuracy: n.length ? t.length / n.length : 0
  };
}
function De(e, n) {
  const t = ee(e, n);
  if (t.size)
    return Object.fromEntries([...t.entries()].map(([r, s]) => [r, me(r, s)]));
}
function re(e, n, t) {
  const r = e === null || n === null ? null : e - n, s = r === null || n === null || n === 0 ? null : r / n, o = r === null || !t.standardizer ? null : r / t.standardizer;
  return {
    schemaVersion: F,
    contrastType: t.contrastType,
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
function x(e, n = {}) {
  const t = n.anticipationThresholdMs ?? 150, r = n.lapseThresholdMs ?? 2e3, s = P(e), o = R(e), c = e.isOmission ?? s === null, i = e.isAnticipation ?? (!c && s !== null && s < t), u = !c && s !== null && s > r, m = !!e.isTimeout, a = !!e.isInvalid || m, p = Cn(e), g = Z(e), l = e.isCorrect ?? (p !== void 0 && g === p), d = ((n.includePractice ?? !1) || !o) && !c && !i && !a;
  return {
    isPractice: o,
    isCorrect: !!l,
    isOmission: c,
    isAnticipation: i,
    isLapse: u,
    isTimeout: m,
    isInvalid: a,
    isValid: d
  };
}
function Vn(e, n, t = {}) {
  return N(t.includePractice ? e : e.filter((r) => !R(r)), n, t);
}
function ce(e, n = {}) {
  var Ne, je;
  const t = n.includePractice ?? !1, r = t ? e : e.filter((b) => !R(b)), s = r.map((b) => ({ trial: b, classification: x(b, n) })), o = s.filter(({ classification: b }) => b.isValid), c = s.filter(({ classification: b }) => !b.isValid), i = s.filter(({ classification: b }) => b.isCorrect), u = s.filter(({ classification: b }) => !b.isCorrect && !b.isOmission), m = s.filter(({ classification: b }) => b.isOmission), a = s.filter(({ classification: b }) => b.isAnticipation), p = s.filter(({ classification: b }) => b.isLapse), g = o.filter(({ classification: b }) => b.isCorrect).map(({ trial: b }) => P(b)), l = z(O(g)), f = {
    ...l,
    medianCorrectRtMs: l.medianMs ?? null,
    meanCorrectRtMs: l.meanMs,
    rtSdMs: l.standardDeviationMs ?? null
  }, d = r.length ? m.length / r.length : 0, y = r.length ? a.length / r.length : 0, M = r.length ? u.length / r.length : 0, E = r.length ? i.length / r.length : 0, k = Math.ceil(r.length / 2), L = r.slice(0, k), U = r.slice(k), ie = L.length ? q("early-half", L, n) : null, ae = U.length ? q("late-half", U, n) : null, h = N(r, (b) => ze(b, n), n), T = N(r, (b) => le(b, n), n), C = N(r, (b) => {
    var Y;
    return (Y = b.labels) == null ? void 0 : Y.congruency;
  }, n), A = N(r, (b) => {
    var Y;
    return (Y = b.labels) == null ? void 0 : Y.switchType;
  }, n), I = N(r, (b) => xn(b, n), n), gn = ((Ne = n.blockLabels) == null ? void 0 : Ne.early) ?? "early", fn = ((je = n.blockLabels) == null ? void 0 : je.late) ?? "late", Ce = ee(r, (b) => le(b, n)), Re = ee(r, (b) => ze(b, n)), xe = J(Ce.get(gn) ?? [], n), Oe = J(Ce.get(fn) ?? [], n), Le = J(L, n), Ee = J(U, n), ke = xe !== null && Oe !== null ? Oe - xe : Le !== null && Ee !== null ? Ee - Le : null, qe = J(Re.get("left") ?? [], n), Ve = J(Re.get("right") ?? [], n), _e = qe !== null && Ve !== null ? Ve - qe : null, Ae = [
    K(C == null ? void 0 : C.incongruent, C == null ? void 0 : C.congruent, {
      leftLabel: "incongruent",
      rightLabel: "congruent",
      metric: "meanCorrectRtMs",
      standardizer: f.standardDeviationMs,
      contrastType: "congruency-effect"
    }),
    K(A == null ? void 0 : A.switch, A == null ? void 0 : A.repeat, {
      leftLabel: "switch",
      rightLabel: "repeat",
      metric: "meanCorrectRtMs",
      standardizer: f.standardDeviationMs,
      contrastType: "switching-cost"
    }),
    K(h == null ? void 0 : h.right, h == null ? void 0 : h.left, {
      leftLabel: "right",
      rightLabel: "left",
      metric: "meanCorrectRtMs",
      standardizer: f.standardDeviationMs,
      contrastType: "response-side-asymmetry"
    }),
    K(I == null ? void 0 : I.invalid, I == null ? void 0 : I.valid, {
      leftLabel: "invalid",
      rightLabel: "valid",
      metric: "meanCorrectRtMs",
      standardizer: f.standardDeviationMs,
      contrastType: "cue-validity-cost"
    })
  ].filter((b) => !!b), hn = On(Ae), Pe = [], Ie = n.minimumValidTrials ?? 10;
  return o.length < Ie && Pe.push({
    code: "insufficient-valid-trials",
    severity: "warning",
    message: "Valid trial count is below the configured minimum.",
    observed: o.length,
    threshold: Ie,
    source: "behavioral.reaction-time"
  }), {
    summaryType: "reaction-time",
    schemaVersion: F,
    taskFamily: "reaction-time",
    practiceIncluded: t,
    counts: {
      total: r.length,
      valid: o.length,
      invalid: c.length,
      correct: i.length,
      incorrect: u.length,
      omissions: m.length,
      anticipations: a.length,
      lapses: p.length
    },
    rates: {
      accuracy: E,
      error: M,
      omission: d,
      anticipation: y
    },
    timing: f,
    comparisons: {
      earlyLateDifferenceMs: ke,
      leftRightAsymmetryMs: _e
    },
    conditionSummaries: N(r, (b) => Rn(b, n), n),
    blockSummaries: T,
    phaseSummaries: N(r, (b) => Ye(b, n), n),
    congruencySummaries: C,
    switchSummaries: A,
    responseSideSummaries: h,
    cueSummaries: I,
    contrastSummaries: hn,
    contrasts: Ae,
    halfSummaries: {
      early: ie,
      late: ae
    },
    practiceSummary: e.some((b) => R(b)) ? q("practice", e.filter((b) => R(b)), { ...n, includePractice: !0 }) : null,
    scoredSummary: r.length ? q("scored", r, n) : null,
    totalTrials: r.length,
    validTrialCount: o.length,
    invalidTrialCount: c.length,
    medianCorrectRt: l.medianMs ?? null,
    meanCorrectRt: l.meanMs,
    rtSd: l.standardDeviationMs ?? null,
    coefficientOfVariation: l.coefficientOfVariation ?? null,
    accuracy: E,
    errorRate: M,
    omissionRate: d,
    anticipationRate: y,
    earlyLateDifferenceMs: ke,
    leftRightAsymmetryMs: _e,
    qualityFlags: Pe
  };
}
function _n(e, n = {}) {
  var r, s, o;
  const t = ce(e, {
    ...n,
    conditionSelector: n.conditionSelector ?? ((c) => {
      var i, u;
      return ((i = c.labels) == null ? void 0 : i.condition) ?? ((u = c.labels) == null ? void 0 : u.congruency);
    })
  });
  return {
    ...t,
    summaryType: "flanker",
    taskFamily: "flanker",
    congruentSummary: (r = t.congruencySummaries) == null ? void 0 : r.congruent,
    incongruentSummary: (s = t.congruencySummaries) == null ? void 0 : s.incongruent,
    congruencyEffect: ((o = t.contrastSummaries) == null ? void 0 : o["congruency-effect"]) ?? null
  };
}
function An(e, n = {}) {
  const t = n.includePractice ? e : e.filter((l) => !R(l)), r = ce(e, {
    ...n,
    conditionSelector: n.conditionSelector ?? ((l) => {
      var f, d;
      return ((f = l.labels) == null ? void 0 : f.condition) ?? ((d = l.labels) == null ? void 0 : d.switchType);
    })
  }), s = t.filter(
    (l) => {
      var f, d, y;
      return ((f = n.singleTaskSelector) == null ? void 0 : f.call(n, l)) ?? (((d = l.labels) == null ? void 0 : d.condition) === "single" || ((y = l.metadata) == null ? void 0 : y.taskContext) === "single");
    }
  ), o = t.filter((l) => {
    var f, d;
    return ((f = l.labels) == null ? void 0 : f.switchType) === "repeat" && ((d = l.labels) == null ? void 0 : d.condition) !== "single";
  }), c = t.filter((l) => {
    var f;
    return ((f = l.labels) == null ? void 0 : f.switchType) === "switch";
  }), i = s.length ? q("single", s, n) : void 0, u = o.length ? q("repeat", o, n) : void 0, m = c.length ? q("switch", c, n) : void 0, a = K(m, u, {
    leftLabel: "switch",
    rightLabel: "repeat",
    metric: "meanCorrectRtMs",
    standardizer: r.timing.standardDeviationMs,
    contrastType: "switching-cost"
  }), p = i ? K(u, i, {
    leftLabel: "repeat",
    rightLabel: "single",
    metric: "meanCorrectRtMs",
    standardizer: r.timing.standardDeviationMs,
    contrastType: "mixing-cost"
  }) : null, g = {
    ...r.contrastSummaries ?? {},
    ...a ? { "switching-cost": a } : {},
    ...p ? { "mixing-cost": p } : {}
  };
  return {
    ...r,
    summaryType: "task-switching",
    taskFamily: "task-switching",
    switchSummary: m,
    repeatSummary: u,
    singleTaskSummary: i,
    switchCost: a,
    mixingCost: p,
    contrastSummaries: g,
    contrasts: [
      ...(r.contrasts ?? []).filter((l) => l.contrastType !== "switching-cost"),
      ...a ? [a] : [],
      ...p ? [p] : []
    ]
  };
}
function Pn(e, n = {}) {
  const t = n.includePractice ? e : e.filter((d) => !R(d)), r = t.filter((d) => {
    var y, M;
    return (((y = d.labels) == null ? void 0 : y.goNoGoType) ?? ((M = d.metadata) == null ? void 0 : M.goNoGoType)) === "go";
  }), s = t.filter((d) => {
    var y, M;
    return (((y = d.labels) == null ? void 0 : y.goNoGoType) ?? ((M = d.metadata) == null ? void 0 : M.goNoGoType)) === "no-go";
  }), o = t.filter((d) => {
    var y, M;
    return (((y = d.labels) == null ? void 0 : y.stopSignalType) ?? ((M = d.metadata) == null ? void 0 : M.stopSignalType)) === "stop";
  }), c = r.length ? q("go", r, n, "go-no-go") : void 0, i = s.length ? q("no-go", s, n, "go-no-go") : void 0, u = o.length ? q("stop", o, n, "go-no-go") : void 0, m = s.filter((d) => Z(d) !== void 0 && !d.isCorrect).length, a = r.filter((d) => x(d, n).isOmission).length, p = t.map((d) => P(d)), g = {
    accuracy: t.length ? t.filter((d) => x(d, n).isCorrect).length / t.length : 0,
    error: t.length ? t.filter((d) => !x(d, n).isCorrect).length / t.length : 0,
    omission: t.length ? t.filter((d) => x(d, n).isOmission).length / t.length : 0,
    anticipation: t.length ? t.filter((d) => x(d, n).isAnticipation).length / t.length : 0,
    commissionError: s.length ? m / s.length : 0
  }, l = c && i ? [
    re(c.rates.accuracy, i.rates.accuracy, {
      leftLabel: "go",
      rightLabel: "no-go",
      metric: "accuracy",
      contrastType: "go-no-go-accuracy-gap"
    })
  ] : [], f = [];
  return s.length && m / s.length > 0.3 && f.push({
    code: "excessive-no-go-false-alarms",
    severity: "warning",
    message: "False alarm rate on no-go trials exceeds threshold.",
    observed: m / s.length,
    threshold: 0.3,
    source: "behavioral.go-no-go"
  }), {
    summaryType: "go-no-go",
    schemaVersion: F,
    taskFamily: "go-no-go",
    counts: {
      total: t.length,
      valid: t.filter((d) => x(d, n).isValid).length,
      invalid: t.filter((d) => !x(d, n).isValid).length,
      correct: t.filter((d) => x(d, n).isCorrect).length,
      incorrect: t.filter((d) => !x(d, n).isCorrect).length,
      omissions: a,
      anticipations: t.filter((d) => x(d, n).isAnticipation).length,
      commissionErrors: m
    },
    rates: g,
    timing: z(O(p)),
    conditionSummaries: {
      ...c ? { go: c } : {},
      ...i ? { "no-go": i } : {},
      ...u ? { stop: u } : {}
    },
    contrasts: l,
    qualityFlags: f,
    metadata: void 0,
    goSummary: c,
    noGoSummary: i,
    stopSummary: u,
    commissionErrors: m,
    omissionErrors: a,
    inhibitionSuccessRate: s.length ? 1 - m / s.length : 0,
    falseAlarmRate: s.length ? m / s.length : 0,
    ssrtMs: void 0
  };
}
function In(e, n = {}) {
  var r, s, o, c, i, u, m, a, p, g;
  const t = ce(e, {
    ...n,
    conditionSelector: n.conditionSelector ?? ((l) => {
      var f, d, y;
      return ((f = l.labels) == null ? void 0 : f.condition) ?? ((d = l.labels) == null ? void 0 : d.congruency) ?? ((y = l.labels) == null ? void 0 : y.switchType);
    })
  });
  return {
    summaryType: "interference-task",
    schemaVersion: F,
    taskFamily: "interference-task",
    counts: t.counts,
    rates: t.rates,
    timing: t.timing,
    conditionSummaries: {
      ...t.congruencySummaries ?? {},
      ...t.switchSummaries ?? {},
      ...t.cueSummaries ?? {}
    },
    contrasts: t.contrasts,
    qualityFlags: t.qualityFlags,
    metadata: void 0,
    congruentSummary: (r = t.congruencySummaries) == null ? void 0 : r.congruent,
    incongruentSummary: (s = t.congruencySummaries) == null ? void 0 : s.incongruent,
    switchSummary: (o = t.switchSummaries) == null ? void 0 : o.switch,
    repeatSummary: (c = t.switchSummaries) == null ? void 0 : c.repeat,
    interferenceEffectMs: ((u = (i = t.contrastSummaries) == null ? void 0 : i["congruency-effect"]) == null ? void 0 : u.rawDifference) ?? null,
    switchingCostMs: ((a = (m = t.contrastSummaries) == null ? void 0 : m["switching-cost"]) == null ? void 0 : a.rawDifference) ?? null,
    mixingCostMs: null,
    cueingBenefitMs: ((g = (p = t.contrastSummaries) == null ? void 0 : p["cue-validity-cost"]) == null ? void 0 : g.rawDifference) ?? null
  };
}
function Ze(e, n, t) {
  let r = 0, s = 0, o = 0, c = 0;
  const i = /* @__PURE__ */ new Set();
  n.forEach((m, a) => {
    if (a >= e.length) {
      c += 1;
      return;
    }
    if (m === e[a]) {
      i.add(m);
      return;
    }
    e.includes(m) && m !== e[a] ? r += 1 : s += 1, i.has(m) && (o += 1), i.add(m);
  });
  const u = {};
  return Object.entries(t ?? {}).forEach(([m, a]) => {
    typeof a == "number" && Number.isFinite(a) ? u[m] = a : typeof a == "string" ? u[a] = (u[a] ?? 0) + 1 : Array.isArray(a) && a.forEach((p) => {
      const g = `${p}`;
      u[g] = (u[g] ?? 0) + 1;
    });
  }), {
    orderErrors: r,
    substitutions: s,
    repetitions: o,
    prematureResponses: c,
    expectedLength: e.length,
    observedLength: n.length,
    taxonomy: u
  };
}
function Nn(e) {
  return {
    practice: e.filter((n) => R(n)),
    scored: e.filter((n) => !R(n)),
    practiceTrials: e.filter((n) => R(n)),
    scoredTrials: e.filter((n) => !R(n))
  };
}
function jn(e, n = {}) {
  const t = n.includePractice ?? !1, r = t ? e : e.filter((h) => !R(h)), s = r.filter((h) => se(h)), o = [...new Set(r.map((h) => h.spanLevel).filter(W))], c = [...new Set(r.map((h) => h.sequenceLength ?? X(h).length).filter(W))], i = Object.fromEntries(
    o.map((h) => {
      const T = r.filter((C) => C.spanLevel === h);
      return [String(h), T.length ? T.filter((C) => se(C)).length / T.length : 0];
    })
  ), u = Object.fromEntries(
    c.map((h) => {
      const T = r.filter((C) => (C.sequenceLength ?? X(C).length) === h);
      return [String(h), T.length ? T.filter((C) => se(C)).length / T.length : 0];
    })
  ), m = O(r.map((h) => h.latencyMs)), a = O(r.map((h) => h.durationMs)), p = O(
    r.map((h) => {
      const T = h.responses ?? ue(h);
      return T.length < 2 || !W(h.durationMs) ? null : h.durationMs / (T.length - 1);
    })
  ), g = n.directionSelector ?? kn, l = De(r, g), f = De(r, n.phaseSelector ?? ((h) => Ye(h, {}))), d = e.some((h) => R(h)) ? me("practice", e.filter((h) => R(h))) : null, y = r.length ? me("scored", r) : null, M = r.map(
    (h) => Ze(X(h), ue(h), h.errorTaxonomy)
  ), E = M.reduce(
    (h, T, C) => (h.orderErrors += T.orderErrors, h.substitutions += T.substitutions, h.repetitions += T.repetitions, h.prematureResponses += T.prematureResponses, h.expectedLength += T.expectedLength, h.observedLength += T.observedLength, Object.entries(T.taxonomy ?? qn(r[C])).forEach(([A, I]) => {
      h.taxonomy[A] = (h.taxonomy[A] ?? 0) + I;
    }), h),
    {
      orderErrors: 0,
      substitutions: 0,
      repetitions: 0,
      prematureResponses: 0,
      expectedLength: 0,
      observedLength: 0,
      taxonomy: {}
    }
  ), k = l == null ? void 0 : l.forward, L = l == null ? void 0 : l.backward, U = k && L ? re(L.meanSpan, k.meanSpan, {
    leftLabel: "backward",
    rightLabel: "forward",
    metric: "meanCorrectSpan",
    contrastType: "forward-backward-span-difference"
  }) : null, ie = O(s.filter((h) => g(h) === "forward").map((h) => P(h))), ae = O(s.filter((h) => g(h) === "backward").map((h) => P(h)));
  return {
    summaryType: "span-task",
    schemaVersion: F,
    taskFamily: "span-task",
    practiceIncluded: t,
    counts: {
      total: r.length,
      correct: s.length,
      incorrect: r.length - s.length
    },
    timing: {
      firstResponseLatencyMeanMs: m.length ? S(m) : null,
      interResponseIntervalMeanMs: p.length ? S(p) : null,
      totalSequenceResponseTimeMeanMs: a.length ? S(a) : null
    },
    timingSummaries: {
      firstResponseLatency: z(m),
      interResponseInterval: z(p),
      totalSequenceResponseTime: z(a)
    },
    phaseSummaries: f,
    directionSummaries: l,
    totalTrials: r.length,
    totalCorrectTrials: s.length,
    longestSpan: Math.max(0, ...s.map((h) => h.spanLevel ?? h.sequenceLength ?? X(h).length)),
    accuracyBySpanLevel: i,
    accuracyBySequenceLength: u,
    firstResponseLatencyMean: m.length ? S(m) : null,
    interResponseIntervalMean: p.length ? S(p) : null,
    totalSequenceResponseTimeMean: a.length ? S(a) : null,
    forwardBackwardDelta: (k == null ? void 0 : k.meanSpan) !== null && (L == null ? void 0 : L.meanSpan) !== null ? ((L == null ? void 0 : L.meanSpan) ?? 0) - ((k == null ? void 0 : k.meanSpan) ?? 0) : null,
    forwardBackwardContrast: U,
    manipulationCost: Ln(ae, ie),
    errors: M,
    errorBreakdown: E,
    practiceSummary: d,
    scoredSummary: y
  };
}
function zn(e, n = {}) {
  const t = n.includePractice ? e : e.filter((g) => !R(g)), r = t.map((g) => {
    const l = !!g.wasPreviouslySeen, f = Z(g), d = f === !0 || f === "old" || f === "seen";
    return {
      trial: g,
      actualOld: l,
      respondedOld: d,
      hit: l && d,
      falseAlarm: !l && d,
      miss: l && !d,
      correctRejection: !l && !d
    };
  }), s = r.filter((g) => g.actualOld), o = r.filter((g) => !g.actualOld), c = s.length ? r.filter((g) => g.hit).length / s.length : 0, i = o.length ? r.filter((g) => g.falseAlarm).length / o.length : 0, u = /* @__PURE__ */ new Map();
  r.forEach((g) => {
    const l = g.trial.phase;
    l && u.set(l, [...u.get(l) ?? [], g]);
  });
  const m = u.size ? Object.fromEntries(
    [...u.entries()].map(([g, l]) => [
      g,
      {
        label: g,
        schemaVersion: F,
        taskFamily: "recognition-memory",
        counts: {
          total: l.length,
          valid: l.length,
          invalid: 0,
          correct: l.filter((f) => f.hit || f.correctRejection).length,
          incorrect: l.filter((f) => f.miss || f.falseAlarm).length,
          omissions: 0,
          anticipations: 0,
          lapses: 0
        },
        rates: {
          accuracy: l.length ? l.filter((f) => f.hit || f.correctRejection).length / l.length : 0,
          error: l.length ? l.filter((f) => f.miss || f.falseAlarm).length / l.length : 0,
          omission: 0,
          anticipation: 0
        },
        timing: z(O(l.map((f) => P(f.trial))))
      }
    ])
  ) : void 0, a = m == null ? void 0 : m.immediate, p = m == null ? void 0 : m.delayed;
  return {
    summaryType: "recognition-memory",
    schemaVersion: F,
    taskFamily: "recognition-memory",
    counts: {
      total: t.length,
      hits: r.filter((g) => g.hit).length,
      falseAlarms: r.filter((g) => g.falseAlarm).length,
      misses: r.filter((g) => g.miss).length,
      correctRejections: r.filter((g) => g.correctRejection).length
    },
    rates: {
      accuracy: t.length ? r.filter((g) => g.hit || g.correctRejection).length / t.length : 0,
      hitRate: c,
      falseAlarmRate: i,
      correctedRecognition: c - i
    },
    timing: z(O(t.map((g) => P(g)))),
    conditionSummaries: m,
    learningCurve: void 0,
    contrasts: a && p ? [
      re(p.rates.accuracy, a.rates.accuracy, {
        leftLabel: "delayed",
        rightLabel: "immediate",
        metric: "accuracy",
        contrastType: "delayed-memory-change"
      })
    ] : [],
    qualityFlags: [],
    hitRate: c,
    falseAlarmRate: i,
    correctedRecognition: c - i,
    delayedChange: a && p ? p.rates.accuracy - a.rates.accuracy : null
  };
}
function Fn(e, n = {}) {
  const t = n.includePractice ? e : e.filter((u) => !R(u)), r = t.filter((u) => u.isCorrect).length, s = N(t, (u) => le(u, n), n, "paired-associates"), o = Object.keys(s ?? {}), c = o.length ? s == null ? void 0 : s[o[0]] : void 0, i = o.length ? s == null ? void 0 : s[o[o.length - 1]] : void 0;
  return {
    summaryType: "paired-associates",
    schemaVersion: F,
    taskFamily: "paired-associates",
    counts: {
      total: t.length,
      correct: r,
      incorrect: t.length - r
    },
    rates: {
      accuracy: t.length ? r / t.length : 0
    },
    timing: z(O(t.map((u) => P(u)))),
    conditionSummaries: s,
    learningCurve: s ? Object.fromEntries(Object.entries(s).map(([u, m]) => [u, m.rates.accuracy])) : void 0,
    contrasts: [],
    qualityFlags: [],
    totalCorrect: r,
    learningGain: c && i ? i.rates.accuracy - c.rates.accuracy : null
  };
}
function Dn(e, n = {}) {
  const t = e.filter((u) => Z(u) !== void 0 || u.isCorrect !== void 0), r = e.filter((u) => u.isCorrect).length, s = n.durationMinutes ?? (() => {
    const u = O(e.map((m) => m.durationMs));
    return u.length ? S(u) / 6e4 : null;
  })(), o = n.timeWindowSelector ?? ((u) => u.blockId), c = ee(e, o), i = c.size ? Object.fromEntries([...c.entries()].map(([u, m]) => {
    const a = m.filter((f) => f.isCorrect).length, p = m.filter((f) => Z(f) !== void 0 || f.isCorrect !== void 0).length, g = O(m.map((f) => f.durationMs)), l = g.length ? S(g) / 6e4 : null;
    return [u, {
      counts: {
        total: m.length,
        attempted: p,
        correct: a,
        incorrect: p - a
      },
      rates: {
        accuracy: p ? a / p : 0
      },
      throughputPerMinute: l ? a / l : void 0
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
    blockSummaries: i,
    qualityFlags: []
  };
}
function Bn(e) {
  const n = v(e);
  return {
    mean: S(n),
    median: Q(n),
    standardDeviation: V(n)
  };
}
const Jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  classifyReactionTimeTrial: x,
  classifySequenceErrors: Ze,
  computeConditionContrast: re,
  scoreSpanTask: jn,
  separatePracticeTrials: Nn,
  summarizeConditionedReactionTime: Vn,
  summarizeFlanker: _n,
  summarizeGoNoGo: Pn,
  summarizeInterferenceTask: In,
  summarizeLatency: Bn,
  summarizePairedAssociates: Fn,
  summarizeProcessingSpeed: Dn,
  summarizeReactionTime: ce,
  summarizeRecognitionMemory: zn,
  summarizeTaskSwitching: An
}, Symbol.toStringTag, { value: "Module" }));
function pe(e, n, t = !0) {
  const r = v(e, "left"), s = v(n, "right");
  if (!r.length || !s.length)
    return 0;
  const o = Math.sqrt(t ? ((r.length - 1) * j(r) + (s.length - 1) * j(s)) / (r.length + s.length - 2) || 0 : (j(r) + j(s)) / 2);
  return o ? (S(r) - S(s)) / o : 0;
}
function $n(e, n) {
  const t = pe(e, n), r = e.length + n.length;
  return r <= 3 ? t : t * (1 - 3 / (4 * r - 9));
}
function Gn(e, n) {
  return D(e, n, "binary and continuous"), G(e, n);
}
function Hn(e, n) {
  const t = v(e, "baseline"), r = v(n, "followUp");
  D(t, r, "baseline and followUp");
  const s = r.map((c, i) => c - t[i]), o = V(s);
  return o ? S(s) / o : 0;
}
function ye(e, n = {}) {
  var t;
  return e == null ? !0 : ((t = n.treatAsMissing) == null ? void 0 : t.includes(e)) ?? !1;
}
function Jn(e, n = {}) {
  return e.filter((t) => !ye(t, n) && ne(t));
}
function be(e, n = {}) {
  return e.filter((t) => ye(t, n) || !ne(t)).length;
}
function de(e, n = {}) {
  return e.length ? be(e, n) / e.length : 0;
}
const Kt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assertFiniteNumber: $e,
  assertSameLength: D,
  bootstrap: We,
  clamp: $,
  cohensD: pe,
  compactNumbers: Jn,
  confidenceIntervalMean: Xe,
  correlation: G,
  countMissing: be,
  covariance: he,
  ensureFiniteNumbers: v,
  hedgesG: $n,
  iqr: yn,
  isFiniteNumber: ne,
  isMissingValue: ye,
  mad: Je,
  max: He,
  mean: S,
  median: Q,
  min: Ge,
  missingRate: de,
  numericSort: te,
  percentileOfScore: Ke,
  permutationTest: Qe,
  pointBiserial: Ue,
  pointBiserialFromGroups: Gn,
  quantile: B,
  rank: Sn,
  round: pn,
  standardDeviation: V,
  standardizedMeanDifference: Hn,
  sum: w,
  summarize: bn,
  transposeMatrix: fe,
  trim: Mn,
  variance: j,
  winsorize: Tn,
  zScores: vn
}, Symbol.toStringTag, { value: "Module" })), Kn = "psychometric", Xn = "1.0.0", Wn = "1.0.0", Qn = "1.0.0", Un = "1.0.0", ge = "1.0.0", Yn = "1.0.0", Zn = "1.0.0";
function H(e, n, t) {
  return {
    kind: e,
    exportVersion: Xn,
    schemaVersion: t,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    packageName: Kn,
    packageVersion: n
  };
}
function _(e, n) {
  return { metadata: n, payload: e };
}
function et(e, n) {
  return _(e, H("session-summary", n, Wn));
}
function nt(e, n) {
  return _(e, H("trial-records", n, Qn));
}
function tt(e, n) {
  return _(e, H("scale-scores", n, Un));
}
function rt(e, n) {
  return _(e, H("norm-lookup", n, ge));
}
function st(e, n) {
  return _(e, H("quality-flags", n, Yn));
}
function ot(e, n) {
  return _(e, H("session-comparison", n, Zn));
}
function ct(e, n) {
  return JSON.stringify(_(e, n), null, 2);
}
function it(e, n) {
  return JSON.stringify(_(e, n), null, 2);
}
function at(e, n) {
  return JSON.stringify(_(e, n), null, 2);
}
function lt(e, n) {
  return JSON.stringify(_(e, n), null, 2);
}
function ut(e) {
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
const Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createExportEnvelope: _,
  createExportMetadata: H,
  createNormLookupExport: rt,
  createQualityFlagsExport: st,
  createScaleScoresExport: tt,
  createSessionComparisonExport: ot,
  createSessionSummaryExport: et,
  createTrialRecordsExport: nt,
  exportCsv: ut,
  exportEnvelope: lt,
  exportScaleScoresJson: at,
  exportSessionSummaryJson: ct,
  exportTrialsJson: it
}, Symbol.toStringTag, { value: "Module" }));
function en(e, n, t) {
  return $e(e, "value"), t + n - e;
}
function ve(e, n) {
  return Object.fromEntries(
    n.map((t) => {
      const r = e[t.id];
      return t.reverse && typeof r == "number" && t.min !== void 0 && t.max !== void 0 ? [t.id, en(r, t.min, t.max)] : [t.id, r];
    })
  );
}
function mt(e) {
  return w(v(e));
}
function dt(e, n) {
  const t = v(e, "values"), r = v(n, "weights");
  if (t.length !== r.length)
    throw new RangeError("values and weights must have the same length");
  return w(t.map((s, o) => s * r[o]));
}
function Se(e, n, t = n) {
  const r = e.filter((s) => typeof s == "number" && Number.isFinite(s));
  return r.length < t || !n ? null : w(r) / r.length * n;
}
function gt(e, n, t = !1) {
  const r = e - n;
  return t ? Math.abs(r) : r;
}
function ft(e, n) {
  return n - e;
}
function nn(e, n, t) {
  return t ? (e - n) / t : 0;
}
function Me(e, n = 50, t = 10) {
  return n + e * t;
}
function Te(e, n = 10, t = 3) {
  return n + e * t;
}
function tn(e) {
  return $(50 + e * 34.1344746, 0, 100);
}
function we(e) {
  return $(Math.round(e * 2 + 5), 1, 9);
}
function rn(e, n, t, r) {
  if (t <= 0 || r < 0 || r > 1)
    return null;
  const s = t * Math.sqrt(2 * (1 - r));
  return s ? (n - e) / s : null;
}
function ht(e, n, t = 0.95) {
  const r = [e - n, e, e + n], s = Xe(r, t);
  return {
    lower: e - s.margin,
    upper: e + s.margin,
    level: t
  };
}
function pt(e, n, t, r, s = {}) {
  const o = n.map((u) => t[u]).filter((u) => typeof u == "number" && Number.isFinite(u)), c = s.prorate ? Se(o, n.length, s.minAnswered ?? n.length) : o.length >= (s.minAnswered ?? n.length) ? w(o) : null, i = c === null ? void 0 : sn(c, s.mean, s.standardDeviation);
  return {
    id: e,
    itemIds: [...n],
    raw: c,
    answeredCount: o.length,
    missingCount: n.length - o.length,
    maxPossible: n.reduce((u, m) => {
      var a;
      return u + (((a = r.get(m)) == null ? void 0 : a.max) ?? 0);
    }, 0),
    transforms: i,
    transformed: i
  };
}
function sn(e, n, t) {
  if (n === void 0 || t === void 0 || !t)
    return;
  const r = nn(e, n, t);
  return {
    z: r,
    t: Me(r),
    scaled: Te(r),
    percentile: tn(r),
    stanine: we(r)
  };
}
function on(e, n, t = {}) {
  const r = ve(n, e.items), s = new Map(e.items.map((o) => [o.id, o]));
  return Object.entries(e.subscales ?? {}).map(
    ([o, c]) => pt(o, c, r, s, t)
  );
}
function cn(e, n, t) {
  const r = n.filter((o) => t.includes(o.id)), s = r.map((o) => o.raw).filter((o) => o !== null);
  return {
    id: e,
    itemIds: t.slice(),
    raw: s.length === r.length ? w(s) : null,
    answeredCount: s.length,
    missingCount: r.length - s.length
  };
}
function an(e, n, t = {}) {
  var l, f, d;
  const r = {
    ...t,
    minAnswered: t.minAnswered ?? ((l = e.scoring) == null ? void 0 : l.minAnswered),
    prorate: t.prorate ?? ((f = e.scoring) == null ? void 0 : f.allowProrating)
  }, s = ve(n, e.items), o = e.items.map((y) => s[y.id]).filter((y) => typeof y == "number" && Number.isFinite(y)), c = be(e.items.map((y) => s[y.id])), i = r.minAnswered ?? e.items.length, u = r.prorate ? Se(o, e.items.length, i) : o.length >= i ? w(o) : null, m = on(e, n, r), a = Object.entries(e.composites ?? {}).map(
    ([y, M]) => cn(y, m, M)
  ), p = [];
  if (c > 0 && ((d = e.scoring) == null ? void 0 : d.maxMissingRate) !== void 0) {
    const y = c / e.items.length;
    y > e.scoring.maxMissingRate && p.push({
      code: "too-much-missing-item-data",
      severity: "warning",
      message: "Missing item rate exceeds configured threshold.",
      observed: y,
      threshold: e.scoring.maxMissingRate,
      source: e.id
    });
  }
  const g = u === null ? void 0 : sn(u, r.mean, r.standardDeviation);
  return {
    scaleId: e.id,
    raw: u,
    transforms: g,
    transformed: g,
    answeredCount: o.length,
    missingCount: c,
    itemCount: e.items.length,
    subscales: m,
    composites: a,
    qualityFlags: p
  };
}
function yt(e, n, t = {}) {
  return e.map((r) => an(r, n[r.id] ?? {}, t));
}
function bt(e, n) {
  return Ke(n, e);
}
function vt(e) {
  const n = v(e);
  return {
    mean: n.reduce((t, r) => t + r, 0) / n.length,
    standardDeviation: V(n)
  };
}
const Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyReverseScoring: ve,
  changeScore: ft,
  discrepancyScore: gt,
  percentileRankFromNormSample: bt,
  prorateScore: Se,
  reliableChangeIndex: rn,
  reverseScore: en,
  scoreBattery: yt,
  scoreComposite: cn,
  scoreConfidenceInterval: ht,
  scoreDistributionSummary: vt,
  scoreLikertScale: an,
  scoreSubscales: on,
  standardizeZ: nn,
  sumScore: mt,
  toPercentileRank: tn,
  toScaledScore: Te,
  toStanine: we,
  toTScore: Me,
  weightedSumScore: dt
}, Symbol.toStringTag, { value: "Module" }));
function oe(e, n) {
  return !e || n === void 0 ? !0 : !(e.min !== void 0 && n < e.min || e.max !== void 0 && n > e.max);
}
function ln(e, n, t = {}) {
  const r = [], s = e.rows.find(
    (o) => (o.rawMin === void 0 || n >= o.rawMin) && (o.rawMax === void 0 || n <= o.rawMax) && oe(o.ageBand, t.age) && oe(o.educationBand, t.education) && (o.sex === void 0 || o.sex === t.sex)
  );
  return s ? {
    schemaVersion: ge,
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
    interpretation: un(e.interpretationBands ?? [], s),
    row: s,
    qualityFlags: r
  } : (r.push({
    code: "norm-mismatch",
    severity: "warning",
    message: "No matching norm row was found for the supplied raw score and context.",
    source: e.id
  }), {
    schemaVersion: ge,
    matched: !1,
    tableId: e.id,
    tableVersion: e.version,
    raw: n,
    qualityFlags: r
  });
}
function St(e, n) {
  return e.filter((t) => oe(t.ageBand, n));
}
function Mt(e, n) {
  return e.filter((t) => oe(t.educationBand, n));
}
function Tt(e) {
  return {
    z: e.z,
    t: e.t,
    scaled: e.scaled,
    percentile: e.percentile,
    stanine: e.stanine,
    standardScore: e.standardScore
  };
}
function wt(e, n, t = {}) {
  var r;
  return (r = ln(e, n, t).normed) == null ? void 0 : r.percentile;
}
function Ct(e) {
  return {
    z: e,
    t: Me(e),
    scaled: Te(e),
    percentile: $(50 + e * 34.1344746, 0, 100),
    stanine: we(e)
  };
}
function un(e, n) {
  const t = n.t ?? n.scaled ?? n.standardScore ?? n.percentile ?? n.z;
  if (t !== void 0)
    return e.find(
      (r) => (r.min === void 0 || t >= r.min) && (r.max === void 0 || t <= r.max)
    );
}
const Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  convertZToNorms: Ct,
  interpretNorm: un,
  lookupAgeBand: St,
  lookupEducationBand: Mt,
  lookupNorm: ln,
  percentileLookup: wt,
  rawToNormed: Tt
}, Symbol.toStringTag, { value: "Module" }));
function Rt(e) {
  var m, a, p, g, l;
  const n = [], t = e.minimumValidTrials ?? 10, r = e.maxMissingRate ?? 0.2, s = e.maxOmissionRate ?? 0.15, o = e.maxAnticipationRate ?? 0.1, c = e.minimumConditionTrials ?? 3, i = e.maxCommissionErrorRate ?? 0.3, u = e.maxBlockInstability ?? 0.3;
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
  }), e.commissionErrorRate !== void 0 && e.commissionErrorRate > i && n.push({
    code: "excessive-commission-errors",
    severity: "warning",
    message: "Commission error rate exceeds threshold.",
    observed: e.commissionErrorRate,
    threshold: i,
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
  }), e.expectedProtocolId && e.actualProtocolId && e.expectedProtocolId !== e.actualProtocolId && n.push({
    code: "protocol-mismatch",
    severity: "error",
    message: "Observed protocol identifier does not match the expected protocol identifier.",
    source: "qc"
  }), e.completed === !1 && n.push({
    code: "incomplete-session",
    severity: "warning",
    message: "Session did not complete normally.",
    source: "qc"
  }), e.responses && de(e.responses) > r && n.push({
    code: "too-much-missing-item-data",
    severity: "warning",
    message: "Missing item rate exceeds threshold.",
    observed: de(e.responses),
    threshold: r,
    source: "qc"
  }), e.conditionCounts) {
    if ((m = e.requiredConditions) != null && m.length) {
      const f = e.requiredConditions.filter((d) => {
        var y;
        return !((y = e.conditionCounts) != null && y[d]);
      });
      f.length && n.push({
        code: "missing-key-conditions",
        severity: "warning",
        message: "One or more expected conditions were not observed.",
        source: "qc",
        metadata: { conditions: f }
      });
    }
    Object.entries(e.conditionCounts).forEach(([f, d]) => {
      d < c && n.push({
        code: "insufficient-trials-per-condition",
        severity: "warning",
        message: `Condition ${f} has too few trials.`,
        observed: d,
        threshold: c,
        source: "qc",
        metadata: { condition: f }
      });
    }), (a = e.requiredConditionGroups) == null || a.forEach((f) => {
      const d = f.minimumTrials ?? c, y = f.conditions.filter((M) => {
        var E;
        return (((E = e.conditionCounts) == null ? void 0 : E[M]) ?? 0) < d;
      });
      y.length && n.push({
        code: f.code,
        severity: "warning",
        message: `${f.label} coverage is insufficient.`,
        threshold: d,
        source: "qc",
        metadata: { conditions: y }
      });
    }), Object.keys(e.conditionCounts).length || n.push({
      code: "missing-condition-coverage",
      severity: "warning",
      message: "No condition coverage metadata was supplied.",
      source: "qc"
    });
  }
  if (e.blockMetricValues && e.blockMetricValues.length > 1) {
    const f = Math.min(...e.blockMetricValues), d = Math.max(...e.blockMetricValues), y = d === 0 ? 0 : (d - f) / Math.abs(d);
    y > u && n.push({
      code: "unstable-block-performance",
      severity: "warning",
      message: "Block-to-block variability exceeds threshold.",
      observed: y,
      threshold: u,
      source: "qc"
    });
  }
  if ((p = e.observedLatenciesMs) != null && p.length) {
    const f = e.minLatencyMs, d = e.maxLatencyMs, y = f !== void 0 && e.observedLatenciesMs.some((E) => E < f), M = d !== void 0 && e.observedLatenciesMs.some((E) => E > d);
    (y || M) && n.push({
      code: "implausible-latency-values",
      severity: "warning",
      message: "Observed latencies fall outside configured plausibility bounds.",
      source: "qc"
    });
  }
  if (e.requiredDelayedPhase && e.hasDelayedPhase === !1 && n.push({
    code: "incomplete-delayed-memory-phase",
    severity: "warning",
    message: "A delayed-memory phase was expected but not completed.",
    source: "qc"
  }), (g = e.requiredSpanLevels) != null && g.length) {
    const f = e.requiredSpanLevels.filter((d) => {
      var M;
      const y = String(d);
      return !((M = e.spanLevelCounts) != null && M[y]);
    });
    f.length && n.push({
      code: "incomplete-span-level-coverage",
      severity: "warning",
      message: "One or more required span levels were not observed.",
      source: "qc",
      metadata: { spanLevels: f.map(String) }
    });
  }
  return ((l = e.device) == null ? void 0 : l.deviceType) === "mobile" && n.push({
    code: "unsupported-device-metadata",
    severity: "info",
    message: "Mobile device usage may affect timing precision for some tasks.",
    source: "qc"
  }), n;
}
function xt(e, n = 0.7) {
  return e >= n ? null : {
    code: "unusually-low-reliability",
    severity: "warning",
    message: "Reliability estimate falls below the configured threshold.",
    observed: e,
    threshold: n,
    source: "qc"
  };
}
const Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildQualityFlags: Rt,
  reliabilityWarning: xt
}, Symbol.toStringTag, { value: "Module" }));
function mn(e) {
  const n = e.map((i) => v(i, "row"));
  if (n.length < 2 || n[0].length < 2)
    return 0;
  const t = n[0].length, r = fe(n), s = w(r.map((i) => j(i))), o = n.map((i) => w(i)), c = j(o);
  return c ? t / (t - 1) * (1 - s / c) : 0;
}
function Ot(e, n = "odd-even") {
  const t = e.map((o) => v(o, "row")), r = t.map(
    (o) => o.filter((c, i) => n === "odd-even" ? i % 2 === 0 : i < o.length / 2).reduce((c, i) => c + i, 0)
  ), s = t.map(
    (o) => o.filter((c, i) => n === "odd-even" ? i % 2 === 1 : i >= o.length / 2).reduce((c, i) => c + i, 0)
  );
  return dn(G(r, s), 2);
}
function dn(e, n = 2) {
  return e <= -1 || n <= 0 ? 0 : n * e / (1 + (n - 1) * e);
}
function Lt(e, n) {
  return G(e, n);
}
function Et(e, n) {
  return G(e, n);
}
function kt(e, n) {
  return G(e, n);
}
function qt(e, n) {
  D(e, n, "raterA and raterB");
  const t = [.../* @__PURE__ */ new Set([...e, ...n])], r = e.filter((o, c) => o === n[c]).length / e.length, s = t.reduce((o, c) => {
    const i = e.filter((m) => m === c).length / e.length, u = n.filter((m) => m === c).length / n.length;
    return o + i * u;
  }, 0);
  return s === 1 ? 1 : (r - s) / (1 - s);
}
function Vt(e) {
  var r;
  const n = e.map((s) => v(s, "row")), t = ((r = n[0]) == null ? void 0 : r.length) ?? 0;
  return Array.from({ length: t }, (s, o) => {
    const c = n.map((u) => u[o]), i = n.map((u) => w(u) - u[o]);
    return {
      itemIndex: o,
      correlation: G(c, i)
    };
  });
}
function _t(e) {
  var r;
  const n = e.map((s) => v(s, "row")), t = ((r = n[0]) == null ? void 0 : r.length) ?? 0;
  return Array.from({ length: t }, (s, o) => ({
    itemIndex: o,
    correlation: mn(n.map((c) => c.filter((i, u) => u !== o)))
  }));
}
function At(e, n) {
  return e < 0 || n < 0 || n > 1 ? 0 : e * Math.sqrt(1 - n);
}
function Pt(e, n, t = 1.96) {
  return {
    lower: e - t * n,
    upper: e + t * n
  };
}
function It(e) {
  const n = fe(e.map((r) => v(r, "row"))), t = [];
  for (let r = 0; r < n.length; r += 1)
    for (let s = r + 1; s < n.length; s += 1)
      t.push(he(n[r], n[s]));
  return t.length ? S(t) : 0;
}
const Yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  alphaIfItemDeleted: _t,
  alternateFormsReliability: Et,
  averageInterItemCovariance: It,
  cohensKappa: qt,
  cronbachAlpha: mn,
  interRaterAgreement: kt,
  itemTotalCorrelations: Vt,
  scoreConfidenceIntervalFromSem: Pt,
  spearmanBrown: dn,
  splitHalfReliability: Ot,
  standardErrorOfMeasurement: At,
  testRetestReliability: Lt
}, Symbol.toStringTag, { value: "Module" }));
function Nt(e, n, t = {}) {
  var u, m;
  const r = [.../* @__PURE__ */ new Set([...Object.keys(e.metrics), ...Object.keys(n.metrics)])], s = e.protocolId === void 0 || n.protocolId === void 0 || e.protocolId === n.protocolId && (e.protocolVersion === void 0 || n.protocolVersion === void 0 || e.protocolVersion === n.protocolVersion), o = s ? [] : ["Protocol identifiers or versions do not match across sessions."], c = [];
  s || c.push({
    code: "protocol-mismatch",
    severity: "warning",
    message: "Sessions use incompatible protocol metadata.",
    source: "longitudinal"
  });
  const i = r.map((a) => {
    const p = e.metrics[a] ?? null, g = n.metrics[a] ?? null, l = p === null || g === null ? null : g - p, f = l === null || p === null || p === 0 ? null : l / p, d = l === null || t.standardDeviation === void 0 || t.reliability === void 0 ? null : rn(p, g, t.standardDeviation, t.reliability);
    return {
      key: a,
      baseline: p,
      followUp: g,
      change: l,
      percentChange: f,
      reliableChangeIndex: d,
      direction: l === null || l === 0 ? "no-change" : l > 0 ? "increase" : "decrease"
    };
  });
  return {
    summaryType: "session-comparison",
    schemaVersion: "1.0.0",
    baselineSessionId: e.sessionId,
    followUpSessionId: n.sessionId,
    protocolCompatible: s,
    protocolMessages: o,
    metrics: i,
    practiceEffect: t.practiceMetricKey ? ((u = i.find((a) => a.key === t.practiceMetricKey)) == null ? void 0 : u.change) ?? null : null,
    fatigueEffect: t.fatigueMetricKey ? ((m = i.find((a) => a.key === t.fatigueMetricKey)) == null ? void 0 : m.change) ?? null : null,
    qualityFlags: c,
    metadata: t.metadata
  };
}
const Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compareSessions: Nt
}, Symbol.toStringTag, { value: "Module" }));
function jt(e) {
  const n = v(e.loadings, "loadings"), t = v(e.errorVariances, "errorVariances");
  D(n, t, "loadings and errorVariances");
  const r = w(n) ** 2, s = r + w(t);
  return s ? r / s : null;
}
function zt(e, n) {
  const t = v(e, "convergent"), r = v(n, "discriminant"), s = S(t), o = S(r);
  return {
    averageConvergent: s,
    averageDiscriminant: o,
    contrast: s - o
  };
}
function Ft(e, n) {
  return G(e, n);
}
function Dt(e, n) {
  const t = v(e, "groupA"), r = v(n, "groupB");
  return {
    meanDifference: S(t) - S(r),
    effectSizeD: pe(t, r)
  };
}
function Bt(e, n) {
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
      for (let m = s; m <= t; m += 1)
        r[i][m] -= u * r[s][m];
    }
  }
  return r.map((s) => s[t]);
}
function Be(e, n) {
  const t = v(e, "outcome"), r = n.map((g) => v(g, "predictor"));
  r.forEach((g) => D(t, g, "outcome and predictor"));
  const s = t.map((g, l) => [1, ...r.map((f) => f[l])]), o = Array.from(
    { length: s[0].length },
    (g, l) => Array.from(
      { length: s[0].length },
      (f, d) => w(s.map((y) => y[l] * y[d]))
    )
  ), c = Array.from(
    { length: s[0].length },
    (g, l) => w(s.map((f, d) => f[l] * t[d]))
  ), i = Bt(o, c), u = s.map((g) => w(g.map((l, f) => l * i[f]))), m = S(t), a = w(t.map((g) => (g - m) ** 2)), p = w(t.map((g, l) => (g - u[l]) ** 2));
  return {
    r2: a ? 1 - p / a : 0,
    coefficients: i
  };
}
function $t(e, n, t) {
  const r = Be(e, n), s = Be(e, [...n, ...t]);
  return {
    baselineR2: r.r2,
    fullModelR2: s.r2,
    deltaR2: s.r2 - r.r2
  };
}
function Gt(e, n) {
  const t = v(e, "scores"), r = v(n, "labels");
  D(t, r, "scores and labels");
  const s = [...new Set(t)].sort((a, p) => p - a), o = r.filter((a) => a === 1).length, c = r.filter((a) => a === 0).length, i = s.map((a) => {
    let p = 0, g = 0;
    return t.forEach((l, f) => {
      const d = l >= a, y = r[f] === 1;
      d && y && (p += 1), !d && !y && (g += 1);
    }), {
      threshold: a,
      sensitivity: o ? p / o : 0,
      specificity: c ? g / c : 0
    };
  }), u = [...i].sort((a, p) => 1 - a.specificity - (1 - p.specificity));
  let m = 0;
  for (let a = 1; a < u.length; a += 1) {
    const p = 1 - u[a - 1].specificity, g = 1 - u[a].specificity, l = u[a - 1].sensitivity, f = u[a].sensitivity;
    m += (l + f) / 2 * (g - p);
  }
  return { points: i, auc: m };
}
function Ht(e, n) {
  return Ue(n, e);
}
const er = {
  bootstrap: We,
  permutationTest: Qe,
  omegaTotal: jt,
  convergentDiscriminantSummary: zt,
  criterionCorrelation: Ft,
  knownGroupsComparison: Dt,
  incrementalValidity: $t,
  rocCurve: Gt,
  screeningAssociation: Ht
};
export {
  Xn as EXPORT_FORMAT_VERSION,
  ge as NORM_LOOKUP_EXPORT_SCHEMA_VERSION,
  Kn as PACKAGE_NAME,
  Yn as QUALITY_FLAGS_EXPORT_SCHEMA_VERSION,
  Un as SCALE_SCORE_EXPORT_SCHEMA_VERSION,
  Zn as SESSION_COMPARISON_SCHEMA_VERSION,
  Wn as SESSION_SUMMARY_SCHEMA_VERSION,
  Qn as TRIAL_RECORD_EXPORT_SCHEMA_VERSION,
  _t as alphaIfItemDeleted,
  Et as alternateFormsReliability,
  ve as applyReverseScoring,
  Jt as behavioral,
  Rt as buildQualityFlags,
  ft as changeScore,
  x as classifyReactionTimeTrial,
  pe as cohensD,
  qt as cohensKappa,
  Nt as compareSessions,
  re as computeConditionContrast,
  Xe as confidenceIntervalMean,
  Ct as convertZToNorms,
  Kt as core,
  _ as createExportEnvelope,
  H as createExportMetadata,
  rt as createNormLookupExport,
  st as createQualityFlagsExport,
  tt as createScaleScoresExport,
  ot as createSessionComparisonExport,
  et as createSessionSummaryExport,
  nt as createTrialRecordsExport,
  mn as cronbachAlpha,
  gt as discrepancyScore,
  er as experimental,
  ut as exportCsv,
  lt as exportEnvelope,
  at as exportScaleScoresJson,
  ct as exportSessionSummaryJson,
  it as exportTrialsJson,
  Xt as exports,
  $n as hedgesG,
  kt as interRaterAgreement,
  un as interpretNorm,
  Vt as itemTotalCorrelations,
  Zt as longitudinal,
  St as lookupAgeBand,
  Mt as lookupEducationBand,
  ln as lookupNorm,
  Qt as norms,
  wt as percentileLookup,
  bt as percentileRankFromNormSample,
  Se as prorateScore,
  Ut as qc,
  Tt as rawToNormed,
  Yt as reliability,
  xt as reliabilityWarning,
  rn as reliableChangeIndex,
  en as reverseScore,
  yt as scoreBattery,
  cn as scoreComposite,
  ht as scoreConfidenceInterval,
  Pt as scoreConfidenceIntervalFromSem,
  vt as scoreDistributionSummary,
  an as scoreLikertScale,
  jn as scoreSpanTask,
  on as scoreSubscales,
  Wt as scores,
  Nn as separatePracticeTrials,
  dn as spearmanBrown,
  Ot as splitHalfReliability,
  At as standardErrorOfMeasurement,
  nn as standardizeZ,
  bn as summarize,
  Vn as summarizeConditionedReactionTime,
  _n as summarizeFlanker,
  Pn as summarizeGoNoGo,
  In as summarizeInterferenceTask,
  Bn as summarizeLatency,
  Fn as summarizePairedAssociates,
  Dn as summarizeProcessingSpeed,
  ce as summarizeReactionTime,
  zn as summarizeRecognitionMemory,
  An as summarizeTaskSwitching,
  Lt as testRetestReliability,
  tn as toPercentileRank,
  Te as toScaledScore,
  we as toStanine,
  Me as toTScore,
  dt as weightedSumScore
};
