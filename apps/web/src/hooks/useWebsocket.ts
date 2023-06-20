import { useEffect, useState } from 'react';
import { wsClient } from '@sponge/socketio/client';
import type { Character } from '@sponge/socketio/types';

type UseWebsocket = {
	isConnected: boolean;
	testEvents: Character[];
};

export function useWebsocket(): UseWebsocket {
	const [isConnected, setIsConnected] = useState(wsClient.connected);
	const [testEvents, setTestEvents] = useState<Character[]>([]);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onCharacterEvent(value: Character) {
			setTestEvents((previous) => [...previous, value]);
		}

		wsClient.on('connect', onConnect);
		wsClient.on('disconnect', onDisconnect);
		wsClient.on('activeCharacter', onCharacterEvent);

		return () => {
			wsClient.off('connect', onConnect);
			wsClient.off('disconnect', onDisconnect);
			wsClient.off('activeCharacter', onCharacterEvent);
		};
	}, []);

	return { isConnected, testEvents };
}
