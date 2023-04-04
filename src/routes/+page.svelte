<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Navbar from '$lib/components/Navbar.svelte';

	export let data: PageData;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const error = await data.supabase.auth.signOut();

		if (error) {
			console.log(error);
		}
		cancel();
	};

	let sections = [
		{ name: 'Home', href: '/', show: true, active: true },
		{ name: 'Login', href: '/login', show: !data.session },
		{ name: 'Register', href: '/register', show: !data.session },
		{ name: 'Dashboard', href: '/account', show: data.session },
		{ name: 'Logout', href: '/logout', show: data.session, method: 'POST', fn: submitLogout }
	];
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<main>
	<Navbar {sections} />

	{#if data.session}
		<p>Welcome, {data.session.user.email}!</p>
	{:else}
		Hello
	{/if}
</main>
