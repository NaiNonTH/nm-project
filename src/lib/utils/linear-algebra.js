import { LinearAlgebraAnswer } from './classes';
import { calculateExecutionTime, joinedMatrix } from './misc';
import {
	add,
	lup,
	lusolve,
	matrix,
	multiply,
	sqrt,
	subtract,
	transpose,
	unaryMinus,
	zeros
} from 'mathjs';

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

	return new LinearAlgebraAnswer(returnArr.reverse(), calculateExecutionTime(timeBegin));
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
		returnArr.push(matrix[i].at(-1) / matrix[i][i]);
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

export function jacobi(A, B, x0, error = 0.000001) {
	const timeBegin = performance.now();

	let x1 = new Array(A.length).fill(0);

	let iteration = 0;
	let progress = [];

	while (iteration <= 99) {
		for (let i = 0; i < A.length; ++i) {
			let ans = B[i][0];

			for (let j = 0; j < A[0].length; ++j) {
				if (j != i) ans -= A[i][j] * x0[j];
			}

			x1[i] = ans / A[i][i];
		}

		let errorList = [];

		let ok = true;
		for (let i = 0; i < x1.length; ++i) {
			const x_error = Math.abs(x1[i] - x0[i]);
			errorList.push(x_error);

			if (x_error >= error) {
				ok = false;
			}
		}

		progress.push({
			iteration,
			x0,
			x1,
			errors: errorList
		});

		if (ok) break;

		x0 = [...x1];
		++iteration;
	}

	return new LinearAlgebraAnswer(x1, calculateExecutionTime(timeBegin), progress);
}

export function gaussSeidel(A, B, x0, error = 0.000001) {
	const timeBegin = performance.now();

	let x1 = new Array(A.length).fill(0);

	let progress = [];
	let iteration = 0;

	while (iteration <= 99) {
		for (let i = 0; i < A.length; ++i) {
			let ans = B[i][0];

			for (let j = 0; j < A[0].length; ++j) {
				if (j != i) ans -= A[i][j] * x1[j];
			}

			x1[i] = ans / A[i][i];
		}

		let errorList = [];

		let ok = true;
		for (let i = 0; i < x1.length; ++i) {
			const x_error = Math.abs(x1[i] - x0[i]);
			errorList.push(x_error);

			if (x_error >= error) {
				ok = false;
			}
		}

		progress.push({
			iteration,
			x0,
			x1,
			errors: errorList
		});

		if (ok) break;

		x0 = [...x1];
		++iteration;
	}

	return new LinearAlgebraAnswer(x1, calculateExecutionTime(timeBegin), progress);
}

export function conjugateGradient(A, B, x, error = 0.000001) {
	function scalar(matrix) {
		return matrix.toArray()[0][0];
	}

	const timeBegin = performance.now();

	A = matrix(A);
	B = matrix(B);

	x = matrix(x.map((init) => [init]));

	let R = subtract(multiply(A, x), B);
	let D = unaryMinus(R);

	let calcError,
		progress = [],
		iteration = 0;

	do {
		let lambda = unaryMinus(
			scalar(multiply(transpose(D), R)) / scalar(multiply(transpose(D), A, D))
		);
		x = add(x, multiply(lambda, D));
		R = subtract(multiply(A, x), B);

		calcError = sqrt(scalar(multiply(transpose(R), R)));

		progress.push({
			iteration,
			x: x.toArray().flat(),
			error: calcError
		});

		if (calcError < error) break;

		let alpha = scalar(multiply(transpose(R), A, D)) / scalar(multiply(transpose(D), A, D));
		D = add(unaryMinus(R), multiply(alpha, D));

		++iteration;
	} while (iteration <= 999);

	return new LinearAlgebraAnswer(x.toArray().flat(), calculateExecutionTime(timeBegin), progress);
}
