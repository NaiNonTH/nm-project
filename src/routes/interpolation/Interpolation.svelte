<script>
	import Input from '$lib/components/Input.svelte';
	import InterpolationAnswer from '$lib/components/Answer/InterpolationAnswer.svelte';

	import { toSubset } from '$lib/utils/misc.js';

	export let func;
	export let filterData = true;

	$: count = count < 2 ? 2 : count;

	let x;

	let x_data = [];
	let y_data = [];
	let filter = new Set();

	$: x_filtered = filterData ? x_data.filter((_, i) => i < count && filter.has(i)) : x_data;
	$: y_filtered = filterData ? y_data.filter((_, i) => i < count && filter.has(i)) : y_data;

	$: disabled =
		x_data.some((num, i) => i < count && typeof num !== 'number') ||
		y_data.some((num, i) => i < count && typeof num !== 'number') ||
		(filterData && filter.size < 2);

	function toggleFilter(checked, i) {
		if (!checked) filter.delete(i);
		else filter.add(i);

		filter = filter;
	}

	let result;

	function submit() {
		result = func(x, x_filtered, y_filtered);
	}
</script>

<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input label="Data Count" name="count" type="number" placeholder="3" bind:value={count} />
		<Input label="Missing x" name="x" type="number" placeholder="40331" bind:value={x} />
	</div>
	<div>
		{#each Array(count) as _, i}
			<div class="same-line">
				{#if filterData}
					<input
						on:change={(event) => toggleFilter(event.target.checked, i)}
						type="checkbox"
						name="pick-x{i + 1}"
						id="pick-x{i + 1}"
					/>
				{/if}
				<Input
					label="x of Data No.{i + 1}"
					placeholder="x{toSubset(i)}"
					name="x{i}"
					type="number"
					bind:value={x_data[i]}
				/>
				<Input
					label="f(x) of Data No.{i + 1}"
					placeholder="f(x{toSubset(i)})"
					name="f(x{i})"
					type="number"
					bind:value={y_data[i]}
				/>
			</div>
		{/each}
	</div>
	<div class="button-zone">
		<button {disabled} type="submit">Calculate</button>
	</div>
</form>

<InterpolationAnswer {result} />
