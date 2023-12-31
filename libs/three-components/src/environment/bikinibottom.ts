import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import bikinibottom from '../static/bikinibottom/bikinibottom.glb?url';

const gltfLoader = new GLTFLoader();

export const bikinibottomGltf = () => gltfLoader.loadAsync(bikinibottom);
