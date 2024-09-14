<script>
	import LinearAlgebra from '../LinearAlgebra.svelte';
	import { gauss } from '$lib/utils/linear-algebra.js';
</script>

<h1>Gauss Elimination</h1>
<LinearAlgebra func={gauss} joinMatrix={true} />
