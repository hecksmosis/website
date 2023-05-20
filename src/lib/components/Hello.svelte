<script lang="ts">
	import setupLetters from './helpers/setupLetters';
	import {
		rustMouseOver,
		rustMouseOut,
		tsMouseOver,
		tsMouseOut,
		archMouseOver,
		archMouseOut,
		doubleBlinkElectric
	} from './helpers/mouseEvents';
	import { onMount } from 'svelte';
	let rust: HTMLDivElement, typescript: HTMLDivElement, arch: HTMLDivElement;

	onMount(() => {
		setupLetters(rust);
		setupLetters(typescript);
		setupLetters(arch);
	});
</script>

<main class="grid w-full text-white h-[95vh] text-center content-center">
	<div class="text-3xl pointer-events-auto">
		Hello <div class="wave inline-block">👋</div>
		, I'm
		<div class="inline-block" id="hecksmosis" on:mouseenter={doubleBlinkElectric}>Hecksmosis.</div>
	</div>
	<div class="text-xl mt-3 pointer-events-auto mb-0 space-y-0">
		I'm a full stack developer who likes
		<div
			bind:this={rust}
			on:mouseenter={rustMouseOver}
			on:mouseleave={rustMouseOut}
			id="rust"
			class="inline-block p-0 m-0"
		>
			Rust,
		</div>
		<div
			id="typescript"
			on:mouseenter={tsMouseOver}
			on:mouseleave={tsMouseOut}
			class="inline-block p-0 m-0 max-h-1"
		>
			<div bind:this={typescript} id="ts">TypeScript,</div>
			<div id="tsIcon" class="relative -top-8 left-5 opacity-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256"
					><path
						fill="#3178C6"
						d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
					/><path
						fill="#FFF"
						d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179c6.133 1.151 12.597 1.726 19.393 1.726c6.622 0 12.914-.633 18.874-1.899c5.96-1.266 11.187-3.352 15.678-6.257c4.492-2.906 8.048-6.704 10.669-11.394c2.62-4.689 3.93-10.486 3.93-17.391c0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898c-3.945-2.33-8.394-4.531-13.347-6.602c-3.628-1.497-6.881-2.949-9.761-4.359c-2.879-1.41-5.327-2.848-7.342-4.316c-2.016-1.467-3.571-3.021-4.665-4.661c-1.094-1.64-1.641-3.495-1.641-5.567c0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547c2.591-.604 5.471-.906 8.638-.906c2.304 0 4.737.173 7.299.518c2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719a41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582c-4.981-.777-10.697-1.165-17.147-1.165c-6.565 0-12.784.705-18.658 2.115c-5.874 1.409-11.043 3.61-15.506 6.602c-4.463 2.993-7.99 6.805-10.582 11.437c-2.591 4.632-3.887 10.17-3.887 16.615c0 8.228 2.375 15.248 7.127 21.06c4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66c2.39 1.611 4.276 3.366 5.658 5.265c1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97c-1.756 1.122-3.945 1.999-6.565 2.632c-2.62.633-5.687.95-9.2.95c-5.989 0-11.92-1.05-17.794-3.151c-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
					/></svg
				>
			</div>
		</div>
		and uses
		<div
			id="archdiv"
			on:mouseenter={archMouseOver}
			on:mouseleave={archMouseOut}
			class="inline-flex"
		>
			<div id="arch" bind:this={arch}>Arch.&nbsp;</div>
			<div id="archIcon" class="relative -top-1 -left-[3.1rem] opacity-0">
				<svg height="40" width="40" version="1.1" viewBox="0 0 512.00003 512"
					><g id="g3824" transform="translate(148.11806,138.35224)"
						><path
							d="m -733.62329,72.267944 c 0,203.804876 -165.21649,369.021366 -369.02141,369.021366 -203.8048,0 -369.0213,-165.21649 -369.0213,-369.021366 0,-203.804874 165.2165,-369.021364 369.0213,-369.021364 203.80492,0 369.02141,165.21649 369.02141,369.021364 z"
							id="path4878"
							style="fill:#1793d1;fill-opacity:1;fill-rule:nonzero;stroke:none"
							transform="matrix(0.69372682,0,0,0.69372682,872.81612,67.513546)"
						/><path
							d="M 107.84949,-98.602257 C 92.493787,-60.954304 83.231987,-36.328024 66.135387,0.20085614 76.617787,11.312106 89.484387,24.251686 110.3795,38.865776 87.915087,29.621786 72.591587,20.341076 61.140187,10.710446 39.259887,56.367046 4.9797874,121.40283 -64.585822,246.39777 c 54.6762094,-31.56545 97.060109,-51.0259 136.559909,-58.45149 -1.696,-7.29506 -2.6605,-15.1861 -2.595,-23.41953 l 0.065,-1.7516 c 0.8677,-35.02952 19.09,-61.96722 40.676113,-60.13821 21.5861,1.82902 38.3647,31.72582 37.4971,66.75537 -0.1631,6.59145 -0.9065,12.93234 -2.2057,18.81346 39.0709,7.64297 81.0017,27.0536 134.93811,58.192 C 269.7144,226.81765 260.2216,209.1676 251.1563,192.3577 236.8771,181.29028 221.983,166.88599 191.602,151.29245 c 20.8822,5.42606 35.8334,11.68629 47.4876,18.68371 C 146.9204,-1.6272139 139.4566,-24.429744 107.84949,-98.602257 z"
							id="path2518"
							style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none"
						/></g
					></svg
				>
			</div>
			<div id="btw" class="relative -left-10 opacity-0">(btw)</div>
		</div>
	</div>
</main>

<style lang="scss">
	.wave {
		animation-name: wave-animation;
		animation-duration: 2.5s;
		animation-iteration-count: infinite;
		transform-origin: 70% 70%;
		display: inline-block;
	}

	@keyframes wave-animation {
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(14deg);
		} /* The following five values can be played with to make the waving more or less extreme */
		20% {
			transform: rotate(-8deg);
		}
		30% {
			transform: rotate(14deg);
		}
		40% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(10deg);
		}
		60% {
			transform: rotate(0deg);
		} /* Reset for the last half to pause */
		100% {
			transform: rotate(0deg);
		}
	}
</style>
