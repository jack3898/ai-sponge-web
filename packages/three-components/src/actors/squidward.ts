import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import squidward from '../static/squidward/squidward.glb?url';

const gltfLoader = new GLTFLoader();

export const squidwardGltf = () => gltfLoader.loadAsync(squidward);
