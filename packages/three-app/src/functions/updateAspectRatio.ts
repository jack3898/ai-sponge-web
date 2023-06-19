export function updateAspectRatio(camera: THREE.PerspectiveCamera, width: number, height: number) {
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}
