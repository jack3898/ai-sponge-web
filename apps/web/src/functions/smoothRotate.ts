import gsap from 'gsap';
import type { Object3D } from 'three';
import { degreesToRadians } from './degreesToRadians';

export function smoothRotateTo(object: Object3D, degrees: number, duration: number): Promise<void> {
	return new Promise<void>((res) => {
		gsap.to(object.rotation, { y: degreesToRadians(degrees), duration, onComplete: () => res() });
	});
}
