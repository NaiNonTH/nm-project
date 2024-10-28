<script>
	import LinearAlgebra from '../LinearAlgebra.svelte';
	import { lu } from '$lib/utils/linear-algebra.js';
</script>

<h1>LU Decomposition</h1>
<LinearAlgebra func={lu} />
