import * as THREE from 'three';

export function createBoundary(width: number, length: number): THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> {
	const geometry = new THREE.PlaneGeometry(width, length);

	const material = new THREE.MeshBasicMaterial({ color: '#000000' });

	const mesh = new THREE.Mesh(geometry, material);

	mesh.rotateX(-1.570796);

	return mesh;
}
