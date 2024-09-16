function det(A) {
	const size = A.length;

	let sum = 0,
		difference = 0;

	for (let i = 0; i < size; ++i) {
		let multiplied = 1;

		for (let j = 0; j < size; ++j) {
			multiplied *= A[j][(j + i) % size];
		}

		sum += multiplied;
	}

	for (let i = 0; i < size; ++i) {
		let multiplied = 1;

		for (let j = size - 1; j >= 0; --j) {
			multiplied *= A[j][(Math.abs(j - i - size) - 1) % size];
		}

		difference += multiplied;
	}

	return sum - difference;
}

export function cramersRule(A, B) {
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

	return returnArr;
}

export function gauss(matrix) {
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

	return returnArr;
}

export function gaussJordan(matrix) {
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

	return returnArr;
}

export function jacobi(A, B, error = 0.000001) {
	let x0 = [0, 0, 0, 0];
	let x1 = [0, 0, 0, 0];

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
		for (let i = 0; i < x0.length; ++i) {
			if (Math.abs(x1[i] - x0[i]) > error) {
				ok = false;
				break;
			}
		}

		if (ok) return x1;

		x0 = [...x1];
		++iteration;
	}
}

export function gaussSeidel(A, B, error = 0.000001) {
	let x0 = [0, 0, 0, 0];
	let x1 = [0, 0, 0, 0];

	let iteration = 0;

	while (iteration <= 999) {
		for (let i = 0; i < A.length; ++i) {
			let ans = B[i];

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

		if (ok) return x1;

		x0 = [...x1];
		++iteration;
	}
}
