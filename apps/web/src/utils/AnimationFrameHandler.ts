type Task = (id: string, millis: number) => void;

type TaskInfo = {
	startMillis: number;
	task: Task;
};

export class AnimationFrameHandler<Events extends string> {
	private tasks = new Map<Events, TaskInfo>();
	private fps = 60;

	start(): void {
		const nowMillis = Date.now();

		for (const [taskId, { task, startMillis }] of this.tasks) {
			task(taskId, nowMillis - startMillis);
		}

		setTimeout(() => {
			window.requestAnimationFrame(this.start.bind(this));
		}, 1000 / this.fps);
	}

	register({ taskId, task, expiryMillis }: { taskId: Events; task: Task; expiryMillis?: number }): void {
		this.tasks.set(taskId, { task, startMillis: Date.now() });

		if (expiryMillis) {
			setTimeout(() => {
				this.tasks.delete(taskId);
			}, expiryMillis);
		}
	}

	unregister(taskId: Events): boolean {
		return this.tasks.delete(taskId);
	}
}
