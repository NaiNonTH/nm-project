<script>
	import LinearAlgebra from '../LinearAlgebra.svelte';
	import { lu } from '$lib/utils/linear-algebra.js';
</script>

<LinearAlgebra func={lu} />
