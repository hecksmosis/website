import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const ssr = true;

export const load = (async ({ locals: { supabase, session } }) => {
	if (!session) {
		// Should ideally never trigger as this is handled by the hook
		throw redirect(303, '/signin');
	}

	// Get the username from the 'profiles' table with the session.user.id
	const { data: user, error } = await supabase
		.from('profiles')
		.select('username')
		.eq('id', session.user.id)
		.single();

	if (error) throw redirect(303, '/');
	if (!user.username) throw redirect(303, '/account?error=AccountDetails');

	// Get the rooms from the 'rooms' table
	const { data: rooms, error: error2 } = await supabase
		.from('rooms')
		.select('room_name, room_role');

	return { session, username: user.username, rooms };
}) satisfies PageServerLoad;
