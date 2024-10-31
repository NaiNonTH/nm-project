<script>
	import Input from '$lib/components/Input.svelte';
	import difference from '$lib/utils/difference.js';
	import DifferenceAnswer from '$lib/components/Answer/DifferenceAnswer.svelte';
	import MathDisplay from '$lib/components/MathDisplay.svelte';

	let direction;
	let precision;
	let order;

	let expr = '';
	let x;
	let h;

	let expr_isInvalid;
	$: xIsInvalid = typeof x !== 'number';
	$: hIsInvalid = typeof h !== 'number';

	let incrementing = false;
	let coolingDown = false;
	let progressing = false;

	$: disabled = expr_isInvalid || xIsInvalid || hIsInvalid || progressing;

	let result = null;

	$: display = `f^{(${order + 1})}(x) = %x`;

	async function submit() {
		progressing = true;

		result = difference(direction, precision, order, expr, x, h);
		
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

<h1>Numerical Difference</h1>
<MathDisplay {expr} bind:display bind:isInvalid={expr_isInvalid} />
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
					<li>Invalid Expression</li>
				{/if}
				{#if xIsInvalid}
					<li>x is empty or not a number</li>
				{/if}
				{#if hIsInvalid}
					<li>h is empty or not a number</li>
				{/if}
			</ul>
		{/if}
	</div>
</form>

<DifferenceAnswer {result} />
