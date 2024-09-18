<script>
    import Answer from "./Answer.svelte";

    export let result = null;
</script>

{#if result !== null}
    <Answer>
        <svelte:fragment slot="output" let:precision>
            {#each result.values as value, i}
                x<sub>{i + 1}</sub> = {value.toFixed(precision)}<br>
            {/each}
        </svelte:fragment>
        <svelte:fragment slot="executionTime">
            {result.executionTime}
        </svelte:fragment>
    </Answer>
{/if}