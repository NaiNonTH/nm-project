<script>
	import katex from 'katex';

	export let expr;

	const katexConfig = {
		throwOnError: false,
		output: 'mathml',
		maxExpand: Infinity
	};
</script>

<div>
	{@html katex.renderToString(expr, katexConfig)}
</div>

<style>
	div {
		font-size: 1.17em;
		line-height: 2.5em;
		overflow-x: auto;
	}
</style>
