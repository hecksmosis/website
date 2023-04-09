<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.error?.code}</h1>

<p>Error: {$page.error?.message}</p>
