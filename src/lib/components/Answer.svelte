<script>
	import Input from './Input.svelte';

	let precision = 6;
	$: precision = precision < 0 ? 0 : Math.trunc(precision);

	export let result = null;
</script>

{#if result != null}
	<div id="output">
		<h2>Output</h2>
		<p>
			{#if result.type === 'error'}
				{result.message}
			{:else if result.topic === "root-of-equation"}
				{result.value}
			{:else if result.topic === "linear-algebra"}
				{#each result.values as value, i}
					x<sub>{i + 1}</sub> = {value}{i == result.values.length ? "" : ", "}
				{/each}
			{/if}
		</p>
	</div>
	{#if result.topic === 'root-of-equation' && result.progress}
		<div class="table">
			<Input
				placeholder="2"
				label="Precision"
				name="precision"
				type="number"
				bind:value={precision}
			/>
			<table>
				<thead>
					<tr>
						{#each Object.keys(result.progress[0]) as key}
							<th>{key}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each result.progress as row}
						<tr>
							{#each Object.values(row) as data}
								<td>{+data.toFixed(Math.trunc(precision))}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/if}

<style>
	.table {
		overflow: auto;
	}
	table {
		min-width: fit-content;
		width: 100%;
		text-align: left;
	}
	table th,
	table td {
		padding: 0.2rem;
	}
</style>
