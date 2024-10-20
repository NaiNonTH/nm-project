<script>
	import LinearAlgebra from '../LinearAlgebra.svelte';
	import { gaussSeidel } from '$lib/utils/linear-algebra.js';
</script>

<h1>Gauss-Seidel</h1>
<LinearAlgebra iterative func={gaussSeidel} />
