import { range } from '@sponge/utils';

type GenerateOpenAIPromptProps = {
	/**
	 * First two are main characters.
	 */
	characters: [string, string, ...string[]];

	/**
	 * A starting point for the conversation
	 */
	topic: string;
};

/**
 * This prompt will give the clearest possible instructions to OpenAI for what we expect as an output.
 * The output will be validated before being returned.
 */
export function generateOpenAIPrompt({ characters, topic }: GenerateOpenAIPromptProps): string {
	const charactersString = characters.join(', ').replace(/, ((?:.(?!, ))+)$/, ' and $1');

	const prompt = `
Create a conversation between ${charactersString} focusing on ${topic}.
Not all characters need to be included, however ${characters[0]} and ${characters[1]} are the main characters.

Each character's line starts with this format: "name: ".
`;

	return prompt.trim();
}
