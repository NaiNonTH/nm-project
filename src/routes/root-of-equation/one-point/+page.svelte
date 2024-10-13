<script>
	import Input from '$lib/components/Input.svelte';
	import Math from '$lib/components/Math.svelte';
	import RootOfEquationAnswer from '$lib/components/Answer/RootOfEquationAnswer.svelte';

	import { rootOfEquation } from '$lib/utils/misc.js';
	import { onePoint } from '$lib/utils/root-of-equation.js';

	let expr = '',
		init = 1,
		error = 0.000001;

	let expr_isInvalid;
	$: initIsEmpty = init === null;
	$: errorIsEmpty = error === null;
	$: errorIsInvalid = error <= 0;

	$: disabled = expr_isInvalid || initIsEmpty || errorIsEmpty || errorIsInvalid;

	let result;
</script>

<h1>One-point Iteration</h1>

<Math iterative {expr} bind:isInvalid={expr_isInvalid} />
<form on:submit|preventDefault={() => (result = rootOfEquation(onePoint, expr, init, error))}>
	<div class="same-line">
		<Input
			label="Math Formula"
			type="text"
			name="expr"
			placeholder="((7 / x) + x) / 2"
			bind:value={expr}
		/>
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
