<script>
	import Interpolation from '../Interpolation.svelte';

	import { newtonDividedDifference } from '$lib/utils/interpolation.js';
</script>

<Interpolation func={newtonDividedDifference} />
