import { evaluate, fix } from 'mathjs';
import { IntegrationAnswer, PlotlyLineGraph } from './classes';
import { calculateExecutionTime, createFunctionGraphData } from './misc';

export function trapezoidal(expr, x0, xn, n) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });
	let h = Math.abs(x0 - xn) / n;
	const graph = [
		new PlotlyLineGraph('f(x)', {}, ...createFunctionGraphData(f, x0, xn)),
		new PlotlyLineGraph('I', { fill: 'tozeroy' }, [x0], [f(x0)])
	];

	let fsum = 0;

	for (let i = x0 + h; i < xn; i += h) {
		let fi = f(i);

		fsum += fi;

		graph[1].x.push(i);
		graph[1].y.push(fi);
	}
	fsum *= 2;

	graph[1].x.push(xn);
	graph[1].y.push(f(xn));

	const answer = (h / 2) * (f(x0) + f(xn) + fsum);

	h = fix(h, 4);

	const solution = [
		true,
		'I = \\frac{h}{2}[f({x_0})+f({x_n})+2\\Sigma_{i=1}^{n}f(x_i)]',
		'h = \\frac{|{x_0}-{x_n}|}{n}',
		`h = \\frac{|${x0}-${xn}|}{${n}} =  ${h}`,
		`I = \\frac{${h}}{2}(${fix(f(x0), 4)} + ${fix(f(xn), 4)} + ${fix(fsum, 4)})`,
		`I = ${fix(answer, 4)}`
	];

	return new IntegrationAnswer(answer, calculateExecutionTime(timeBegin), graph, solution);
}

function LString(xs, i, n) {
	let over = '';
	let under = '';
	
	for (let j = 0; j <= n; ++j) {
		if (i !== j) {
			over += `(${xs[j]}-x)`;
			under += `(${xs[j]}-${xs[i]})`;
		}
	}

	return `${over} / ${under}`
}

function lagrangeString(xs, ys, start, n) {
	let str = '';

	for (let i = start; i <= start + n; ++i) {
		str += `(${LString(xs, i, n)})*${ys[i]}`;

		if (i != start + n)
			str += "+";
	}

	return str;
}

export function simpson(expr, a, b, n) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });
	let h = Math.abs(a - b) / (2 * n);
	const graph = [
		new PlotlyLineGraph('f(x)', {}, ...createFunctionGraphData(f, a, b, true, false))
	];

	const xs = [];
	const ys = [];

	for (let temp_x = a; temp_x <= b; temp_x += h) {
		xs.push(temp_x);
		ys.push(f(temp_x));
	}

	const n_capped = Math.min(n, 10);

	for (let i = 0; i < 2 * n_capped; i += 2) {
		const lagF = x => evaluate(lagrangeString(xs, ys, 0, i + 2), { x });

		graph.push(
			new PlotlyLineGraph(
				`@ ${xs[i].toFixed(2)}`,
				{ fill: 'tozeroy' },
				...createFunctionGraphData(
					lagF,
					xs[i],
					xs[i + 2],
					false,
					false
				)
			)
		);
	}

	let fsum = 0;
	for (let i = 0; i < ys.length; ++i) {
		let y = ys[i];

		if (i != 0 && i != ys.length - 1) {
			if (i % 2 == 1) {
				fsum += 4 * y;
			}
			else {
				fsum += 2 * y;
			}
		}
	}

	const I = (h / 3) * (ys[0] + fsum + ys[ys.length - 1]);

	h = fix(h, 4);

	const solution = [
		false,
		'I = \\frac{h}{3}[f({x_0})+f({x_n})+4\\Sigma_{i=1,3,5...}^{n-1}f(x_i)+2\\Sigma_{i=2,4,6...}^{n-2}f(x_i)]',
		'h = \\frac{|{x_0}-{x_n}|}{2n}',
		`h = \\frac{|${a}-${b}|}{2\\times${n}} = ${h}`,
		`I = \\frac{${h}}{3}(${fix(f(a), 4)} + ${fix(f(b), 4)} + ${fix(fsum, 4)})`,
		`I = ${fix(I, 4)}`
	];

	return new IntegrationAnswer(I, calculateExecutionTime(timeBegin), graph, solution);
}