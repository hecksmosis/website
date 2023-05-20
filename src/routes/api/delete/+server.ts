import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase, session, isAdmin } }) => {
	if (!isAdmin || !session) {
		// Only logged in users with admin privileges
		throw redirect(303, '/signin');
	}

	let reqText = await request.text();
	console.log(reqText);

	let username = reqText
		.split('&')
		.filter((v) => v.startsWith('user'))[0]
		.split('=')[1];

	console.log(username);

	if (!username) throw redirect(303, '/');

	// Get the user's id
	const { data: user, error: error0 } = await supabase
		.from('profiles')
		.select('id')
		.eq('username', username)
		.single();

	if (error0) throw redirect(303, '/');
	if (!user) throw redirect(303, '/');

	const { error: error1 } = await supabase.auth.admin.deleteUser(user.id);

	if (error1) throw redirect(303, '/');

	throw redirect(303, '/admin');
};
