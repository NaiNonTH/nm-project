<script>
	import Input from '$lib/components/Input.svelte';
	import MatrixInput from '$lib/components/MatrixInput.svelte';
	import LinearAlgebraAnswer from '$lib/components/Answer/LinearAlgebraAnswer.svelte';

	import { toSubset } from '$lib/utils/misc.js';

	export let func;
	export let joinMatrix = false;
	export let cramerMode = false;
	export let iterative = false;
	export let conjugate = false;

	import { joinedMatrix, matrixIsInvalid } from '$lib/utils/misc.js';

	let A, B, size;
	let result = null;
	let x0 = [];
	let error = 0.000001;

	$: if (size) x0.length = size;

	$: AisInvalid = matrixIsInvalid(A, size, size);
	$: BisInvalid = matrixIsInvalid(B, size, 1);

	$: xIsInvalid = iterative && x0.some((x) => typeof x !== 'number');
	$: errorIsInvalid = iterative && typeof error !== 'number';

	$: disabled = AisInvalid || BisInvalid || xIsInvalid || errorIsInvalid;

	function submit() {
		if (joinMatrix) result = func(joinedMatrix(A, B));
		else if (iterative) result = func(A, B, x0, error);
		else result = func(A, B);
	}
</script>

<form on:submit|preventDefault={submit}>
	<MatrixInput {cramerMode} bind:size bind:A bind:B />
	{#if iterative}
		<div class="same-line">
			{#each Array(size) as _, i}
				<Input
					label="x{toSubset(i)}"
					placeholder="x{toSubset(i)}"
					name="x{i}"
					type="number"
					bind:value={x0[i]}
				/>
			{/each}
		</div>
		<div class="same-line">
			<Input label="Error" placeholder="0.000001" name="error" type="number" bind:value={error} />
		</div>
	{/if}
	<div class="button-zone">
		<button {disabled} type="submit"> Calculate </button>
		{#if disabled}
			<ul class="warning" role="tooltip">
				{#if AisInvalid || BisInvalid}
					<li>Please fill in all slots in Matrix</li>
				{/if}
				{#if xIsInvalid}
					<li>Please fill in all x slots</li>
				{/if}
				{#if errorIsInvalid}
					<li>Error is empty or not a number</li>
				{/if}
			</ul>
		{/if}
	</div>
</form>

<LinearAlgebraAnswer {conjugate} {iterative} {result} />
