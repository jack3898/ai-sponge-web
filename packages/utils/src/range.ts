/**
 * Get a random number between a range.
 */
export function range(min: number, max: number, float = false): number {
	const number = Math.random() * (++max - min) + min;

	return float ? number : Math.floor(number);
}
