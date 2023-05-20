import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		params
	};
}) satisfies PageServerLoad;
