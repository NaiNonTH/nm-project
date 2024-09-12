<script>
	import { parse } from 'mathjs';
	import katex from 'katex';

	const katexConfig = {
		throwOnError: false,
		displayMode: true,
		output: 'mathml'
	};

	export let expr;
	export let iterative = false;
	export let isInvalid;

	$: htmlExpr = function () {
		const equals = iterative ? 'x_{i+1}' : 'f(x)';

		if (expr.trim() === '') {
			isInvalid = true;
			return katex.renderToString(`${equals} = ?`, katexConfig);
		}

		try {
			let texExpr = parse(expr).toTex();
			texExpr = iterative ? texExpr.replace(/x/g, 'x_{i}') : texExpr;

			isInvalid = false;
			return katex.renderToString(`${equals} = ${texExpr}`, katexConfig);
		} catch {
			const replacedExpr = iterative ? expr.replace(/x/g, 'x_{i}') : expr;

			isInvalid = true;
			return katex.renderToString(`${equals} = ${replacedExpr}`, katexConfig);
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
	}
</style>
