<script>
	import Answer from './Answer.svelte';

	export let result;

	let plotlyOutput;

	$: if (plotlyOutput && result.graph) {
		console.log(result.graph);

		Plotly.newPlot(plotlyOutput, {
			data: result.graph,
			layout: {
				width: '100%',
				height: 400,
				margin: {
					t: 0,
					b: 0,
					l: 48,
					r: 0
				}
			}
		});
	}
</script>

<svelte:head>
	<script src="https://cdn.plot.ly/plotly-2.35.2.min.js" charset="utf-8"></script>
</svelte:head>

{#if result}
	<Answer>
		<svelte:fragment slot="output" let:precision>
			{#if result.type === 'error'}
				{result.message}
			{:else}
				{result.value.toFixed(precision)}
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="executionTime">
			{result.executionTime}
		</svelte:fragment>
		<svelte:fragment slot="other">
			{#if result.graph}
				<div bind:this={plotlyOutput}></div>
			{/if}
		</svelte:fragment>
	</Answer>
{/if}
