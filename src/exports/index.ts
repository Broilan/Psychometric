import type {
  ExportEnvelope,
  ExportMetadata,
  NormLookupExport,
  NormLookupResult,
  ScaleScoresExport,
  ScoreResult,
  SessionSummary,
  SessionSummaryExport,
  TrialRecord,
  TrialRecordsExport,
} from "../schemas";
import {
  EXPORT_FORMAT_VERSION,
  NORM_LOOKUP_EXPORT_SCHEMA_VERSION,
  PACKAGE_NAME,
  SCALE_SCORE_EXPORT_SCHEMA_VERSION,
  SESSION_SUMMARY_SCHEMA_VERSION,
  TRIAL_RECORD_EXPORT_SCHEMA_VERSION,
  type ExportKind,
} from "../versioning";

export function createExportMetadata(
  kind: ExportKind,
  packageVersion: string,
  schemaVersion: string,
): ExportMetadata {
  return {
    kind,
    exportVersion: EXPORT_FORMAT_VERSION,
    schemaVersion,
    generatedAt: new Date().toISOString(),
    packageName: PACKAGE_NAME,
    packageVersion,
  };
}

export function createExportEnvelope<TPayload>(
  payload: TPayload,
  metadata: ExportMetadata,
): ExportEnvelope<TPayload> {
  return { metadata, payload };
}

export function createSessionSummaryExport(
  summary: SessionSummary,
  packageVersion: string,
): SessionSummaryExport {
  return createExportEnvelope(summary, createExportMetadata("session-summary", packageVersion, SESSION_SUMMARY_SCHEMA_VERSION));
}

export function createTrialRecordsExport<TTrial extends TrialRecord>(
  trials: readonly TTrial[],
  packageVersion: string,
): TrialRecordsExport<TTrial> {
  return createExportEnvelope(trials, createExportMetadata("trial-records", packageVersion, TRIAL_RECORD_EXPORT_SCHEMA_VERSION));
}

export function createScaleScoresExport(
  scores: readonly ScoreResult[],
  packageVersion: string,
): ScaleScoresExport {
  return createExportEnvelope(scores, createExportMetadata("scale-scores", packageVersion, SCALE_SCORE_EXPORT_SCHEMA_VERSION));
}

export function createNormLookupExport(
  lookup: NormLookupResult,
  packageVersion: string,
): NormLookupExport {
  return createExportEnvelope(lookup, createExportMetadata("norm-lookup", packageVersion, NORM_LOOKUP_EXPORT_SCHEMA_VERSION));
}

export function exportSessionSummaryJson(summary: SessionSummary, metadata: ExportMetadata): string {
  return JSON.stringify(createExportEnvelope(summary, metadata), null, 2);
}

export function exportTrialsJson(trials: readonly TrialRecord[], metadata: ExportMetadata): string {
  return JSON.stringify(createExportEnvelope(trials, metadata), null, 2);
}

export function exportScaleScoresJson(scores: readonly ScoreResult[], metadata: ExportMetadata): string {
  return JSON.stringify(createExportEnvelope(scores, metadata), null, 2);
}

export function exportEnvelope<T>(payload: T, metadata: ExportMetadata): string {
  return JSON.stringify(createExportEnvelope(payload, metadata), null, 2);
}

export function exportCsv(rows: readonly Record<string, unknown>[]): string {
  if (!rows.length) {
    return "";
  }
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const escape = (value: unknown): string => {
    const text = `${value ?? ""}`;
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, "\"\"")}"` : text;
  };
  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
  ].join("\n");
}
