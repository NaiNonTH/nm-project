import { LinearAlgebraAnswer } from './classes';
import { calculateExecutionTime, joinedMatrix } from './misc';
import { lup, lusolve } from 'mathjs';

function det(A) {
	const size = A.length;

	if (size === 0) return null;
	if (size === 1) return A[0][0];

	let sum = 0,
		difference = 0;

	const isTwoByTwo = size === 2;

	for (let i = 0; i < size - isTwoByTwo; ++i) {
		let multiplied = 1;

		for (let j = 0; j < size; ++j) {
			multiplied *= A[j][(j + i) % size];
		}

		sum += multiplied;
	}

	for (let i = 0; i < size - isTwoByTwo; ++i) {
		let multiplied = 1;

		for (let j = size - 1; j >= 0; --j) {
			multiplied *= A[j][(Math.abs(j - i - size) - 1) % size];
		}

		difference += multiplied;
	}

	return sum - difference;
}

export function cramersRule(A, B) {
	const timeBegin = performance.now();

	const size = A.length;
	let returnArr = [];

	const detA = det(A);

	for (let i = 0; i < size; ++i) {
		const tempMatrix = structuredClone(A);

		for (let j = 0; j < size; ++j) {
			tempMatrix[j][i] = B[j][0];
		}

		returnArr.push(det(tempMatrix) / detA);
	}

	return new LinearAlgebraAnswer(returnArr, calculateExecutionTime(timeBegin));
}

export function gauss(matrix) {
	const timeBegin = performance.now();

	const size = matrix.length;

	for (let i = 0; i < size - 1; ++i) {
		const row = [...matrix[i]];
		const diagonal = row[i];

		for (let j = i + 1; j < size; ++j) {
			const modRow = row.map((n) => (n * matrix[j][i]) / diagonal);

			for (let k = 0; k < matrix[j].length; ++k) {
				matrix[j][k] -= modRow[k];
			}
		}
	}

	let returnArr = [];

	for (let i = size - 1; i >= 0; --i) {
		let difference = matrix[i].at(-1);

		for (let j = matrix[0].length - 2; j >= 0; --j) {
			if (j != i) {
				difference -= matrix[i][j] * (returnArr[j] || 1);
			}
		}

		returnArr.push(difference / matrix[i][i]);
	}

	return new LinearAlgebraAnswer(returnArr, calculateExecutionTime(timeBegin));
}

export function gaussJordan(matrix) {
	const timeBegin = performance.now();

	const size = matrix.length;

	for (let i = 0; i < size - 1; ++i) {
		const row = [...matrix[i]];
		const diagonal = row[i];

		for (let j = i + 1; j < size; ++j) {
			const modRow = row.map((n) => (n * matrix[j][i]) / diagonal);

			for (let k = 0; k < matrix[j].length; ++k) {
				matrix[j][k] -= modRow[k];
			}
		}
	}

	for (let i = size - 1; i > 0; --i) {
		const row = [...matrix[i]];
		const diagonal = row[i];

		for (let j = i - 1; j >= 0; --j) {
			const modRow = row.map((n) => (n * matrix[j][i]) / diagonal);

			for (let k = 0; k < matrix[j].length; ++k) {
				matrix[j][k] -= modRow[k];
			}
		}
	}

	const returnArr = [];

	for (let i = 0; i < size; ++i) {
		returnArr.unshift(matrix[i].at(-1) / matrix[i][i]);
	}

	return new LinearAlgebraAnswer(returnArr, calculateExecutionTime(timeBegin));
}

function createIdentityMatrix(size) {
	const matrix = [];

	for (let i = 0; i < size; ++i) {
		matrix[i] = [];

		for (let j = 0; j < size; ++j) {
			matrix[i][j] = i === j ? 1 : 0;
		}
	}

	return matrix;
}

export function matrixInversion(A, B) {
	const timeBegin = performance.now();
	let matrix = joinedMatrix(A, createIdentityMatrix(A.length));

	const size = matrix.length;

	for (let i = 0; i < size - 1; ++i) {
		const row = [...matrix[i]];
		const diagonal = row[i];

		for (let j = i + 1; j < size; ++j) {
			const modRow = row.map((n) => (n * matrix[j][i]) / diagonal);

			for (let k = 0; k < matrix[j].length; ++k) {
				matrix[j][k] -= modRow[k];
			}
		}
	}

	for (let i = size - 1; i > 0; --i) {
		const row = [...matrix[i]];
		const diagonal = row[i];

		for (let j = i - 1; j >= 0; --j) {
			const modRow = row.map((n) => (n * matrix[j][i]) / diagonal);

			for (let k = 0; k < matrix[j].length; ++k) {
				matrix[j][k] -= modRow[k];
			}
		}
	}

	for (let i = 0; i < matrix.length; ++i) {
		matrix[i] = matrix[i].map((n) => n / matrix[i][i]);
	}

	const result = [];

	for (let i = 0; i < matrix.length; ++i) {
		let sum = 0;

		for (let j = 3; j < matrix[0].length; ++j) {
			sum += B[j - 3][0] * matrix[i][j];
		}

		result.push(sum);
	}

	return new LinearAlgebraAnswer(result, calculateExecutionTime(timeBegin));
}

export function lu(A, B) {
	const timeBegin = performance.now();

	const lu = lup(A);
	const answer = lusolve(lu, B).toArray().flat();

	return new LinearAlgebraAnswer(answer, calculateExecutionTime(timeBegin));
}

export function jacobi(A, B, error = 0.000001) {
	const timeBegin = performance.now();

	let x0 = new Array(A.length).fill(0);
	let x1 = new Array(A.length).fill(0);

	let iteration = 0;

	while (iteration <= 999) {
		for (let i = 0; i < A.length; ++i) {
			let ans = B[i][0];

			for (let j = 0; j < A[0].length; ++j) {
				if (j != i) ans -= A[i][j] * x0[j];
			}

			x1[i] = ans / A[i][i];
		}

		let ok = true;
		for (let i = 0; i < x1.length; ++i) {
			if (Math.abs(x1[i] - x0[i]) >= error) {
				ok = false;
				break;
			}
		}

		if (ok) break;

		x0 = [...x1];
		++iteration;
	}

	return new LinearAlgebraAnswer(x1, calculateExecutionTime(timeBegin));
}

export function gaussSeidel(A, B, error = 0.000001) {
	const timeBegin = performance.now();

	let x0 = new Array(A.length).fill(0);
	let x1 = new Array(A.length).fill(0);

	let iteration = 0;

	while (iteration <= 999) {
		for (let i = 0; i < A.length; ++i) {
			let ans = B[i][0];

			for (let j = 0; j < A[0].length; ++j) {
				if (j != i) ans -= A[i][j] * x1[j];
			}

			x1[i] = ans / A[i][i];
		}

		let ok = true;
		for (let i = 0; i < x1.length; ++i) {
			if (Math.abs(x1[i] - x0[i]) >= error) {
				ok = false;
				break;
			}
		}

		if (ok) break;

		x0 = [...x1];
		++iteration;
	}

	return new LinearAlgebraAnswer(x1, calculateExecutionTime(timeBegin));
}
