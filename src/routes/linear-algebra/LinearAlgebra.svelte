<script>
	import MatrixInput from '$lib/components/MatrixInput.svelte';
	import Answer from '$lib/components/Answer.svelte';

    export let func;
    export let joinMatrix = false;

	import { joinedMatrix, matrixIsInvalid, linearAlgebra } from '$lib/utils/misc.js';

	let A, B, size;
	let result = null;

	$: AisInvalid = matrixIsInvalid(A, size, size);
	$: BisInvalid = matrixIsInvalid(B, size, 1);

    function submit() {
        if (joinMatrix)
            result = linearAlgebra(func, joinedMatrix(A, B));
        else
            result = linearAlgebra(func, A, B);
    }
</script>

<form on:submit|preventDefault={submit}>
	<MatrixInput bind:size bind:A bind:B />
	<div>
		<button disabled={AisInvalid || BisInvalid} type="submit">Calculate</button>
	</div>
</form>

<Answer {result} />
