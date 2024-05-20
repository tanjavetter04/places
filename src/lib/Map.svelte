<script lang="ts">

import { onMount } from 'svelte';
  import mapboxgl from 'mapbox-gl';

  let map;
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

  function initializeMap() {
    map = new mapboxgl.Map({
      container: 'map', // Container-ID
      style: 'mapbox://styles/mapbox/streets-v11', // Stil-URL
      center: [13.4050, 52.5200], // Startposition [lng, lat] (Berlin)
      zoom: 9 // Start-Zoom
    });
  }

  function reloadMap() {
    if (map) {
      map.remove();
    }
    initializeMap();
  }

  onMount(() => {
    initializeMap();
  });

</script>