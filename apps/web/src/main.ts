import { scene, mesh, setup } from '@sponge/three-components';
import { Color } from 'three';

async function main() {
	setup.camera.position.z = 20;
	setup.camera.position.y = 2;
	setup.light.position.set(10, 10, 10);

	scene.background = new Color('#DEFEFF');

	scene.add(setup.camera);
	scene.add(setup.light);

	const spongebob = await mesh.spongebobGltf();
	const patrick = await mesh.patrickGltf();

	spongebob.scene.scale.multiplyScalar(5);
	spongebob.scene.translateX(-4);

	patrick.scene.scale.multiplyScalar(2);
	patrick.scene.translateX(4);
	patrick.scene.translateY(-3);

	scene.add(spongebob.scene);
	scene.add(patrick.scene);

	const renderLoop = () => {
		setup.renderer.render(scene, setup.camera);
		window.requestAnimationFrame(renderLoop);

		spongebob.scene.rotateY(0.03);
		patrick.scene.rotateY(0.03);
	};

	renderLoop();
}

main();
