import env from '@sponge/env/node.js';
import expressServer from './express.js';
import socketServer from './socket.js';

const serverAddr = new URL(env.VITE_SERVER_ADDR as string);

const websocketAddr = new URL(process.env.VITE_WS_ADDR as string);

socketServer.listen(websocketAddr.port);

expressServer.listen(serverAddr.port, () => {
	console.log(`Express server online on port ${serverAddr.port}`);
});

socketServer.once('listening', () => {
	console.log(`Websocket server online on port ${serverAddr.port}`);
});
