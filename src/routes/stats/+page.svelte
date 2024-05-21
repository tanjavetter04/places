<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { get } from 'svelte/store';

	export let data: PageData;
    let progress = '0';
    let countries = '0';
    let places = '0';

    onMount(async () => {
		await getProgress();
        await getPoints();
	});

    async function getProgress() {
        const response = await fetch('api/countries', {
			method: 'GET'
		});
		const data = await response.json();
        countries = data.length
        progress = Number(data.length/193 * 100).toFixed(2);
    }

    async function getPoints() {
        const response = await fetch('api/points', {
			method: 'GET'
		});
		const data = await response.json();
        places = data.length;
    }
</script>

<svelte:head>
	<title>Places</title>
</svelte:head>

{#if data.session}
	<div class="flex flex-col justify-center items-center h-screen">
		<div class="radial-progress" style="--value:{progress}; --size:12rem; --thickness: 1rem;" role="progressbar">{progress}% of the 193<span class="line-break"></span>UN-countries</div>
        <div class="font-sans text-lg font-bold pt-10">You have been to {places} Places in {countries} different countries</div>
	</div>
{:else}
	<div class="flex justify-center items-center h-screen">
		<article class="prose text-center">
			<h1>You are not logged in</h1>
			<form action="/login">
				<button type="submit" class="btn btn-primary bg-indigo-500 hover:bg-indigo-400">
					Login
				</button>
			</form>
		</article>
	</div>
{/if}
