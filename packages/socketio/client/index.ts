import { type Socket, io } from 'socket.io-client';
import { type ClientToServerEvents, type ServerToClientEvents } from '../types.js';
import env from '@sponge/env/vite.js';

export const wsClient: Socket<ServerToClientEvents, ClientToServerEvents> = io(env.VITE_WS_ADDR);
