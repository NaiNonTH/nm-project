<script>
	import Katex from '../Katex.svelte';
	import Answer from './Answer.svelte';

	export let result = null;
</script>

{#if result}
	<Answer>
		<svelte:fragment let:precision slot="output">
			<p>{result.value.toFixed(precision)} ({result.error}%)</p>
			<details>
				<summary>Solution</summary>
				{#if result.solution}
					{@const [formula, evaluation, answer] = result.solution}
					<p>
						In this case, the formula used to approximate the derivative of the function will be...
						<Katex expr={formula} />
					</p>
					<p>
						We then replace the x and h with our declared value.
						<Katex expr={evaluation} />
					</p>
					<p>
						Then, we will have our answer.
						<Katex expr={answer} />
					</p>
				{/if}
			</details>
		</svelte:fragment>
		<svelte:fragment slot="executionTime">
			{result.executionTime}
		</svelte:fragment>
	</Answer>
{/if}
