import { mean } from '../Statistics/mean';
import { standardDeviation } from '../Statistics/standardDeviation';

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
export function pointBiserialCorrelation(
    binary?: number[], 
    continuous?: number[], 
    mean1?: number, 
    mean0?: number, 
    overallSD?: number
): number {
    if ((!binary || !continuous) && (mean1 === undefined || mean0 === undefined || overallSD === undefined)) {
        throw new Error("Either provide binary and continuous arrays, or provide mean1, mean0, and overallSD.");
    }

    // Calculate means and standard deviation if datasets are provided
    const n = binary?.length ?? continuous?.length ?? 0;
    const n1 = binary ? binary.filter(val => val === 1).length : undefined;
    const n0 = n - (n1 ?? 0);

    const calculatedMean1 = mean1 ?? (binary && continuous ? mean.arithmetic(continuous.filter((_, i) => binary[i] === 1)) : undefined);
    const calculatedMean0 = mean0 ?? (binary && continuous ? mean.arithmetic(continuous.filter((_, i) => binary[i] === 0)) : undefined);
    const calculatedOverallSD = overallSD ?? (continuous ? standardDeviation(continuous) : undefined);

    // Ensure all necessary values are available for calculation
    if (calculatedMean1 === undefined || calculatedMean0 === undefined || calculatedOverallSD === undefined || n1 === undefined || n0 === undefined) {
        throw new Error("Insufficient data to calculate point-biserial correlation coefficient.");
    }

    return ((calculatedMean1 - calculatedMean0) / calculatedOverallSD) * Math.sqrt((n1 * n0) / n ** 2);
}

