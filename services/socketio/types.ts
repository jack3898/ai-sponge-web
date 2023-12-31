import type { Socket } from 'socket.io-client';

export type Character = 'spongebob' | 'patrick' | 'squidward';

export interface ServerToClientEvents {
	activeCharacter: (character: Character) => void;
	currentSpeech: (text: string) => void;
}

export interface ClientToServerEvents {
	activeCharacter: (character: Character) => void;
	currentSpeech: (text: string) => void;
}

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
