<script>
	import { page } from '$app/stores';
	import '../app.css';

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
		}
	];
</script>

<header>
	<h1><span aria-hidden="true">🧮</span> Numerical Method Project</h1>
</header>
<nav class="site-nav">
	<ul>
		<li>
			<a data-icon="🏠" class="home" aria-current={$page.url.pathname === '/'} href="/">Home</a>
		</li>
		<hr />
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
<main>
	<slot />
</main>
<footer>
	<strong>Numerical Method Project</strong>, an open-source University project by
	<strong><a href="https://nons.page">nons.page</a></strong>.
</footer>
