<script>
	import Input from '$lib/components/Input.svelte';
	import Answer from '$lib/components/Answer.svelte';
	import Math from '$lib/components/Math.svelte';

	import { rootOfEquation } from '$lib/utils/misc.js';
	import { graphicalMethod } from '$lib/utils/root-of-equation.js';

	let expr = '',
		start = 0,
		end = 10,
		error = 0.000001;

	let expr_isInvalid;
	$: start_isInvalid = start === null;
	$: end_isInvalid = end === null;
	$: error_isInvalid = error === null;

	let result;
</script>

<h1>Graphical Method</h1>
<aside style="color:red;text-align:center;">
	<strong>Note:</strong> You may experience a lag for a short amount of time.
</aside>

<Math {expr} bind:isInvalid={expr_isInvalid} />
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
			bind:isInvalid={expr_isInvalid}
		/>
		<Input
			label="Start"
			type="number"
			name="start"
			bind:value={start}
			bind:isInvalid={start_isInvalid}
		/>
		<Input label="End" type="number" name="end" bind:value={end} bind:isInvalid={end_isInvalid} />
		<Input
			label="Error Threshold"
			type="number"
			name="error"
			bind:value={error}
			bind:isInvalid={error_isInvalid}
		/>
	</div>
	<div>
		<button
			disabled={expr_isInvalid || start_isInvalid || end_isInvalid || error_isInvalid}
			type="submit">Calculate</button
		>
	</div>
</form>

<Answer {result} />
