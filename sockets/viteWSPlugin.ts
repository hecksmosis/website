import injectSocketIO from './socketServer';

export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: any) {
		injectSocketIO(server.httpServer);
	}
};
