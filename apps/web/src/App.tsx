import { useState } from 'react';
import { ThreeApp, ThreeAppOverlay } from './components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpcReactClient, trpcReact } from '@sponge/trpc';

export default function App() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<trpcReact.Provider client={trpcReactClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<ThreeApp>
					<ThreeAppOverlay />
				</ThreeApp>
			</QueryClientProvider>
		</trpcReact.Provider>
	);
}
