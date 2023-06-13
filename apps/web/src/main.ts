import { scene, mesh, setup } from '@sponge/three-components';

setup.camera.position.z = 20;
setup.light.position.set(10, 10, 10);

scene.add(setup.camera);
scene.add(mesh.sphere);
scene.add(setup.light);

const renderLoop = () => {
	setup.renderer.render(scene, setup.camera);
	window.requestAnimationFrame(renderLoop);
};

renderLoop();
