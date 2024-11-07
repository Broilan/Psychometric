/**
 * Assess Construct Validity using convergent and discriminant correlations.
 * @param convergentCorrelations - Array of correlation coefficients with similar constructs.
 * @param discriminantCorrelations - Array of correlation coefficients with different constructs.
 * @returns Average convergent and discriminant correlations.
 */
export declare function constructValidity(convergentCorrelations: number[], discriminantCorrelations: number[]): {
    averageConvergent: number;
    averageDiscriminant: number;
    constructValidityIndex: number;
};
