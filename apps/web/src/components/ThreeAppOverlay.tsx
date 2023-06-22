import { useState } from 'react';
import { ClientConversationHandler } from '../services';
import { useWebsocket } from '../hooks/useWebsocket';

export function ThreeAppOverlay() {
	const { caption } = useWebsocket();
	const [clientConversationHandler] = useState(new ClientConversationHandler());

	return (
		<>
			<div className="absolute top-0 left-0 p-2 bg-white rounded">
				<p>Spongebob AI development preview</p>
				<button
					onClick={() => {
						clientConversationHandler.startLoop();
					}}
					className="border rounded bg-black text-white p-2"
				>
					Start talking!
				</button>
			</div>
			<div className="absolute bottom-8 right-4 left-4">
				<p className="text-4xl max-w-4xl mx-auto text-center text-black bg-white p-2 rounded">{caption}</p>
			</div>
		</>
	);
}
