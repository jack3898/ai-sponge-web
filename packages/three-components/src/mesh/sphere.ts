import * as THREE from 'three';

export const sphereGeometry = new THREE.SphereGeometry(3, 64, 64);

export const sphereMaterial = new THREE.MeshStandardMaterial({
	color: '#00ff83'
});

export const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
