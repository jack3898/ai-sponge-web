import { type Group, Vector3, Object3D } from 'three';
import { AnimationFrameHandler } from './AnimationFrameHandler';

function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export class AI {
	animationFrameHandler = new AnimationFrameHandler<'walk' | 'turn'>();

	constructor(private subject: Group) {
		this.animationFrameHandler.start();
	}

	randomWalk() {
		setInterval(() => {
			this.animationFrameHandler.register({
				taskId: 'walk',
				task: () => {
					this.subject.translateZ(0.04);
				},
				expiryMillis: getRandomArbitrary(5, 10) * 1000
			});
		}, getRandomArbitrary(10, 30) * 1000);

		setInterval(() => {
			const destination = new Vector3(getRandomArbitrary(-30, 0), 0, getRandomArbitrary(0, -10));

			this.turnSubjectTo(destination, 1000);
		}, getRandomArbitrary(6, 8) * 1000);
	}

	turnSubjectTo(destination: Vector3, durationMillis = 5000) {
		this.animationFrameHandler.register({
			taskId: 'turn',
			task: (_, millis) => {
				if (
					Math.round(destination.x - this.subject.position.x) === 0 &&
					Math.round(destination.z - this.subject.position.z) === 0
				) {
					this.animationFrameHandler.unregister('walk'); // subject will spin if they reach their destination!
				}

				const finalOrientation = new Object3D();

				finalOrientation.position.copy(this.subject.position);
				finalOrientation.lookAt(destination);

				const t = millis / durationMillis;

				if (t > 1) {
					return;
				}

				this.subject.quaternion.slerpQuaternions(this.subject.quaternion, finalOrientation.quaternion, t);
			},
			expiryMillis: durationMillis
		});
	}
}
