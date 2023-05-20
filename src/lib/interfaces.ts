import type { SubmitFunction } from '$app/forms';

interface Section {
	name: string;
	href: string;
	show?: boolean;
	float_right?: boolean;
	active?: boolean;
	method?: string | null;
	fn?: SubmitFunction;
}

export type { Section };
