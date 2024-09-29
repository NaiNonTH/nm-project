<script>
	import Interpolation from '../Interpolation.svelte';
	import { linearSpline } from '$lib/utils/interpolation.js';
</script>

<Interpolation func={linearSpline} />
