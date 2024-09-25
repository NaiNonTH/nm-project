<script>
	import Interpolation from '../Interpolation.svelte';

	import { lagrange } from '$lib/utils/interpolation.js';
</script>

<Interpolation func={lagrange} />
