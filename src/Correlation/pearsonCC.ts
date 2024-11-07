import { covariance } from "../Statistics/covariance";
import { standardDeviation } from "../Statistics/standardDeviation";

/**
 * Calculate the Pearson correlation coefficient between two datasets.
 * Optionally accepts pre-calculated standard deviations and covariance.
 * @param x - First dataset.
 * @param y - Second dataset.
 * @param stdDevX - (Optional) Standard deviation of the first dataset.
 * @param stdDevY - (Optional) Standard deviation of the second dataset.
 * @param cov - (Optional) Covariance between the datasets.
 * @returns Pearson correlation coefficient.
 */
export function pearsonCC(
    x: number[], 
    y: number[], 
    stdDevX?: number, 
    stdDevY?: number, 
    cov?: number
): number {
    // Calculate standard deviations and covariance if not provided
    const calculatedStdDevX = stdDevX ?? standardDeviation(x);
    const calculatedStdDevY = stdDevY ?? standardDeviation(y);
    const calculatedCov = cov ?? covariance(x, y);

    return calculatedCov / (calculatedStdDevX * calculatedStdDevY);
}
