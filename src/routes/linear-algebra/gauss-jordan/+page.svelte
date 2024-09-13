<script>
	import LinearAlgebra from "../LinearAlgebra.svelte";
	import { gaussJordan } from '$lib/utils/linear-algebra.js';
</script>

<h1>Gauss-Jordan</h1>
<LinearAlgebra func={gaussJordan} joinMatrix={true} />