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

	$: disabled = expr_isInvalid || aIsEmpty || bIsEmpty || aIsMoreThanB;

	let result = null;

	function submit() {
		result = func(expr, a, b, n);
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
		<button {disabled} type="submit">Calculate</button>
		{#if disabled}
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
