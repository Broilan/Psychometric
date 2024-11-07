"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interRaterReliability = interRaterReliability;
/**
 * Calculate Inter-Rater Reliability using the specified correlation function.
 * @param ratings - Array of ratings, where each inner array represents scores from one rater across items.
 * @param correlationFunc - Correlation function specified by the user.
 * @returns Inter-Rater Reliability coefficient.
 * @throws Error if no correlation function is provided.
 */
function interRaterReliability(ratings, correlationFunc) {
    if (!correlationFunc)
        throw new Error("A correlation function must be provided.");
    const raterCount = ratings.length;
    let totalCorrelation = 0;
    let comparisons = 0;
    for (let i = 0; i < raterCount - 1; i++) {
        for (let j = i + 1; j < raterCount; j++) {
            totalCorrelation += correlationFunc(ratings[i], ratings[j]);
            comparisons++;
        }
    }
    return totalCorrelation / comparisons;
}
