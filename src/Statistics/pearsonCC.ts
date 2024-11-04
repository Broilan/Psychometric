import { covariance } from "./covariance";
import { standardDeviation } from "./standardDeviation";

/**
 * Calculate the Pearson correlation coefficient between two arrays of numbers.
 * @param x - First array of numbers.
 * @param y - Second array of numbers.
 * @returns Pearson correlation coefficient between x and y.
 */
export function pearsonCC(x: number[], y: number[]): number {
    const stdDevX = standardDeviation(x);
    const stdDevY = standardDeviation(y);
    return covariance(x, y) / (stdDevX * stdDevY);
}
