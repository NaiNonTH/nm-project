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
	$: init_isInvalid = init === null;
	$: error_isInvalid = error === null;

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
		<button disabled={expr_isInvalid || init_isInvalid || error_isInvalid} type="submit">
			Calculate
		</button>
	</div>
</form>

<RootOfEquationAnswer {result} />
