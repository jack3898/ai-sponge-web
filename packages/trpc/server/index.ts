import { router } from '../trpc.js';
import * as procedures from './procedures/index.js';

export const appRouter = router({ ...procedures });

export type AppRouter = typeof appRouter;

export * as trpcExpress from '@trpc/server/adapters/express';
