<script>
	import Input from '$lib/components/Input.svelte';
	import difference from '$lib/utils/difference.js';
	import DifferenceAnswer from '$lib/components/Answer/DifferenceAnswer.svelte';
	import Math from '$lib/components/Math.svelte';

	let direction;
	let precision;
	let order;

	let expr = '';
	let x;
	let h;

	let expr_isInvalid;

	let result = null;

	$: display = `f^{(${order + 1})}(x) = %x`;

	function submit() {
		result = difference(direction, precision, order, expr, x, h);
	}
</script>

<h1>Numerical Difference</h1>
<Math {expr} bind:display bind:isInvalid={expr_isInvalid} />
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input
			label="Orders"
			name="order"
			type="selections"
			choices={['First', 'Second', 'Third', 'Fourth']}
			bind:value={order}
		/>
		<Input
			label="Precision"
			name="error"
			type="selections"
			choices={['Basic', 'Advanced']}
			bind:value={precision}
		/>
		<Input
			label="Directions"
			name="direction"
			type="selections"
			choices={['Forward', 'Backward', 'Centered']}
			bind:value={direction}
		/>
	</div>
	<div class="same-line">
		<Input label="Math Expression" name="expr" type="text" placeholder="e^x" bind:value={expr} />
		<Input label="x" name="x" type="number" placeholder="2" bind:value={x} />
		<Input label="h" name="expr" type="number" placeholder="0.25" bind:value={h} />
	</div>
	<div class="button-zone">
		<button type="submit">Calculate</button>
	</div>
</form>

<DifferenceAnswer {result} />
