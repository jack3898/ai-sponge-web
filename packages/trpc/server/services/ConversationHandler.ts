import { sleep } from '@sponge/utils';
import type { DialogueResponse } from '../validation';
import { OpenAIHandler } from './OpenAIHandler';

export class ConversationHandler {
	private static openAi = new OpenAIHandler();

	private static async *responseGenerator(): AsyncGenerator<DialogueResponse> {
		while (true) {
			const topic = await this.openAi.generateConversation(
				['spongebob', 'patrick', 'squidward'],
				['2006 honda civic', 'cars', 'squidward being moody']
			);

			if (!topic) {
				await sleep(15_000);

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
