<script>
	import Katex from '../Katex.svelte';
	import Answer from './Answer.svelte';

	export let result;

	let plotlyOutput;

	$: if (plotlyOutput && result.graph) {
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
				<p>{result.message}</p>
			{:else}
				<p>{result.value.toFixed(precision)}</p>

				<details>
					<summary>Solution</summary>
					{#if result.solution}
						{@const [isTrapezoidal, formula_I, formula_h, evaluate_h, evaluate_I, answer] =
							result.solution}
						<p>
							According to the {isTrapezoidal ? 'Trapezoidal' : "Simpson's"} Rule:
							<Katex expr={formula_I} />
							<Katex expr={formula_h} />
						</p>
						<p>
							First off, we will find the h first.
							<Katex expr={evaluate_h} />
						</p>
						<p>
							So that we can find ourselves the I.
							<Katex expr={evaluate_I} />
						</p>
						<p>
							Once evaluated, we will get...
							<Katex expr={answer} />
						</p>
					{:else}
						<p>Sorry, the solution is not available for this topic.</p>
					{/if}
				</details>
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
