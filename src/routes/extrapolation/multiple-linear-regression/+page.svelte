<script>
	import ExtrapolationAnswer from '$lib/components/Answer/ExtrapolationAnswer.svelte';
	import Input from '$lib/components/Input.svelte';
	import { toSubset } from '$lib/utils/misc.js';
	import { multiLinearRegression } from '$lib/utils/extrapolation.js';

	let points = 2,
		k = 2,
		x = [];

	$: k = Math.max(2, Math.trunc(k));
	$: points = Math.max(2, Math.trunc(points));

	let xi = [[], []];
	let yi = [];

	$: if (k) {
		xi.length = k;

		for (let i = 0; i < k; ++i) xi[i] = xi[i] ? xi[i] : [];
	}

	$: data_isInvalid =
		xi.some((set, index) => index < points && set.some((n) => typeof n !== 'number')) ||
		yi.some((n, index) => index < points && typeof n !== 'number');

	$: xIsInvalid = x.some((n, index) => index < k && typeof n !== 'number');

	let incrementing = false;
	let coolingDown = false;
	let progressing = false;

	$: disabled = data_isInvalid || xIsInvalid || progressing;

	let result = null;

	async function submit() {
		progressing = true;

		result = multiLinearRegression(x, xi, yi);

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

<h1>Multiple Linear Regression</h1>
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input
			label="Datasets Count"
			allowWheel
			type="number"
			name="i"
			placeholder="i"
			bind:value={k}
		/>
		<Input
			label="Points Count"
			type="number"
			name="points"
			placeholder="Points"
			bind:value={points}
			allowWheel
		/>
	</div>
	<div class="same-line">
		{#each Array(k) as _, i}
			{@const subi = toSubset(i)}
			<Input
				label="Missing x{subi}"
				type="number"
				name="x{i}"
				placeholder="3.5"
				bind:value={x[i]}
			/>
		{/each}
	</div>
	{#each Array(points) as _, i}
		{@const subi = toSubset(i)}
		<div class="same-line">
			{#each Array(k) as _, j}
				{@const subij = subi + toSubset(j)}
				<Input
					label="x{subij}"
					type="number"
					name="x{j}{i}"
					placeholder="x{subij}"
					bind:value={xi[j][i]}
				/>
			{/each}
			<Input
				label="f(x{subi})"
				type="number"
				name="f(x{i})"
				placeholder="f(x{subi})"
				bind:value={yi[i]}
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
				{#if data_isInvalid}
					<li>Please fill in all data input</li>
				{/if}
				{#if xIsInvalid}
					<li>x is empty or not a number</li>
				{/if}
			</ul>
		{/if}
	</div>
</form>
<ExtrapolationAnswer {result} />
