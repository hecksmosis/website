import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		const body = Object.fromEntries(await request.formData());

		const { error: err } = await supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status == 400) {
				return fail(400, {
					message: 'Invalid credentials',
					status: 400
				});
			}
			throw error(500, {
				message: 'Server error, please try again later.'
			});
		}

		throw redirect(303, '/');
	}
};
