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
export declare function pointBiserialCorrelation(binary?: number[], continuous?: number[], mean1?: number, mean0?: number, overallSD?: number): number;
