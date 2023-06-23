import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import patrick from '../static/patrick/patrick.glb?url';

const gltfLoader = new GLTFLoader();

export const patrickGltf = () => gltfLoader.loadAsync(patrick);
