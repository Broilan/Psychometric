/**
 * Calculate Test-Retest Reliability.
 * @param time1 - Scores from the first administration of the test.
 * @param time2 - Scores from the second administration of the test.
 * @param correlationFunc - Correlation function specified by the user.
 * @returns Test-Retest Reliability coefficient.
 * @throws Error if no correlation function is provided.
 */
export declare function testRetestReliability(time1: number[], time2: number[], correlationFunc?: (...args: any[]) => number): number;
