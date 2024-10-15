<script>
	import { simpson } from '$lib/utils/integration.js';
	import Integration from '../Integration.svelte';
</script>

<h1>Simpson's Rule</h1>
<Integration minComposite={2} defaultRange={[-1, 2]} formula="x^7 + 2x^3 - 1" func={simpson} />
