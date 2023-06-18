import { scene, actors, environment, camera, container, light, renderer, paths } from '@sponge/three-components';
import { AnimationFrameHandler } from './classes/AnimationFrameHandler';
import { AI } from './classes/AI';
import { Color, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

async function main() {
	const animationFrameHandler = new AnimationFrameHandler<'main'>();
	new OrbitControls(camera, container);

	camera.position.set(0, 5, 0);
	light.position.set(10, 10, 10);

	scene.background = new Color('#DEFEFF');

	scene.add(camera);
	scene.add(light);

	const spongebob = await actors.spongebobGltf();
	const patrick = await actors.patrickGltf();
	const squidward = await actors.squidwardGltf();
	const bikinibottom = await environment.bikinibottomGltf();

	spongebob.scene.position.set(-21, 0, -23);
	spongebob.scene.rotateY(50 * (Math.PI / 180));

	camera.lookAt(spongebob.scene.position);

	patrick.scene.position.set(-16, 0, -23);
	patrick.scene.rotateY(130 * (Math.PI / 180));

	squidward.scene.position.set(-20, 0, -7);
	squidward.scene.rotateY(90 * (Math.PI / 180));

	console.log(squidward.scene.position);

	scene.add(spongebob.scene);
	scene.add(patrick.scene);
	scene.add(squidward.scene);
	scene.add(bikinibottom.scene);

	scene.add(paths.spongebobBoundary);
	scene.add(paths.patrickBoundary);

	paths.spongebobBoundary.position.set(-21, 0.01, -23);
	paths.patrickBoundary.position.set(-14, 0.01, -23);

	const patrickAi = new AI(patrick.scene);
	const spongebobAi = new AI(spongebob.scene);
	const squidwardAi = new AI(squidward.scene);
	const cameraAi = new AI(camera);

	// walk random vectors spongebob - new Vector3(-21, 0.01, -23), new Vector3(-16, 0.01, -23)
	// walk random vectors patrick - new Vector3(-15, 0.01, -23), new Vector3(-10, 0.01, -23)

	animationFrameHandler.register({
		taskId: 'main',
		task: () => renderer.render(scene, camera)
	});

	animationFrameHandler.start();

	await cameraAi.talkTo(() => squidward.scene);

	squidwardAi.walkTo(new Vector3(-10, 0, -20));

	squidwardAi.talkTo(() => spongebob.scene);

	squidwardAi.walk();

	patrickAi.talkTo(() => spongebob.scene);

	// await smoothRotate(camera, spongebob.scene.position, 1);

	// eslint-disable-next-line no-constant-condition

	await Promise.all([spongebobAi.randomTurn(), spongebobAi.walk()]);

	await spongebobAi.talkTo(() => patrick.scene);
}

main();
