import { CalcError } from './classes.js';

export function rootOfEquation(func, expr, ...args) {
	if (!expr) return new CalcError('Expression cannot be empty.');

	try {
		return func(expr, ...args);
	} catch (err) {
		return new CalcError(err.toString());
	}
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
	const newMatrix = [];

	for (let i = 0; i < size; ++i) {
		newMatrix[i] = [...baseMatrix[i], ...matrix[i]];
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

export function createFunctionGraphData(f, x0, x1) {
	if (x0 === x1)
		return [[x0], [x1]];

	x0 = Math.floor(Math.min(x0, x1));
	x1 = Math.ceil(Math.max(x0, x1));

	let x_data = [];
	let y_data = [];
	let step = Math.abs(x1 - x0) * 0.025;

	console.log(start, end);

	for (let x = start; x <= end + step; x += step) {
		x_data.push(x);
		y_data.push(f(x));
	}

	return [x_data, y_data];
}

export function calculateExecutionTime(timeInit) {
	return (performance.now() - timeInit).toFixed(2);
}

export function toSubset(str) {
	const subNumbers = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];

	str = str.toString();
	let modified = '';

	for (let i = 0; i < str.length; ++i) {
		const charCode = str.charCodeAt(i);

		if (charCode >= 48 && charCode <= 57) modified += subNumbers[charCode - 48];
		else modified += str.charAt(i);
	}

	return modified;
}
