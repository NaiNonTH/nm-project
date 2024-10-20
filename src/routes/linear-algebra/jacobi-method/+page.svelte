<script>
	import LinearAlgebra from '../LinearAlgebra.svelte';
	import { jacobi } from '$lib/utils/linear-algebra.js';
</script>

<h1>Jacobi</h1>
<LinearAlgebra iterative func={jacobi} />
