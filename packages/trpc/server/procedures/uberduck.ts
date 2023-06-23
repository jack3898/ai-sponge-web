import { z } from 'zod';
import { publicProcedure, router } from '../../trpc.js';
import { UberduckHandler } from '../services/index.js';

export const uberduckRouter = router({
	voice: publicProcedure
		.input(
			z.object({
				speech: z.string(),
				character: z.string()
			})
		)
		.mutation(async ({ input }): Promise<string> => {
			const uberduckHandler = new UberduckHandler();

			const response = await uberduckHandler.voiceSync({
				voice: input.character,
				speech: input.speech
			});

			const arrayBuffer = await response.arrayBuffer();

			return Buffer.from(arrayBuffer).toString('base64');
		})
});
