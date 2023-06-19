import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

/**
 * THIS FILE IS CURRENTLY A PROOF OF CONCEPT, IT WORKS BUT IS NOT FOLLOWING BEST PRACTICES.
 */

const server = express();

const openai = new OpenAIApi(
	new Configuration({
		apiKey: process.env.OPENAI_KEY,
		organization: process.env.OPENAI_ORGANISATION
	})
);

const uberduckKey = Buffer.from(`${process.env.UBERDUCK_KEY}:${process.env.UBERDUCK_SECRET}`).toString('base64');

server.get('/voice/:character/:speech', async (req, res) => {
	const headers = new Headers();

	headers.append('Authorization', `Basic ${uberduckKey}`);
	headers.append('content-type', 'audio/wav');

	const response = await fetch('https://api.uberduck.ai/speak-synchronous', {
		method: 'POST',
		body: JSON.stringify({ speech: req.params.speech, voice: req.params.character }),
		headers
	});

	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	res.status(200);
	res.setHeader('content-type', 'audio/wav');
	res.send(buffer);
});

function range(min: number, max: number): number {
	return Math.random() * (max + 1 - min) + min;
}

server.get('/topic', async (_, res) => {
	try {
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
			.reduce((acc, line) => {
				const [name, text] = line.split(':');

				acc.push({
					character: name?.trim().toLocaleUpperCase(),
					text: text?.trim()
				});

				return acc;
			}, [] as { character: string; text: string }[]);

		res.status(200);

		res.send(processed);
	} catch (error: unknown) {
		console.error(error);
	}
});

server.listen(5000);
