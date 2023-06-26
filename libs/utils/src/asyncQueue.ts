type Callback<T> = () => Promise<T>;

/**
 * Queue up a list of promises using this generator function.
 *
 * Every time you yield the result of a promise using this generator, if the queue is too small, it will automatically buffer up some more
 * to be resolved in the background.
 * This is really useful for pre-loading multiple API requests into memory as promises ahead of time.
 *
 * It's important to note that the yielded value will be a promise added to the queue many ticks ago,
 * so it may have already resolved so awaiting it _should_ be instant. However, the beauty of it
 * queueing up promises, is that if the next queue item has not yet resolved, awaiting it will
 * of course pause execution of the async function naturally letting your code wait for the slow
 * queue to resolve its items.
 */
export function* createAsyncQueue<T>(callback: Callback<T>, minQueueLength = 2): Generator<Promise<T> | undefined> {
	const queue: Promise<T>[] = [];

	while (true) {
		if (queue.length < minQueueLength) {
			queue.push(callback(), callback());
		}

		yield queue.shift();
	}
}
