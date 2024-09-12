<script>
	export let result = null;
</script>

{#if result != null}
	<div id="output">
		<h2>Output</h2>
		<p>
			{#if result.type === 'error'}
				{result.message}
			{:else}
				{result.answer}
			{/if}
		</p>
	</div>
{/if}
