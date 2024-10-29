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

export function simpson(expr, x0, xn, n) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });
	let h = Math.abs(x0 - xn) / (2 * n);

	let fsum = 0;
	for (let x1 = x0 + h; x1 < xn; x1 += h + h) fsum += 4 * f(x1);
	for (let x2 = x0 + h + h; x2 < xn; x2 += h + h) fsum += 2 * f(x2);

	const answer = (h / 3) * (f(x0) + f(xn) + fsum);

	h = fix(h, 4);

	const solution = [
		false,
		'I = \\frac{h}{3}[f({x_0})+f({x_n})+4\\Sigma_{i=1,3,5...}^{n-1}f(x_i)+2\\Sigma_{i=2,4,6...}^{n-2}f(x_i)]',
		'h = \\frac{|{x_0}-{x_n}|}{2n}',
		`h = \\frac{|${x0}-${xn}|}{2\\times${n}} = ${h}`,
		`I = \\frac{${h}}{3}(${fix(f(x0), 4)} + ${fix(f(xn), 4)} + ${fix(fsum, 4)})`,
		`I = ${fix(answer, 4)}`
	];

	return new IntegrationAnswer(answer, calculateExecutionTime(timeBegin), null, solution);
}
