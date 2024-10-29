import { evaluate } from 'mathjs';
import { IntegrationAnswer, PlotlyLineGraph } from './classes';
import { calculateExecutionTime, createFunctionGraphData } from './misc';

export function trapezoidal(expr, x0, xn, n) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });
	const h = Math.abs(x0 - xn) / n;
	const graph = [
		new PlotlyLineGraph('f(x)', {}, ...createFunctionGraphData(f, x0, xn)),
		new PlotlyLineGraph('I', { fill: 'tozeroy' }, [x0], [f(x0)])
	];

	let fsum = 0;
	for (let i = x0 + h; i < xn; i += h) {
		fsum += f(i);
		graph[1].x.push(i);
		graph[1].y.push(f(i));
	}
	fsum *= 2;

	graph[1].x.push(xn);
	graph[1].y.push(f(xn));

	const answer = (h / 2) * (f(x0) + f(xn) + fsum);

	return new IntegrationAnswer(answer, calculateExecutionTime(timeBegin), graph);
}

export function simpson(expr, x0, xn, n) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });
	let h = Math.abs(x0 - xn) / (2 * n);

	let fsum = 0;
	for (let x1 = x0 + h; x1 < xn; x1 += h + h) fsum += 4 * f(x1);
	for (let x2 = x0 + h + h; x2 < xn; x2 += h + h) fsum += 2 * f(x2);

	const answer = (h / 3) * (f(x0) + f(xn) + fsum);

	return new IntegrationAnswer(answer, calculateExecutionTime(timeBegin));
}
