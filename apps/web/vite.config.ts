import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import environmentPlugin from 'vite-plugin-environment';

export default defineConfig({
	assetsInclude: ['**/*.gltf'],
	plugins: [react(), environmentPlugin('all', { prefix: 'CLIENT_' })]
});
