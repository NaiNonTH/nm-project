<script>
	import Interpolation from '../Interpolation.svelte';

	import { newtonDividedDifference } from '$lib/utils/interpolation.js';
</script>

<h1>Newton Divided-Difference</h1>
<Interpolation func={newtonDividedDifference} />
