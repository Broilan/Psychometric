export interface MissingPolicyOptions<T> {
    treatAsMissing?: readonly T[];
}
export declare function isMissingValue<T>(value: T | null | undefined, options?: MissingPolicyOptions<T>): boolean;
export declare function compactNumbers<T>(values: readonly (T | number | null | undefined)[], options?: MissingPolicyOptions<T>): number[];
export declare function countMissing<T>(values: readonly (T | number | null | undefined)[], options?: MissingPolicyOptions<T>): number;
export declare function missingRate<T>(values: readonly (T | number | null | undefined)[], options?: MissingPolicyOptions<T>): number;
