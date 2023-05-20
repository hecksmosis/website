<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Section } from '$lib/interfaces';
	import { page } from '$app/stores';
	import { sections, title } from '$lib/stores/pageSettings';

	export let icon_src: string = '';

	// If the method is null set it to GET
	$sections.map((section) => {
		if (section.method === null) section.method = 'GET';
	});

	let notesObject: Section;
	// the BASE section is used to set the href of the page title
	$: {
		notesObject = $sections.filter((section) => section.name === 'BASE')[0];
		if (notesObject !== undefined) delete $sections[0];
	}
	let button_sections: Section[], sections_listed: Section[];
	$: {
		$sections.forEach((section) => {
			if (section.href == $page.url.pathname) {
				section.active = true;
			} else {
				section.active = false;
			}
		});

		button_sections = $sections.filter((section) => section.show && section.method === 'POST');
		sections_listed = $sections.filter((section) => section.show && section.method !== 'POST');
	}
	let fixNavbar: boolean = true;
</script>

<nav
	class="bg-white dark:bg-zinc-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 h-16"
	class:fixed={fixNavbar}
>
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href={notesObject?.href ?? '/'} class="flex items-center">
			{#if icon_src != ''}
				<img src={icon_src} class="h-8 mr-3" alt="Logo" />
			{/if}
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
				>{$title}</span
			>
		</a>
		<div class="flex md:order-2">
			{#each button_sections as button}
				<form action={button.href} use:enhance={button.fn} method="POST">
					<button
						type="submit"
						class="text-white bg-zinc-900 hover:bg-zinc-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-zinc-800 dark:hover:bg-zinc-950 dark:focus:ring-blue-800"
						>{button.name}</button
					>
				</form>
			{/each}
			<button
				data-collapse-toggle="navbar-sticky"
				type="button"
				class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-sticky"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
		</div>
		<div
			class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
			id="navbar-sticky"
		>
			<ul
				class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-zinc-800 md:dark:bg-zinc-900 dark:border-gray-700"
			>
				{#each sections_listed as section}
					<li>
						<a
							href={section.href}
							class={section.active
								? 'block py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:px-1 md:py-0 md:dark:text-green-500'
								: 'block py-2 pl-3 pr-4 text-green-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:px-1 md:py-0 md:dark:hover:text-green-500 md:dark:hover:bg-green-950 dark:text-white dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}
							>{section.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
