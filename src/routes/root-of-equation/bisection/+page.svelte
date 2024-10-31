<script>
	import MathDisplay from '$lib/components/MathDisplay.svelte';
	import Input from '$lib/components/Input.svelte';
	import RootOfEquationAnswer from '$lib/components/Answer/RootOfEquationAnswer.svelte';

	import { bisection } from '$lib/utils/root-of-equation.js';
	import { exprHandler } from '$lib/utils/misc.js';

	let expr = '',
		start = 1.5,
		end = 2,
		error = 0.000001;

	let expr_isInvalid;
	$: startMoreThanEnd = start >= end;
	$: startIsEmpty = start === null;
	$: endIsEmpty = end === null;
	$: errorIsEmpty = error === null;
	$: errorIsInvalid = error <= 0;

	let incrementing = false;
	let coolingDown = false;
	let progressing = false;

	$: disabled =
		expr_isInvalid ||
		startMoreThanEnd ||
		startIsEmpty ||
		endIsEmpty ||
		errorIsEmpty ||
		errorIsInvalid ||
		progressing;

	let result;

	async function submit() {
		progressing = true;

		result = exprHandler(bisection, expr, start, end, error);

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

<h1>Bisection</h1>

<MathDisplay display="f(x) = %x" {expr} bind:isInvalid={expr_isInvalid} />
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input
			label="Math Formula"
			type="text"
			name="expr"
			placeholder="(x ^ 4) - 13"
			bind:value={expr}
		/>
		<Input label="Start" type="number" name="start" bind:value={start} />
		<Input label="End" type="number" name="end" bind:value={end} />
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
				{#if startMoreThanEnd}
					<li>Start must be less than End.</li>
				{/if}
				{#if startIsEmpty}
					<li>Start is empty or not a number.</li>
				{/if}
				{#if endIsEmpty}
					<li>End is empty or not a number.</li>
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
