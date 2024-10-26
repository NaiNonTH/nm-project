import { ExtrapolationAnswer, PlotlyLineGraph } from './classes';
import { gaussJordan } from './linear-algebra';
import { calculateExecutionTime, createFunctionGraphData, joinedMatrix, toSubset } from './misc';

function sum(data) {
	return data.reduce((a, b) => a + b, 0);
}

/**
 *
 * @param {*} m
 * @param {*} x
 * @param {Array} xi
 * @param {*} yi
 * @returns
 */
export function polynomialRegression(m, x, xi, yi) {
	if (xi.length != yi.length) throw new TypeError('x and y dataset are not relative.');

	const timeBegin = performance.now();

	let A = [];

	for (let i = 0; i <= m; ++i) {
		let row = [];

		for (let j = 0; j <= m; ++j) {
			row.push(sum(xi.map((x) => Math.pow(x, i + j))));
		}

		A.push(row);
	}

	let B = [];

	for (let i = 0; i <= m; ++i) {
		B.push([sum(xi.map((x, j) => yi[j] * Math.pow(x, i)))]);
	}

	const { values: a_list } = gaussJordan(joinedMatrix(A, B));

	const f = (x) => sum(a_list.map((a, i) => a * Math.pow(x, i)));
	const xi_min = xi.reduce((acc, val) => Math.min(val, acc));
	const xi_max = xi.reduce((acc, val) => Math.max(val, acc));

	const answer = f(x);

	const graph = [
		new PlotlyLineGraph('f^(x)', {}, ...createFunctionGraphData(f, xi_min, xi_max)),
		new PlotlyLineGraph('Data', { mode: 'markers' }, xi, yi),
		new PlotlyLineGraph('Answer', { stroke: 'red' }, [x], [answer])
	];

	return new ExtrapolationAnswer(answer, calculateExecutionTime(timeBegin), graph);
}
export function multiLinearRegression(x, xi, yi) {
	if (xi[0].length != yi.length) throw new TypeError('x and y dataset are not relative.');

	const timeBegin = performance.now();

	let n = xi[0].length;
	let A = [];

	for (let i = 0; i <= xi.length; ++i) {
		// row check
		let row = [];
		let first = i === 0 ? [] : [...xi[i - 1]]; // pull first data from xi

		for (let j = 0; j <= xi.length; ++j) {
			// column check
			let second = j === 0 ? [] : [...xi[j - 1]]; // pull second data from xi

			if (first.length === 0 && second.length === 0) row.push(n);
			else if (first.length !== 0 && second.length === 0) row.push(sum(first));
			else if (first.length === 0 && second.length !== 0) row.push(sum(second));
			else if (first.length !== 0 && second.length !== 0) {
				row.push(sum(second.map((x, k) => first[k] * x)));
			}
		}

		A.push(row);
	}

	let B = [];

	for (let i = 0; i <= xi.length; ++i) {
		if (i === 0) B.push([sum(yi)]);
		else B.push([sum(yi.map((y, k) => y * xi[i - 1][k]))]);
	}

	const { values: a_list } = gaussJordan(joinedMatrix(A, B));

	const xi_dataGraph = xi.map(
		(x, i) => new PlotlyLineGraph(`x${toSubset(i)}`, { mode: 'markers' }, x, yi[i])
	);

	const f = (x) => sum(a_list.map((a, i) => a * (x[i - 1] || 1)));

	let xi_min = Infinity;
	for (const x_data of xi) {
		for (const x of x_data) {
			if (x < xi_min) xi_min = x;
		}
	}

	let xi_max = -Infinity;
	for (const x_data of xi) {
		for (const x of x_data) {
			if (x > xi_max) xi_max = x;
		}
	}

	const answer = f(x);

	const graph = [
		new PlotlyLineGraph('f^(x)', {}, ...createFunctionGraphData(f, xi_min, xi_max)),
		...xi_dataGraph,
		new PlotlyLineGraph('Answer', { stroke: 'red' }, [x], [answer])
	];

	return new ExtrapolationAnswer(answer, calculateExecutionTime(timeBegin), graph);
}
