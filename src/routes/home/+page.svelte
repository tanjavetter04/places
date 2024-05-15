<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

	let map;
	var filter: string[] = ['in', 'iso_3166_1_alpha_3', 'DEU']

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
						'fill-opacity': 1
					}
				},
				'country-label'
			);

			//showCountries()
			map.setFilter('country-boundaries', ...filter);
		});

		geocoder.on('result', function (e) {
			savePoint(e.result.center[0], e.result.center[1]);
		});

		getPoints();
	});

	export let data: PageData;

	async function savePoint(long: number, lat: number) {
		await fetch('api/points', {
			method: 'POST',
			body: JSON.stringify({ long, lat })
		});
		getPoints();
	}

	async function getPoints() {
		var markers = [];
		const response = await fetch('api/points', {
			method: 'GET'
		});
		response.json().then(function (value) {
			for (let i = 0; i < value.length; i++) {
				let marker = new mapboxgl.Marker()
					.setLngLat([value[i].longitude, value[i].latitude])
					.addTo(map);
				markers.push(marker);
			}
		});
	}

	async function showCountries() {
		const response = await fetch('api/getCountries', {
			method: 'GET'
		});
		response.json().then(function (value) {
			for (var i = 0; i < value.length; i++) {
				filter.push(value[i]['country']);
			}
			console.log(filter)
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
				<button type="submit" class="btn btn-primary bg-indigo-500 hover:bg-indigo-400"
					>Login</button
				>
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
