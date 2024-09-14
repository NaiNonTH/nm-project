<script>
	import { page } from '$app/stores';
	import '../app.css';

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
		}
	];
</script>

<header>
	<h1><span aria-hidden="true">🧮</span> Numerical Method Project</h1>
</header>
<nav class="site-nav">
	<ul>
		<li>
			<a aria-current={$page.url.pathname === '/'} href="/"
				><span aria-hidden="true">🏠</span> Home</a
			>
		</li>
		<hr />
		{#each links as { title, href }}
			<li>
				<a aria-current={$page.url.pathname.includes(href) && $page.status == 200} {href}>
					{title}
				</a>
			</li>
		{/each}
	</ul>
</nav>
<main>
	<slot />
</main>
<footer>
	<strong>Numerical Method Project</strong>, an open-source University project by
	<strong><a href="https://nons.page">nons.page</a></strong>.
</footer>
