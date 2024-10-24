<script>
	import { page } from '$app/stores';
	import '../app.css';

	export let data;

	const links = [
		{
			title: 'Root of Equation',
			href: '/root-of-equation',
			emoji: '🫚'
		},
		{
			title: 'Linear Algebra',
			href: '/linear-algebra',
			emoji: '📅'
		},
		{
			title: 'Interpolation',
			href: '/interpolation',
			emoji: '📈'
		},
		{
			title: 'Extrapolation',
			href: '/extrapolation',
			emoji: '📉'
		},
		{
			title: 'Integration',
			href: '/integration',
			emoji: '➕'
		},
		{
			title: 'Difference',
			href: '/numerical-difference',
			emoji: '➖'
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
			{#each links as { title, href, emoji }}
				<li>
					<a
						data-icon={emoji}
						aria-current={$page.url.pathname.includes(href) && $page.status == 200}
						{href}
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
					href="/credits">Credits</a
				>
			</li>
		</ul>
	</nav>
	<div class="last-commit">
		<h3>Last Commit:</h3>
		{#if data.lastCommit}
			{@const lastCommit = data.lastCommit}
			{@const commit = lastCommit.commit}
			<p><a target="_blank" href={lastCommit.html_url}>{commit.message}</a> by {commit.author.name} ({new Date(commit.author.date).toLocaleString()})</p>
		{/if}
	</div>
</div>
<main>
	<slot />
</main>
<footer>
	<strong>Numerical Method Project</strong>, an open-source University project by
	<strong><a href="https://nons.page">nons.page</a></strong>.
</footer>
