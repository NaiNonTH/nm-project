<script>
    import Answer from "./Answer.svelte";

    export let result = null;
</script>

{#if result !== null}
    <Answer>
        <svelte:fragment slot="output" let:precision>
            {result.value.toFixed(precision)}
        </svelte:fragment>
        <svelte:fragment slot="executionTime">
            {result.executionTime}
        </svelte:fragment>
    </Answer>
{/if}