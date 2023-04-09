import { Server, Socket } from 'socket.io';
import type http from 'http';
import { createClient } from '@supabase/supabase-js';
import type {
	ServerToClientEvents,
	SocketData,
	ClientToServerEvents,
	InterServerEvents,
	User
} from '../src/lib/interfaces';

const users = new Map<string, User>();

function sendMessage(io: Server, socket: Socket, message: string) {
	io.emit('message', {
		from: socket.data.username ?? 'Unknown',
		message: message,
		time: new Date().toLocaleString()
	});
}

export default function injectSocketIO(server: http.Server) {
	const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
		server
	);

	io.use(async function (socket, next) {
		console.log('Query: ', socket.handshake.query);

		let username = socket.handshake.query.username as string;
		let id = socket.handshake.query.id as string;

		const supabase = createClient(
			process.env.PUBLIC_SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL,
			process.env.PUBLIC_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY
		);

		const { data: user, error } = await supabase
			.from('profiles')
			.select('username')
			.eq('id', id)
			.single();

		if (!error && user && username == user.username) {
			socket.data.username = username;
			socket.data.id = id;
			users.set(id, { username, id }); // Add user to the map or update it if it already exists
			return next();
		}
		return next(new Error('Authentication error'));
	});

	io.on('connection', async (socket) => {
		socket.on('message', (message) => sendMessage(io, socket, message));

		socket.on('disconnect', () => {
			if (socket.data.id) users.delete(socket.data.id);
			console.log('Disconnected: ', socket.data.username);
		});
	});

	console.log('SocketIO injected');
}
