function I(e) {
  return typeof e == "number" && Number.isFinite(e);
}
function ye(e, n = "value") {
  if (!I(e))
    throw new TypeError(`${n} must be a finite number`);
}
function g(e, n = "values") {
  if (!Array.isArray(e))
    throw new TypeError(`${n} must be an array`);
  const t = e.filter(I);
  if (!t.length)
    throw new RangeError(`${n} must contain at least one finite number`);
  return t;
}
function q(e, n, t = "arrays") {
  if (e.length !== n.length)
    throw new RangeError(`${t} must have the same length`);
}
function M(e) {
  return e.reduce((n, t) => n + t, 0);
}
function N(e, n, t) {
  return Math.min(Math.max(e, n), t);
}
function ve(e) {
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
function Y(e) {
  return [...e].sort((n, t) => n - t);
}
function d(e) {
  const n = g(e);
  return M(n) / n.length;
}
function x(e) {
  return T(e, 0.5);
}
function b(e, n = !0) {
  const t = g(e);
  if (t.length < 2)
    return 0;
  const r = d(t), s = n ? t.length - 1 : t.length;
  return M(t.map((o) => (o - r) ** 2)) / s;
}
function R(e, n = !0) {
  return Math.sqrt(b(e, n));
}
function ee(e) {
  return Math.min(...g(e));
}
function ne(e) {
  return Math.max(...g(e));
}
function T(e, n) {
  const t = Y(g(e)), r = N(n, 0, 1), s = (t.length - 1) * r, o = Math.floor(s), c = Math.ceil(s);
  if (o === c)
    return t[o];
  const i = s - o;
  return t[o] * (1 - i) + t[c] * i;
}
function Me(e) {
  return T(e, 0.75) - T(e, 0.25);
}
function te(e) {
  const n = x(e);
  return x(e.map((t) => Math.abs(t - n)));
}
function Se(e) {
  const n = g(e), t = T(n, 0.25), r = T(n, 0.75);
  return {
    count: n.length,
    mean: d(n),
    median: x(n),
    variance: b(n),
    standardDeviation: R(n),
    min: ee(n),
    max: ne(n),
    q1: t,
    q3: r,
    iqr: r - t,
    mad: te(n)
  };
}
function be(e, n) {
  const t = Y(g(e)), r = t.filter((o) => o < n).length, s = t.filter((o) => o === n).length;
  return (r + 0.5 * s) / t.length * 100;
}
function Re(e) {
  const n = N(e, 1e-10, 0.9999999999), t = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924], r = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857], s = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878], o = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742], c = 0.02425, i = 1 - c;
  if (n < c) {
    const a = Math.sqrt(-2 * Math.log(n));
    return (((((s[0] * a + s[1]) * a + s[2]) * a + s[3]) * a + s[4]) * a + s[5]) / ((((o[0] * a + o[1]) * a + o[2]) * a + o[3]) * a + 1);
  }
  if (n > i) {
    const a = Math.sqrt(-2 * Math.log(1 - n));
    return -(((((s[0] * a + s[1]) * a + s[2]) * a + s[3]) * a + s[4]) * a + s[5]) / ((((o[0] * a + o[1]) * a + o[2]) * a + o[3]) * a + 1);
  }
  const u = n - 0.5, h = u * u;
  return (((((t[0] * h + t[1]) * h + t[2]) * h + t[3]) * h + t[4]) * h + t[5]) * u / (((((r[0] * h + r[1]) * h + r[2]) * h + r[3]) * h + r[4]) * h + 1);
}
function re(e, n = 0.95) {
  const t = g(e), r = d(t), s = R(t) / Math.sqrt(t.length), c = Re(0.5 + n / 2) * s;
  return {
    level: n,
    estimate: r,
    margin: c,
    lower: r - c,
    upper: r + c
  };
}
function we(e, n, t = 1e3, r = 0.95) {
  const s = g(e), o = n(s), c = Array.from({ length: t }, () => {
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
      lower: T(c, (1 - r) / 2),
      upper: T(c, 1 - (1 - r) / 2)
    }
  };
}
function Te(e, n, t, r = 1e3) {
  const s = g(e, "left"), o = g(n, "right"), c = t(s, o), i = [...s, ...o], u = Array.from({ length: r }, () => {
    const a = [...i].sort(() => Math.random() - 0.5), l = a.slice(0, s.length), f = a.slice(s.length);
    return t(l, f);
  }), h = u.filter((a) => Math.abs(a) >= Math.abs(c)).length;
  return {
    observed: c,
    nullDistribution: u,
    pValue: (h + 1) / (r + 1)
  };
}
function xe(e, n, t = !0) {
  const r = g(e, "left"), s = g(n, "right");
  q(r, s, "left and right");
  const o = d(r), c = d(s), i = t ? r.length - 1 : r.length;
  return i <= 0 ? 0 : M(r.map((u, h) => (u - o) * (s[h] - c))) / i;
}
function A(e, n) {
  const t = R(e), r = R(n);
  return !t || !r ? 0 : xe(e, n) / (t * r);
}
function Ce(e, n) {
  const t = g(e, "binary"), r = g(n, "continuous");
  q(t, r, "binary and continuous");
  const s = r.filter((h, a) => t[a] === 1), o = r.filter((h, a) => t[a] === 0);
  if (!s.length || !o.length)
    return 0;
  const c = s.length / t.length, i = 1 - c, u = R(r);
  return u ? (d(s) - d(o)) / u * Math.sqrt(c * i) : 0;
}
function se(e, n = {}) {
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
function Ee(e, n = {}) {
  var W, U;
  const t = n.includePractice ?? !1, r = e.filter((m) => t || !m.isPractice), s = r.map((m) => ({ trial: m, classification: se(m, n) })), o = s.filter(({ classification: m }) => m.isValid), c = s.filter(({ classification: m }) => !m.isValid), i = s.filter(({ classification: m }) => m.isCorrect), u = s.filter(({ classification: m }) => !m.isCorrect && !m.isOmission), h = s.filter(({ classification: m }) => m.isOmission), a = s.filter(({ classification: m }) => m.isAnticipation), l = s.filter(({ classification: m }) => m.isLapse), f = o.filter(({ classification: m }) => m.isCorrect).map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs).filter((m) => typeof m == "number" && Number.isFinite(m)), v = ((W = n.blockLabels) == null ? void 0 : W.early) ?? "early", p = ((U = n.blockLabels) == null ? void 0 : U.late) ?? "late", S = o.filter(({ trial: m }) => (m.blockId ?? v) === v).map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs ?? 0), y = o.filter(({ trial: m }) => (m.blockId ?? p) === p).map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs ?? 0), C = o.filter(({ trial: m }) => m.stimulusSide === "left").map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs ?? 0), _ = o.filter(({ trial: m }) => m.stimulusSide === "right").map(({ trial: m }) => m.reactionTimeMs ?? m.latencyMs ?? 0), $ = r.length ? h.length / r.length : 0, j = r.length ? a.length / r.length : 0, H = r.length ? u.length / r.length : 0, X = r.length ? i.length / r.length : 0, E = f.length ? d(f) : null, O = f.length > 1 ? R(f) : null, G = [], K = n.minimumValidTrials ?? 10;
  return o.length < K && G.push({
    code: "insufficient-valid-trials",
    severity: "warning",
    message: "Valid trial count is below the configured minimum.",
    observed: o.length,
    threshold: K,
    source: "behavioral.reaction-time"
  }), {
    summaryType: "reaction-time",
    practiceIncluded: t,
    counts: {
      total: r.length,
      valid: o.length,
      invalid: c.length,
      correct: i.length,
      incorrect: u.length,
      omissions: h.length,
      anticipations: a.length,
      lapses: l.length
    },
    rates: {
      accuracy: X,
      error: H,
      omission: $,
      anticipation: j
    },
    timing: {
      medianCorrectRtMs: f.length ? x(f) : null,
      meanCorrectRtMs: E,
      rtSdMs: O,
      coefficientOfVariation: E && O ? O / E : null
    },
    comparisons: {
      earlyLateDifferenceMs: S.length && y.length ? d(y) - d(S) : null,
      leftRightAsymmetryMs: C.length && _.length ? d(_) - d(C) : null
    },
    totalTrials: r.length,
    validTrialCount: o.length,
    invalidTrialCount: c.length,
    medianCorrectRt: f.length ? x(f) : null,
    meanCorrectRt: E,
    rtSd: O,
    coefficientOfVariation: E && O ? O / E : null,
    accuracy: X,
    errorRate: H,
    omissionRate: $,
    anticipationRate: j,
    earlyLateDifferenceMs: S.length && y.length ? d(y) - d(S) : null,
    leftRightAsymmetryMs: C.length && _.length ? d(_) - d(C) : null,
    qualityFlags: G
  };
}
function Oe(e, n) {
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
function qe(e) {
  return {
    practice: e.filter((n) => n.isPractice),
    scored: e.filter((n) => !n.isPractice),
    practiceTrials: e.filter((n) => n.isPractice),
    scoredTrials: e.filter((n) => !n.isPractice)
  };
}
function Ae(e, n = {}) {
  const t = n.includePractice ? e : e.filter((l) => !l.isPractice), r = t.filter(
    (l) => l.isCorrect ?? JSON.stringify(l.expectedSequence ?? []) === JSON.stringify(l.responseSequence ?? [])
  ), s = [...new Set(t.map((l) => l.spanLevel).filter((l) => typeof l == "number"))], o = Object.fromEntries(
    s.map((l) => {
      const f = t.filter((p) => p.spanLevel === l), v = f.filter(
        (p) => p.isCorrect ?? JSON.stringify(p.expectedSequence ?? []) === JSON.stringify(p.responseSequence ?? [])
      );
      return [String(l), f.length ? v.length / f.length : 0];
    })
  ), c = t.map((l) => l.latencyMs).filter((l) => typeof l == "number" && Number.isFinite(l)), i = t.map((l) => l.durationMs).filter((l) => typeof l == "number" && Number.isFinite(l)), u = t.map((l) => {
    const f = l.responses ?? [];
    return f.length < 2 || !l.durationMs ? null : l.durationMs / (f.length - 1);
  }).filter((l) => typeof l == "number" && Number.isFinite(l)), h = r.filter((l) => {
    var f;
    return `${((f = l.metadata) == null ? void 0 : f.direction) ?? "forward"}` == "forward";
  }), a = r.filter((l) => {
    var f;
    return `${((f = l.metadata) == null ? void 0 : f.direction) ?? "forward"}` == "backward";
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
      firstResponseLatencyMeanMs: c.length ? d(c) : null,
      interResponseIntervalMeanMs: u.length ? d(u) : null,
      totalSequenceResponseTimeMeanMs: i.length ? d(i) : null
    },
    totalTrials: t.length,
    totalCorrectTrials: r.length,
    longestSpan: Math.max(0, ...r.map((l) => l.spanLevel ?? 0)),
    accuracyBySpanLevel: o,
    firstResponseLatencyMean: c.length ? d(c) : null,
    interResponseIntervalMean: u.length ? d(u) : null,
    totalSequenceResponseTimeMean: i.length ? d(i) : null,
    forwardBackwardDelta: h.length && a.length ? d(h.map((l) => l.spanLevel ?? 0)) - d(a.map((l) => l.spanLevel ?? 0)) : null,
    errors: t.map(
      (l) => Oe(l.expectedSequence ?? [], l.responseSequence ?? [])
    )
  };
}
function Ne(e) {
  const n = g(e);
  return {
    mean: d(n),
    median: x(n),
    standardDeviation: R(n)
  };
}
function k(e, n, t = !0) {
  const r = g(e, "left"), s = g(n, "right");
  if (!r.length || !s.length)
    return 0;
  const o = Math.sqrt(t ? ((r.length - 1) * b(r) + (s.length - 1) * b(s)) / (r.length + s.length - 2) || 0 : (b(r) + b(s)) / 2);
  return o ? (d(r) - d(s)) / o : 0;
}
function Ve(e, n) {
  const t = k(e, n), r = e.length + n.length;
  return r <= 3 ? t : t * (1 - 3 / (4 * r - 9));
}
function _e(e, n = {}) {
  var t;
  return e == null ? !0 : ((t = n.treatAsMissing) == null ? void 0 : t.includes(e)) ?? !1;
}
function oe(e, n = {}) {
  return e.filter((t) => _e(t, n) || !I(t)).length;
}
function Z(e, n = {}) {
  return e.length ? oe(e, n) / e.length : 0;
}
const Pe = "psychometric", Le = "1.0.0", Ie = "1.0.0", ke = "1.0.0", Fe = "1.0.0", L = "1.0.0";
function V(e, n, t) {
  return {
    kind: e,
    exportVersion: Le,
    schemaVersion: t,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    packageName: Pe,
    packageVersion: n
  };
}
function w(e, n) {
  return { metadata: n, payload: e };
}
function Be(e, n) {
  return w(e, V("session-summary", n, Ie));
}
function De(e, n) {
  return w(e, V("trial-records", n, ke));
}
function Je(e, n) {
  return w(e, V("scale-scores", n, Fe));
}
function ze(e, n) {
  return w(e, V("norm-lookup", n, L));
}
function $e(e, n) {
  return JSON.stringify(w(e, n), null, 2);
}
function je(e, n) {
  return JSON.stringify(w(e, n), null, 2);
}
function He(e, n) {
  return JSON.stringify(w(e, n), null, 2);
}
function Xe(e, n) {
  return JSON.stringify(w(e, n), null, 2);
}
function Ge(e) {
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
function ie(e) {
  const n = e.map((i) => g(i, "row"));
  if (n.length < 2 || n[0].length < 2)
    return 0;
  const t = n[0].length, r = ve(n), s = M(r.map((i) => b(i))), o = n.map((i) => M(i)), c = b(o);
  return c ? t / (t - 1) * (1 - s / c) : 0;
}
function Ke(e, n = "odd-even") {
  const t = e.map((o) => g(o, "row")), r = t.map(
    (o) => o.filter((c, i) => n === "odd-even" ? i % 2 === 0 : i < o.length / 2).reduce((c, i) => c + i, 0)
  ), s = t.map(
    (o) => o.filter((c, i) => n === "odd-even" ? i % 2 === 1 : i >= o.length / 2).reduce((c, i) => c + i, 0)
  );
  return ce(A(r, s), 2);
}
function ce(e, n = 2) {
  return e <= -1 || n <= 0 ? 0 : n * e / (1 + (n - 1) * e);
}
function We(e, n) {
  return A(e, n);
}
function Ue(e, n) {
  return A(e, n);
}
function Ze(e, n) {
  return A(e, n);
}
function Qe(e, n) {
  q(e, n, "raterA and raterB");
  const t = [.../* @__PURE__ */ new Set([...e, ...n])], r = e.filter((o, c) => o === n[c]).length / e.length, s = t.reduce((o, c) => {
    const i = e.filter((h) => h === c).length / e.length, u = n.filter((h) => h === c).length / n.length;
    return o + i * u;
  }, 0);
  return s === 1 ? 1 : (r - s) / (1 - s);
}
function Ye(e) {
  var r;
  const n = e.map((s) => g(s, "row")), t = ((r = n[0]) == null ? void 0 : r.length) ?? 0;
  return Array.from({ length: t }, (s, o) => {
    const c = n.map((u) => u[o]), i = n.map((u) => M(u) - u[o]);
    return {
      itemIndex: o,
      correlation: A(c, i)
    };
  });
}
function en(e) {
  var r;
  const n = e.map((s) => g(s, "row")), t = ((r = n[0]) == null ? void 0 : r.length) ?? 0;
  return Array.from({ length: t }, (s, o) => ({
    itemIndex: o,
    correlation: ie(n.map((c) => c.filter((i, u) => u !== o)))
  }));
}
function nn(e, n) {
  return e < 0 || n < 0 || n > 1 ? 0 : e * Math.sqrt(1 - n);
}
function tn(e, n, t = 1.96) {
  return {
    lower: e - t * n,
    upper: e + t * n
  };
}
function rn(e) {
  const n = g(e.loadings, "loadings"), t = g(e.errorVariances, "errorVariances");
  q(n, t, "loadings and errorVariances");
  const r = M(n) ** 2, s = r + M(t);
  return s ? r / s : null;
}
function sn(e, n) {
  const t = g(e, "convergent"), r = g(n, "discriminant"), s = d(t), o = d(r);
  return {
    averageConvergent: s,
    averageDiscriminant: o,
    contrast: s - o
  };
}
function on(e, n) {
  return A(e, n);
}
function cn(e, n) {
  const t = g(e, "groupA"), r = g(n, "groupB");
  return {
    meanDifference: d(t) - d(r),
    effectSizeD: k(t, r)
  };
}
function an(e, n) {
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
function Q(e, n) {
  const t = g(e, "outcome"), r = n.map((f) => g(f, "predictor"));
  r.forEach((f) => q(t, f, "outcome and predictor"));
  const s = t.map((f, v) => [1, ...r.map((p) => p[v])]), o = Array.from(
    { length: s[0].length },
    (f, v) => Array.from(
      { length: s[0].length },
      (p, S) => M(s.map((y) => y[v] * y[S]))
    )
  ), c = Array.from(
    { length: s[0].length },
    (f, v) => M(s.map((p, S) => p[v] * t[S]))
  ), i = an(o, c), u = s.map((f) => M(f.map((v, p) => v * i[p]))), h = d(t), a = M(t.map((f) => (f - h) ** 2)), l = M(t.map((f, v) => (f - u[v]) ** 2));
  return {
    r2: a ? 1 - l / a : 0,
    coefficients: i
  };
}
function ln(e, n, t) {
  const r = Q(e, n), s = Q(e, [...n, ...t]);
  return {
    baselineR2: r.r2,
    fullModelR2: s.r2,
    deltaR2: s.r2 - r.r2
  };
}
function un(e, n) {
  const t = g(e, "scores"), r = g(n, "labels");
  q(t, r, "scores and labels");
  const s = [...new Set(t)].sort((a, l) => l - a), o = r.filter((a) => a === 1).length, c = r.filter((a) => a === 0).length, i = s.map((a) => {
    let l = 0, f = 0;
    return t.forEach((v, p) => {
      const S = v >= a, y = r[p] === 1;
      S && y && (l += 1), !S && !y && (f += 1);
    }), {
      threshold: a,
      sensitivity: o ? l / o : 0,
      specificity: c ? f / c : 0
    };
  }), u = [...i].sort((a, l) => 1 - a.specificity - (1 - l.specificity));
  let h = 0;
  for (let a = 1; a < u.length; a += 1) {
    const l = 1 - u[a - 1].specificity, f = 1 - u[a].specificity, v = u[a - 1].sensitivity, p = u[a].sensitivity;
    h += (v + p) / 2 * (f - l);
  }
  return { points: i, auc: h };
}
function mn(e, n) {
  return Ce(n, e);
}
const On = {
  bootstrap: we,
  permutationTest: Te,
  omegaTotal: rn,
  convergentDiscriminantSummary: sn,
  criterionCorrelation: on,
  knownGroupsComparison: cn,
  incrementalValidity: ln,
  rocCurve: un,
  screeningAssociation: mn
};
function ae(e, n, t) {
  return ye(e, "value"), t + n - e;
}
function F(e, n) {
  return Object.fromEntries(
    n.map((t) => {
      const r = e[t.id];
      return t.reverse && typeof r == "number" && t.min !== void 0 && t.max !== void 0 ? [t.id, ae(r, t.min, t.max)] : [t.id, r];
    })
  );
}
function fn(e, n) {
  const t = g(e, "values"), r = g(n, "weights");
  if (t.length !== r.length)
    throw new RangeError("values and weights must have the same length");
  return M(t.map((s, o) => s * r[o]));
}
function B(e, n, t = n) {
  const r = e.filter((s) => typeof s == "number" && Number.isFinite(s));
  return r.length < t || !n ? null : M(r) / r.length * n;
}
function hn(e, n, t = !1) {
  const r = e - n;
  return t ? Math.abs(r) : r;
}
function gn(e, n) {
  return n - e;
}
function le(e, n, t) {
  return t ? (e - n) / t : 0;
}
function D(e, n = 50, t = 10) {
  return n + e * t;
}
function J(e, n = 10, t = 3) {
  return n + e * t;
}
function ue(e) {
  return N(50 + e * 34.1344746, 0, 100);
}
function z(e) {
  return N(Math.round(e * 2 + 5), 1, 9);
}
function dn(e, n, t, r) {
  if (t <= 0 || r < 0 || r > 1)
    return null;
  const s = t * Math.sqrt(2 * (1 - r));
  return s ? (n - e) / s : null;
}
function pn(e, n, t = 0.95) {
  const r = [e - n, e, e + n], s = re(r, t);
  return {
    lower: e - s.margin,
    upper: e + s.margin,
    level: t
  };
}
function yn(e, n, t, r, s = {}) {
  const o = n.map((u) => t[u]).filter((u) => typeof u == "number" && Number.isFinite(u)), c = s.prorate ? B(o, n.length, s.minAnswered ?? n.length) : o.length >= (s.minAnswered ?? n.length) ? M(o) : null, i = c === null ? void 0 : me(c, s.mean, s.standardDeviation);
  return {
    id: e,
    itemIds: [...n],
    raw: c,
    answeredCount: o.length,
    missingCount: n.length - o.length,
    maxPossible: n.reduce((u, h) => {
      var a;
      return u + (((a = r.get(h)) == null ? void 0 : a.max) ?? 0);
    }, 0),
    transforms: i,
    transformed: i
  };
}
function me(e, n, t) {
  if (n === void 0 || t === void 0 || !t)
    return;
  const r = le(e, n, t);
  return {
    z: r,
    t: D(r),
    scaled: J(r),
    percentile: ue(r),
    stanine: z(r)
  };
}
function fe(e, n, t = {}) {
  const r = F(n, e.items), s = new Map(e.items.map((o) => [o.id, o]));
  return Object.entries(e.subscales ?? {}).map(
    ([o, c]) => yn(o, c, r, s, t)
  );
}
function he(e, n, t) {
  const r = n.filter((o) => t.includes(o.id)), s = r.map((o) => o.raw).filter((o) => o !== null);
  return {
    id: e,
    itemIds: t.slice(),
    raw: s.length === r.length ? M(s) : null,
    answeredCount: s.length,
    missingCount: r.length - s.length
  };
}
function ge(e, n, t = {}) {
  var v, p, S;
  const r = {
    ...t,
    minAnswered: t.minAnswered ?? ((v = e.scoring) == null ? void 0 : v.minAnswered),
    prorate: t.prorate ?? ((p = e.scoring) == null ? void 0 : p.allowProrating)
  }, s = F(n, e.items), o = e.items.map((y) => s[y.id]).filter((y) => typeof y == "number" && Number.isFinite(y)), c = oe(e.items.map((y) => s[y.id])), i = r.minAnswered ?? e.items.length, u = r.prorate ? B(o, e.items.length, i) : o.length >= i ? M(o) : null, h = fe(e, n, r), a = Object.entries(e.composites ?? {}).map(
    ([y, C]) => he(y, h, C)
  ), l = [];
  if (c > 0 && ((S = e.scoring) == null ? void 0 : S.maxMissingRate) !== void 0) {
    const y = c / e.items.length;
    y > e.scoring.maxMissingRate && l.push({
      code: "too-much-missing-item-data",
      severity: "warning",
      message: "Missing item rate exceeds configured threshold.",
      observed: y,
      threshold: e.scoring.maxMissingRate,
      source: e.id
    });
  }
  const f = u === null ? void 0 : me(u, r.mean, r.standardDeviation);
  return {
    scaleId: e.id,
    raw: u,
    transforms: f,
    transformed: f,
    answeredCount: o.length,
    missingCount: c,
    itemCount: e.items.length,
    subscales: h,
    composites: a,
    qualityFlags: l
  };
}
function vn(e, n, t = {}) {
  return e.map((r) => ge(r, n[r.id] ?? {}, t));
}
function Mn(e, n) {
  return be(n, e);
}
function Sn(e) {
  const n = g(e);
  return {
    mean: n.reduce((t, r) => t + r, 0) / n.length,
    standardDeviation: R(n)
  };
}
function P(e, n) {
  return !e || n === void 0 ? !0 : !(e.min !== void 0 && n < e.min || e.max !== void 0 && n > e.max);
}
function de(e, n, t = {}) {
  const r = [], s = e.rows.find(
    (o) => (o.rawMin === void 0 || n >= o.rawMin) && (o.rawMax === void 0 || n <= o.rawMax) && P(o.ageBand, t.age) && P(o.educationBand, t.education) && (o.sex === void 0 || o.sex === t.sex)
  );
  return s ? {
    schemaVersion: L,
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
    interpretation: pe(e.interpretationBands ?? [], s),
    row: s,
    qualityFlags: r
  } : (r.push({
    code: "norm-mismatch",
    severity: "warning",
    message: "No matching norm row was found for the supplied raw score and context.",
    source: e.id
  }), {
    schemaVersion: L,
    matched: !1,
    tableId: e.id,
    tableVersion: e.version,
    raw: n,
    qualityFlags: r
  });
}
function bn(e, n) {
  return e.filter((t) => P(t.ageBand, n));
}
function Rn(e, n) {
  return e.filter((t) => P(t.educationBand, n));
}
function wn(e) {
  return {
    z: e.z,
    t: e.t,
    scaled: e.scaled,
    percentile: e.percentile,
    stanine: e.stanine,
    standardScore: e.standardScore
  };
}
function Tn(e, n, t = {}) {
  var r;
  return (r = de(e, n, t).normed) == null ? void 0 : r.percentile;
}
function xn(e) {
  return {
    z: e,
    t: D(e),
    scaled: J(e),
    percentile: N(50 + e * 34.1344746, 0, 100),
    stanine: z(e)
  };
}
function pe(e, n) {
  const t = n.t ?? n.scaled ?? n.standardScore ?? n.percentile ?? n.z;
  if (t !== void 0)
    return e.find(
      (r) => (r.min === void 0 || t >= r.min) && (r.max === void 0 || t <= r.max)
    );
}
function Cn(e) {
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
  }), e.responses && Z(e.responses) > r && n.push({
    code: "too-much-missing-item-data",
    severity: "warning",
    message: "Missing item rate exceeds threshold.",
    observed: Z(e.responses),
    threshold: r,
    source: "qc"
  }), ((c = e.device) == null ? void 0 : c.deviceType) === "mobile" && n.push({
    code: "unsupported-device-metadata",
    severity: "info",
    message: "Mobile device usage may affect timing precision for some tasks.",
    source: "qc"
  }), n;
}
function En(e, n = 0.7) {
  return e >= n ? null : {
    code: "unusually-low-reliability",
    severity: "warning",
    message: "Reliability estimate falls below the configured threshold.",
    observed: e,
    threshold: n,
    source: "qc"
  };
}
const qn = {
  classifyReactionTimeTrial: se,
  scoreSpanTask: Ae,
  separatePracticeTrials: qe,
  summarizeLatency: Ne,
  summarizeReactionTime: Ee
}, An = {
  confidenceIntervalMean: re,
  cohensD: k,
  hedgesG: Ve,
  iqr: Me,
  mad: te,
  max: ne,
  mean: d,
  median: x,
  min: ee,
  quantile: T,
  standardDeviation: R,
  summarize: Se,
  variance: b
}, Nn = {
  createExportEnvelope: w,
  createExportMetadata: V,
  createNormLookupExport: ze,
  createScaleScoresExport: Je,
  createSessionSummaryExport: Be,
  createTrialRecordsExport: De,
  exportCsv: Ge,
  exportEnvelope: Xe,
  exportScaleScoresJson: He,
  exportSessionSummaryJson: $e,
  exportTrialsJson: je
}, Vn = {
  convertZToNorms: xn,
  interpretNorm: pe,
  lookupAgeBand: bn,
  lookupEducationBand: Rn,
  lookupNorm: de,
  percentileLookup: Tn,
  rawToNormed: wn
}, _n = {
  buildQualityFlags: Cn,
  reliabilityWarning: En
}, Pn = {
  alphaIfItemDeleted: en,
  alternateFormsReliability: Ue,
  cohensKappa: Qe,
  cronbachAlpha: ie,
  interRaterAgreement: Ze,
  itemTotalCorrelations: Ye,
  scoreConfidenceIntervalFromSem: tn,
  spearmanBrown: ce,
  splitHalfReliability: Ke,
  standardErrorOfMeasurement: nn,
  testRetestReliability: We
}, Ln = {
  applyReverseScoring: F,
  changeScore: gn,
  discrepancyScore: hn,
  percentileRankFromNormSample: Mn,
  prorateScore: B,
  reliableChangeIndex: dn,
  reverseScore: ae,
  scoreBattery: vn,
  scoreComposite: he,
  scoreConfidenceInterval: pn,
  scoreDistributionSummary: Sn,
  scoreLikertScale: ge,
  scoreSubscales: fe,
  standardizeZ: le,
  toPercentileRank: ue,
  toScaledScore: J,
  toStanine: z,
  toTScore: D,
  weightedSumScore: fn
};
export {
  Le as EXPORT_FORMAT_VERSION,
  L as NORM_LOOKUP_EXPORT_SCHEMA_VERSION,
  Pe as PACKAGE_NAME,
  Fe as SCALE_SCORE_EXPORT_SCHEMA_VERSION,
  Ie as SESSION_SUMMARY_SCHEMA_VERSION,
  ke as TRIAL_RECORD_EXPORT_SCHEMA_VERSION,
  en as alphaIfItemDeleted,
  Ue as alternateFormsReliability,
  F as applyReverseScoring,
  qn as behavioral,
  Cn as buildQualityFlags,
  gn as changeScore,
  se as classifyReactionTimeTrial,
  k as cohensD,
  Qe as cohensKappa,
  re as confidenceIntervalMean,
  xn as convertZToNorms,
  An as core,
  w as createExportEnvelope,
  V as createExportMetadata,
  ze as createNormLookupExport,
  Je as createScaleScoresExport,
  Be as createSessionSummaryExport,
  De as createTrialRecordsExport,
  ie as cronbachAlpha,
  hn as discrepancyScore,
  On as experimental,
  Ge as exportCsv,
  Xe as exportEnvelope,
  He as exportScaleScoresJson,
  $e as exportSessionSummaryJson,
  je as exportTrialsJson,
  Nn as exports,
  Ve as hedgesG,
  Ze as interRaterAgreement,
  pe as interpretNorm,
  Me as iqr,
  Ye as itemTotalCorrelations,
  bn as lookupAgeBand,
  Rn as lookupEducationBand,
  de as lookupNorm,
  te as mad,
  ne as max,
  d as mean,
  x as median,
  ee as min,
  Vn as norms,
  Tn as percentileLookup,
  Mn as percentileRankFromNormSample,
  B as prorateScore,
  _n as qc,
  T as quantile,
  wn as rawToNormed,
  Pn as reliability,
  En as reliabilityWarning,
  dn as reliableChangeIndex,
  ae as reverseScore,
  vn as scoreBattery,
  he as scoreComposite,
  pn as scoreConfidenceInterval,
  tn as scoreConfidenceIntervalFromSem,
  Sn as scoreDistributionSummary,
  ge as scoreLikertScale,
  Ae as scoreSpanTask,
  fe as scoreSubscales,
  Ln as scores,
  qe as separatePracticeTrials,
  ce as spearmanBrown,
  Ke as splitHalfReliability,
  R as standardDeviation,
  nn as standardErrorOfMeasurement,
  le as standardizeZ,
  Se as summarize,
  Ne as summarizeLatency,
  Ee as summarizeReactionTime,
  We as testRetestReliability,
  ue as toPercentileRank,
  J as toScaledScore,
  z as toStanine,
  D as toTScore,
  b as variance,
  fn as weightedSumScore
};
