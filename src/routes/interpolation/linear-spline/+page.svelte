<script>
	import Interpolation from '../Interpolation.svelte';
	import { linearSpline } from '$lib/utils/interpolation.js';
</script>

<h1>Linear Spline Interpolation</h1>
<Interpolation func={linearSpline} filterData={false} />
