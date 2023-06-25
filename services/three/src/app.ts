import { scene, light, squidwardGltf, spongebobGltf, patrickGltf, bikinibottomGltf } from '@sponge/three-components';
import { AnimationFrameHandler } from './classes/AnimationFrameHandler.js';
import { AI } from './classes/AI.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { updateAspectRatio } from './functions/updateAspectRatio.js';
import type { TypedSocket } from '@sponge/socketio/types.js';
import { degreesToRadians } from '@sponge/utils';

// I know, I know, this file is a mess!
// When the fundamentals are added, I will clean up :)

export async function create3dApp(canvas: HTMLCanvasElement, container: HTMLElement, socket: TypedSocket) {
	const renderer = new THREE.WebGLRenderer({ canvas });
	const camera = new THREE.PerspectiveCamera(35, container.offsetWidth / container.offsetHeight);

	function onResize() {
		updateAspectRatio(camera, container.offsetWidth, container.offsetHeight);
		renderer.setSize(container.offsetWidth, container.offsetHeight);
	}

	window.addEventListener('resize', () => {
		onResize();
	});

	onResize();

	renderer.setPixelRatio(window.devicePixelRatio);

	const animationFrameHandler = new AnimationFrameHandler<'main'>();
	new OrbitControls(camera, container);

	camera.position.set(-17, 5, -38);
	light.position.set(10, 10, 10);

	scene.background = new THREE.Color('#DEFEFF');

	scene.add(camera);
	scene.add(light);

	const { spongebob, spongebobMixer, spongebobTalkAnimation } = await spongebobGltf;
	const { patrick, patrickMixer, patrickTalkAnimation } = await patrickGltf;
	const { squidward, squidwardMixer, squidwardTalkAnimation } = await squidwardGltf;
	const bikinibottom = await bikinibottomGltf();

	spongebob.scene.position.set(-21, 0, -23);
	spongebob.scene.rotateY(50 * (Math.PI / 180));

	patrick.scene.position.set(-16, 0, -23);
	patrick.scene.rotateY(degreesToRadians(270));

	squidward.scene.position.set(-20, 0, -7);
	squidward.scene.rotateY(90 * (Math.PI / 180));

	camera.lookAt(squidward.scene.position);

	scene.add(spongebob.scene);
	scene.add(patrick.scene);
	scene.add(squidward.scene);
	scene.add(bikinibottom.scene);

	const patrickAi = new AI(patrick.scene);
	const spongebobAi = new AI(spongebob.scene);
	const squidwardAi = new AI(squidward.scene);
	const cameraAi = new AI(camera);

	// walk random vectors spongebob - new Vector3(-21, 0.01, -23), new Vector3(-16, 0.01, -23)
	// walk random vectors patrick - new Vector3(-15, 0.01, -23), new Vector3(-10, 0.01, -23)

	const clock = new THREE.Clock();
	const clock2 = new THREE.Clock();
	const clock3 = new THREE.Clock();

	animationFrameHandler.register({
		taskId: 'main',
		task: () => {
			renderer.render(scene, camera);
			spongebobMixer.update(clock.getDelta());
			squidwardMixer.update(clock2.getDelta());
			patrickMixer.update(clock3.getDelta());
		}
	});

	animationFrameHandler.start();

	socket.on('activeCharacter', (character) => {
		squidwardTalkAnimation.fadeOut(0.2);
		spongebobTalkAnimation.fadeOut(0.2);
		patrickTalkAnimation.fadeOut(0.2);

		switch (character) {
			case 'spongebob': {
				cameraAi.smoothLookAt(() => spongebob.scene.position);
				patrickAi.smoothLookAt(() => spongebob.scene.position);
				squidwardAi.smoothLookAt(() => spongebob.scene.position);

				spongebobTalkAnimation.reset().play().fadeIn(0.5);

				break;
			}
			case 'patrick': {
				cameraAi.smoothLookAt(() => patrick.scene.position);
				squidwardAi.smoothLookAt(() => patrick.scene.position);
				spongebobAi.smoothLookAt(() => patrick.scene.position);

				patrickTalkAnimation.reset().play().fadeIn(0.5);

				break;
			}
			case 'squidward': {
				cameraAi.smoothLookAt(() => squidward.scene.position);
				patrickAi.smoothLookAt(() => squidward.scene.position);
				spongebobAi.smoothLookAt(() => squidward.scene.position);

				squidwardTalkAnimation.reset().play().fadeIn(0.5);

				break;
			}
		}
	});
}
