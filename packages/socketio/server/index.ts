import { Server } from 'socket.io';
import { createServer } from 'http';
import type { ClientToServerEvents, ServerToClientEvents } from '../types.js';

export const server = createServer();

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
	cors: { origin: '*' }
});

// Relays

io.on('connection', (socket) => {
	socket.on('activeCharacter', (value) => {
		io.emit('activeCharacter', value);
	});

	socket.on('currentSpeech', (value) => {
		io.emit('currentSpeech', value);
	});
});
