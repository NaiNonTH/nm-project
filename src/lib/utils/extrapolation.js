import { ExtrapolationAnswer } from './classes';
import { gaussJordan } from './linear-algebra';
import { joinedMatrix } from './misc';

function sum(data) {
	return data.reduce((a, b) => a + b, 0);
}

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

	return new ExtrapolationAnswer(
		sum(a_list.map((a, i) => a * Math.pow(x, i))),
		(performance.now() - timeBegin).toFixed(2)
	);
}
