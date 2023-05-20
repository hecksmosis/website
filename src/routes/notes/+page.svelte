<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { sections, title } from '$lib/stores/pageSettings';

	sections.set([
		{ name: 'BASE', href: '/notes', show: true },
		{ name: 'Home', href: '/', show: true },
		{ name: '1ºBACH', href: '/1', show: true },
		{ name: '2ºBACH', href: '/2', show: true }
	]);
	title.set('Resources');
</script>

<main>
	<div class="grid grid-cols-2 space-x-2 mt-2">
		<Card title="1ºBACH" btnText="Asignaturas 1ºBACH" btnHref="/notes/1bach"
			>Aquí encontrarás materiales útiles para primero de bachillerato del colegio St. Michael's</Card
		>
		<Card title="2ºBACH" btnText="Asignaturas 2ºBACH" btnHref="/notes/2bach"
			>Aquí encontrarás materiales útiles para segundo de bachillerato del colegio St. Michael's</Card
		>
	</div>
</main>
