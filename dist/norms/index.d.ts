import { InterpretationBand, NormLookupResult, NormRow, NormTable } from '../schemas';
export declare function lookupNorm(table: NormTable, raw: number, context?: {
    age?: number;
    education?: number;
    sex?: string;
}): NormLookupResult;
export declare function lookupAgeBand(rows: readonly NormRow[], age: number): NormRow[];
export declare function lookupEducationBand(rows: readonly NormRow[], education: number): NormRow[];
export declare function rawToNormed(row: NormRow): Required<NormLookupResult>["normed"];
export declare function percentileLookup(table: NormTable, raw: number, context?: {
    age?: number;
    education?: number;
    sex?: string;
}): number | undefined;
export declare function convertZToNorms(z: number): {
    z: number;
    t: number;
    scaled: number;
    percentile: number;
    stanine: number;
};
export declare function interpretNorm(bands: readonly InterpretationBand[], row: NormRow): InterpretationBand | undefined;
