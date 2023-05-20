import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const load = (async ({ locals: { session } }) => {
	if (session) {
		throw redirect(303, '/');
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	signin: async ({ request, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());

		const { error: err } = await supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status != 500) {
				return fail(400, {
					message: err.message,
					status: 400
				});
			}
			throw error(500, {
				message: 'Server error, please try again later.',
				code: 500
			});
		}

		throw redirect(303, '/');
	}
};
