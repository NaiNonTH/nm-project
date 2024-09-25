import { InterpolationAnswer } from './classes.js';

export function newtonDividedDifference(x, data_x, data_y) {
	const cache = {};

	function C(i, max = i, min = 0) {
		const args = `${i},${max},${min}`;

		if (args in cache) {
			return cache[args];
		}

		let answer;

		if (i <= 0) answer = data_y[max];
		else if (i === 1) answer = (data_y[max] - data_y[min]) / (data_x[max] - data_x[min]);
		else answer = (C(i - 1, max, min + 1) - C(i - 1, max - 1, min)) / (data_x[max] - data_x[min]);

		cache[args] = answer;
		return answer;
	}

	const timeBegin = performance.now();

	let sum = 0;
	for (let i = 0; i < data_x.length; ++i) {
		let multiplied = C(i);

		for (let j = 0; j < i; ++j) {
			multiplied *= x - data_x[j];
		}

		sum += multiplied;
	}

	return new InterpolationAnswer(sum, (performance.now() - timeBegin).toFixed(2));
}

export function lagrange(x, data_x, data_y) {
	function L(n) {
		let over = 1;
		let under = 1;

		for (let i = 0; i < data_x.length; ++i) {
			if (i != n) {
				over *= data_x[i] - x;
				under *= data_x[i] - data_x[n];
			}
		}

		return over / under;
	}

	const timeBegin = performance.now();

	let sum = 0;

	for (let i = 0; i < data_y.length; ++i) {
		sum += L(i) * data_y[i];
	}

	return new InterpolationAnswer(sum, (performance.now() - timeBegin).toFixed(2));
}
