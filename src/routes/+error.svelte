<script>
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.status == 500}
		<img height="280" src="/hot-garbage-dumpster-fire.gif" alt="Garbage Dumpster Fire on Flood" />
		<h1>{$page.status}: DEV IS COOKED!!</h1>
		<p><strong>OH SHIT!!!</strong></p>
	{:else if $page.status == 404}
		<img height="280" src="/maes-b-lost-in-a-field.gif" alt="Green Screen Maes B Lost in a Field" />
		<h1>{$page.status}: {$page.error.message}</h1>
		<p><strong>Need a <span class="map">map</span>?</strong></p>
	{:else}
		<h1>{$page.status}: {$page.error.message}</h1>
		<p>caption</p>
	{/if}
</div>

<style>
	div {
		text-align: center;
	}
	.map {
		text-decoration: underline double;
	}
	.map:hover::after {
		content: '🗺️';
	}
	p {
		font-size: 1.5rem;
	}
</style>
