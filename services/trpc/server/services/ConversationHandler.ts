import { createAsyncQueue } from '@sponge/utils';
import type { DialogueResponse } from '../validation/index.js';
import { OpenAIHandler } from './OpenAIHandler.js';

export class ConversationHandler {
	private static openAi = new OpenAIHandler();

	private static async *responseGenerator(): AsyncGenerator<DialogueResponse> {
		const responseQueue = createAsyncQueue(() => {
			console.info('Buffered up a new conversation');

			return this.openAi.generateConversation(
				['spongebob', 'patrick', 'squidward'],
				['2006 honda civic', 'cars', 'squidward being moody', 'august 12th 2036, the heat death of the universe']
			);
		}, 3);

		while (true) {
			const topic = await responseQueue.next().value;

			if (!topic) {
				continue;
			}

			for (const characterLine of topic) {
				yield characterLine;
			}
		}
	}

	private static responseGeneratorInstance = this.responseGenerator();

	async getNextLine(): Promise<DialogueResponse> {
		const { value } = await ConversationHandler.responseGeneratorInstance.next();

		return value;
	}
}
