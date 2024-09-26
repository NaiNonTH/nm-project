<script>
	import LinearAlgebra from '../LinearAlgebra.svelte';
	import { matrixInversion } from '$lib/utils/linear-algebra.js';
</script>

<h1>Matrix Inversion</h1>
<LinearAlgebra func={matrixInversion} />
