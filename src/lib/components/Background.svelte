<script lang="ts">
	import { onMount } from 'svelte';
	onMount(() => {
		const bg = document.getElementById('bg');
		const hover = document.getElementById('hover');

		bg?.addEventListener('mousemove', (e) => {
			const x = e.clientX;
			const y = e.clientY;

			hover?.style.setProperty('--mouse-x', `${x}px`);
			hover?.style.setProperty('--mouse-y', `${y}px`);
		});
	});
</script>

<div class="fixed z-0 h-full w-full" id="bg">
	<div id="hover" />
</div>

<style lang="scss">
	#bg:hover > #hover {
		opacity: 1;
	}

	#hover {
		border-radius: inherit;
		content: '';
		height: 100%;
		left: 0px;
		opacity: 0;
		position: absolute;
		top: 0px;
		transition: opacity 500ms;
		width: 100%;
	}

	#hover {
		background: radial-gradient(
			800px circle at var(--mouse-x) calc(var(--mouse-y) - 80px),
			rgba(255, 255, 255, 0.06),
			transparent 40%
		);
		z-index: 3;
	}
</style>
