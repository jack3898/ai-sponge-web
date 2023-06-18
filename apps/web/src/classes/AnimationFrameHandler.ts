type Task = (id: string) => void;

export class AnimationFrameHandler<Events extends string> {
	private tasks = new Map<Events, Task>();
	private fps = 60;

	start(): void {
		for (const [taskId, task] of this.tasks) {
			task(taskId);
		}

		setTimeout(() => {
			window.requestAnimationFrame(this.start.bind(this));
		}, 1000 / this.fps);
	}

	register({ taskId, task, expiryMillis }: { taskId: Events; task: Task; expiryMillis?: number }): Promise<void> {
		this.tasks.set(taskId, task);

		return new Promise((res) => {
			if (expiryMillis) {
				setTimeout(() => {
					this.unregister(taskId);
					res();
				}, expiryMillis);
			}
		});
	}

	unregister(taskId: Events): boolean {
		return this.tasks.delete(taskId);
	}

	get taskList() {
		return this.tasks;
	}
}
