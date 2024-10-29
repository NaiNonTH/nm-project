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
	constructor(value, iteration, progress, executionTime, graph = null) {
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
	constructor(values, executionTime, progress = null) {
		super();
		this.topic = 'linear-algebra';
		this.values = values;
		this.progress = progress;
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

export class ExtrapolationAnswer extends Answer {
	constructor(value, executionTime, graph = null) {
		super();
		this.topic = 'extrapolation';
		this.value = value;
		this.graph = graph;
		this.executionTime = executionTime;
	}
}

export class IntegrationAnswer extends Answer {
	constructor(value, executionTime, graph = null, solution = null) {
		super();
		this.topic = 'integration';
		this.value = value;
		this.executionTime = executionTime;
		this.graph = graph;
		this.solution = solution;
	}
}

export class DifferenceAnswer extends Answer {
	constructor(value, error, executionTime) {
		super();
		this.topic = 'difference';
		this.value = value;
		this.error = error;
		this.executionTime = executionTime;
	}
}

export class PlotlyLineGraph {
	constructor(name, config = {}, x = [], y = []) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.type = 'scatter';

		for (const conf in config) {
			this[conf] = config[conf];
		}
	}
}
