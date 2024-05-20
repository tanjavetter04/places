import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

export const GET: RequestHandler = async ({ url }) => {
    let longitude = url.searchParams.get('longitude');
    let latitude = url.searchParams.get('latitude');

    let country = null;
    let place = null;

    if (longitude != null && latitude != null) {
        let url = new URL('https://api.mapbox.com/search/geocode/v6/reverse');
        url.searchParams.append('longitude', longitude);
        url.searchParams.append('latitude', latitude);
        url.searchParams.append('access_token', PUBLIC_MAPBOX_TOKEN);

        const response = await fetch(url, {
            method: 'GET'
        });

        await response.json().then(function (value) {
            country = value.features[0].properties.context.country.country_code_alpha_3;
            place = value.features[0].properties.context.place.name;
        });
    }

    if (country == null || place == null) {
        throw error(500, { message: 'Something went wrong getting the country or place. Try again' });
    }

    return new Response(JSON.stringify({ country: country, place: place }), { status: 200 });
}