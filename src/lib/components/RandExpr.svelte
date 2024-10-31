<script>
	import MathDisplay from './MathDisplay.svelte';
	import Input from './Input.svelte';
	import { page } from '$app/stores';

	let open = false;

	let polynomial = 0;
	let min;
	let mMax;
	let cMax;
	let tp;

	let display = '?';

	let disabled = false;
	let buttonName = 'Get Equation';

	let onCooldown = false;
	let errMessage = '';

	function toggleEvent(e) {
		if (e.altKey && e.code === 'KeyP') open = !open;
		else if (e.code === 'Escape') open = false;
	}
	async function submit() {
		if (onCooldown) {
			errMessage = 'Oi! Slow down, folks.';
			return;
		}

		errMessage = '';

		const action = new URL($page.url.href);
		action.pathname = '/api/random-equation';

		action.searchParams.set('type', polynomial ? 'polynomial' : 'linear');

		if (min) action.searchParams.set('min', min);
		if (mMax) action.searchParams.set('mMax', mMax);
		if (cMax) action.searchParams.set('cMax', cMax);
		if (polynomial && tp) action.searchParams.set('tp', tp);

		disabled = true;
		buttonName = 'Fetching...';

		let response;
		try {
			response = await fetch(action);

			if (response.ok) {
				const { answer } = await response.json();
				display = answer;
			} else {
				console.log(response);
				errMessage = `[${response.status}] ${response.statusText}`;
			}
		} catch (e) {
			console.error(e);
		} finally {
			buttonName = 'Cooling down...';
			onCooldown = true;

			setTimeout(function () {
				disabled = false;
				buttonName = 'Get Equation';

				onCooldown = false;
			}, 1500);
		}
	}
</script>

<svelte:document on:keydown={toggleEvent} />

{#if open}
	<div class="modal">
		<h2>Random Equation</h2>
		<MathDisplay expr={display} />
		<form on:submit|preventDefault={submit}>
			<div class="same-line">
				<Input
					label="Type"
					type="selections"
					name="type"
					choices={['linear', 'polynomial']}
					bind:value={polynomial}
				/>
				<Input label="Minimum" type="number" name="min" placeholder="1" optional bind:value={min} />
				<Input
					label="Slope Maximum"
					type="number"
					name="mMax"
					placeholder="100"
					optional
					bind:value={mMax}
				/>
				<Input
					label="Constant Maximum"
					type="number"
					name="cMax"
					placeholder="1000"
					optional
					bind:value={cMax}
				/>
				<Input
					label="Turning Points"
					type="number"
					name="tp"
					disabled={!polynomial}
					placeholder="3"
					optional
					bind:value={tp}
					allowWheel
				/>
			</div>
			<div class="button-zone">
				{#if errMessage}
					<p style="color:red;">{errMessage}</p>
				{/if}
				<button {disabled} type="submit">{buttonName}</button>
			</div>
		</form>
		<button on:click={() => (open = false)} class="close-btn" type="button">Close</button>
	</div>
	<div class="backdrop"></div>
{/if}

<style>
	.modal {
		position: fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: 100%;
		max-width: 48rem;
		max-height: 70vh;

		padding: 1.5rem;
		background: #fff;
		border: 0.1rem solid #dcdcff;

		overflow-y: auto;
	}
	.backdrop {
		position: fixed;
		z-index: 998;
		inset: 0;
		margin: 0;

		background: #fffc;
	}
	div {
		padding: 1rem;
	}
	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>
