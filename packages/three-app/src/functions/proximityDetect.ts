import { difference } from '@sponge/utils';

type Coordinates = {
	x: number;
	y: number;
	z: number;
};

/**
 * Identify if two Euler coordinates are nearby in a 2D radius.
 */
export function proximityDetect(subjectA: Coordinates, subjectB: Coordinates, radius = 3): boolean {
	const distanceX = difference(subjectA.x, subjectB.x);
	const distanceZ = difference(subjectA.z, subjectB.z);

	return distanceX <= radius && distanceZ <= radius;
}
