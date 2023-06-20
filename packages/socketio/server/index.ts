import { Server } from 'socket.io';
import { createServer } from 'http';
import type { ClientToServerEvents, ServerToClientEvents } from '../types';

export const server = createServer();

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
	cors: { origin: '*' }
});
