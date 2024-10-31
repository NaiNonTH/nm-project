<script>
	import Input from '$lib/components/Input.svelte';
	import MathDisplay from '$lib/components/MathDisplay.svelte';
	import RootOfEquationAnswer from '$lib/components/Answer/RootOfEquationAnswer.svelte';

	import { exprHandler } from '$lib/utils/misc.js';
	import { secantMethod } from '$lib/utils/root-of-equation.js';

	let expr = '',
		init1 = 2,
		init2 = 3,
		error = 0.000001;

	let expr_isInvalid;
	$: init1IsEmpty = init1 === null;
	$: init2IsEmpty = init2 === null;
	$: errorIsEmpty = error === null;
	$: errorIsInvalid = error <= 0;

	let incrementing = false;
	let coolingDown = false;
	let progressing = false;

	$: disabled =
		expr_isInvalid || init1IsEmpty || init2IsEmpty || errorIsEmpty || errorIsInvalid || progressing;

	let result;

	async function submit() {
		progressing = true;

		result = exprHandler(secantMethod, expr, init1, init2, error);

		incrementing = true;
		await fetch('/api/add-runs-count', { method: 'POST' });
		incrementing = false;

		coolingDown = true;
		setTimeout(() => {
			coolingDown = false;
			progressing = false;
		}, 3000);
	}
</script>

<h1>Secant Method</h1>

<MathDisplay display={'x_{i+1} = %x'} {expr} bind:isInvalid={expr_isInvalid} />
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input label="Math Formula" type="text" name="expr" placeholder="x * x - 7" bind:value={expr} />
		<Input label="First Initial Value" type="number" name="init1" bind:value={init1} />
		<Input label="Second Initial Value" type="number" name="init1" bind:value={init2} />
		<Input label="Error Threshold" type="number" name="error" bind:value={error} />
	</div>
	<div class="button-zone">
		<button {disabled} type="submit">
			{#if coolingDown}
				Cooling down...
			{:else if incrementing}
				Saving...
			{:else}
				Calculate
			{/if}
		</button>
		{#if disabled && !progressing}
			<ul class="warning" role="tooltip">
				{#if expr_isInvalid}
					<li>Invalid Expression.</li>
				{/if}
				{#if init1IsEmpty}
					<li>First Initial Value is empty or not a number.</li>
				{/if}
				{#if init2IsEmpty}
					<li>Second Initial Value is empty or not a number.</li>
				{/if}
				{#if errorIsEmpty}
					<li>Error Threshold is empty or not a number.</li>
				{/if}
				{#if errorIsInvalid}
					<li>Error Threshold must be more than 0.</li>
				{/if}
			</ul>
		{/if}
	</div>
</form>

<RootOfEquationAnswer {result} />
