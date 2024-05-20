import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

export const GET: RequestHandler = async ({ url }) => {
    let longitude = url.searchParams.get('longitude');
    let latitude = url.searchParams.get('latitude');

    if (!longitude || !latitude) {
        throw error(400, { message: 'Missing parameters' });
    }

    const response = await fetchMapboxData(longitude, latitude);

    const value = await response.json();
    const country = value.features[0].properties.context.country.country_code_alpha_3;
    const place = value.features[0].properties.context.place.name;

    if (!country || !place) {
        throw error(500, { message: 'Something went wrong getting the country or place.' });
    }

    return new Response(JSON.stringify({ country: country, place: place }), { status: 200 });
}

async function fetchMapboxData(longitude: string, latitude: string) {
    let searchUrl = new URL('https://api.mapbox.com/search/geocode/v6/reverse');
    searchUrl.searchParams.append('longitude', longitude);
    searchUrl.searchParams.append('latitude', latitude);
    searchUrl.searchParams.append('access_token', PUBLIC_MAPBOX_TOKEN);

    const response = await fetch(searchUrl, {
        method: 'GET'
    });

    return response;
}