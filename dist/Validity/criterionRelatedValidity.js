"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criterionRelatedValidity = criterionRelatedValidity;
/**
 * Assess Criterion-Related Validity by calculating the correlation with a criterion measure.
 * @param testScores - Array of test scores.
 * @param criterionScores - Array of criterion scores (same length as testScores).
 * @param correlationFunc - Function to calculate correlation (e.g., Pearson).
 * @returns Criterion-related validity correlation.
 * @throws Error if input arrays are of different lengths.
 */
function criterionRelatedValidity(testScores, criterionScores, correlationFunc) {
    if (testScores.length !== criterionScores.length)
        throw new Error("Scores arrays must be of the same length.");
    return correlationFunc(testScores, criterionScores);
}
