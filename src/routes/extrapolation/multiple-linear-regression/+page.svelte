<script>
	import InterpolationAnswer from '$lib/components/Answer/InterpolationAnswer.svelte';
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

		for (let i = 0; i < k; ++i)
			xi[i] = xi[i] ? xi[i] : [];
	}

	let result = null;

	function submit() {
		result = multiLinearRegression(x, xi, yi);
	}
</script>

<h1>Multiple Linear Regression</h1>
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input
			label="Datasets Count"
			type='number'
			name="i"
			placeholder="i"
			bind:value={k}
		/>
		<Input
			label="Points Count"
			type='number'
			name="points"
			placeholder="Points"
			bind:value={points}
		/>
	</div>
	<div class="same-line">
		{#each Array(k) as _, i}
			{@const subi = toSubset(i)}
			<Input
				label="Missing x{subi}"
				type='number'
				name='x{i}'
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
					type='number'
					name='x{j}{i}'
					placeholder='x{subij}'
					bind:value={xi[j][i]}
				/>
			{/each}
			<Input
				label="f(x{subi})"
				type='number'
				name='f(x{i})'
				placeholder='f(x{subi})'
				bind:value={yi[i]}
			/>
		</div>
	{/each}
	<div class="button-zone">
		<button type="submit">Calculate</button>
	</div>
</form>
<InterpolationAnswer {result} />