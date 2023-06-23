import { trpcExpress, appRouter } from '@sponge/trpc/server/index.js';
import cors from 'cors';
import express from 'express';

const server = express();

server.use(cors({ origin: '*', credentials: true }));
server.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));

export default server;
