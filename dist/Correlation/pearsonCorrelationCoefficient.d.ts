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
export declare function pearsonCorrelationCoefficient(x?: number[], y?: number[], stdDevX?: number, stdDevY?: number, cov?: number): number;
