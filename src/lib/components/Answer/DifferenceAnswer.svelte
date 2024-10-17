<script>
	import Answer from './Answer.svelte';

	export let result = null;
</script>

{#if result}
	<Answer>
		<svelte:fragment let:precision slot="output">
			{result.value.toFixed(precision)} (Error = {result.error}%)
		</svelte:fragment>
		<svelte:fragment slot="executionTime">
			{result.executionTime}
		</svelte:fragment>
	</Answer>
{/if}
