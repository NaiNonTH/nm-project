export class CalcError {
	constructor(msg) {
		this.type = 'error';
		this.message = msg;
	}
}

class Answer {
	type = 'answer';
}

export class RootOfEquationAnswer extends Answer {
	constructor(value, iteration, progress, executionTime) {
		super();
		this.topic = 'root-of-equation';
		this.value = value;
		this.iteration = iteration;
		this.progress = progress;
		this.executionTime = executionTime;
	}
}

export class LinearAlgebraAnswer extends Answer {
	constructor(values) {
		super();
		this.topic = 'linear-algebra';
		this.values = values;
	}
}