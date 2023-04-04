<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';

	export let data: PageData;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const error = await data.supabase.auth.signOut();

		if (error) {
			console.log(error);
		}
		cancel();
	};

	$: sections = [
		{ name: 'Home', href: '/', show: true, active: true },
		{ name: 'Login', href: '/login', show: data.session == null },
		{ name: 'Register', href: '/register', show: data.session == null },
		{ name: 'Dashboard', href: '/account', show: data.session != null },
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

<main>
	<Navbar {sections} />

	{#if data.session}
		<div class="row">
			<div class="col">
				<div class="card col-6-lg mt-4">
					<div class="card-header">St. Michael's School</div>
					<div class="card-body">
						<h5 class="card-title">Resources</h5>
						<p class="card-text">
							Here you will find useful materials for your studies, and you can also add your exams.
						</p>
						<a href="/apuntes" class="btn btn-primary">Check them out!</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="row">
		<div class="col">
			<div class="card col-6-lg mt-4">
				<div class="card-header">Featured</div>
				<div class="card-body">
					<h5 class="card-title">Kake</h5>
					<p class="card-text">
						A 2 player game where you try to capture all of the opponent's pieces by stacking them
						to gain range.
					</p>
					<a href="/games/kake" class="btn btn-primary">Play now!</a>
				</div>
			</div>
		</div>
		<div class="col">
			<div class="card col-6-lg mt-4">
				<div class="card-header">Coming soon...</div>
				<div class="card-body">
					<h5 class="card-title">More games</h5>
					<p class="card-text">Coming soon...</p>
					<a href="/games/more" class="btn btn-primary">Play now!</a>
				</div>
			</div>
		</div>
	</div>
</main>
