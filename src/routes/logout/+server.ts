import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
	const { error: err } = await supabase.auth.signOut();

	if (err) {
		throw error(500, 'Something went wrong while logging you out');
	}

	throw redirect(303, '/');
};