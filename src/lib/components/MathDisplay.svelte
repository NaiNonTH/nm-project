<script>
	import { parse, evaluate } from 'mathjs';
	import katex from 'katex';

	const katexConfig = {
		throwOnError: false,
		displayMode: true,
		output: 'mathml'
	};

	export let expr;
	export let display = '%s';
	export let isInvalid;

	$: htmlExpr = function () {
		if (expr.trim() === '') {
			isInvalid = true;
			return katex.renderToString(display.replace('%x', '?'), katexConfig);
		}

		try {
			evaluate(expr, { x: 1 });

			if (expr.indexOf('x') === -1) throw new Error();

			let texExpr = parse(expr).toTex();

			isInvalid = false;
			return katex.renderToString(display.replace('%x', texExpr), katexConfig);
		} catch {
			isInvalid = true;
			return katex.renderToString(display.replace('%x', expr), katexConfig);
		}
	};
</script>

<div>
	{@html htmlExpr()}
</div>

<style>
	div {
		padding: 1rem;
		font-size: 1.77rem;
		text-align: center;
		border-bottom: 1px dashed #d8d8d8;
		overflow-x: auto;
	}
</style>
