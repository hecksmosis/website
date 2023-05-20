<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Avatar from '$lib/components/Avatar.svelte';

	export let data: PageData;
	export let form: ActionData;

	let { session, profile } = data;

	let profileForm: any;
	let fullName: string | null = profile?.full_name;
	let username: string | null = profile?.username;
	let website: string | null = profile?.website;
	let avatarUrl: string = profile?.avatar_url ?? '';
</script>

<div
	class="w-[25em] mt-4 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700"
>
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<h1
			class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
		>
			Modify your profile
		</h1>
		<form class="space-y-4 md:space-y-6" method="post" action="?/update" bind:this={profileForm}>
			<div>
				{#if data.error == 'AccountDetails'}
					<div class="text-red-500 text-sm font-medium">
						Please fill in the required fields to continue to the chat room
					</div>
				{/if}
			</div>
			<div>
				<label for="avater" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Profile picture</label
				>
				<Avatar
					supabaseClient={data.supabase}
					bind:url={avatarUrl}
					size={10}
					on:upload={() => {
						profileForm.requestSubmit();
					}}
				/>
			</div>
			<div>
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Email address</label
				>
				<input
					type="text"
					name="email"
					id="disabled-input"
					aria-label="disabled input"
					class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
					value={session?.user.email}
					disabled
				/>
			</div>
			<div>
				<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Username (required)</label
				>
				<input
					type="text"
					name="username"
					id="username"
					value={form?.username ?? username}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div>
				<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Full Name</label
				>
				<input
					type="text"
					id="fullName"
					name="fullName"
					value={form?.fullName ?? fullName}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div>
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Website</label
				>
				<input
					type="text"
					id="website"
					name="website"
					value={form?.website ?? website}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			{#if data.isAdmin}
				<div class="flex flex-row space-x-2">
					<a
						href="/admin"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Admin dashboard</a
					>
				</div>
			{/if}
			<div class="flex flex-row space-x-2">
				<button
					type="submit"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Update profile</button
				>
				<a
					href="/"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Back</a
				>
				<form method="POST" action="?/signout">
					<button
						class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-red-900"
						>Sign out</button
					>
				</form>
			</div>
		</form>
	</div>
</div>
