import { range } from './range';

/**
 * Pick a random item from an array.
 */
export function pickFrom<T>(array: T[]): T {
	return array[range(0, array.length - 1)];
}
