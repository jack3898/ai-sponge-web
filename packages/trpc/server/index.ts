import { router } from '../trpc';
import * as procedures from './procedures';

export const appRouter = router({ ...procedures });

export type AppRouter = typeof appRouter;

export * as trpcExpress from '@trpc/server/adapters/express';
