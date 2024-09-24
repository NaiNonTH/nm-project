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
	constructor(value, iteration, progress, executionTime, graph = progress) {
		super();
		this.topic = 'root-of-equation';
		this.value = value;
		this.iteration = iteration;
		this.progress = progress;
		this.graph = graph;
		this.executionTime = executionTime;
	}
}

export class LinearAlgebraAnswer extends Answer {
	constructor(values, executionTime) {
		super();
		this.topic = 'linear-algebra';
		this.values = values;
		this.executionTime = executionTime;
	}
}

export class InterpolationAnswer extends Answer {
	constructor(value, executionTime) {
		super();
		this.topic = 'interpolation';
		this.value = value;
		this.executionTime = executionTime;
	}
}