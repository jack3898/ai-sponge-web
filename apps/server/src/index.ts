import express from 'express';
import { trpcExpress, appRouter } from '@sponge/trpc/server';
import cors from 'cors';

/**
 * THIS FILE IS CURRENTLY A PROOF OF CONCEPT, IT WORKS BUT IS NOT FOLLOWING BEST PRACTICES.
 */

const server = express();

server.use(cors({ origin: '*', credentials: true }));
server.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));

const serverAddr = new URL(process.env.VITE_SERVER_ADDR as string);

server.listen(serverAddr.port);
