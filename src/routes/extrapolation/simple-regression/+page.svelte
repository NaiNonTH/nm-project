<script>
	import InterpolationAnswer from '$lib/components/Answer/InterpolationAnswer.svelte';
	import Input from '$lib/components/Input.svelte';
	import { toSubset } from '$lib/utils/misc.js';
	import { polynomialRegression } from '$lib/utils/extrapolation.js';

	let points = 2;
	let m = 1;
	let x;

	let x_data = [];
	let y_data = [];

	$: points = Math.max(2, Math.trunc(points));
	$: m = Math.max(1, Math.trunc(m));

	let result = null;

	$: emptyDataInput = 
		x_data.some((x) => typeof x !== 'number') ||
		y_data.some((y) => typeof y !== 'number');

	$: noX = typeof x !== 'number';

	$: disabled = noX || emptyDataInput;

	function submit() {
		result = polynomialRegression(m, x, x_data, y_data);
	}
</script>

<h1>Simple Regression</h1>
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input label="Missing x" type="number" name="1" placeholder="65" bind:value={x} />
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
		<button {disabled} type="submit">
			{#if disabled}
				<div class="warning" role="tooltip">
					{#if emptyDataInput}
						<span>Not all points input are filled{#if noX}&nbsp;and {:else}.{/if}</span>
					{/if}
					{#if noX}
						<span>x is not defined.</span>
					{/if}
				</div>
			{/if}
			Calculate
		</button>
	</div>
</form>

<InterpolationAnswer {result} />