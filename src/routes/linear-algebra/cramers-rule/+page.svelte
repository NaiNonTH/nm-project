<script>
	import MatrixInput from '$lib/components/MatrixInput.svelte';
	import Answer from '$lib/components/Answer.svelte';

	import { matrixIsInvalid, linearAlgebra } from '$lib/utils/misc.js';
	import { cramersRule } from '$lib/utils/linear-algebra.js';

	let A, B, size;
	let result = null;

	$: AisInvalid = matrixIsInvalid(A, size, size);
	$: BisInvalid = matrixIsInvalid(B, size, 1);
</script>

<form on:submit|preventDefault={() => (result = linearAlgebra(cramersRule, A, B))}>
	<MatrixInput bind:size bind:A bind:B />
	<div class="button-zone">
		<button disabled={AisInvalid || BisInvalid} type="submit">Calculate</button>
	</div>
</form>

<Answer {result} />
