export interface ReliabilityEstimate {
    estimate: number;
    method: string;
    itemCount?: number;
}
export interface ItemStatistic {
    itemIndex: number;
    correlation: number;
}
export interface OmegaTotalInput {
    loadings: readonly number[];
    errorVariances: readonly number[];
}
export declare function cronbachAlpha(matrix: readonly (readonly number[])[]): number;
export declare function splitHalfReliability(matrix: readonly (readonly number[])[], split?: "odd-even" | "first-second"): number;
export declare function spearmanBrown(reliability: number, newLengthFactor?: number): number;
export declare function testRetestReliability(time1: readonly number[], time2: readonly number[]): number;
export declare function alternateFormsReliability(formA: readonly number[], formB: readonly number[]): number;
export declare function interRaterAgreement(raterA: readonly number[], raterB: readonly number[]): number;
export declare function cohensKappa(raterA: readonly string[], raterB: readonly string[]): number;
export declare function itemTotalCorrelations(matrix: readonly (readonly number[])[]): ItemStatistic[];
export declare function alphaIfItemDeleted(matrix: readonly (readonly number[])[]): ItemStatistic[];
export declare function standardErrorOfMeasurement(standardDeviationValue: number, reliability: number): number;
export declare function scoreConfidenceIntervalFromSem(observedScore: number, sem: number, z?: number): {
    lower: number;
    upper: number;
};
export declare function averageInterItemCovariance(matrix: readonly (readonly number[])[]): number;
