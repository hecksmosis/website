<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../../app.css';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const error = await data.supabase.auth.signOut();

		if (error) {
			console.log(error);
		}
		cancel();
	};

	$: sections = [
		{ name: 'Home', href: '/', show: true },
		{ name: 'Sign in', href: '/signin', show: data.session == null },
		{ name: 'Sign up', href: '/signup', show: data.session == null },
		{
			name: 'Dashboard (as ' + data.session?.user.email + ')',
			href: '/account',
			show: data.session != null
		},
		{
			name: 'Logout',
			href: '/logout',
			show: data.session != null,
			method: 'POST',
			fn: submitLogout
		}
	];
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div style="width: 100%; height:100%; min-height:100vh;" class="bg-slate-950">
	<Navbar {sections} />
	<div class="grid justify-center pt-16">
		<slot />
	</div>
</div>

<style lang="scss">
	@import './layout.scss';
</style>
