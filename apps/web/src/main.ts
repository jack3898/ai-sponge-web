import { scene, mesh, setup, camera } from '@sponge/three-components';
import { Color, Quaternion } from 'three';

async function main() {
	setup.camera.position.x = 0;
	setup.camera.position.y = 3;
	setup.camera.position.z = -8;

	setup.light.position.set(10, 10, 10);

	scene.background = new Color('#DEFEFF');

	scene.add(setup.camera);
	scene.add(setup.light);

	const spongebob = await mesh.spongebobGltf();
	const patrick = await mesh.patrickGltf();
	const squidward = await mesh.squidwardGltf();
	const bikinibottom = await mesh.bikinibottomGltf();

	spongebob.scene.translateZ(-23);
	spongebob.scene.translateX(-21);
	spongebob.scene.rotateY(50 * (Math.PI / 180));

	patrick.scene.translateZ(7);
	patrick.scene.translateX(-18);
	patrick.scene.rotateY(130 * (Math.PI / 180));

	squidward.scene.translateX(-20);
	squidward.scene.translateZ(-7);
	squidward.scene.rotateY(90 * (Math.PI / 180));

	setup.camera.lookAt(spongebob.scene.position);
	const sq = new Quaternion().copy(setup.camera.quaternion);

	setup.camera.lookAt(patrick.scene.position);
	const pq = new Quaternion().copy(setup.camera.quaternion);

	// setInterval(() => {
	// 	camera.lookAt([spongebob.scene.position, patrick.scene.position, squidward.scene.position][++lookAtNum % 3]);
	// }, 5000);

	scene.add(spongebob.scene);
	scene.add(patrick.scene);
	scene.add(squidward.scene);
	scene.add(bikinibottom.scene);

	let t = 0;

	const renderLoop = () => {
		t = (t + 0.0005) % 1;

		setup.camera.quaternion.slerpQuaternions(pq, sq, t);
		setup.renderer.render(scene, setup.camera);
		window.requestAnimationFrame(renderLoop);
	};

	renderLoop();
}

main();
