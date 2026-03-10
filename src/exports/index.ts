import type { ExportMetadata, ScoreResult, SessionSummary, TrialRecord } from "../schemas";

export function createExportMetadata(
  packageVersion: string,
  schemaVersion = "1.0.0",
): ExportMetadata {
  return {
    exportVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    packageName: "psychometric",
    packageVersion,
    schemaVersion,
  };
}

export function exportSessionSummaryJson(summary: SessionSummary, metadata: ExportMetadata): string {
  return JSON.stringify({ metadata, summary }, null, 2);
}

export function exportTrialsJson(trials: readonly TrialRecord[], metadata: ExportMetadata): string {
  return JSON.stringify({ metadata, trials }, null, 2);
}

export function exportScaleScoresJson(scores: readonly ScoreResult[], metadata: ExportMetadata): string {
  return JSON.stringify({ metadata, scores }, null, 2);
}

export function exportEnvelope<T>(payload: T, metadata: ExportMetadata): string {
  return JSON.stringify({ metadata, payload }, null, 2);
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
