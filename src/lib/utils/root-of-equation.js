import { PlotlyLineGraph, RootOfEquationAnswer } from './classes.js';
import { derivative, evaluate } from 'mathjs';
import { calculateExecutionTime, createFunctionGraphData } from './misc.js';

export function graphicalMethod(expr, start, end, error = 0.000001) {
	const timeBegin = performance.now();

	let f = (x) => evaluate(expr, { x });

	let x;
	let error_previous = Infinity;
	let iteration = 0;
	let rangeToRoute;

	let progress = [];
	let graph = [
		new PlotlyLineGraph('f(x)', {}, ...createFunctionGraphData(f, start, end)),
		new PlotlyLineGraph('Iteration', { mode: 'markers' })
	];

	function pushToGraph(x, y, error) {
		progress.push({
			Iteration: iteration,
			x,
			y,
			'Error (%)': error
		});
		graph[1].x.push(x);
		graph[1].y.push(y);
	}

	for (x = start; x <= end; ++x) {
		const y = f(x);
		const y_error = Math.abs(y);

		pushToGraph(x, y, y_error);

		if (error_previous < y_error) {
			rangeToRoute = x;
			break;
		} else error_previous = y_error;
		++iteration;
	}

	error_previous = Infinity;

	for (x = rangeToRoute - 1; x < rangeToRoute; x += error) {
		const y = f(x);
		const y_error = Math.abs(y);

		if (iteration % 10000 === 0) pushToGraph(x, y, y_error);

		if (error_previous < y_error) {
			pushToGraph(x, y, y_error);

			return new RootOfEquationAnswer(
				x,
				iteration,
				progress,
				calculateExecutionTime(timeBegin),
				graph
			);
		}

		error_previous = y_error;
		++iteration;
	}
}

export function bisection(expr, xl, xr, error = 0.000001) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });

	let xm,
		xm_error,
		fxm,
		cmp,
		iteration = 0;

	let progress = [];
	let graph = [
		new PlotlyLineGraph('f(x)', {}, ...createFunctionGraphData(f, xl, xr)),
		new PlotlyLineGraph('Iteration', { mode: 'markers' })
	];

	do {
		xm = (xl + xr) / 2;
		fxm = f(xm);
		cmp = f(xr) * fxm;

		if (cmp < 0) xl = xm;
		else if (cmp > 0) xr = xm;

		xm_error = Math.abs(fxm);

		progress.push({
			Iteration: iteration,
			x: xm,
			y: fxm,
			'Error (%)': xm_error * 100
		});
		graph[1].x.push(xm);
		graph[1].y.push(fxm);

		++iteration;
	} while (iteration < 100 && (cmp == 0 || xm_error >= error));

	return new RootOfEquationAnswer(
		xm,
		iteration,
		progress,
		calculateExecutionTime(timeBegin),
		graph
	);
}

export function falsePosition(expr, xl, xr, error = 0.000001) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });

	let x1,
		x1_error,
		fx1,
		cmp,
		iteration = 0;

	let progress = [];
	let graph = [
		new PlotlyLineGraph('f(x)', {}, ...createFunctionGraphData(f, xl, xr)),
		new PlotlyLineGraph('Iteration', { mode: 'markers' })
	];

	do {
		let fxl = f(xl);
		let fxr = f(xr);

		x1 = xr - (fxr * (xl - xr)) / (fxl - fxr);
		fx1 = f(x1);
		cmp = f(xr) * fx1;

		if (cmp < 0) xl = x1;
		else if (cmp > 0) xr = x1;

		x1_error = Math.abs(fx1);

		progress.push({
			Iteration: iteration,
			x: x1,
			y: fx1,
			'Error (%)': x1_error * 100
		});
		graph[1].x.push(x1);
		graph[1].y.push(fx1);

		++iteration;
	} while (iteration < 100 && (cmp == 0 || x1_error >= error));

	return new RootOfEquationAnswer(
		x1,
		iteration,
		progress,
		calculateExecutionTime(timeBegin),
		graph
	);
}

