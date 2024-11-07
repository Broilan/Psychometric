/**
 * Assess Criterion-Related Validity by calculating the correlation with a criterion measure.
 * @param testScores - Array of test scores.
 * @param criterionScores - Array of criterion scores (same length as testScores).
 * @param correlationFunc - Function to calculate correlation (e.g., Pearson).
 * @returns Criterion-related validity correlation.
 * @throws Error if input arrays are of different lengths.
 */
export declare function criterionRelatedValidity(testScores: number[], criterionScores: number[], correlationFunc: (a: number[], b: number[]) => number): number;
