import { InterpolationAnswer } from "./classes.js";

const C = (function () {
	const cache = {}; // memoization

	return function (n, x, y, max = n, min = 0) {
		const args = `${n},${max},${min}`;

		if (args in cache) {
			return cache[args];
		}

		const answer =
			n <= 0
				? y[max]
				: n === 1
					? (y[max] - y[min]) / (x[max] - x[min])
					: (C(n - 1, x, y, max, min + 1) - C(n - 1, x, y, max - 1, min)) / (x[max] - x[min]);

		cache[args] = answer;
		return answer;
	};
})();

export function newtonDividedDifference(x, data_x, data_y) {
	const timeBegin = performance.now();

	let sum = 0;
	for (let i = 0; i < data_x.length; ++i) {
		let multiplied = C(i, data_x, data_y);

		for (let j = 0; j < i; ++j) {
			multiplied *= x - data_x[j];
		}

		sum += multiplied;
	}

	return new InterpolationAnswer(sum, (performance.now() - timeBegin).toFixed(2));
}
