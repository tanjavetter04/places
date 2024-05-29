import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const GET: RequestHandler = async ({ cookies }) => {
    const user_id = cookies.get('sessionId');

    if (!user_id) {
        throw error(401, { message: 'You are not logged in' });
    }

    const { data, error: err } = await supabase.from('points').select('longitude, latitude').eq('user_id', user_id);

    if (err) {
        throw error(500, { message: 'Database query failed' + err.message });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}

export const POST: RequestHandler = async ({ request, cookies }) => {
    const user_id = cookies.get('sessionId');

    if (!user_id) {
        throw error(401, { message: 'You are not logged in' });
    }

    const { longitude, latitude } = await request.json();

    const { error: err } = await supabase.from('points').insert([{ longitude: longitude, latitude: latitude, user_id: user_id }]);

    const value = await reverseCountry(longitude, latitude);
    const country = value.country;

    const point_count = await getCountry(country, user_id);
    if (point_count.length != 0) {
        let newPoint_count = point_count[0].point_count + 1;
        putCountry(country, newPoint_count, user_id);
    } else {
        postCountry(country, user_id);
    }

    redirect(303, "/home");
}

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const user_id = cookies.get('sessionId');

    if (!user_id) {
        throw error(401, { message: 'You are not logged in' });
    }

    const { longitude, latitude } = await request.json();

    const { error: err } = await supabase.from('points').delete().match({ user_id: user_id, longitude: longitude, latitude: latitude });

    const value = await reverseCountry(longitude, latitude);
    let country = value.country;

    const point_count = await getCountry(country, user_id);
    if (point_count[0].point_count > 1) {
        let newPoint_count = point_count[0].point_count - 1;
        putCountry(country, newPoint_count, user_id);
    } else {
        deleteCountry(country, user_id);
    }

    redirect(303, "/home");
}

async function reverseCountry(longitude: string, latitude: string) {
    let url = new URL('https://keen-kitsune-3298f4.netlify.app/api/reverseCountry');
    url.searchParams.append('longitude', longitude);
    url.searchParams.append('latitude', latitude);
    const response = await fetch(url, {
        method: 'GET',
    });
    return response.json()
}

async function getCountry(country: string, user_id: string) {
    const countryUrl = new URL('https://keen-kitsune-3298f4.netlify.app/api/country');
    countryUrl.searchParams.append('country', country);
    countryUrl.searchParams.append('user_id', user_id!!)

    const countryResponse = await fetch(countryUrl, {
        method: 'GET'
    });

    return countryResponse.json()
}

async function putCountry(country: string, newPoint_count: number, user_id: string) {
    await fetch('https://keen-kitsune-3298f4.netlify.app/api/country', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country, newPoint_count, user_id })
    })
}

async function postCountry(country: string, user_id: string) {
    await fetch('https://keen-kitsune-3298f4.netlify.app/api/country', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country, user_id })
    })
}

async function deleteCountry(country: string, user_id: string) {
    await fetch('https://keen-kitsune-3298f4.netlify.app/api/country', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country, user_id })
    })
}