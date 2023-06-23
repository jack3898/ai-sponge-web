import { z } from 'zod';

/**
 * Use this module in environments that support process.env (node.js)
 */

const envSchema = z.object({
	UBERDUCK_KEY: z.string(),
	UBERDUCK_SECRET: z.string(),
	OPENAI_KEY: z.string(),
	OPENAI_ORGANISATION: z.string(),
	VITE_SERVER_ADDR: z.string().url(),
	VITE_WS_ADDR: z.string().url()
});

export default envSchema.parse(process.env);
