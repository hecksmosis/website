<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	export let title: string = 'Kake';
	export let sections: {
		name: string;
		href: string;
		show: boolean;
		active?: boolean;
		method?: string | null;
		fn?: SubmitFunction;
	}[] = [];

	// If the method is null set it to GET
	sections.forEach((section) => {
		if (section.method === null) {
			section.method = 'GET';
		}
	});
	$: button_sections = sections.filter((section) => section.show && section.method === 'POST');
	$: sections_listed = sections.filter((section) => section.show && section.method !== 'POST');
</script>

<nav
	class="navbar navbar-expand-lg navbar-light bg-light border"
	style="border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"
>
	<div class="container-fluid">
		<a class="navbar-brand" href="/">{title}</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				{#each sections_listed as section}
					<li class="nav-item">
						<a class="nav-link" class:active={section.active} href={section.href}>{section.name}</a>
					</li>
				{/each}
			</ul>
			{#each button_sections as button}
				<form action={button.href} method="POST" class="d-flex" use:enhance={button.fn}>
					<button class="btn btn-outline-secondary" class:active={button.active} type="submit"
						>{button.name}</button
					>
				</form>
			{/each}
		</div>
	</div>
</nav>
