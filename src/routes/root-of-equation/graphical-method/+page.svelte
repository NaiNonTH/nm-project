<script>
	import Input from '$lib/components/Input.svelte';
	import RootOfEquationAnswer from '$lib/components/Answer/RootOfEquationAnswer.svelte';
	import MathDisplay from '$lib/components/MathDisplay.svelte';

	import { rootOfEquation } from '$lib/utils/misc.js';
	import { graphicalMethod } from '$lib/utils/root-of-equation.js';

	let expr = '',
		start = 0,
		end = 10,
		error = 0.000001;

	let expr_isInvalid;
	$: startMoreThanEnd = start >= end;
	$: startIsEmpty = start === null;
	$: endIsEmpty = end === null;
	$: errorIsEmpty = error === null;
	$: errorIsInvalid = error <= 0;

	$: disabled =
		expr_isInvalid ||
		startMoreThanEnd ||
		startIsEmpty ||
		endIsEmpty ||
		errorIsEmpty ||
		errorIsInvalid;

	let result;
</script>

<h1>Graphical Method</h1>
<aside style="color:red;text-align:center;">
	<strong>Note:</strong> Don't put in too wide of a range. I've warned you.
</aside>

<MathDisplay display="f(x) = %x" {expr} bind:isInvalid={expr_isInvalid} />
<form
	on:submit|preventDefault={() =>
		(result = rootOfEquation(graphicalMethod, expr, start, end, error))}
>
	<div class="same-line">
		<Input
			label="Math Formula"
			type="text"
			name="expr"
			placeholder="(43 * x) - 180"
			bind:value={expr}
		/>
		<Input label="Start" type="number" name="start" bind:value={start} />
		<Input label="End" type="number" name="end" bind:value={end} />
		<Input label="Error Threshold" type="number" name="error" bind:value={error} />
	</div>
	<div class="button-zone">
		<button {disabled} type="submit"> Calculate </button>
		{#if disabled}
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
