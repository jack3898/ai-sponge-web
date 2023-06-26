import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import spongebobGlb from '../static/spongebob/spongebob.glb?url';
import * as THREE from 'three';

const gltfLoader = new GLTFLoader();

export const spongebobGltf = gltfLoader.loadAsync(spongebobGlb).then((spongebob) => {
	const animations = spongebob.animations;
	const clip = THREE.AnimationClip.findByName(animations, 'talk');
	const spongebobMixer = new THREE.AnimationMixer(spongebob.scene);
	const spongebobTalkAnimation = spongebobMixer.clipAction(clip);

	return { spongebob, spongebobMixer, spongebobTalkAnimation };
});
