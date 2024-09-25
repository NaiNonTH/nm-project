<script>
	import Input from '../Input.svelte';

	let precision = 6;
	$: precision = precision < 0 ? 0 : Math.trunc(precision);
</script>

<div id="answer">
	<div>
		<Input
			placeholder="2"
			label="Precision"
			name="precision"
			type="number"
			bind:value={precision}
		/>
	</div>
	<div id="output">
		<h2>Output</h2>
		<p>
			<slot {precision} name="output" />
		</p>
	</div>
	<slot {precision} name="other" />
	<i>Time taken: <slot name="executionTime" />ms</i>
</div>
