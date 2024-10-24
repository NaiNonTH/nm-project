import { Octokit } from '@octokit/core';
import { REPO_TOKEN } from '$env/static/private';

export async function load() {
	const octokit = new Octokit({
		auth: REPO_TOKEN
	});

	const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
		owner: 'NaiNonTH',
		repo: 'nm-project',
		headers: {
    		'X-GitHub-Api-Version': '2022-11-28'
		}
	});

    return {
        lastCommit: data[0]
    }
}