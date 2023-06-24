import { range } from './range.js';

/**
 * Flip a coin that sometimes is very unevenly weighted on one side!
 */
export function coinFlip(successChangePercentage = 50): boolean {
	return range(0, 100) < successChangePercentage;
}
