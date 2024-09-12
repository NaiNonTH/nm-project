import { derivative, evaluate } from 'mathjs';

export function graphicalMethod(expr, start, end, error = 0.000001) {
	let f = (x) => evaluate(expr, { x });
	let previousNum = Math.abs(f(start));
	let rangeToRoute;

	for (let i = start + 1; i <= end; ++i) {
		const value = Math.abs(f(i));

		if (previousNum < value) {
			rangeToRoute = i;
			break;
		} else previousNum = value;
	}

	previousNum = Infinity;

	for (let i = rangeToRoute - 1; i < rangeToRoute; i += error) {
		const value = Math.abs(f(i));

		if (previousNum < value) return i;
		else previousNum = value;
	}

	return null;
}

export function bisection(expr, xl, xr, error = 0.000001) {
	const f = (x) => evaluate(expr, { x });
	let xm,
		fxm,
		cmp,
		iteration = 0;

	do {
		xm = (xl + xr) / 2;
		fxm = f(xm);
		cmp = f(xr) * fxm;

		if (cmp < 0) xl = xm;
		else if (cmp > 0) xr = xm;

		++iteration;
	} while (iteration < 999 && (cmp == 0 || Math.abs(fxm) >= error));

	return xm;
}

export function falsePosition(expr, xl, xr, error = 0.000001) {
	const f = (x) => evaluate(expr, { x });
	let x1,
		fx1,
		cmp,
		iteration = 0;

	do {
		let fxl = f(xl);
		let fxr = f(xr);

		x1 = xr - (fxr * (xl - xr)) / (fxl - fxr);
		fx1 = f(x1);
		cmp = f(xr) * fx1;

		if (cmp < 0) xl = x1;
		else if (cmp > 0) xr = x1;

		++iteration;
	} while (iteration < 999 && (cmp == 0 || Math.abs(fx1) >= error));

	return x1;
}

export function onePoint(expr, init, error = 0.000001) {
	const f = (x) => evaluate(expr, { x });
	let x0,
		x1,
		iteration = 0;

	do {
		x0 = x1 ? x1 : init;
		x1 = f(x0);
		++iteration;
	} while (iteration < 999 && Math.abs(x1 - x0) > error);

	return x1;
}

export function newtonRaphson(expr, init, error = 0.000001) {
	const fn = (x) => evaluate(expr, { x });
	const fn1 = (x) => evaluate(derivative(expr, 'x').toString(), { x });
	let x0,
		x1,
		iteration = 0;

	do {
		x0 = x1 ? x1 : init;
		x1 = x0 - fn(x0) / fn1(x0);
		++iteration;
	} while (iteration < 999 && Math.abs(x1 - x0) > error);

	return x1;
}

export function secantMethod(expr, init1, init2, error = 0.000001) {
	const fn = (x) => evaluate(expr, { x });
	let x0,
		x1,
		x2,
		iteration = 0;

	do {
		x0 = x1 ? x1 : init1;
		x1 = x2 ? x2 : init2;
		x2 = x1 - fn(x1) * ((x1 - x0) / (fn(x1) - fn(x0)));
		++iteration;
	} while (iteration < 999 && Math.abs(x1 - x0) > error);

	return x2;
}
