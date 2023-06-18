import type { Object3D, Vector3 } from 'three';
import { AnimationFrameHandler } from './AnimationFrameHandler';
import { range, proximityDetect, smoothRotateTo, smoothRotateToObj } from '../functions';

export class AI {
	animationFrameHandler = new AnimationFrameHandler<'walk' | 'turn' | 'stare'>();

	constructor(private subject: Object3D) {
		this.animationFrameHandler.start();
	}

	walk() {
		return this.animationFrameHandler.register({
			taskId: 'walk',
			task: () => this.subject.translateZ(0.04),
			expiryMillis: range(3, 4) * 1000
		});
	}

	async walkTo(location: Vector3) {
		await this.smoothLookAt(() => location, 1);

		return this.animationFrameHandler.register({
			taskId: 'walk',
			task: () => {
				if (this.subjectIsCloseToObject(() => location)) {
					this.animationFrameHandler.unregister('walk'); // subject will spin if they reach their subjectToLookAt!
				}

				this.subject.translateZ(0.04);
			}
		});
	}

	/**
	 * Smoothly turn to look at a subject
	 *
	 * @param subjectToLookAt a function to get the latest subject information, it is a function to ensure a moving subject does not cause any animation issues
	 */
	smoothLookAt(subjectToLookAt: () => Vector3, duration = 1) {
		if (this.subjectIsCloseToObject(subjectToLookAt)) {
			this.animationFrameHandler.unregister('walk'); // subject will spin if they reach their subjectToLookAt!
		}

		return smoothRotateToObj(
			this.subject,
			subjectToLookAt,
			duration,
			() => !this.animationFrameHandler.taskList.has('walk') && !this.animationFrameHandler.taskList.has('turn')
		);
	}

	subjectIsCloseToObject(subject: () => Vector3, radius = 1): boolean {
		return proximityDetect(subject(), this.subject.position, radius);
	}

	randomTurn(maxDegrees?: 135) {
		return smoothRotateTo(this.subject, maxDegrees ?? range(0, 135), 1);
	}

	async talkTo(subjectToTalkTo: () => Object3D) {
		this.animationFrameHandler.unregister('walk');
		this.animationFrameHandler.unregister('turn');

		await this.smoothLookAt(() => subjectToTalkTo().position, 2);

		this.animationFrameHandler.register({
			taskId: 'stare',
			task: () => this.subject.lookAt(subjectToTalkTo().position)
		});
	}
}
