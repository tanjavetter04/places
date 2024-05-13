<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

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

		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl
		});

		map.addControl(geocoder);

		map.on('load', function () {
			map.addLayer(
				{
					id: 'country-boundaries',
					source: {
						type: 'vector',
						url: 'mapbox://mapbox.country-boundaries-v1'
					},
					'source-layer': 'country_boundaries',
					type: 'fill',
					paint: {
						'fill-color': '#d2361e',
						'fill-opacity': 0.4
					}
				},
				'country-label'
			);

			map.setFilter('country-boundaries', ['in', 'iso_3166_1_alpha_3', 'NLD', 'ITA', 'USA']);
		});

		geocoder.on('result', function (e) {
			console.log(e.result.center);
			savePoint(e.result.center[0], e.result.center[1]);
		});

		var markers = [];
		for (let i = 50; i < 60; i++) {
			let marker = new mapboxgl.Marker().setLngLat([i, 7]).addTo(map);
			markers.push(marker);
		}
	});

	export let data: PageData;

	export async function savePoint(lat: number, long: number) {
		const response = await fetch('api/savePoint', {
    		method: 'POST',
			body: JSON.stringify({ lat, long })
		});
	}
</script>

{#if data.session}
	<div id="map" />
{:else}
	<div class="flex justify-center items-center h-screen">
		<article class="prose text-center">
			<h1>You are not logged in</h1>
			<form action="/login">
				<button type="submit" class="btn btn-primary bg-indigo-500 hover:bg-indigo-400">Login</button>
			</form>
		</article>
	</div>
{/if}

<style>
	#map {
		position: fixed;
		top: 50;
		width: 100%;
		height: 100%;
	}
</style>
