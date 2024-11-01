<script>
	import ExtrapolationAnswer from '$lib/components/Answer/ExtrapolationAnswer.svelte';
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
		x_data.some((x, index) => index < points && typeof x !== 'number') ||
		y_data.some((y, index) => index < points && typeof y !== 'number');

	$: noX = typeof x !== 'number';

	let incrementing = false;
	let coolingDown = false;
	let progressing = false;

	$: disabled = noX || emptyDataInput || progressing;

	async function submit() {
		progressing = true;

		result = polynomialRegression(m, x, x_data, y_data);

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

<h1>Simple Regression</h1>
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input label="Missing x" type="number" name="1" placeholder="65" bind:value={x} />
		<Input label="Value of m" allowWheel type="number" name="1" placeholder="m" bind:value={m} />
	</div>
	<div class="same-line">
		<Input
			label="Points Count"
			type="number"
			name="points"
			placeholder="Points"
			bind:value={points}
			allowWheel
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
				{#if emptyDataInput}
					<li>Not all points input are filled</li>
				{/if}
				{#if noX}
					<li>x is empty or not a number.</li>
				{/if}
			</ul>
		{/if}
	</div>
</form>

<ExtrapolationAnswer {result} />
