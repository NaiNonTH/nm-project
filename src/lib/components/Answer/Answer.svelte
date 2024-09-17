<script>
	import Input from '../Input.svelte';

	let precision = 6;
	$: precision = precision < 0 ? 0 : Math.trunc(precision);
</script>

<div id="answer">
	<div>
		<Input
			placeholder="2"
			label="Precision"
			name="precision"
			type="number"
			bind:value={precision}
		/>
	</div>
	<div id="output">
		<h2>Output</h2>
		<p>
			<slot {precision} name="output" />
			<!-- {#if result.type === 'error'}
				{result.message}
			{:else if result.topic === 'root-of-equation'}
				{result.value.toFixed(precision)}
			{:else if result.topic === 'linear-algebra'}
				{#each result.values as value, i}
					x<sub>{i + 1}</sub> = {value}{i == result.values.length ? '' : ', '}
				{/each}
			{/if} -->
		</p>
	</div>
	<slot {precision} name="other" />
</div>