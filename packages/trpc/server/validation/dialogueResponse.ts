import { z } from 'zod';

export const dialogueResponse = z.object({
	name: z.string(),
	dialogue: z.string(),
	lastInTopic: z.boolean()
});

export const dialogueResponseArray = z.array(dialogueResponse);

export type DialogueResponse = z.infer<typeof dialogueResponse>;

export type DialogueResponseArray = z.infer<typeof dialogueResponseArray>;
