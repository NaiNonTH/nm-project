<script>
	import MathDisplay from './MathDisplay.svelte';
	import Input from './Input.svelte';
	import { page } from '$app/stores';
	import { pushState } from '$app/navigation';

	let polynomial = 0;
	let min;
	let mMax;
	let cMax;
	let tp;

	let display;

	let disabled = false;
	let buttonName = 'Get Equation';

	let onCooldown = false;
	let errMessage = '';
	
	let modal;

	function toggleEvent(e) {
		if (e.altKey && e.code === 'KeyP') pushState('', { randexpr: true });
		else if (e.code === 'Escape' && $page.state.randexpr) history.back();
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

				modal.scrollTo({ top: 0, behavior: 'smooth' });
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
			}, 3000);
		}
	}
</script>

<svelte:document on:keydown={toggleEvent} />

<button class="mobile-toggle" on:click={() => pushState('', { randexpr: true })} type="button">
	<svg width="24" height="24" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1919.989 168.955V394.95h-832.716l-476.16 1251.388-212.78-4.743-194.373-588.537H-.01V827.176h285.515l107.294 77.59L513.08 1268.89 903.857 241.802l105.6-72.847zM1265.72 788.99l240.177 240.176 240.162-240.12 159.7 159.586-240.2 240.197 240.2 240.198-159.7 159.586-240.163-240.12-240.176 240.177-159.698-159.7 240.183-240.141-240.183-240.14 159.698-159.7Z"
			fill-rule="evenodd"
			fill="#fff"
		/>
	</svg>
</button>
{#if $page.state.randexpr}
	<div bind:this={modal} class="modal">
		<h2>Random Equation</h2>
		<MathDisplay expr={display || '?'} />
		<div class="copy-zone">
			<button
				class="copy"
				disabled={!display}
				type="button"
				on:click={() => navigator.clipboard.writeText(display)}>Copy Equation</button
			>
		</div>
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
		<button on:click={() => history.back()} class="close-btn" type="button">Close</button>
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
	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	div {
		padding: 1rem;
	}
	.copy {
		margin-left: auto;
	}
	.copy-zone {
		display: flex;
	}
	.mobile-toggle {
		display: none;

		position: fixed;
		bottom: 3.5rem;
		right: 0.5em;

		width: 3em;
		height: 3em;
		border-radius: 50%;

		align-items: center;
		justify-content: center;
	}

	@media (max-width: 48rem) {
		.mobile-toggle {
			display: flex;
		}
	}
</style>
