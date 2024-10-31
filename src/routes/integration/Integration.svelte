<script>
	import Input from '$lib/components/Input.svelte';
	import MathDisplay from '$lib/components/MathDisplay.svelte';
	import IntegrationAnswer from '$lib/components/Answer/IntegrationAnswer.svelte';

	export let func;
	export let formula;
	export let defaultRange = [2, 8];
	export let compositeHint;

	let expr = formula;
	let a;
	let b;
	let n = 1;

	$: n = Math.max(1, Math.trunc(n));
	$: display = `\\int_{${a || '?'}}^{${b || '?'}} = %x`;

	let expr_isInvalid;
	$: aIsEmpty = typeof a !== 'number';
	$: bIsEmpty = typeof b !== 'number';
	$: aIsMoreThanB = a >= b;

	let incrementing = false;
	let coolingDown = false;
	let progressing = false;

	$: disabled = expr_isInvalid || aIsEmpty || bIsEmpty || aIsMoreThanB || progressing;

	let result = null;

	async function submit() {
		progressing = true;

		result = func(expr, a, b, n);
		
		incrementing = true;
		await fetch('/api/add-runs-count', { method: 'POST' });
		incrementing = false;

		coolingDown = true;
		setTimeout(() => {
			coolingDown = false;
			progressing = false;
		}, 3000)
	}
</script>

<MathDisplay {expr} bind:display bind:isInvalid={expr_isInvalid} />
<form on:submit|preventDefault={submit}>
	<div class="same-line">
		<Input label="Math Formula" type="text" name="expr" placeholder={formula} bind:value={expr} />
		<Input label="a (Start)" type="number" name="a" placeholder={defaultRange[0]} bind:value={a} />
		<Input label="b (End)" type="number" name="b" placeholder={defaultRange[1]} bind:value={b} />
		<Input
			label="Composition"
			type="number"
			name="n"
			placeholder="1"
			bind:value={n}
			hint={compositeHint}
			allowWheel
		/>
	</div>
	<div class="button-zone">
		<button {disabled} type="submit">
			{#if coolingDown}
				Cooling down...
			{:else if incrementing}
				Saving...
			{:else}
				Calculate
			{/if}
		</button>
		{#if disabled && !progressing}
			<ul class="warning" role="tooltip">
				{#if expr_isInvalid}
					<li>Invalid Expression</li>
				{/if}
				{#if aIsEmpty}
					<li>a is empty or not a number</li>
				{/if}
				{#if bIsEmpty}
					<li>b is empty or not a number</li>
				{/if}
				{#if aIsMoreThanB}
					<li>a must less than b</li>
				{/if}
			</ul>
		{/if}
	</div>
</form>

<IntegrationAnswer {result} />
