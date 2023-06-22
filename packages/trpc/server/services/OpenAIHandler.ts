import { Configuration, OpenAIApi } from 'openai';
import { generateOpenAIPrompt } from '../utils';
import { type DialogueResponseArray, dialogueResponseArray } from '../validation';

export class OpenAIHandler {
	static readonly api = new OpenAIApi(
		new Configuration({
			apiKey: process.env.OPENAI_KEY,
			organization: process.env.OPENAI_ORGANISATION
		})
	);

	async generateConversation(
		characters: [string, string, ...string[]],
		topics: string[]
	): Promise<DialogueResponseArray | null> {
		const prompt = generateOpenAIPrompt({ characters, topics });

		const chatCompletion = await OpenAIHandler.api.createCompletion({
			model: 'text-davinci-002',
			prompt,
			max_tokens: 1000
		});

		const text = chatCompletion.data.choices[0].text;

		if (text) {
			try {
				const find = /\n+/g;

				const lines = text?.replace(find, '\n').split('\n');

				const processed = lines.filter(Boolean).reduce((acc, line, index) => {
					const [name, text] = line.split(':');

					acc.push({
						name: name?.trim(),
						dialogue: text.trimStart(),
						lastInTopic: index === lines.length - 1
					});

					return acc;
				}, [] as DialogueResponseArray);

				const validated = dialogueResponseArray.parse(processed);

				return validated;
			} catch (error) {
				console.error('Unexpected format from OpenAI.', error);

				return null;
			}
		}

		return null;
	}
}
