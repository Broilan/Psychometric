/**
 * Calculate Split-Half Reliability using a specified correlation function.
 * @param scores - Array of test scores.
 * @param correlationFunc - Correlation function specified by the user.
 * @returns Split-Half Reliability coefficient.
 * @throws Error if no correlation function is provided.
 */
export declare function splitHalfReliability(scores: number[], correlationFunc?: (...args: any[]) => number): number;
