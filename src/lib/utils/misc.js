import { CalcError, LinearAlgebraAnswer } from './classes.js';

export function rootOfEquation(func, expr, ...args) {
	if (!expr) return new CalcError('Expression cannot be empty.');

	try {
		return func(expr, ...args);
	} catch (err) {
		return new CalcError(err.toString());
	}
}

export function linearAlgebra(func, ...matrices) {
	let values = func(...matrices);
	console.log(values)
	return new LinearAlgebraAnswer(values);
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
