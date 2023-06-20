import { server } from '@sponge/socketio/server';

const serverAddr = new URL(process.env.VITE_WS_ADDR as string);

server.once('listening', () => {
	console.log(`Websocket server online on port ${serverAddr.port}`);
});

server.listen(serverAddr.port);
