import type { SubmitFunction } from '$app/forms';

interface Section {
	name: string;
	href: string;
	show: boolean;
	float_right?: boolean;
	active?: boolean;
	method?: string | null;
	fn?: SubmitFunction;
}

interface Message {
	from: string;
	message: string;
	time: string;
}

interface User {
	username: string;
	id: string;
}

interface ServerToClientEvents {
	message: (data: Message) => void;
	signin: (username: string) => void;
}

interface ClientToServerEvents {
	signin: (name: string) => void;
	message: (message: string) => void;
}

interface InterServerEvents {
	ping: () => void;
}

interface SocketData {
	username: string;
	id: string;
}

export type {
	Section,
	ServerToClientEvents,
	SocketData,
	ClientToServerEvents,
	InterServerEvents,
	Message,
	User
};
