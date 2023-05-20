<script lang="ts">
	import type { PageData } from './$types';
	import { Hello, Background, HomeCards } from '$lib/components';
	import { sections, title } from '$lib/stores/pageSettings';
	import type { SubmitFunction } from '@sveltejs/kit';
	export let data: PageData;

	$: ({ supabase, session } = data);

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const error = await supabase.auth.signOut();

		if (error) {
			console.log(error);
		}
		cancel();
	};

	$: sections.set([
		{ name: 'Home', href: '/', show: true },
		{ name: 'Sign in', href: '/signin', show: session == null },
		{ name: 'Sign up', href: '/signup', show: session == null },
		{
			name: 'Dashboard (as ' + session?.user.email + ')',
			href: '/account',
			show: session != null
		},
		{
			name: 'Logout',
			href: '/logout',
			show: session != null,
			method: 'POST',
			fn: submitLogout
		}
	]);
	title.set('Hecksmosis');
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<Background />
<main class="z-1 content">
	<Hello />
	<HomeCards session={data.session} />
</main>

<style>
	.content {
		pointer-events: none;
		min-width: 100%;
		max-width: 100%;
		margin-left: auto;
		margin-right: auto;
		justify-content: center;
		position: absolute;
		left: 0;
		right: 0;
	}
</style>
