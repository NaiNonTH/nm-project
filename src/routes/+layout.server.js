import { Octokit } from '@octokit/core';
import { REPO_TOKEN } from '$env/static/private';

export async function load({ fetch, cookies }) {
	const octokit = new Octokit({
		auth: REPO_TOKEN
	});

	let promises = [];

	promises.push(
		octokit
			.request('GET /repos/{owner}/{repo}/commits', {
				owner: 'NaiNonTH',
				repo: 'nm-project',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			})
			.catch((err) => err)
	);

	promises.push(fetch('/api/get-info').catch((err) => err));

	if (!cookies.get('visited')) {
		promises.push(fetch('/api/add-visitors-count', { method: 'POST' }).catch((err) => err));

		cookies.set('visited', true, { path: '/' });
	}

	const [{ data }, info] = await Promise.all(promises);

	if (info.ok) {
		const { visitors, runs } = await info.json();

		return {
			lastCommit: data[0],
			visitors,
			runs
		};
	} else {
		return {
			lastCommit: data[0]
		};
	}
}
