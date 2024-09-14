<script>
	import Input from '$lib/components/Input.svelte';
	import Math from '$lib/components/Math.svelte';
	import Answer from '$lib/components/Answer.svelte';

	import { rootOfEquation } from '$lib/utils/misc.js';
	import { newtonRaphson } from '$lib/utils/root-of-equation.js';

	let expr = '',
		init = 2,
		error = 0.000001;

	let expr_isInvalid;
	$: init_isInvalid = init === null;
	$: error_isInvalid = error === null;

	let result;
</script>

<h1>Newton Raphson</h1>

<Math iterative {expr} bind:isInvalid={expr_isInvalid} />
<form on:submit|preventDefault={() => (result = rootOfEquation(newtonRaphson, expr, init, error))}>
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
			label="Initial Value"
			type="number"
			name="init"
			bind:value={init}
			bind:isInvalid={init_isInvalid}
		/>
		<Input
			label="Error Threshold"
			type="number"
			name="error"
			bind:value={error}
			bind:isInvalid={error_isInvalid}
		/>
	</div>
	<div>
		<button disabled={expr_isInvalid || init_isInvalid || error_isInvalid} type="submit"
			>Calculate</button
		>
	</div>
</form>

<Answer {result} />
