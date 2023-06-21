import { publicProcedure, router } from '../../trpc';
import { Configuration, OpenAIApi } from 'openai';
import { generateOpenAIPrompt } from '../utils';
import { z } from 'zod';

const openai = new OpenAIApi(
	new Configuration({
		apiKey: process.env.OPENAI_KEY,
		organization: process.env.OPENAI_ORGANISATION
	})
);

const responseValidation = z.array(
	z.object({
		name: z.string(),
		dialogue: z.string()
	})
);

export const openaiRouter = router({
	topic: publicProcedure.mutation(async () => {
		const topicResponse = await openai.createCompletion({
			model: 'text-davinci-002',
			prompt: 'Suggest a funny, random and inappropriate topic idea for a conversation between adults',
			max_tokens: 1000
		});

		const topic = topicResponse.data.choices[0].text!;

		const prompt = generateOpenAIPrompt({
			characters: ['spongebob', 'patrick', 'squidward'],
			topic
		});

		console.log('PROMPT\n\n\n', prompt);

		const chatCompletion = await openai.createCompletion({
			model: 'text-davinci-002',
			prompt,
			max_tokens: 1000
		});

		const text = chatCompletion.data.choices[0].text;

		if (text) {
			try {
				const find = /\n+/g;

				const processed = text
					?.replace(find, '\n')
					.split('\n')
					.filter(Boolean)
					.reduce((acc, line) => {
						const [name, text] = line.split(':');

						acc.push({
							name: name?.trim(),
							dialogue: text.trimStart()
						});

						return acc;
					}, [] as { name: string; dialogue: string }[]);

				const validated = responseValidation.parse(processed);

				return validated;
			} catch (error) {
				console.error('Unexpected format from OpenAI.', error);

				return null;
			}
		}

		return null;
	})
});
