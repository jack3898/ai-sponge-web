import { type Socket, io } from 'socket.io-client';
import { type ClientToServerEvents, type ServerToClientEvents } from '../types';

export const wsClient: Socket<ServerToClientEvents, ClientToServerEvents> = io(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	new URL(import.meta.env.VITE_WS_ADDR).toString()
);
