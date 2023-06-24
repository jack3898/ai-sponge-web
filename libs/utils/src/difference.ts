/**
 * Get the numerical difference between two numbers. It does not matter which order you pass them in.
 */
export function difference(numberA: number, numberB: number): number {
	return Math.max(numberA, numberB) - Math.min(numberA, numberB);
}
