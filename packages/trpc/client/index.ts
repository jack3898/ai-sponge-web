import { createTRPCProxyClient, httpBatchLink, type CreateTRPCClientOptions } from '@trpc/client';
import type { AppRouter } from '../server';
import { createTRPCReact } from '@trpc/react-query';

const config: CreateTRPCClientOptions<AppRouter> = {
	links: [
		httpBatchLink({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			url: new URL(import.meta.env.VITE_SERVER_ADDR + '/trpc').toString()
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
export const client = createTRPCProxyClient<AppRouter>(config);
