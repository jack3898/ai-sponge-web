import { createTRPCProxyClient, httpBatchLink, type CreateTRPCClientOptions } from '@trpc/client';
import type { AppRouter } from '../server/index.js';
import { createTRPCReact } from '@trpc/react-query';
import env from '@sponge/env/vite.js';

const config: CreateTRPCClientOptions<AppRouter> = {
	links: [
		httpBatchLink({
			url: env.VITE_SERVER_ADDR + '/trpc'
		})
	]
};

/**
 * Contains React hooks and tooling for tRPC.
 */
export const trpcReact = createTRPCReact<AppRouter>();

/**
 * Used for provider configuration.
 */
export const trpcReactClient = trpcReact.createClient(config);

/**
 * Vanilla tRPC client for use in standard node applications.
 */
export const trpcClient = createTRPCProxyClient<AppRouter>(config);
