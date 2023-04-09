import { sveltekit } from '@sveltejs/kit/vite';
import { webSocketServer } from './sockets/viteWSPlugin';
import type { UserConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const config: UserConfig = {
	server: {
		port: 3027
	},
	preview: {
		port: 3027
	},
	plugins: [sveltekit(), webSocketServer]
};

export default config;
