import {
  compareSessions,
  createSessionComparisonExport,
} from "psychometric";

const comparison = compareSessions(
  {
    sessionId: "baseline",
    protocolId: "choice-rt",
    protocolVersion: "1.0.0",
    metrics: {
      meanCorrectRtMs: 420,
      accuracy: 0.82,
      throughputPerMinute: 18,
    },
  },
  {
    sessionId: "follow-up",
    protocolId: "choice-rt",
    protocolVersion: "1.0.0",
    metrics: {
      meanCorrectRtMs: 390,
      accuracy: 0.9,
      throughputPerMinute: 20,
    },
  },
  {
    standardDeviation: 50,
    reliability: 0.85,
    practiceMetricKey: "meanCorrectRtMs",
    fatigueMetricKey: "throughputPerMinute",
  },
);

console.log(createSessionComparisonExport(comparison, "2.0.0"));
