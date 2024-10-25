<script>
	import Answer from './Answer.svelte';
	import { toSubset } from '$lib/utils/misc.js';

	export let result = null;
	export let iterative = false;
	export let conjugate = false;
</script>

{#if result !== null}
	<Answer>
		<svelte:fragment slot="output" let:precision>
			{#each result.values as value, i}
				x<sub>{i + 1}</sub> = {value.toFixed(precision)}<br />
			{/each}
		</svelte:fragment>
		<svelte:fragment slot="other" let:precision>
			{#if iterative && result.progress}
				<div class="table">
					<table>
						<thead>
							<tr>
								<th>Iteration</th>
								<th>x<sup>k</sup></th>
								{#if !conjugate}
									<th>x<sup>k+1</sup></th>
								{/if}
								<th>Error (%)</th>
							</tr>
						</thead>
						<tbody>
							{#each result.progress as row}
								{@const truncated = Math.trunc(precision)}
								<tr>
									<td>{+row.iteration.toFixed(truncated)}</td>
									{#if conjugate}
										<td>
											<ul>
												{#each row.x as x, i}
													<li>x{toSubset(i + 1)} = {+x.toFixed(truncated)}</li>
												{/each}
											</ul>
										</td>
										<td>{+row.error.toFixed(truncated)}</td>
									{:else}
										<td>
											<ul>
												{#each row.x0 as x0, i}
													<li>x{toSubset(i + 1)} = {+x0.toFixed(truncated)}</li>
												{/each}
											</ul>
										</td>
										<td>
											<ul>
												{#each row.x1 as x0, i}
													<li>x{toSubset(i + 1)} = {+x0.toFixed(truncated)}</li>
												{/each}
											</ul>
										</td>
										<td>
											<ul>
												{#each row.errors as error, i}
													<li>e{toSubset(i + 1)} = {+error.toFixed(truncated)}</li>
												{/each}
											</ul>
										</td>
									{/if}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="executionTime">
			{result.executionTime}
		</svelte:fragment>
	</Answer>
{/if}

<style>
	table ul {
		list-style: none;
		padding: 0;
	}
</style>
