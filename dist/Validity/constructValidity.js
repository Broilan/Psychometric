"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructValidity = constructValidity;
/**
 * Assess Construct Validity using convergent and discriminant correlations.
 * @param convergentCorrelations - Array of correlation coefficients with similar constructs.
 * @param discriminantCorrelations - Array of correlation coefficients with different constructs.
 * @returns Average convergent and discriminant correlations.
 */
function constructValidity(convergentCorrelations, discriminantCorrelations) {
    const averageConvergent = convergentCorrelations.reduce((a, b) => a + b, 0) / convergentCorrelations.length;
    const averageDiscriminant = discriminantCorrelations.reduce((a, b) => a + b, 0) / discriminantCorrelations.length;
    // Construct validity index can be the difference between convergent and discriminant averages
    const constructValidityIndex = averageConvergent - averageDiscriminant;
    return { averageConvergent, averageDiscriminant, constructValidityIndex };
}
