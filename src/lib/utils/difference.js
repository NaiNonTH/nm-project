import { derivative, evaluate, fix, or, parse } from 'mathjs';
import { DifferenceAnswer } from './classes.js';
import { calculateExecutionTime } from './misc.js';

const functionList = [
	[
		[
			'(f(x+h)-f(x))/h',
			'(f(x+2*h)-2*f(x+h)+f(x))/h^2',
			'(f(x+3*h)-3*f(x+2*h)+3*f(x+h)-f(x))/h^3',
			'(f(x+4*h)-4*f(x+3*h)+6*f(x+2*h)-4*f(x+h)+f(x))/h^4'
		],
		[
			'(-f(x+2*h)+4*f(x+h)-3*f(x))/(2*h)',
			'(-f(x+3*h)+4*f(x+2*h)-5*f(x+h)+2*f(x))/h^2',
			'(-3*f(x+4*h)+14*f(x+3*h)-24*f(x+2*h)+18*f(x+h)-5*f(x))/(2*h^3)',
			'(-2*f(x+5*h)+11*f(x+4*h)-24*f(x+3*h)+26*f(x+2*h)-14*f(x+h)+3*f(x))/h^4'
		]
	],
	[
		[
			'(f(x)-f(x-h))/h',
			'(f(x)-2*f(x-h)+f(x-2*h))/h^2',
			'(f(x)-3*f(x-h)+3*f(x-2*h)-f(x-3*h))/h^3',
			'(f(x)-4*f(x-h)+6*f(x-2*h)-4*f(x-3*h)+f(x-4*h))/h^4'
		],
		[
			'(3*f(x)-4*f(x-h)+f(x-2*h))/(2*h)',
			'(2*f(x)-5*f(x-h)+4*f(x-2*h)-f(x-3*h))/h^2',
			'(5*f(x)-18*f(x-h)+24*f(x-2*h)-14*f(x-3*h)-f(x-4*h))/(2*h^3)',
			'(3*f(x)-14*f(x-h)+26*f(x-2*h)-24*f(x-3*h)+11*f(x-4*h)-2*f(x-5*h))/h^4'
		]
	],
	[
		[
			'(f(x+h)-f(x-h))/(2*h)',
			'(f(x+h)-2*f(x)+f(x-h))/h^2',
			'(f(x+2*h)-2*f(x+h)+2*f(x-h)-f(x-2*h))/(2*h^3)',
			'(f(x+2*h)-4*f(x+h)+6*f(x)-4*f(x-h)+f(x-2*h))/h^4'
		],
		[
			'(-f(x+2*h)+8*f(x+h)-8*f(x-h)+f(x-2*h))/(12*h)',
			'(-f(x+2*h)+16*f(x+h)-30*f(x)+16*f(x-h)-f(x-2*h))/(12*h^2)',
			'(-f(x+3*h)+8*f(x+2*h)-13*f(x+h)+13*f(x-h)-8*f(x-2*h)+f(x-3*h))/(8*h^3)',
			'(-f(x+3*h)+12*f(x+2*h)-39*f(x+h)+56*f(x)-39*f(x-h)+12*f(x-2*h)-f(x-3*h))/(6*h^4)'
		]
	]
];

export default function (direction, precision, order, expr, x, h) {
	const timeBegin = performance.now();

	const f = (x) => evaluate(expr, { x });

	const selectedFormula = functionList[direction][precision][order];
	const answer = evaluate(selectedFormula, { f, x, h });

	let realDiffExpr = expr;
	for (let i = 0; i <= order; ++i) {
		realDiffExpr = derivative(realDiffExpr, 'x').toString();
	}
	const realAnswer = evaluate(realDiffExpr, { x });

	let error = ((answer - realAnswer) / realAnswer) * 100;
	error = error > 0 ? '+' + error.toFixed(2) : error.toFixed(2);

	const orderPrime = ["'", "''", "'''", '^{(4)}'];

	const solution = [
		`f${orderPrime[order]}(x) = ${parse(selectedFormula).toTex()}`,
		`f${orderPrime[order]}(x) = ${parse(selectedFormula.replace(/x/g, x).replace(/h/g, h)).toTex()}`,
		`f${orderPrime[order]}(x) = ${fix(answer, 4)}`
	];

	console.log(solution[0]);

	return new DifferenceAnswer(answer, error, calculateExecutionTime(timeBegin), solution);
}