export function onePoint(expr, init, error = 0.000001) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });

	let x0,
		x1,
		x1_min = Infinity,
		x1_max = -Infinity,
		x_error,
		iteration = 0;

	let progress = [];
	let graph = [new PlotlyLineGraph('Iteration')];

	do {
		x0 = x1 ? x1 : init;
		x1 = f(x0);
		x_error = Math.abs(x1 - x0);

		x1_min = Math.min(x1, x1_min);
		x1_max = Math.max(x1, x1_max);

		progress.push({
			Iteration: iteration,
			x0,
			x1,
			'Error (%)': x_error * 100
		});
		graph[0].x.push(x0, x0);
		graph[0].y.push(x0, x1);

		++iteration;
	} while (iteration < 100 && x_error > error);

	const x_min = Math.min(x1_min, init);
	const x_max = Math.max(x1_max, init);

	graph[1] = new PlotlyLineGraph('f(x)', {}, ...createFunctionGraphData(f, x_min, x_max));
	graph[2] = new PlotlyLineGraph('x', {}, [x_min, x_max], [x_min, x_max]);

	return new RootOfEquationAnswer(
		x1,
		iteration,
		progress,
		calculateExecutionTime(timeBegin),
		graph
	);
}

export function newtonRaphson(expr, init, error = 0.000001) {
	const timeBegin = performance.now();

	const fn = (x) => evaluate(expr, { x });
	const fn1 = (x) => evaluate(derivative(expr, 'x').toString(), { x });

	let x0,
		x1,
		x1_max = -Infinity,
		x_error,
		iteration = 0;

	let progress = [];
	let graph = [];

	do {
		x0 = x1 ? x1 : init;
		x1 = x0 - fn(x0) / fn1(x0);
		x_error = Math.abs(x1 - x0);

		if (x1 > x1_max) x1_max = x1;

		progress.push({
			Iteration: iteration,
			x: x0,
			y: fn(x0),
			'Error (%)': x_error * 100
		});
		graph.push(new PlotlyLineGraph(`f(x) @ ${iteration}`, {}, [x0, x1], [fn(x0), 0]));

		++iteration;
	} while (iteration < 100 && x_error > error);

	graph.push(new PlotlyLineGraph('f(x)', {}, ...createFunctionGraphData(fn, init, x1_max)));

	return new RootOfEquationAnswer(
		x1,
		iteration,
		progress,
		calculateExecutionTime(timeBegin),
		graph
	);
}

export function secantMethod(expr, init1, init2, error = 0.000001) {
	const timeBegin = performance.now();

	const fn = (x) => evaluate(expr, { x });

	let x0,
		x1,
		x2,
		x2_max = -Infinity,
		x_error,
		iteration = 0;

	let progress = [];
	let graph = [new PlotlyLineGraph('Iteration')];

	do {
		x0 = x1 ? x1 : init1;
		x1 = x2 ? x2 : init2;
		x2 = x1 - fn(x1) * ((x1 - x0) / (fn(x1) - fn(x0)));
		x_error = Math.abs(x2 - x1);

		if (x2 > x2_max) x2_max = x2;

		progress.push({
			Iteration: iteration,
			x: x1,
			y: fn(x1),
			'Error (%)': x_error * 100
		});
		graph.push(new PlotlyLineGraph(`f(x) @ ${iteration}`, {}, [x1, x2], [fn(x1), 0]));

		++iteration;
	} while (iteration < 100 && x_error > error);

	graph[0] = new PlotlyLineGraph(
		'f(x)',
		{},
		...createFunctionGraphData(fn, Math.min(init1, init2), x2_max)
	);

	return new RootOfEquationAnswer(
		x2,
		iteration,
		progress,
		calculateExecutionTime(timeBegin),
		graph
	);
}
