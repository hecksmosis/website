<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	export let size = 10;
	export let url: string;
	export let supabaseClient: SupabaseClient;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabaseClient.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			const {
				data: { session }
			} = await supabaseClient.auth.getSession();

			const { data } = await supabaseClient
				.from('profiles')
				.select(`avatar_url`)
				.eq('id', session?.user.id)
				.single();

			if (data?.avatar_url) {
				await supabaseClient.storage.from('avatars').remove(data?.avatar_url);
			}

			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const fname =
				Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
			url = `${fname}.${fileExt}`;

			let { error } = await supabaseClient.storage.from('avatars').upload(url, file);

			if (error) {
				throw error;
			}

			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div class="flex flex-row">
	{#if avatarUrl}
		<img
			src={avatarUrl}
			alt={avatarUrl ? 'Avatar' : 'No image'}
			class="m-2 rounded-md"
			style="height: {size}em; width: {size}em;"
		/>
	{:else}
		<div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}
	<input type="hidden" name="avatarUrl" value={url} />

	<div class="w-[{size}em] mt-4 flex-col">
		<label
			class="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			for="single"
		>
			{uploading ? 'Uploading ...' : 'Upload image'}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>
