export interface DescriptiveStats {
    count: number;
    mean: number;
    median: number;
    variance: number;
    standardDeviation: number;
    min: number;
    max: number;
    q1: number;
    q3: number;
    iqr: number;
    mad: number;
}
export interface ConfidenceIntervalResult {
    level: number;
    estimate: number;
    margin: number;
    lower: number;
    upper: number;
}
export interface BootstrapResult {
    observed: number;
    replicates: number[];
    confidenceInterval?: ConfidenceIntervalResult;
}
export interface PermutationResult {
    observed: number;
    nullDistribution: number[];
    pValue: number;
}
export declare function mean(values: readonly number[]): number;
export declare function median(values: readonly number[]): number;
export declare function variance(values: readonly number[], sample?: boolean): number;
export declare function standardDeviation(values: readonly number[], sample?: boolean): number;
export declare function min(values: readonly number[]): number;
export declare function max(values: readonly number[]): number;
export declare function quantile(values: readonly number[], p: number): number;
export declare function iqr(values: readonly number[]): number;
export declare function mad(values: readonly number[]): number;
export declare function summarize(values: readonly number[]): DescriptiveStats;
export declare function zScores(values: readonly number[]): number[];
export declare function rank(values: readonly number[]): number[];
export declare function percentileOfScore(values: readonly number[], score: number): number;
export declare function trim(values: readonly number[], proportion?: number): number[];
export declare function winsorize(values: readonly number[], proportion?: number): number[];
export declare function confidenceIntervalMean(values: readonly number[], level?: number): ConfidenceIntervalResult;
export declare function bootstrap(values: readonly number[], estimator: (sample: readonly number[]) => number, iterations?: number, level?: number): BootstrapResult;
export declare function permutationTest(left: readonly number[], right: readonly number[], statistic: (a: readonly number[], b: readonly number[]) => number, iterations?: number): PermutationResult;
export declare function covariance(left: readonly number[], right: readonly number[], sample?: boolean): number;
export declare function correlation(left: readonly number[], right: readonly number[]): number;
export declare function pointBiserial(binary: readonly number[], continuous: readonly number[]): number;
