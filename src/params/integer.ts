import type { ParamMatcher } from '@sveltejs/kit';

export let match = ((param) => {
	return /^\d+$/.test(param);
}) satisfies ParamMatcher;
