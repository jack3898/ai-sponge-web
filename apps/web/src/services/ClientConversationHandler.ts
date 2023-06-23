import { trpcClient } from '@sponge/trpc';
import { wsClient } from '@sponge/socketio/client';
import type { Character } from '@sponge/socketio/types.js';

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

	async startLoop() {
		// eslint-disable-next-line no-constant-condition
		while (true) {
			// eslint-disable-next-line no-async-promise-executor
			const shouldContinue = await new Promise<boolean>(async (res) => {
				const line = await this.getNextLine();
				const audio = await this.getNextAudio(line.name, line.dialogue);

				this.abortController.signal.onabort = () => {
					audio.pause();

					res(false);
				};

				this.wsClient.emit('activeCharacter', line.name as Character);

				audio.onended = () => {
					if (!this.abortController.signal.aborted) {
						res(true);

						return;
					}

					res(false);
				};

				audio.play();
			});

			if (!shouldContinue) {
				break;
			}
		}
	}
}
