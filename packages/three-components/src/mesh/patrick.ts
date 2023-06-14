import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import patrick from '../static/patrick/scene.gltf?url';

const gltfLoader = new GLTFLoader();

export const patrickGltf = () => gltfLoader.loadAsync(patrick);
