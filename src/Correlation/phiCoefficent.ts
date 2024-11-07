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
export function phiCoefficient(
    a?: number, 
    b?: number, 
    c?: number, 
    d?: number, 
    table?: number[][]
): number {
    // Use the table array if provided
    if (table) {
        if (table.length !== 2 || table[0].length !== 2 || table[1].length !== 2) {
            throw new Error("Table must be a 2x2 array.");
        }
        [a, b] = table[0];
        [c, d] = table[1];
    }

    // Ensure all frequencies are available for calculation
    if (a === undefined || b === undefined || c === undefined || d === undefined) {
        throw new Error("Insufficient data to calculate phi coefficient. Provide a, b, c, and d, or a 2x2 table.");
    }

    // Calculate the phi coefficient
    const numerator = (a * d) - (b * c);
    const denominator = Math.sqrt((a + b) * (a + c) * (b + d) * (c + d));

    if (denominator === 0) {
        throw new Error("Denominator is zero, cannot calculate phi coefficient.");
    }

    return numerator / denominator;
}
