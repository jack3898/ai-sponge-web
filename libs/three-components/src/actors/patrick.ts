import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import patrickGlb from '../static/patrick/patrick.glb?url';
import * as THREE from 'three';

const gltfLoader = new GLTFLoader();

export const patrickGltf = gltfLoader.loadAsync(patrickGlb).then((patrick) => {
	const animations = patrick.animations;
	const clip = THREE.AnimationClip.findByName(animations, 'talk');

	const patrickMixer = new THREE.AnimationMixer(patrick.scene);

	const patrickTalkAnimation = patrickMixer.clipAction(clip);

	return { patrick, patrickMixer, patrickTalkAnimation };
});
