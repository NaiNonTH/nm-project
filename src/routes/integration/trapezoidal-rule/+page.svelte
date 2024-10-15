<script>
	import { trapezoidal } from '$lib/utils/integration.js';
	import Integration from '../Integration.svelte';
</script>

<h1>Trapezoidal Rule</h1>
<Integration formula="4x^5 - 3x^4 + x^3 - 6x+2" func={trapezoidal} />
