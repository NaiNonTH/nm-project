<script>
	import Input from '$lib/components/Input.svelte';
	import { toSubset } from '$lib/utils/misc.js';
	import { polynomialRegression } from '$lib/utils/extrapolation.js';

	let points = 2;
	let m = 1;
	let x = 69;

	let x_data = [];
	let y_data = [];

	$: points = Math.max(2, Math.trunc(points));
	$: m = Math.max(1, Math.trunc(m));

	let result = null;

	$: disabled =
		typeof x !== 'number' ||
		typeof m !== 'number' ||
		x_data.some((x) => typeof x !== 'number') ||
		y_data.some((y) => typeof y !== 'number');

	function submit() {
		result = polynomialRegression(m, x, x_data, y_data);
		console.log(result);
	}
</script>

<h1>Simple Regression</h1>
<p style="text-align:center;color:red;"><b>WORK-IN-PROGRESS! ANSWERS WON'T BE DISPLAYED YET</b></p>
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input label="Missing x" type="number" name="1" placeholder="x" bind:value={x} />
		<Input label="Value of m" type="number" name="1" placeholder="m" bind:value={m} />
	</div>
	<div class="same-line">
		<Input
			label="Points Count"
			type="number"
			name="points"
			placeholder="Points"
			bind:value={points}
		/>
	</div>
	{#each Array(points) as _, i}
		{@const subi = toSubset(i)}
		<div class="same-line">
			<Input
				label="x{subi}"
				type="number"
				name="x{i}"
				placeholder="x{subi}"
				bind:value={x_data[i]}
			/>
			<Input
				label="f(x{subi})"
				type="number"
				name="f(x{i})"
				placeholder="f(x{subi})"
				bind:value={y_data[i]}
			/>
		</div>
	{/each}
	<div class="button-zone">
		<button {disabled} type="submit">Calculate</button>
	</div>
</form>
