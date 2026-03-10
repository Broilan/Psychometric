import { isFiniteNumber } from "./math";

export interface MissingPolicyOptions<T> {
  treatAsMissing?: readonly T[];
}

export function isMissingValue<T>(
  value: T | null | undefined,
  options: MissingPolicyOptions<T> = {},
): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  return options.treatAsMissing?.includes(value) ?? false;
}

export function compactNumbers<T>(
  values: readonly (T | number | null | undefined)[],
  options: MissingPolicyOptions<T> = {},
): number[] {
  return values.filter((value): value is number => !isMissingValue(value as T, options) && isFiniteNumber(value));
}

export function countMissing<T>(
  values: readonly (T | number | null | undefined)[],
  options: MissingPolicyOptions<T> = {},
): number {
  return values.filter((value) => isMissingValue(value as T, options) || !isFiniteNumber(value)).length;
}

export function missingRate<T>(
  values: readonly (T | number | null | undefined)[],
  options: MissingPolicyOptions<T> = {},
): number {
  return values.length ? countMissing(values, options) / values.length : 0;
}
