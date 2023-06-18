import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import spongebob from '../static/spongebob/spongebob.glb?url';

const gltfLoader = new GLTFLoader();

export const spongebobGltf = () => gltfLoader.loadAsync(spongebob);
