import { publicProcedure, router } from '../../trpc';
import { Configuration, OpenAIApi } from 'openai';
import { range } from '@sponge/utils';

const openai = new OpenAIApi(
	new Configuration({
		apiKey: process.env.OPENAI_KEY,
		organization: process.env.OPENAI_ORGANISATION
	})
);

export const openaiRouter = router({
	topic: publicProcedure.mutation(async () => {
		const characters = ['spongebob', 'patrick', 'squidward'];
		const topics = ['2006 honda civic', 'august 12 2036, the heat death of the universe', 'anything'];
		const prompt = `${characters.join(', ')} have a long conversation and the topic is ${topics.at(
			range(0, topics.length - 1)
		)}. Each character's line starts with this format: "name: ".`;

		const chatCompletion = await openai.createCompletion({
			model: 'text-davinci-002',
			prompt,
			max_tokens: 1000
		});

		const text = chatCompletion.data.choices[0].text;

		const find = /\n+/g;

		const processed = text
			?.replace(find, '\n')
			.split('\n')
			.filter(Boolean)
			.reduce((acc, line, index) => {
				const [name, text] = line.split(':');

				acc.push({
					id: index,
					character: name?.trim().toLocaleUpperCase(),
					text: text?.trim()
				});

				return acc;
			}, [] as { id: number; character: string; text: string }[]);

		return processed;
	})
});
