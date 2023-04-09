<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<main class="grid grid-cols-2 justify-center pt-2">
	{#if data.session}
		<div class="m-2">
			<Card title="Resources" btnText="Check them out!" btnHref="/notes"
				>Here you will find useful materials for your studies, and you can also add your exams.</Card
			>
		</div>
	{/if}
	<div class="m-2">
		<Card title="Kake" btnText="Play now!" btnHref="/games/kake"
			>A 2 player game where you try to capture all of the opponent's pieces by stacking them to
			gain range.</Card
		>
	</div>
	<div class="m-2">
		<Card title="More games" btnText="Play now!" btnHref="/games/more">Coming soon...</Card>
	</div>
</main>
