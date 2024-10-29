<script>
	import Input from '$lib/components/Input.svelte';
	import MathDisplay from '$lib/components/MathDisplay.svelte';
	import RootOfEquationAnswer from '$lib/components/Answer/RootOfEquationAnswer.svelte';

	import { rootOfEquation } from '$lib/utils/misc.js';
	import { newtonRaphson } from '$lib/utils/root-of-equation.js';

	let expr = '',
		init = 2,
		error = 0.000001;

	let expr_isInvalid;
	$: initIsEmpty = init === null;
	$: errorIsEmpty = error === null;
	$: errorIsInvalid = error <= 0;

	$: disabled = expr_isInvalid || initIsEmpty || errorIsEmpty || errorIsInvalid;

	let result;
</script>

<h1>Newton Raphson</h1>

<MathDisplay display={'x_{i+1} = %x'} {expr} bind:isInvalid={expr_isInvalid} />
<form on:submit|preventDefault={() => (result = rootOfEquation(newtonRaphson, expr, init, error))}>
	<div class="same-line">
		<Input label="Math Formula" type="text" name="expr" placeholder="x * x - 7" bind:value={expr} />
		<Input label="Initial Value" type="number" name="init" bind:value={init} />
		<Input label="Error Threshold" type="number" name="error" bind:value={error} />
	</div>
	<div class="button-zone">
		<button {disabled} type="submit"> Calculate </button>
		{#if disabled}
			<ul class="warning" role="tooltip">
				{#if expr_isInvalid}
					<li>Invalid Expression.</li>
				{/if}
				{#if initIsEmpty}
					<li>Initial Value is empty or not a number.</li>
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
