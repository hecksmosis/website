<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Avatar from './Avatar.svelte';

	export let data: PageData;
	export let form: ActionData;

	let { session, profile } = data;

	let profileForm: any;
	let fullName: string | null = profile?.full_name;
	let username: string | null = profile?.username;
	let website: string | null = profile?.website;
	let avatarUrl: string = profile?.avatar_url ?? '';
</script>

<div class="form-widget">
	<form class="form-widget" method="post" action="?/update" bind:this={profileForm}>
		<Avatar
			supabaseClient={data.supabase}
			bind:url={avatarUrl}
			size={10}
			on:upload={() => {
				profileForm.requestSubmit();
			}}
		/>
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session?.user.email} disabled />
		</div>

		<div>
			<label for="fullName">Full Name</label>
			<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div>
			<label for="username">Username</label>
			<input id="username" name="username" type="text" value={form?.username ?? username} />
		</div>

		<div>
			<label for="website">Website</label>
			<input id="website" name="website" type="website" value={form?.website ?? website} />
		</div>

		<div>
			<input type="submit" class="button primary block" value="Update" />
		</div>
	</form>

	<a href="/" class="button block"> Back </a>

	<form method="POST" action="?/signout">
		<div>
			<button class="button block">Sign Out</button>
		</div>
	</form>
</div>
