import { scene, mesh, setup } from '@sponge/three-components';
import { AnimationFrameHandler } from './utils/AnimationFrameHandler';
import { AI } from './utils/AI';
import { Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

async function main() {
	const animationFrameHandler = new AnimationFrameHandler<'main'>();
	new OrbitControls(setup.camera, setup.container);

	setup.camera.position.set(0, 3, -8);
	setup.light.position.set(10, 10, 10);

	scene.background = new Color('#DEFEFF');

	scene.add(setup.camera);
	scene.add(setup.light);

	const spongebob = await mesh.spongebobGltf();
	const patrick = await mesh.patrickGltf();
	const squidward = await mesh.squidwardGltf();
	const bikinibottom = await mesh.bikinibottomGltf();

	spongebob.scene.position.set(-21, 0, -23);
	spongebob.scene.rotateY(50 * (Math.PI / 180));

	patrick.scene.position.set(-18, 0, 7);
	patrick.scene.rotateY(130 * (Math.PI / 180));

	squidward.scene.position.set(-20, 0, -7);
	squidward.scene.rotateY(90 * (Math.PI / 180));

	setup.camera.lookAt(patrick.scene.position);

	console.log(squidward.scene.position);

	scene.add(spongebob.scene);
	scene.add(patrick.scene);
	scene.add(squidward.scene);
	scene.add(bikinibottom.scene);

	const patrickAi = new AI(patrick.scene);
	const spongebobAi = new AI(spongebob.scene);
	const squidwardAi = new AI(squidward.scene);

	patrickAi.randomWalk();
	spongebobAi.randomWalk();
	squidwardAi.randomWalk();

	animationFrameHandler.register({
		taskId: 'main',
		task: () => setup.renderer.render(scene, setup.camera)
	});

	animationFrameHandler.start();
}

main();
