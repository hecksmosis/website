<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<p>Hello from {data.params.crs}-{data.params.courseid}-{data.params.id}</p>
