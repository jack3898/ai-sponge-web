import * as THREE from 'three';
import { containerWidth, containerHeight, canvas } from './dom';

export const renderer = new THREE.WebGLRenderer({ canvas });

function syncSize() {
	renderer.setSize(containerWidth(), containerHeight());
}

window.addEventListener('resize', () => {
	syncSize();
});

syncSize();
