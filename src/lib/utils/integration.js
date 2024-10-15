import { evaluate } from 'mathjs';
import { IntegrationAnswer } from './classes';
import { calculateExecutionTime } from './misc';

export function trapezoidal(expr, x0, xn, n) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });

	const h = Math.abs(x0 - xn) / n;

	let fsum = 0;
	for (let i = x0 + h; i < xn; i += h) fsum += f(i);
	fsum *= 2;

	const answer = (h / 2) * (f(x0) + f(xn) + fsum);
	// const error = Math.abs((realAnswer - answer) / realAnswer) * 100;

	return new IntegrationAnswer(answer, NaN, calculateExecutionTime(timeBegin));
}

export function simpson(expr, x0, xn, n) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });

	const h = Math.abs(x0 - xn) / n;

	let fsum = 0;
	for (let x1 = x0 + h; x1 < xn; x1 += h + h) fsum += 4 * f(x1);
	for (let x2 = x0 + h + h; x2 < xn; x2 += h + h) fsum += 2 * f(x2);

	const answer = (h / 3) * (f(x0) + f(xn) + fsum);
	// const error = Math.abs((realAnswer - answer) / realAnswer) * 100;

	return new IntegrationAnswer(answer, NaN, calculateExecutionTime(timeBegin));
}
