import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { protected_routes } from '$lib/server/protected_routes';

export const handle: Handle = async ({ event, resolve }) => {
	// Return the supabase client
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	// Set the session
	const getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};
	event.locals.session = await getSession();

	// Modify the above code to match any route in the array protected_routes
	if (protected_routes.some((route) => event.url.pathname.startsWith(route))) {
		if (!event.locals.session) {
			throw redirect(303, '/signin');
		}
	}

	// Return the response as usual
	const response = resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});

	return response;
};
