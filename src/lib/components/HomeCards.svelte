<script lang="ts">
	import { Card } from '.';

	export let session: any;

	let cards;
</script>

<div
	class="grid lg:grid-cols-4 md:grid-cols-2 justify-center pt-2 w-full content-center"
	bind:this={cards}
>
	<div class="lg:col-span-1 lg:block md:hidden" />
	{#if session}
		<div class="m-2 pointer-events-auto">
			<Card title="Resources" btnText="Check them out!" btnHref="/notes"
				>Here you will find useful materials for your studies, and you can also add your exams.</Card
			>
		</div>
	{/if}
	<div class="m-2 pointer-events-auto">
		<Card title="Kake" btnText="Play now!" btnHref="/games/kake"
			>A 2 player game where you try to capture all of the opponent's pieces by stacking them to
			gain range.</Card
		>
	</div>
	{#if session}
		<div class="col-span-1" />
		<div class="col-span-1" />
	{/if}
	<div class="m-2 pointer-events-auto">
		<Card title="More games" btnText="Play now!" btnHref="/games/more">Coming soon...</Card>
	</div>
</div>
