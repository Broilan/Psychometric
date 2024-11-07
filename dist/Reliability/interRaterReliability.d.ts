/**
 * Calculate Inter-Rater Reliability using the specified correlation function.
 * @param ratings - Array of ratings, where each inner array represents scores from one rater across items.
 * @param correlationFunc - Correlation function specified by the user.
 * @returns Inter-Rater Reliability coefficient.
 * @throws Error if no correlation function is provided.
 */
export declare function interRaterReliability(ratings: number[][], correlationFunc?: (...args: any[]) => number): number;
