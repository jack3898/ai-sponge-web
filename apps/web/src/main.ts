import { scene, mesh, setup } from '@sponge/three-components';
import { Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

async function main() {
	setup.camera.position.z = 20;
	setup.camera.position.y = 2;
	setup.light.position.set(10, 10, 10);

	new OrbitControls(setup.camera, setup.container);

	scene.background = new Color('#DEFEFF');

	scene.add(setup.camera);
	scene.add(setup.light);

	const spongebob = await mesh.spongebobGltf();
	const patrick = await mesh.patrickGltf();
	const squidward = await mesh.squidwardGltf();

	spongebob.scene.scale.multiplyScalar(2);
	patrick.scene.scale.multiplyScalar(2);
	squidward.scene.scale.multiplyScalar(2);

	spongebob.scene.translateX(-6);
	patrick.scene.translateX(6);
	squidward.scene.translateX(0);

	scene.add(spongebob.scene);
	scene.add(patrick.scene);
	scene.add(squidward.scene);

	const renderLoop = () => {
		setup.renderer.render(scene, setup.camera);
		window.requestAnimationFrame(renderLoop);
	};

	renderLoop();
}

main();
