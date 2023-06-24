import { z } from 'zod';

/**
 * Use this module in environments that support esm import syntax (vite for example)
 */

const envSchema = z.object({
	VITE_SERVER_ADDR: z.string().url(),
	VITE_WS_ADDR: z.string().url()
});

export default envSchema.parse(import.meta.env);
