import { range } from './range.js';

/**
 * Pick a random item from an array.
 */
export function pickFrom<T>(array: T[]): T {
	return array[range(0, array.length - 1)];
}
