<script>
	import Math from '$lib/components/Math.svelte';
	import Input from '$lib/components/Input.svelte';
	import Answer from '$lib/components/Answer.svelte';

	import { bisection } from '$lib/utils/root-of-equation.js';
	import { rootOfEquation } from '$lib/utils/misc.js';

	let expr = '',
		start = 1.5,
		end = 2,
		error = 0.000001;

	let expr_isInvalid;
	$: start_isInvalid = start === null;
	$: end_isInvalid = end === null;
	$: error_isInvalid = error === null;

	let result;
</script>

<h1>Bisection</h1>

<Math {expr} bind:isInvalid={expr_isInvalid} />
<form
	on:submit|preventDefault={() => (result = rootOfEquation(bisection, expr, start, end, error))}
>
	<Input
		label="Math Formula"
		type="text"
		name="expr"
		placeholder="(x ^ 4) - 13"
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
	<div class="button-zone">
		<button
			disabled={expr_isInvalid || start_isInvalid || end_isInvalid || error_isInvalid}
			type="submit">Calculate</button
		>
	</div>
</form>

<Answer {result} />
