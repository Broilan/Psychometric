export const PACKAGE_NAME = "psychometric";

export const EXPORT_FORMAT_VERSION = "1.0.0" as const;
export const SESSION_SUMMARY_SCHEMA_VERSION = "1.0.0" as const;
export const TRIAL_RECORD_EXPORT_SCHEMA_VERSION = "1.0.0" as const;
export const SCALE_SCORE_EXPORT_SCHEMA_VERSION = "1.0.0" as const;
export const NORM_LOOKUP_EXPORT_SCHEMA_VERSION = "1.0.0" as const;

export type ExportFormatVersion = typeof EXPORT_FORMAT_VERSION;
export type SessionSummarySchemaVersion = typeof SESSION_SUMMARY_SCHEMA_VERSION;
export type TrialRecordExportSchemaVersion = typeof TRIAL_RECORD_EXPORT_SCHEMA_VERSION;
export type ScaleScoreExportSchemaVersion = typeof SCALE_SCORE_EXPORT_SCHEMA_VERSION;
export type NormLookupExportSchemaVersion = typeof NORM_LOOKUP_EXPORT_SCHEMA_VERSION;

export type ExportKind = "session-summary" | "trial-records" | "scale-scores" | "norm-lookup";
