import * as THREE from 'three';
import { containerWidth, containerHeight } from './dom';

export const camera = new THREE.PerspectiveCamera(35, containerWidth() / containerHeight());

window.addEventListener('resize', () => {
	camera.aspect = containerWidth() / containerHeight();
	camera.updateProjectionMatrix();
});
