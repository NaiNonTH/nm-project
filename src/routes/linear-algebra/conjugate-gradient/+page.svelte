<script>
	import LinearAlgebra from '../LinearAlgebra.svelte';
	import { conjugateGradient } from '$lib/utils/linear-algebra.js';
</script>

<h1>Conjugate Gradient</h1>
<LinearAlgebra iterative func={conjugateGradient} />
