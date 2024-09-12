<script>
	export let label = 'unlabelled';
	export let name = 'untitled';
	export let type = 'text';
	export let placeholder = '';

	export let value = '';
	export let isInvalid;

	export let step = 'any';
</script>

<div>
	<label for={name}>{label}:</label>
	{#if type === 'text'}
		<input
			required
			{placeholder}
			bind:value
			type="text"
			{name}
			id={name}
			class:invalid={isInvalid}
		/>
	{:else if type === 'number'}
		<input
			required
			{placeholder}
			bind:value
			type="number"
			{name}
			id={name}
			class:invalid={isInvalid}
			{step}
		/>
	{/if}
</div>
