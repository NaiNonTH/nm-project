<script>
	import Interpolation from '../Interpolation.svelte';

	import { lagrange } from '$lib/utils/interpolation.js';
</script>

<h1>Lagrange Interpolation</h1>
<Interpolation func={lagrange} />
