export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function assertFiniteNumber(value: unknown, label = "value"): asserts value is number {
  if (!isFiniteNumber(value)) {
    throw new TypeError(`${label} must be a finite number`);
  }
}

export function ensureFiniteNumbers(values: readonly unknown[], label = "values"): number[] {
  if (!Array.isArray(values)) {
    throw new TypeError(`${label} must be an array`);
  }

  const numbers = values.filter(isFiniteNumber);
  if (!numbers.length) {
    throw new RangeError(`${label} must contain at least one finite number`);
  }

  return numbers;
}

export function assertSameLength<T, U>(left: readonly T[], right: readonly U[], label = "arrays"): void {
  if (left.length !== right.length) {
    throw new RangeError(`${label} must have the same length`);
  }
}

export function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function round(value: number, digits = 6): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function transposeMatrix(matrix: readonly (readonly number[])[]): number[][] {
  if (!matrix.length) {
    return [];
  }

  const columnCount = matrix[0].length;
  matrix.forEach((row, rowIndex) => {
    if (row.length !== columnCount) {
      throw new RangeError(`matrix row ${rowIndex} has inconsistent length`);
    }
  });

  return Array.from({ length: columnCount }, (_, columnIndex) =>
    matrix.map((row) => row[columnIndex]),
  );
}

export function numericSort(values: readonly number[]): number[] {
  return [...values].sort((a, b) => a - b);
}
