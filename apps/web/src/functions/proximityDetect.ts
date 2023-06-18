type Coordinates = {
	x: number;
	y: number;
	z: number;
};

/**
 * Identify if two Euler coordinates are nearby in a 2D radius.
 */
export function proximityDetect(subjectA: Coordinates, subjectB: Coordinates, radius = 3): boolean {
	const distanceX = Math.max(subjectA.x, subjectB.x) - Math.min(subjectA.x, subjectB.x);
	const distanceZ = Math.max(subjectA.z, subjectB.z) - Math.min(subjectA.z, subjectB.z);

	return distanceX <= radius && distanceZ <= radius;
}
