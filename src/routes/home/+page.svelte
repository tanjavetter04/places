<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

	export let data: PageData;
	let map: mapboxgl.Map;

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

			showCountries()
				.then((filter) => {
					map.setFilter('country-boundaries', filter);
				})
				.catch((error) => {
					console.error('Error fetching the countries:', error);
				});
		});

		geocoder.on('result', function (e) {
			savePoint(e.result.center[0], e.result.center[1]);
		});

		showPoints();
	});

	async function savePoint(longitude: number, latitude: number) {
		await fetch('api/points', {
			method: 'POST',
			body: JSON.stringify({ longitude, latitude })
		});
		mapReload();
	}

	async function showPoints() {
		var markers = [];
		const response = await fetch('api/points', {
			method: 'GET'
		});
		response.json().then(function (value) {
			for (let i = 0; i < value.length; i++) {
				let marker = new mapboxgl.Marker()
					.setLngLat([value[i].longitude, value[i].latitude])
					.addTo(map);

				const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
					<div>
						<p>Koordinaten: ${value[i].longitude}, ${value[i].latitude}</p>
						<button id="delete-marker-${i}" class="btn btn-primary">Löschen</button>
					</div>
				`);

				marker.setPopup(popup);

				marker.getElement().addEventListener('click', () => {
					popup.on('open', () => {
						const deleteButton = document.getElementById(`delete-marker-${i}`);
						if (deleteButton != null) {
							deleteButton.addEventListener('click', () => {
								marker.remove();
								showPoints();
								removePoint(value[i].longitude, value[i].latitude);
							});
						}
					});
				});

				markers.push(marker);
			}
		});
		showCountries();
	}

	async function removePoint(longitude: number, latitude: number) {
		await fetch('api/points', {
			method: 'DELETE',
			body: JSON.stringify({ longitude, latitude })
		});
		mapReload();
	}

	async function showCountries() {
		const response = await fetch('api/countries', {
			method: 'GET'
		});
		const data = await response.json();
		const countries = data.map((item) => item.country);
		const filter: string[] = ['in', 'iso_3166_1_alpha_3', ...countries];
		map.setFilter('country-boundaries', filter);
		return filter;
	}

	function mapReload() {
		showPoints();
		showCountries();
	}
</script>

{#if data.session}
	<div id="map" />
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

<style>
	#map {
		position: fixed;
		top: 50;
		width: 100%;
		height: 100%;
	}
</style>
