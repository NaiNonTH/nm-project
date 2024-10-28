<script>
	export let label = null;
	export let name = 'untitled';

	export let type = 'text';
	export let placeholder = '';

	export let step = 'any';
	export let choices = ['None'];
	export let value = type === 'selections' ? 0 : '';
	export let allowWheel = false;

	export let hint = '';

	function valueChangeByWheel(event) {
		if (!allowWheel) return;

		event.preventDefault();
		value -= Math.sign(event.deltaY);
	}
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
			on:wheel={valueChangeByWheel}
			on:focus={(event) => event.currentTarget.select()}
			{step}
		/>
	{:else if type === 'selections'}
		<select required bind:value {name} id={name}>
			{#each choices as title, value}
				<option {value}>{title}</option>
			{/each}
		</select>
	{/if}
	{#if hint}
		<abbr title={hint}>
			<svg width="24" height="24" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"
				><circle
					cx="4"
					cy="4"
					fill="none"
					stroke="currentColor"
					stroke-width=".8"
					style="stroke-width:.75;stroke-dasharray:none"
					r="3.125"
				/><rect
					x="3.625"
					y="3.563"
					width=".75"
					height="2.25"
					ry="0"
					fill="currentColor"
					style="stroke-width:.999998"
				/><circle cx="4" cy="2.688" fill="currentColor" r=".438" style="stroke-width:1" /></svg
			>
		</abbr>
	{/if}
</div>

<style>
	abbr {
		cursor: help;
		color: #8283c9;
	}
	abbr svg {
		vertical-align: middle;
	}
</style>
