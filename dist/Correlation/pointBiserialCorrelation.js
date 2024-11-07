"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointBiserialCorrelation = pointBiserialCorrelation;
const simple_statistics_1 = require("simple-statistics");
/**
 * Calculate the point-biserial correlation between a binary and continuous variable.
 * Optionally accepts pre-calculated values.
 * @param binary - (Optional) Array of binary values (0 or 1). Required if pre-calculated values are not provided.
 * @param continuous - (Optional) Array of continuous values. Required if pre-calculated values are not provided.
 * @param mean1 - (Optional) Mean of the continuous variable where the binary variable is 1.
 * @param mean0 - (Optional) Mean of the continuous variable where the binary variable is 0.
 * @param overallSD - (Optional) Standard deviation of the continuous variable.
 * @returns Point-biserial correlation coefficient.
 * @throws Error if insufficient data is provided to calculate the point-biserial correlation.
 */
function pointBiserialCorrelation(binary, continuous, mean1, mean0, overallSD) {
    var _a, _b;
    if ((!binary || !continuous) && (mean1 === undefined || mean0 === undefined || overallSD === undefined)) {
        throw new Error("Either provide binary and continuous arrays, or provide mean1, mean0, and overallSD.");
    }
    // Calculate means and standard deviation if datasets are provided
    const n = (_b = (_a = binary === null || binary === void 0 ? void 0 : binary.length) !== null && _a !== void 0 ? _a : continuous === null || continuous === void 0 ? void 0 : continuous.length) !== null && _b !== void 0 ? _b : 0;
    const n1 = binary ? binary.filter(val => val === 1).length : undefined;
    const n0 = n - (n1 !== null && n1 !== void 0 ? n1 : 0);
    const calculatedMean1 = mean1 !== null && mean1 !== void 0 ? mean1 : (binary && continuous ? (0, simple_statistics_1.mean)(continuous.filter((_, i) => binary[i] === 1)) : undefined);
    const calculatedMean0 = mean0 !== null && mean0 !== void 0 ? mean0 : (binary && continuous ? (0, simple_statistics_1.mean)(continuous.filter((_, i) => binary[i] === 0)) : undefined);
    const calculatedOverallSD = overallSD !== null && overallSD !== void 0 ? overallSD : (continuous ? (0, simple_statistics_1.standardDeviation)(continuous) : undefined);
    // Ensure all necessary values are available for calculation
    if (calculatedMean1 === undefined || calculatedMean0 === undefined || calculatedOverallSD === undefined || n1 === undefined || n0 === undefined) {
        throw new Error("Insufficient data to calculate point-biserial correlation coefficient.");
    }
    return ((calculatedMean1 - calculatedMean0) / calculatedOverallSD) * Math.sqrt((n1 * n0) / Math.pow(n, 2));
}