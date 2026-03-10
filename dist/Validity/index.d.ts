export declare function convergentDiscriminantSummary(convergent: readonly number[], discriminant: readonly number[]): {
    averageConvergent: number;
    averageDiscriminant: number;
    contrast: number;
};
export declare function criterionCorrelation(scores: readonly number[], criterion: readonly number[]): number;
export declare function knownGroupsComparison(groupA: readonly number[], groupB: readonly number[]): {
    meanDifference: number;
    effectSizeD: number;
};
export declare function incrementalValidity(outcome: readonly number[], baselinePredictors: readonly (readonly number[])[], addedPredictors: readonly (readonly number[])[]): {
    baselineR2: number;
    fullModelR2: number;
    deltaR2: number;
};
export declare function rocCurve(scores: readonly number[], labels: readonly number[]): {
    points: Array<{
        threshold: number;
        sensitivity: number;
        specificity: number;
    }>;
    auc: number;
};
export declare function screeningAssociation(scores: readonly number[], labels: readonly number[]): number;
