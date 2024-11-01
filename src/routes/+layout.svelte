<script>
	import RandExpr from '$lib/components/RandExpr.svelte';
	import { page } from '$app/stores';
	import '../app.css';

	export let data;

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
</script>

<header>
	<h1><span aria-hidden="true">🧮</span> Numerical Method Project</h1>
</header>
<div class="sidebar">
	<nav class="site-nav">
		<ul>
			<li>
				<a data-icon="🏠" class="home" aria-current={$page.url.pathname === '/'} href="/">Home</a>
			</li>
		</ul>
		<ul>
			{#each links as { title, href }}
				<li>
					<a aria-current={$page.url.pathname.includes(href) && $page.status == 200} {href}>
						{title}
					</a>
				</li>
			{/each}
		</ul>
		<ul>
			<li>
				<a
					aria-current={$page.url.pathname.includes('/credits') && $page.status == 200}
					href="/credits">Credits</a
				>
			</li>
		</ul>
	</nav>
	<dl aria-label="Visitors and Runs count">
		<div>
			<dt>Visitors</dt>
			<dd>
				{#if data.visitors !== null}
					{data.visitors.toLocaleString()}
				{:else}
					N/A
				{/if}
			</dd>
		</div>
		<div>
			<dt>Runs</dt>
			<dd>
				{#if data.runs !== null}
					{data.runs.toLocaleString()}
				{:else}
					N/A
				{/if}
			</dd>
		</div>
	</dl>
	<div class="last-commit">
		<h3>Last Commit:</h3>
		{#if data.lastCommit}
			{@const lastCommit = data.lastCommit}
			{@const commit = lastCommit.commit}
			<p>
				<a target="_blank" href={lastCommit.html_url}>{commit.message}</a> by {commit.author.name} ({new Date(
					commit.author.date
				).toLocaleString()})
			</p>
		{/if}
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
