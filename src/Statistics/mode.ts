/**
 * Calculate the mode of an array of numbers.
 * @param values - Array of numbers.
 * @returns Mode of the array. If multiple modes, returns an array of modes.
 */
export function mode(values: number[]): number | number[] {
    const frequency: { [key: number]: number } = {};
    values.forEach(value => {
        frequency[value] = (frequency[value] || 0) + 1;
    });

    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
        .filter(key => frequency[Number(key)] === maxFreq)
        .map(Number);

    return modes.length === 1 ? modes[0] : modes;
}