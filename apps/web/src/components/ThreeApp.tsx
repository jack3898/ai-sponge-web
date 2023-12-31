import { create3dApp } from '@sponge/three';
import { useRef, useEffect, type ReactNode } from 'react';
import { wsClient } from '@sponge/socketio/client';

type ThreeAppProps = {
	children: ReactNode;
};

export function ThreeApp({ children }: ThreeAppProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const mountedRef = useRef<boolean>(false);

	useEffect(() => {
		if (canvasRef.current && containerRef.current && !mountedRef.current) {
			mountedRef.current = true;
			create3dApp(canvasRef.current, containerRef.current, wsClient);
		}
	}, [canvasRef.current, containerRef.current]);

	return (
		<div ref={containerRef} className="h-screen relative">
			<canvas ref={canvasRef} className="h-full" />
			{children}
		</div>
	);
}
