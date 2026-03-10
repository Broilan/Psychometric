import {
  classifyReactionTimeTrial,
  scoreSpanTask,
  separatePracticeTrials,
  summarizeLatency,
  summarizeReactionTime,
} from "./behavioral";
import {
  confidenceIntervalMean,
  cohensD,
  hedgesG,
  iqr,
  mad,
  max,
  mean,
  median,
  min,
  quantile,
  standardDeviation,
  summarize,
  variance,
} from "./core";
import {
  createExportEnvelope,
  createExportMetadata,
  createNormLookupExport,
  createScaleScoresExport,
  createSessionSummaryExport,
  createTrialRecordsExport,
  exportCsv,
  exportEnvelope,
  exportScaleScoresJson,
  exportSessionSummaryJson,
  exportTrialsJson,
} from "./exports";
import { experimental } from "./experimental";
import {
  convertZToNorms,
  interpretNorm,
  lookupAgeBand,
  lookupEducationBand,
  lookupNorm,
  percentileLookup,
  rawToNormed,
} from "./norms";
import { buildQualityFlags, reliabilityWarning } from "./qc";
import {
  alphaIfItemDeleted,
  alternateFormsReliability,
  cohensKappa,
  cronbachAlpha,
  interRaterAgreement,
  itemTotalCorrelations,
  scoreConfidenceIntervalFromSem,
  spearmanBrown,
  splitHalfReliability,
  standardErrorOfMeasurement,
  testRetestReliability,
} from "./Reliability";
import {
  applyReverseScoring,
  changeScore,
  discrepancyScore,
  percentileRankFromNormSample,
  prorateScore,
  reliableChangeIndex,
  reverseScore,
  scoreBattery,
  scoreComposite,
  scoreConfidenceInterval,
  scoreDistributionSummary,
  scoreLikertScale,
  scoreSubscales,
  standardizeZ,
  toPercentileRank,
  toScaledScore,
  toStanine,
  toTScore,
  weightedSumScore,
} from "./scores";

export const behavioral = {
  classifyReactionTimeTrial,
  scoreSpanTask,
  separatePracticeTrials,
  summarizeLatency,
  summarizeReactionTime,
};

export const core = {
  confidenceIntervalMean,
  cohensD,
  hedgesG,
  iqr,
  mad,
  max,
  mean,
  median,
  min,
  quantile,
  standardDeviation,
  summarize,
  variance,
};

export const exports = {
  createExportEnvelope,
  createExportMetadata,
  createNormLookupExport,
  createScaleScoresExport,
  createSessionSummaryExport,
  createTrialRecordsExport,
  exportCsv,
  exportEnvelope,
  exportScaleScoresJson,
  exportSessionSummaryJson,
  exportTrialsJson,
};

export const norms = {
  convertZToNorms,
  interpretNorm,
  lookupAgeBand,
  lookupEducationBand,
  lookupNorm,
  percentileLookup,
  rawToNormed,
};

export const qc = {
  buildQualityFlags,
  reliabilityWarning,
};

export const reliability = {
  alphaIfItemDeleted,
  alternateFormsReliability,
  cohensKappa,
  cronbachAlpha,
  interRaterAgreement,
  itemTotalCorrelations,
  scoreConfidenceIntervalFromSem,
  spearmanBrown,
  splitHalfReliability,
  standardErrorOfMeasurement,
  testRetestReliability,
};

export const scores = {
  applyReverseScoring,
  changeScore,
  discrepancyScore,
  percentileRankFromNormSample,
  prorateScore,
  reliableChangeIndex,
  reverseScore,
  scoreBattery,
  scoreComposite,
  scoreConfidenceInterval,
  scoreDistributionSummary,
  scoreLikertScale,
  scoreSubscales,
  standardizeZ,
  toPercentileRank,
  toScaledScore,
  toStanine,
  toTScore,
  weightedSumScore,
};

export { experimental };

export {
  classifyReactionTimeTrial,
  scoreSpanTask,
  separatePracticeTrials,
  summarizeLatency,
  summarizeReactionTime,
  type ReactionTimeOptions,
  type ReactionTimeSummary,
  type ReactionTimeTrialClassification,
  type SequenceErrorSummary,
  type SpanTaskSummary,
} from "./behavioral";

export {
  confidenceIntervalMean,
  cohensD,
  hedgesG,
  iqr,
  mad,
  max,
  mean,
  median,
  min,
  quantile,
  standardDeviation,
  summarize,
  variance,
} from "./core";

export {
  createExportEnvelope,
  createExportMetadata,
  createNormLookupExport,
  createScaleScoresExport,
  createSessionSummaryExport,
  createTrialRecordsExport,
  exportCsv,
  exportEnvelope,
  exportScaleScoresJson,
  exportSessionSummaryJson,
  exportTrialsJson,
} from "./exports";

export {
  convertZToNorms,
  interpretNorm,
  lookupAgeBand,
  lookupEducationBand,
  lookupNorm,
  percentileLookup,
  rawToNormed,
} from "./norms";

export {
  buildQualityFlags,
  reliabilityWarning,
  type BuildQualityFlagsInput,
} from "./qc";

export {
  alphaIfItemDeleted,
  alternateFormsReliability,
  cohensKappa,
  cronbachAlpha,
  interRaterAgreement,
  itemTotalCorrelations,
  scoreConfidenceIntervalFromSem,
  spearmanBrown,
  splitHalfReliability,
  standardErrorOfMeasurement,
  testRetestReliability,
  type ItemStatistic,
  type ReliabilityEstimate,
} from "./Reliability";

export type {
  BlockRecord,
  ConfidenceInterval,
  DeviceMetadata,
  ExportEnvelope,
  ExportMetadata,
  InterpretationBand,
  ItemDefinition,
  NormBand,
  NormLookupExport,
  NormLookupResult,
  NormRow,
  NormTable,
  PracticeSplit,
  Primitive,
  ProtocolMetadata,
  QualityFlag,
  ScaleDefinition,
  ScaleScoresExport,
  ScoreResult,
  ScoreTransformMap,
  SessionMetadata,
  SessionSummary,
  SessionSummaryExport,
  SubscaleScoreResult,
  TrialRecord,
  TrialRecordsExport,
  ViewportMetadata,
} from "./schemas";

export {
  applyReverseScoring,
  changeScore,
  discrepancyScore,
  percentileRankFromNormSample,
  prorateScore,
  reliableChangeIndex,
  reverseScore,
  scoreBattery,
  scoreComposite,
  scoreConfidenceInterval,
  scoreDistributionSummary,
  scoreLikertScale,
  scoreSubscales,
  standardizeZ,
  toPercentileRank,
  toScaledScore,
  toStanine,
  toTScore,
  weightedSumScore,
  type ScaleScoringOptions,
} from "./scores";

export {
  EXPORT_FORMAT_VERSION,
  NORM_LOOKUP_EXPORT_SCHEMA_VERSION,
  PACKAGE_NAME,
  SCALE_SCORE_EXPORT_SCHEMA_VERSION,
  SESSION_SUMMARY_SCHEMA_VERSION,
  TRIAL_RECORD_EXPORT_SCHEMA_VERSION,
  type ExportFormatVersion,
  type ExportKind,
  type NormLookupExportSchemaVersion,
  type ScaleScoreExportSchemaVersion,
  type SessionSummarySchemaVersion,
  type TrialRecordExportSchemaVersion,
} from "./versioning";
