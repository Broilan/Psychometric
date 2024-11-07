"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pearsonCorrelationCoefficient = pearsonCorrelationCoefficient;
const simple_statistics_1 = require("simple-statistics");
/**
 * Calculate the Pearson correlation coefficient between two datasets or with pre-calculated values.
 * @param x - (Optional) First dataset. Required if stdDevX, stdDevY, or cov are not provided.
 * @param y - (Optional) Second dataset. Required if stdDevX, stdDevY, or cov are not provided.
 * @param stdDevX - (Optional) Pre-calculated standard deviation of the first dataset.
 * @param stdDevY - (Optional) Pre-calculated standard deviation of the second dataset.
 * @param cov - (Optional) Pre-calculated covariance between the datasets.
 * @returns Pearson correlation coefficient.
 * @throws Error if insufficient data is provided to calculate the Pearson correlation.
 */
function pearsonCorrelationCoefficient(x, y, stdDevX, stdDevY, cov) {
    // Ensure that either datasets or pre-calculated values are provided
    if ((!x || !y) && (stdDevX === undefined || stdDevY === undefined || cov === undefined)) {
        throw new Error("Either provide datasets x and y, or provide stdDevX, stdDevY, and cov.");
    }
    // Calculate standard deviations and covariance if datasets are provided
    const calculatedStdDevX = stdDevX !== null && stdDevX !== void 0 ? stdDevX : (x ? (0, simple_statistics_1.standardDeviation)(x) : undefined);
    const calculatedStdDevY = stdDevY !== null && stdDevY !== void 0 ? stdDevY : (y ? (0, simple_statistics_1.standardDeviation)(y) : undefined);
    const calculatedCov = cov !== null && cov !== void 0 ? cov : (x && y ? (0, simple_statistics_1.sampleCovariance)(x, y) : undefined);
    // Ensure all necessary values are available for calculation
    if (calculatedStdDevX === undefined || calculatedStdDevY === undefined || calculatedCov === undefined) {
        throw new Error("Insufficient data to calculate Pearson correlation coefficient.");
    }
    return calculatedCov / (calculatedStdDevX * calculatedStdDevY);
}
