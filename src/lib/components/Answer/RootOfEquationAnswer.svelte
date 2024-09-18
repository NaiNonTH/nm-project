<script>
    import Answer from "./Answer.svelte";

    export let result = null;
</script>

{#if result !== null}
    <Answer>
        <svelte:fragment slot="output" let:precision>
            {#if result.type === "error"}
                {result.message}
            {:else}
                {result.value.toFixed(precision)}
            {/if}
        </svelte:fragment>
        <svelte:fragment slot="other" let:precision>
            <div class="table">
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
        </svelte:fragment>
        <svelte:fragment slot="executionTime">
            {result.executionTime}
        </svelte:fragment>
    </Answer>
    
{/if}

<style>
	.table {
		overflow: auto;
	}
</style>
