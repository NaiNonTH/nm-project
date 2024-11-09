<script>
	import { simpson } from '$lib/utils/integration.js';
	import Integration from '../Integration.svelte';
</script>

<h1>Simpson's Rule</h1>
<p style="color:red;text-align:center">
	<strong>Note:</strong> For performance, composition is limited to 10 in graph generation.
</p>
<Integration
	compositeHint="Set this to 1 for non-composite Simpson's Rule"
	defaultRange={[-1, 2]}
	formula="x^7 + 2x^3 - 1"
	func={simpson}
/>
