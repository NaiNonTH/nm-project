import { error, json } from '@sveltejs/kit';

function rand(min, max) {
	return Math.trunc(Math.random() * (max - min) + min);
}

export function GET({ url }) {
	const type = url.searchParams.get('type');

	if (type === null) error(400, '"type" parameter is not defined');

	let answer = null;

	let min = +url.searchParams.get('min') || 1;
	let mMax = +url.searchParams.get('mMax') || 100;
	let cMax = +url.searchParams.get('cMax') || 1000;
	let tp = Math.trunc(+url.searchParams.get('tp')) ?? 3;

	if (tp < 3) tp = 3;

	switch (type) {
		case 'linear': {
			let randNum = rand(min, mMax);
			randNum = randNum === 1 ? '' : randNum;

			answer = `${randNum}x${rand(0, 2) === 1 ? '+' : '-'}${rand(min, cMax)}`;
			break;
		}
		case 'polynomial': {
			answer = '';

			for (let n = tp - 1; n > 0; --n) {
				let randNum = rand(min, mMax);
				randNum = randNum === 1 ? '' : randNum;

				let power = n === 1 ? '' : '^' + n;

				answer += `${randNum}x${power}${rand(0, 2) === 1 ? '+' : '-'}`;
			}

			answer += rand(min, cMax);
			break;
		}
	}

	if (answer === null) error(400, '"type" is not valid');

	return json({
		timestamp: new Date(),
		params: { type, min, mMax, cMax, tp },
		answer
	});
}
