<script>
	export let label = null;
	export let name = 'untitled';
	export let type = 'text';
	export let placeholder = '';

	export let value = '';

	export let step = 'any';
</script>

<div>
	{#if label}
		<label for={name}>{label}:</label>
	{/if}
	{#if type === 'text'}
		<input
			required
			{placeholder}
			bind:value
			type="text"
			{name}
			id={name}
			on:focus={(event) => event.currentTarget.select()}
		/>
	{:else if type === 'number'}
		<input
			required
			{placeholder}
			bind:value
			type="number"
			{name}
			id={name}
			on:wheel|preventDefault={(event) => (value -= Math.sign(event.deltaY))}
			on:focus={(event) => event.currentTarget.select()}
			{step}
		/>
	{/if}
</div>
