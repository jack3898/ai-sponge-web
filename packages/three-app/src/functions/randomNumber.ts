/**
 * Get a random number between a range. Resulting number includes min and max as a potential result.
 */
export function range(min: number, max: number): number {
	return Math.random() * (max + 1 - min) + min;
}
