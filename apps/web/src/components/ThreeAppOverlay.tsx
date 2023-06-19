import { trpcReact } from '@sponge/trpc';

export function ThreeAppOverlay() {
	const { refetch, data, isFetching } = trpcReact.openaiRouter.topic.useQuery(undefined, { enabled: false });

	return (
		<>
			<div className="absolute top-0 left-0 p-2 bg-white">
				<p>Spongebob AI development preview</p>
				<button onClick={() => refetch()} className="border rounded bg-black text-white p-2">
					Click me to generate some AI text!
				</button>
				<p>{isFetching && 'Please wait...'}</p>
				<p>Tip: hold left click and drag to orbit the camera. Hold right click to pan, scroll to zoom.</p>
			</div>
			{data && (
				<div className="absolute left-0 bottom-0 bg-white rounded p-2">
					{data?.map(({ character, text, id }) => {
						const downloadURI = `${
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							import.meta.env.VITE_SERVER_ADDR
						}/voice/${character.toLocaleLowerCase()}/${encodeURIComponent(text)}`;

						return (
							<li key={id}>
								<span>
									{character}: {text}
									<a href={downloadURI}>🔊 (download)</a>
								</span>
							</li>
						);
					})}
				</div>
			)}
		</>
	);
}
