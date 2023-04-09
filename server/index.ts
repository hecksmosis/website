import http from 'http';
import express from 'express';
import injectSocketIO from '../sockets/socketServer.js';
import { handler } from '../build/handler.js';

const app = express();
const server = http.createServer(app);
require('dotenv').config({ path: '../.env' });

// Inject SocketIO
injectSocketIO(server);

// SvelteKit handlers
app.use(handler);

server.listen(3000, () => {
	console.log('Running on http://localhost:3000');
});
