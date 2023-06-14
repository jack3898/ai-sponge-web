import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import spongebob from '../static/spongebob/scene.gltf?url';

const gltfLoader = new GLTFLoader();

export const spongebobGltf = () => gltfLoader.loadAsync(spongebob);
