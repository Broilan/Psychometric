import { standardDeviation, sampleCovariance } from 'simple-statistics';

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
export function pearsonCorrelationCoefficient(
    x?: number[], 
    y?: number[], 
    stdDevX?: number, 
    stdDevY?: number, 
    cov?: number
): number {
    // Ensure that either datasets or pre-calculated values are provided
    if ((!x || !y) && (stdDevX === undefined || stdDevY === undefined || cov === undefined)) {
        throw new Error("Either provide datasets x and y, or provide stdDevX, stdDevY, and cov.");
    }

    // Calculate standard deviations and covariance if datasets are provided
    const calculatedStdDevX = stdDevX ?? (x ? standardDeviation(x) : undefined);
    const calculatedStdDevY = stdDevY ?? (y ? standardDeviation(y) : undefined);
    const calculatedCov = cov ?? (x && y ? sampleCovariance(x, y) : undefined);

    // Ensure all necessary values are available for calculation
    if (calculatedStdDevX === undefined || calculatedStdDevY === undefined || calculatedCov === undefined) {
        throw new Error("Insufficient data to calculate Pearson correlation coefficient.");
    }

    return calculatedCov / (calculatedStdDevX * calculatedStdDevY);
}
