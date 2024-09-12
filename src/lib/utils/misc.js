export function rootOfEquation(func, expr, ...args) {
	if (!expr) {
		return {
			type: 'error',
			message: 'Expression cannot be empty.'
		};
	}

	try {
		const answer = func(expr, ...args);
		return {
			type: 'answer',
			answer
		};
	} catch (err) {
		return {
			type: 'error',
			message: err.toString()
		};
	}
}

export function linearAlgebra(func, ...matrices) {
	const [x, y, z] = func(...matrices);
	return {
		type: 'answer',
		answer: `x = ${x}, y = ${y}, z = ${z}`
	};
}

export function generateMatrix(rows) {
	const arr = [];

	for (let i = 0; i < rows; ++i) {
		arr.push([]);
	}

	return arr;
}

export function joinedMatrix(baseMatrix, matrix) {
	const size = baseMatrix.length;
	const newMatrix = structuredClone(baseMatrix);

	for (let i = 0; i < size; ++i) {
		newMatrix[i][size] = matrix[i][0];
	}

	return newMatrix;
}

export function matrixIsInvalid(matrix, determinedRows, determinedCols) {
	if (!matrix || !(matrix instanceof Array) || matrix.length != determinedRows) return true;

	for (let i = 0; i < determinedRows; ++i) {
		for (let j = 0; j < determinedCols; ++j) {
			const num = matrix[i][j];
			if (
				matrix[i].length != determinedCols ||
				num === null ||
				num === undefined ||
				isNaN(+num) ||
				!isFinite(num)
			)
				return true;
		}
	}

	return false;
}
