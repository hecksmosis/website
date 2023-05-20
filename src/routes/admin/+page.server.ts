import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, session, isAdmin } }) => {
	if (!isAdmin || !session) {
		// Only logged in users with admin privileges
		throw redirect(303, '/signin');
	}

	// Get users and rooms from supabase
	const { data: users, error: error1 } = await supabase
		.from('profiles')
		.select('id, username, full_name, website, avatar_url, role, email');

	const { data: rooms, error: error2 } = await supabase
		.from('rooms')
		.select('room_name, room_role');

	const { data: roles, error: error3 } = await supabase.from('roles').select('name');

	if (error1 || error2 || error3) {
		throw redirect(303, '/');
	}
	return { session, users, rooms, roles };
}) satisfies PageServerLoad;
