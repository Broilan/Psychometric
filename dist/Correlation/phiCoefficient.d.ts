/**
 * Calculate the phi coefficient for a 2x2 contingency table.
 * @param a - (Optional) Frequency of (1, 1). Required if table is not provided.
 * @param b - (Optional) Frequency of (1, 0). Required if table is not provided.
 * @param c - (Optional) Frequency of (0, 1). Required if table is not provided.
 * @param d - (Optional) Frequency of (0, 0). Required if table is not provided.
 * @param table - (Optional) 2x2 contingency table array, where table = [[a, b], [c, d]].
 * @returns Phi coefficient.
 * @throws Error if insufficient data is provided to calculate the phi coefficient.
 */
export declare function phiCoefficient(a?: number, b?: number, c?: number, d?: number, table?: number[][]): number;
