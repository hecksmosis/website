import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, session }, url }) => {
	if (!session) {
		// Should ideally never trigger as this is handled by the hook
		throw redirect(303, '/signin');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`username, full_name, website, avatar_url`)
		.eq('id', session.user.id)
		.single();

	return { session, profile, error: url.searchParams.get('error') };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, locals: { supabase, session } }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const username = formData.get('username') as string;
		const website = formData.get('website') as string;
		const avatarUrl = formData.get('avatarUrl') as string;

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			full_name: fullName,
			username,
			website,
			avatar_url: avatarUrl,
			updated_at: new Date()
		});

		if (error) {
			return fail(500, {
				fullName,
				username,
				website,
				avatarUrl
			});
		}

		return {
			fullName,
			username,
			website,
			avatarUrl
		};
	},
	signout: async ({ locals: { supabase, session } }) => {
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
} satisfies Actions;
