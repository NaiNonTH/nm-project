<script>
	import Input from '$lib/components/Input.svelte';
	import Math from '$lib/components/Math.svelte';
	import Answer from '$lib/components/Answer.svelte';

	import { rootOfEquation } from '$lib/utils/misc.js';
	import { secantMethod } from '$lib/utils/root-of-equation.js';

	let expr = '',
		init1 = 2,
		init2 = 3,
		error = 0.000001;

	let expr_isInvalid;
	$: init1_isInvalid = init1 === null;
	$: init2_isInvalid = init2 === null;
	$: error_isInvalid = error === null;

	let result;
</script>

<h1>Secant Method</h1>

<Math iterative {expr} bind:isInvalid={expr_isInvalid} />
<form on:submit|preventDefault={() => (result = rootOfEquation(secantMethod, expr, init1, error))}>
	<div class="same-line">
		<Input
			label="Math Formula"
			type="text"
			name="expr"
			placeholder="(x * x) / 7"
			bind:value={expr}
			bind:isInvalid={expr_isInvalid}
		/>
		<Input
			label="First Initial Value"
			type="number"
			name="init1"
			bind:value={init1}
			bind:isInvalid={init1_isInvalid}
		/>
		<Input
			label="Second Initial Value"
			type="number"
			name="init1"
			bind:value={init2}
			bind:isInvalid={init2_isInvalid}
		/>
		<Input
			label="Error Threshold"
			type="number"
			name="error"
			bind:value={error}
			bind:isInvalid={error_isInvalid}
		/>
	</div>
	<div class="button-zone">
		<button
			disabled={expr_isInvalid || init1_isInvalid || init2_isInvalid || error_isInvalid}
			type="submit">Calculate</button
		>
	</div>
</form>

<Answer {result} />
