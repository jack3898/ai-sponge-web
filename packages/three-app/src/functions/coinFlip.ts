import { range } from './randomNumber';

export function coinFlip(successChangePercentage = 50) {
	return range(0, 100) < successChangePercentage;
}
