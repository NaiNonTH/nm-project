<script>
	import Answer from './Answer.svelte';

	export let result;
</script>

{#if result}
	<Answer>
		<svelte:fragment slot="output" let:precision>
			{#if result.type === 'error'}
				{result.message}
			{:else}
				{result.value.toFixed(precision)}
			{/if}
		</svelte:fragment>
		<!-- <svelte:fragment slot="executionTime">
            {result.executionTime}
        </svelte:fragment> -->
	</Answer>
{/if}
