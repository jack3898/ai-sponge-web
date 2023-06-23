import { create3dApp } from '@sponge/three-app';
import { useRef, useEffect, type ReactNode } from 'react';
import { useWebsocket } from '../hooks/useWebsocket.js';
import { wsClient } from '@sponge/socketio/client';

type ThreeAppProps = {
	children: ReactNode;
};

export function ThreeApp({ children }: ThreeAppProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const mountedRef = useRef<boolean>(false);
	const { activeCharacter, isConnected } = useWebsocket();

	useEffect(() => {
		if (canvasRef.current && containerRef.current && !mountedRef.current) {
			mountedRef.current = true;
			create3dApp(canvasRef.current, containerRef.current, wsClient);
		}
	}, [canvasRef.current, containerRef.current]);

	if (isConnected) {
		console.log(`React client got WS message! It says ${activeCharacter}`);
	}

	return (
		<div ref={containerRef} className="h-screen relative">
			<canvas ref={canvasRef} className="h-full" />
			{children}
		</div>
	);
}
