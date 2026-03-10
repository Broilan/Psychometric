export declare function isFiniteNumber(value: unknown): value is number;
export declare function assertFiniteNumber(value: unknown, label?: string): asserts value is number;
export declare function ensureFiniteNumbers(values: readonly unknown[], label?: string): number[];
export declare function assertSameLength<T, U>(left: readonly T[], right: readonly U[], label?: string): void;
export declare function sum(values: readonly number[]): number;
export declare function clamp(value: number, min: number, max: number): number;
export declare function round(value: number, digits?: number): number;
export declare function transposeMatrix(matrix: readonly (readonly number[])[]): number[][];
export declare function numericSort(values: readonly number[]): number[];
