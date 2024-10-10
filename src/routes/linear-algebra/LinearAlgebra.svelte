<script>
	import MatrixInput from '$lib/components/MatrixInput.svelte';
	import LinearAlgebraAnswer from '$lib/components/Answer/LinearAlgebraAnswer.svelte';

	export let func;
	export let joinMatrix = false;
	export let cramerMode = false;

	import { joinedMatrix, matrixIsInvalid } from '$lib/utils/misc.js';

	let A, B, size;
	let result = null;

	$: AisInvalid = matrixIsInvalid(A, size, size);
	$: BisInvalid = matrixIsInvalid(B, size, 1);

	function submit() {
		if (joinMatrix) result = func(joinedMatrix(A, B));
		else result = func(A, B);
	}
</script>

<form on:submit|preventDefault={submit}>
	<MatrixInput {cramerMode} bind:size bind:A bind:B />
	<div>
		<button disabled={AisInvalid || BisInvalid} type="submit">Calculate</button>
	</div>
</form>

<LinearAlgebraAnswer {result} />
