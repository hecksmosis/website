import type { SubmitFunction } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { session, supabase } }) => {
	return { url: url.origin };
};
