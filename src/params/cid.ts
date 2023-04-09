import type { ParamMatcher } from '@sveltejs/kit';

let courseids = ['mat', 'phy', 'che', 'bio'];

export let match = ((param) => {
	return courseids.includes(param.toLowerCase());
}) satisfies ParamMatcher;
