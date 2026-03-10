import type { InterpretationBand, NormBand, NormLookupResult, NormRow, NormTable, QualityFlag } from "../schemas";
import { clamp } from "../core/math";
import { toScaledScore, toStanine, toTScore } from "../scores";
import { NORM_LOOKUP_EXPORT_SCHEMA_VERSION } from "../versioning";

function bandMatches(band: NormBand | undefined, value: number | undefined): boolean {
  if (!band || value === undefined) {
    return true;
  }
  if (band.min !== undefined && value < band.min) {
    return false;
  }
  if (band.max !== undefined && value > band.max) {
    return false;
  }
  return true;
}

export function lookupNorm(
  table: NormTable,
  raw: number,
  context: { age?: number; education?: number; sex?: string } = {},
): NormLookupResult {
  const qualityFlags: QualityFlag[] = [];
  const row = table.rows.find((candidate) =>
    (candidate.rawMin === undefined || raw >= candidate.rawMin) &&
    (candidate.rawMax === undefined || raw <= candidate.rawMax) &&
    bandMatches(candidate.ageBand, context.age) &&
    bandMatches(candidate.educationBand, context.education) &&
    (candidate.sex === undefined || candidate.sex === context.sex),
  );

  if (!row) {
    qualityFlags.push({
      code: "norm-mismatch",
      severity: "warning",
      message: "No matching norm row was found for the supplied raw score and context.",
      source: table.id,
    });
    return {
      schemaVersion: NORM_LOOKUP_EXPORT_SCHEMA_VERSION,
      matched: false,
      tableId: table.id,
      tableVersion: table.version,
      raw,
      qualityFlags,
    };
  }

  return {
    schemaVersion: NORM_LOOKUP_EXPORT_SCHEMA_VERSION,
    matched: true,
    tableId: table.id,
    tableVersion: table.version,
    raw,
    normed: {
      z: row.z,
      t: row.t,
      scaled: row.scaled,
      percentile: row.percentile,
      stanine: row.stanine,
      standardScore: row.standardScore,
    },
    interpretation: interpretNorm(table.interpretationBands ?? [], row),
    row,
    qualityFlags,
  };
}

export function lookupAgeBand(rows: readonly NormRow[], age: number): NormRow[] {
  return rows.filter((row) => bandMatches(row.ageBand, age));
}

export function lookupEducationBand(rows: readonly NormRow[], education: number): NormRow[] {
  return rows.filter((row) => bandMatches(row.educationBand, education));
}

export function rawToNormed(row: NormRow): Required<NormLookupResult>["normed"] {
  return {
    z: row.z,
    t: row.t,
    scaled: row.scaled,
    percentile: row.percentile,
    stanine: row.stanine,
    standardScore: row.standardScore,
  };
}

export function percentileLookup(
  table: NormTable,
  raw: number,
  context: { age?: number; education?: number; sex?: string } = {},
): number | undefined {
  return lookupNorm(table, raw, context).normed?.percentile;
}

export function convertZToNorms(z: number): {
  z: number;
  t: number;
  scaled: number;
  percentile: number;
  stanine: number;
} {
  return {
    z,
    t: toTScore(z),
    scaled: toScaledScore(z),
    percentile: clamp(50 + z * 34.1344746, 0, 100),
    stanine: toStanine(z),
  };
}

export function interpretNorm(
  bands: readonly InterpretationBand[],
  row: NormRow,
): InterpretationBand | undefined {
  const score = row.t ?? row.scaled ?? row.standardScore ?? row.percentile ?? row.z;
  if (score === undefined) {
    return undefined;
  }
  return bands.find((band) =>
    (band.min === undefined || score >= band.min) &&
    (band.max === undefined || score <= band.max),
  );
}
