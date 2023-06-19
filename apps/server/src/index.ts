import express from 'express';
import { trpcExpress, appRouter } from '@sponge/trpc/server';
import cors from 'cors';

/**
 * THIS FILE IS CURRENTLY A PROOF OF CONCEPT, IT WORKS BUT IS NOT FOLLOWING BEST PRACTICES.
 */

const server = express();

server.use(cors({ origin: '*', credentials: true }));
server.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));

const uberduckKey = Buffer.from(`${process.env.UBERDUCK_KEY}:${process.env.UBERDUCK_SECRET}`).toString('base64');

server.get('/voice/:character/:speech', async (req, res) => {
	const headers = new Headers();

	headers.append('Authorization', `Basic ${uberduckKey}`);
	headers.append('content-type', 'audio/wav');

	const response = await fetch('https://api.uberduck.ai/speak-synchronous', {
		method: 'POST',
		body: JSON.stringify({ speech: req.params.speech, voice: req.params.character }),
		headers
	});

	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	res.status(200);
	res.setHeader('content-type', 'audio/wav');
	res.send(buffer);
});

const serverAddr = new URL(process.env.VITE_SERVER_ADDR as string);

server.listen(serverAddr.port);
