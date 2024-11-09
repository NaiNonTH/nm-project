<script>
	import RandExpr from '$lib/components/RandExpr.svelte';
	import { page } from '$app/stores';
	import '../app.css';
	import { onMount } from 'svelte';

	const links = [
		{
			title: 'Root of Equation',
			href: '/root-of-equation'
		},
		{
			title: 'Linear Algebra',
			href: '/linear-algebra'
		},
		{
			title: 'Interpolation',
			href: '/interpolation'
		},
		{
			title: 'Extrapolation',
			href: '/extrapolation'
		},
		{
			title: 'Integration',
			href: '/integration'
		},
		{
			title: 'Difference',
			href: '/numerical-difference'
		}
	];

	let visitors = null,
		runs = null,
		lastCommit = null;

	onMount(function () {
		fetch('/api/get-info')
			.then((res) => res.json())
			.then((json) => ({ visitors, runs } = json));

		fetch('https://api.github.com/repos/NaiNonTH/nm-project/commits')
			.then((res) => res.json())
			.then((json) => (lastCommit = json[0]));
	});
</script>

<svelte:head>
	<noscript>
		<style>
			.js {
				display: none;
			}
		</style>
	</noscript>
</svelte:head>

<header>
	<h1><span aria-hidden="true">🧮</span> Numerical Method Project</h1>
</header>
<div class="sidebar">
	<nav class="site-nav">
		<ul>
			<li>
				<a data-icon="🏠" class="home" aria-current={$page.url.pathname === '/'} href="/#main"
					>Home</a
				>
			</li>
		</ul>
		<ul>
			{#each links as { title, href }}
				<li>
					<a
						aria-current={$page.url.pathname.includes(href) && $page.status == 200}
						href="{href}#main"
					>
						{title}
					</a>
				</li>
			{/each}
		</ul>
		<ul>
			<li>
				<a
					aria-current={$page.url.pathname.includes('/credits') && $page.status == 200}
					href="/credits#main">Credits</a
				>
			</li>
		</ul>
	</nav>
	<dl class="js" aria-label="Visitors and Runs count">
		<div>
			<dt>Visitors</dt>
			<dd>
				{#if visitors !== null}
					{visitors.toLocaleString()}
				{:else}
					<span class="loading"></span>
				{/if}
			</dd>
		</div>
		<div>
			<dt>Runs</dt>
			<dd>
				{#if runs !== null}
					{runs.toLocaleString()}
				{:else}
					<span class="loading"></span>
				{/if}
			</dd>
		</div>
	</dl>
	<div class="last-commit js">
		<h3>Last Commit:</h3>
		<p>
			{#if lastCommit}
				{@const { commit } = lastCommit}
				<a target="_blank" href={lastCommit.html_url}>{commit.message}</a> by {commit.author.name}
				({new Date(commit.author.date).toLocaleString()})
			{:else}
				<span class="loading"></span>
			{/if}
		</p>
	</div>
</div>
<main id="main">
	<slot />
</main>
<RandExpr />
<a class="jump" href="#main">Jump to Main</a>
<footer>
	<strong>Numerical Method Project</strong>, an
	<a target="_blank" href="https://github.com/NaiNonTH/nm-project">open-source</a>
	University project by
	<strong><a target="_blank" href="https://nons.page">nons.page</a></strong>.
</footer>
