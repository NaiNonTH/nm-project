import { RootOfEquationAnswer } from './classes.js';
import { derivative, evaluate } from 'mathjs';

export function graphicalMethod(expr, start, end, error = 0.000001) {
	const timeBegin = performance.now();

	let f = (x) => evaluate(expr, { x });

	let i;
	let previousError = Infinity;
	let iteration = 0;
	let rangeToRoute;

	let progress = [];

	for (i = start; i <= end; ++i) {
		const value = f(i);
		const valueError = Math.abs(value);

		progress.push({
			Iteration: iteration,
			x: i,
			y: value,
			'Error (%)': error
		});

		if (previousError < valueError) {
			rangeToRoute = i;
			break;
		} else previousError = valueError;
		++iteration;
	}

	previousError = Infinity;

	for (i = rangeToRoute - 1; i < rangeToRoute; i += error) {
		const value = f(i);
		const valueError = Math.abs(value);

		if (iteration % 10000 === 0)
			progress.push({
				Iteration: iteration,
				x: i,
				y: value,
				'Error (%)': error
			});

		if (previousError < valueError) {
			progress.push({
				Iteration: iteration,
				x: i,
				y: value,
				'Error (%)': error
			});

			return new RootOfEquationAnswer(
				i,
				iteration,
				progress,
				(timeBegin - performance.now()).toFixed(2)
			);
		} else previousError = valueError;
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

		++iteration;
	} while (iteration < 100 && (cmp == 0 || xm_error >= error));

	return new RootOfEquationAnswer(
		xm,
		iteration,
		progress,
		(timeBegin - performance.now()).toFixed(2)
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

		++iteration;
	} while (iteration < 100 && (cmp == 0 || x1_error >= error));

	return new RootOfEquationAnswer(
		x1,
		iteration,
		progress,
		(timeBegin - performance.now()).toFixed(2)
	);
}

export function onePoint(expr, init, error = 0.000001) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });

	let x0,
		x1,
		x_error,
		iteration = 0;

	let progress = [];

	do {
		x0 = x1 ? x1 : init;
		x1 = f(x0);
		x_error = Math.abs(x1 - x0);

		progress.push({
			Iteration: iteration,
			x: x1,
			'Error (%)': x_error * 100
		});

		++iteration;
	} while (iteration < 100 && x_error > error);

	return new RootOfEquationAnswer(
		x1,
		iteration,
		progress,
		(timeBegin - performance.now()).toFixed(2)
	);
}

export function newtonRaphson(expr, init, error = 0.000001) {
	const timeBegin = performance.now();

	const fn = (x) => evaluate(expr, { x });
	const fn1 = (x) => evaluate(derivative(expr, 'x').toString(), { x });

	let x0,
		x1,
		x_error,
		iteration = 0;

	let progress = [];

	do {
		x0 = x1 ? x1 : init;
		x1 = x0 - fn(x0) / fn1(x0);
		x_error = Math.abs(x1 - x0);

		progress.push({
			Iteration: iteration,
			x: x1,
			'Error (%)': x_error * 100
		});

		++iteration;
	} while (iteration < 100 && x_error > error);

	return new RootOfEquationAnswer(
		x1,
		iteration,
		progress,
		(timeBegin - performance.now()).toFixed(2)
	);
}

export function secantMethod(expr, init1, init2, error = 0.000001) {
	const timeBegin = performance.now();

	const fn = (x) => evaluate(expr, { x });

	let x0,
		x1,
		x2,
		x_error,
		iteration = 0;

	let progress = [];

	do {
		x0 = x1 ? x1 : init1;
		x1 = x2 ? x2 : init2;
		x2 = x1 - fn(x1) * ((x1 - x0) / (fn(x1) - fn(x0)));
		x_error = Math.abs(x1 - x0);

		progress.push({
			Iteration: iteration,
			x: x1,
			'Error (%)': x_error * 100
		});

		++iteration;
	} while (iteration < 100 && x_error > error);

	return new RootOfEquationAnswer(
		x2,
		iteration,
		progress,
		(timeBegin - performance.now()).toFixed(2)
	);
}
