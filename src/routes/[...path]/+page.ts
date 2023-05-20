import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export let load = ((_) => {
	throw error(404, {
		message: 'Not found',
		code: 404
	});
}) satisfies PageLoad;
