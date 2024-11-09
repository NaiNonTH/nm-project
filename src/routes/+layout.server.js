import { Octokit } from '@octokit/core';
import { REPO_TOKEN } from '$env/static/private';

export async function load({ fetch, cookies }) {
	const octokit = new Octokit({
		auth: REPO_TOKEN
	});

	let promises = [];

	const lastCommitRequest = octokit
	 	.request('GET /repos/{owner}/{repo}/commits', {
	 		owner: 'NaiNonTH',
	 		repo: 'nm-project',
	 		headers: {
	 			'X-GitHub-Api-Version': '2022-11-28'
	 		}
	 	});

	promises.push(fetch('/api/get-info').catch((err) => err));

	if (!cookies.get('visited')) {
		promises.push(fetch('/api/add-visitors-count', { method: 'POST' }).catch((err) => err));

		cookies.set('visited', true, { path: '/' });
	}

	const [ info ] = await Promise.all(promises);

	if (info.ok) {
		const { visitors, runs } = await info.json();

		return {
			lastCommitRequest,
			visitors,
			runs
		};
	} else {
		return {
			lastCommitRequest
		};
	}
}
