import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import squidwardGlb from '../static/squidward/squidward.glb?url';
import * as THREE from 'three';

const gltfLoader = new GLTFLoader();

export const squidwardGltf = gltfLoader.loadAsync(squidwardGlb).then((squidward) => {
	const animations = squidward.animations;
	const clip = THREE.AnimationClip.findByName(animations, 'talk');

	const squidwardMixer = new THREE.AnimationMixer(squidward.scene);

	const squidwardTalkAnimation = squidwardMixer.clipAction(clip);

	return { squidward, squidwardMixer, squidwardTalkAnimation };
});
