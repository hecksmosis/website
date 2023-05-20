<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="text-center mt-5">
	<img
		class="rounded"
		src="https://http.cat/{$page.error?.code}"
		alt="Error: {$page.error?.code} {$page.error?.message}"
	/>
</div>
