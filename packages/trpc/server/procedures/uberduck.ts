import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';

export const uberduckRouter = router({
	voice: publicProcedure
		.input(
			z.object({
				speech: z.string(),
				character: z.string()
			})
		)
		.mutation(async ({ input }): Promise<string> => {
			const uberduckKey = Buffer.from(`${process.env.UBERDUCK_KEY}:${process.env.UBERDUCK_SECRET}`).toString('base64');

			const headers = new Headers();

			headers.append('Authorization', `Basic ${uberduckKey}`);
			headers.append('content-type', 'audio/wav');

			const response = await fetch('https://api.uberduck.ai/speak-synchronous', {
				method: 'POST',
				body: JSON.stringify({ speech: input.speech, voice: input.character }),
				headers
			});

			const arrayBuffer = await response.arrayBuffer();

			return Buffer.from(arrayBuffer).toString('base64');
		})
});
