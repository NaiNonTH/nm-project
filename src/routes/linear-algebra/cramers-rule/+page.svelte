<script>
	import LinearAlgebra from '../LinearAlgebra.svelte';
	import { cramersRule } from '$lib/utils/linear-algebra.js';
</script>

<h1>Cramer's Rule</h1>
<LinearAlgebra cramerMode={true} func={cramersRule} />
