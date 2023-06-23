import { z } from 'zod';
import { publicProcedure, router } from '../../trpc.js';
import { io } from '@sponge/socketio/server/index.js';
import type { Character } from '@sponge/socketio/types.js';
import env from '@sponge/env/node.js';

const uberduckKey = Buffer.from(`${env.UBERDUCK_KEY}:${env.UBERDUCK_SECRET}`).toString('base64');

export const uberduckRouter = router({
	voice: publicProcedure
		.input(
			z.object({
				speech: z.string(),
				character: z.string()
			})
		)
		.mutation(async ({ input }): Promise<string> => {
			const headers = new Headers();

			headers.append('Authorization', `Basic ${uberduckKey}`);
			headers.append('content-type', 'audio/wav');

			const response = await fetch('https://api.uberduck.ai/speak-synchronous', {
				method: 'POST',
				body: JSON.stringify({ speech: input.speech, voice: input.character.trim().toLowerCase() }),
				headers
			});

			const arrayBuffer = await response.arrayBuffer();

			io.emit('activeCharacter', input.character.toLowerCase() as Character);
			io.emit('currentSpeech', input.speech);

			return Buffer.from(arrayBuffer).toString('base64');
		})
});
