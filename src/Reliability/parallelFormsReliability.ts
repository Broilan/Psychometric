/**
 * Calculate Parallel Forms Reliability.
 * @param formA - Scores from the first form of the test.
 * @param formB - Scores from the second form of the test.
 * @param correlationFunc - Correlation function specified by the user.
 * @returns Reliability coefficient between the two parallel forms.
 * @throws Error if no correlation function is provided.
 */
export function parallelFormsReliability(
    formA: number[], 
    formB: number[], 
    correlationFunc?: (...args: any[]) => number
): number {
    if (!correlationFunc) throw new Error("A correlation function must be provided.");
    if (formA.length !== formB.length) throw new Error("Both forms must have the same number of scores.");
    return correlationFunc(formA, formB);
}
