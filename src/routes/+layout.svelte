<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { invalidate } from '$app/navigation';

	import '../app.css';
	import PageLayout from '$lib/components/PageLayout.svelte';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<PageLayout>
	<slot />
</PageLayout>

<style lang="postcss">
	:global(*::-webkit-scrollbar) {
		display: none;
	}
</style>
