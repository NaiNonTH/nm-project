export async function load({ fetch, cookies }) {
	if (!cookies.get('visited')) {
		await fetch('/api/add-visitors-count', { method: 'POST' });

		cookies.set('visited', true, { path: '/' });
	}
}
