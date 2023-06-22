import { trpcReact } from '@sponge/trpc';
import { useEffect } from 'react';

export function ThreeAppOverlay() {
	const {
		mutate: fetchDialogue,
		data: dialogueData,
		isLoading: dialogueLoading
	} = trpcReact.openaiRouter.topic.useMutation();

	const { mutate: fetchVoice, data: voiceData } = trpcReact.uberduckRouter.voice.useMutation();

	useEffect(() => {
		if (voiceData) {
			new Audio('data:audio/x-wav;base64,' + voiceData).play();
		}
	}, [voiceData]);

	return (
		<>
			<div className="absolute top-0 left-0 p-2 bg-white rounded">
				<p>Spongebob AI development preview</p>
				<button onClick={() => fetchDialogue()} className="border rounded bg-black text-white p-2">
					Click me to generate some AI text!
				</button>
				<p>{dialogueLoading && 'Please wait...'}</p>
				<p>Tip: hold left click and drag to orbit the camera. Hold right click to pan, scroll to zoom.</p>
			</div>
			{dialogueData?.length && (
				<div className="absolute left-0 bottom-0 bg-white rounded p-2">
					{dialogueData?.map(({ name, dialogue }) => {
						return (
							<li key={crypto.randomUUID()}>
								<span>
									{name}: {dialogue}
									<button
										type="button"
										onClick={() => {
											fetchVoice({
												character: name,
												speech: dialogue
											});
										}}
									>
										🔊 (listen)
									</button>
								</span>
							</li>
						);
					})}
				</div>
			)}
		</>
	);
}
