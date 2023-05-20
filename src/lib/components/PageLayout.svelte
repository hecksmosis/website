<script lang="ts">
	import Navbar from './Navbar.svelte';
	import { title } from '$lib/stores/pageSettings';
	console.log($title);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<div style="width: 100%; min-height:100vh; " class="fixed bg-zinc-950 overflow-x-hidden">
	<Navbar />
	<div class="grid justify-center pt-16">
		<slot />
	</div>
</div>
