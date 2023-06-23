import { trpcClient } from '@sponge/trpc';
import { wsClient } from '@sponge/socketio/client';
import type { Character } from '@sponge/socketio/types.js';
import { sleep } from '@sponge/utils';

export class ClientConversationHandler {
	abortController = new AbortController();

	getNextLine = trpcClient.conversationRouter.getLine.mutate;

	wsClient = wsClient;

	async getNextAudio(character: string, speech: string) {
		const voiceData = await trpcClient.uberduckRouter.voice.mutate({
			character,
			speech
		});

		return new Audio('data:audio/x-wav;base64,' + voiceData);
	}

	/**
	 * Keeps a queue of promises that resolve to dialogue and audio.
	 */
	*getNextAction() {
		const resolveLineAndAudio = async () => {
			try {
				const line = await this.getNextLine();
				const audio = await this.getNextAudio(line.name, line.dialogue);

				console.info('New dialogue has arrived!');

				return [line, audio] as const;
			} catch (error: unknown) {
				console.error('There was a problem fetching the next dialogue.', error);

				return null;
			}
		};

		const queue: ReturnType<typeof resolveLineAndAudio>[] = [];

		while (true) {
			// Always keep the next part of the conversation in memory for quick access!
			if (queue.length < 3) {
				queue.push(resolveLineAndAudio(), resolveLineAndAudio());
				console.info(`Buffering two more character dialogues. ${queue.length} items are now active promises.`);
			}

			yield queue.shift();
		}
	}

	async startLoop() {
		const actionGenerator = this.getNextAction();

		// eslint-disable-next-line no-constant-condition
		while (true) {
			// eslint-disable-next-line no-async-promise-executor
			const shouldContinue = await new Promise<boolean>(async (res) => {
				const nextLineAndAudio = await actionGenerator.next().value;

				if (nextLineAndAudio) {
					const [line, audio] = nextLineAndAudio;

					this.wsClient.emit('activeCharacter', line.name.toLowerCase() as Character);
					this.wsClient.emit('currentSpeech', line.dialogue);

					audio.play();

					audio.onended = async () => {
						await sleep(1500);

						if (!this.abortController.signal.aborted) {
							res(true);

							return;
						}

						res(false);
					};
				}
			});

			if (!shouldContinue) {
				break;
			}
		}
	}
}
