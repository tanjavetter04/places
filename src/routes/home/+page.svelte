<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	let map;

	onMount(async () => {
		mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

		map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v12',
			projection: 'globe',
			center: [5, 46],
			zoom: 2
		});
	});

	export let data: PageData;
</script>

<div id="map" />

{#if data.session}
	<div class="flex justify-center items-center h-screen">
		<article class="prose text-center">
			<h1>Welcome, {data.session.user.email}</h1>
			<form action="/api/logout" method="POST">
				<button type="submit" class="btn btn-primary">Logout</button>
			</form>
		</article>
	</div>
{:else}
	<div class="flex justify-center items-center h-screen">
		<article class="prose text-center">
			<h1>You are not logged in</h1>
			<form action="/login">
				<button type="submit" class="btn btn-primary">Login</button>
			</form>
		</article>
	</div>
{/if}

<style>
	#map {
		position: fixed;
		top: 50;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
