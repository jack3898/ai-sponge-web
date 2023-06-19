import { Quaternion, type Vector3, type Object3D } from 'three';
import { gsap } from 'gsap';

export async function smoothRotateToObj(
	eye: Object3D,
	subject: () => Vector3,
	duration: number,
	when = () => true
): Promise<void> {
	const startQuaternion = new Quaternion().copy(eye.quaternion);

	eye.lookAt(subject());

	const endQuaternion = new Quaternion().copy(eye.quaternion);

	const proxy = {
		set time(t: number) {
			if (when()) {
				eye.quaternion.slerpQuaternions(startQuaternion, endQuaternion, t);
			}
		}
	};

	return new Promise((res) => {
		gsap.fromTo(proxy, { time: 0 }, { time: 1, duration, onComplete: () => res() });
	});
}
