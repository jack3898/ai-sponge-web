import { trpcExpress, appRouter } from '@sponge/trpc/server';
import cors from 'cors';
import express from 'express';

const server = express();

server.use(cors({ origin: '*', credentials: true }));
server.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));

const serverAddr = new URL(process.env.VITE_SERVER_ADDR as string);

server.listen(serverAddr.port, () => {
	console.log(`Express server online on port ${serverAddr.port}`);
});
