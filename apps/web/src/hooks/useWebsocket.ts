import { useEffect, useState } from 'react';
import { wsClient } from '@sponge/socketio/client';
import type { Character } from '@sponge/socketio/types';

type UseWebsocket = {
	isConnected: boolean;
	activeCharacter: Character;
	caption: string;
};

export function useWebsocket(): UseWebsocket {
	const [isConnected, setIsConnected] = useState(wsClient.connected);
	const [activeCharacter, setActiveCharacter] = useState<Character>('spongebob');
	const [caption, setCaption] = useState('caption box');

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onCharacterEvent(value: Character) {
			setActiveCharacter(value);
		}

		function onSpeechEvent(value: string) {
			setCaption(value);
		}

		wsClient.on('connect', onConnect);
		wsClient.on('disconnect', onDisconnect);
		wsClient.on('activeCharacter', onCharacterEvent);
		wsClient.on('currentSpeech', onSpeechEvent);

		return () => {
			wsClient.off('connect', onConnect);
			wsClient.off('disconnect', onDisconnect);
			wsClient.off('activeCharacter', onCharacterEvent);
			wsClient.off('currentSpeech', onSpeechEvent);
		};
	}, []);

	return { isConnected, activeCharacter, caption };
}
