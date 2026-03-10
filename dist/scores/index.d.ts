import { ItemDefinition, ScaleDefinition, ScoreResult, SubscaleScoreResult } from '../schemas';
export interface ScoreItemsOptions {
    minAnswered?: number;
    prorate?: boolean;
    confidenceLevel?: number;
}
export declare function reverseScore(value: number, min: number, max: number): number;
export declare function applyReverseScoring(responses: Readonly<Record<string, number | null | undefined>>, items: readonly ItemDefinition<number>[]): Record<string, number | null | undefined>;
export declare function sumScore(values: readonly number[]): number;
export declare function weightedSumScore(values: readonly number[], weights: readonly number[]): number;
export declare function prorateScore(answeredValues: readonly number[], totalItemCount: number, minAnswered?: number): number | null;
export declare function discrepancyScore(left: number, right: number, absolute?: boolean): number;
export declare function changeScore(baseline: number, followUp: number): number;
export declare function standardizeZ(raw: number, meanValue: number, standardDeviationValue: number): number;
export declare function toTScore(z: number, meanValue?: number, standardDeviationValue?: number): number;
export declare function toScaledScore(z: number, meanValue?: number, standardDeviationValue?: number): number;
export declare function toPercentileRank(z: number): number;
export declare function toStanine(z: number): number;
export declare function reliableChangeIndex(baseline: number, followUp: number, standardDeviationValue: number, reliability: number): number | null;
export declare function scoreConfidenceInterval(observedScore: number, sem: number, level?: number): {
    lower: number;
    upper: number;
    level: number;
};
export declare function scoreSubscales(definition: ScaleDefinition<number>, responses: Readonly<Record<string, number | null | undefined>>, options?: ScoreItemsOptions): SubscaleScoreResult[];
export declare function scoreComposite(id: string, subscales: readonly SubscaleScoreResult[], subscaleIds: readonly string[]): SubscaleScoreResult;
export declare function scoreLikertScale(definition: ScaleDefinition<number>, responses: Readonly<Record<string, number | null | undefined>>, options?: ScoreItemsOptions): ScoreResult;
export declare function scoreBattery(definitions: readonly ScaleDefinition<number>[], responsesByScale: Readonly<Record<string, Readonly<Record<string, number | null | undefined>>>>, options?: ScoreItemsOptions): ScoreResult[];
export declare function percentileRankFromNormSample(score: number, sample: readonly number[]): number;
export declare function scoreDistributionSummary(scores: readonly number[]): {
    mean: number;
    standardDeviation: number;
};
