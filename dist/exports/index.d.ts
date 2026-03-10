import { ExportMetadata, ScoreResult, SessionSummary, TrialRecord } from '../schemas';
export declare function createExportMetadata(packageVersion: string, schemaVersion?: string): ExportMetadata;
export declare function exportSessionSummaryJson(summary: SessionSummary, metadata: ExportMetadata): string;
export declare function exportTrialsJson(trials: readonly TrialRecord[], metadata: ExportMetadata): string;
export declare function exportScaleScoresJson(scores: readonly ScoreResult[], metadata: ExportMetadata): string;
export declare function exportEnvelope<T>(payload: T, metadata: ExportMetadata): string;
export declare function exportCsv(rows: readonly Record<string, unknown>[]): string;
