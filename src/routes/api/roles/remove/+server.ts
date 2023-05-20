import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { parse } from '$lib/server/post_parser';

export const POST: RequestHandler = async ({ request, locals: { supabase, session, isAdmin } }) => {
	if (!isAdmin || !session) {
		// Only logged in users with admin privileges
		throw redirect(303, '/signin');
	}

	const params = await parse(request);
	if (!params) throw redirect(303, '/admin');

	if (!params.user) throw redirect(303, '/');

	const { error: error1 } = await supabase
		.from('profiles')
		.update({ role: params.role })
		.eq('username', params.username);

	if (error1) throw redirect(303, '/');

	throw redirect(303, '/admin');
};
