<script>
	import { generateMatrix, toSubset } from '$lib/utils/misc.js';

	export let size = 3;
	export let cramerMode = false;

	let sizeLimit = cramerMode ? 3 : 9;

	$: size = size > sizeLimit ? sizeLimit : size < 2 ? 2 : size;

	const changeSizeThroughWheel = (event) => (size = size - Math.sign(event.deltaY));

	export let A, B;

	$: if (size) {
		A = generateMatrix(size);
		B = generateMatrix(size);
	}
</script>

<div class="size-config same-line">
	<label for="matrixSize">Matrix Size</label>
	<input
		on:wheel|preventDefault={changeSizeThroughWheel}
		name="matrixSize"
		id="matrixSize"
		type="range"
		min="2"
		max={sizeLimit}
		step="1"
		bind:value={size}
	/>
	<input
		on:wheel|preventDefault={changeSizeThroughWheel}
		name="matrixSize"
		id="matrixSize"
		type="number"
		min="2"
		max={sizeLimit}
		step="1"
		bind:value={size}
	/>
</div>
<div class="matrix-input same-line">
	<div style:grid-template-columns="repeat({size}, 3.5rem)" class="a-input">
		{#each Array(size) as _, i}
			{#each Array(size) as _, j}
				<input
					bind:value={A[i][j]}
					placeholder="a{toSubset(i + 1)}{toSubset(j + 1)}"
					name="a{i + 1}{j + 1}"
					type="number"
				/>
			{/each}
		{/each}
	</div>
	<div>
		{#each Array(size) as _, i}
			<input disabled placeholder="x{toSubset(i + 1)}" type="text" />
		{/each}
	</div>
	<div class="equals">=</div>
	<div>
		<div class="b-input" style:grid-template-rows="repeat({size}, 3.5rem)">
			{#each Array(size) as _, i}
				<input
					bind:value={B[i][0]}
					placeholder="b{toSubset(i + 1)}"
					name="b{i + 1}"
					type="number"
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.size-config {
		align-items: center;
	}

	.matrix-input {
		gap: 8px;
	}
	.matrix-input > *:not(.equals) {
		display: grid;
		width: min-content;
	}
	.matrix-input > * input {
		width: 3.5rem;
		text-align: center;
		aspect-ratio: 1 / 1;
	}
	.equals {
		display: flex;
		align-items: center;

		font-size: 1.5em;
	}

	input[type='range'] {
		appearance: none;

		height: 2px;
		background: gray;
	}
	input[type='range']::-webkit-slider-thumb {
		appearance: none;

		width: 0.5rem;
		height: 1rem;
		background: #4949af;
		border-radius: 0.5rem;
	}
	input[type='range']:hover::-webkit-slider-thumb {
		background: #7979e7;
	}
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		display: none;
	}
	input[type='text']::placeholder {
		opacity: 0.5;
	}
</style>
