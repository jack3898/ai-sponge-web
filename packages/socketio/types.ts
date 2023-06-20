import type { Socket } from 'socket.io-client';

export type Character = 'spongebob' | 'patrick' | 'squidward';

export interface ServerToClientEvents {
	activeCharacter: (character: Character) => void;
}

export interface ClientToServerEvents {
	setActiveCharacter: () => Character;
}

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
