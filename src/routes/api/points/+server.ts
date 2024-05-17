import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"
import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

export const POST: RequestHandler = async ({ request, cookies }) => {
    let user_id: string | undefined;

    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' });
    } else {
        user_id = cookies.get('sessionId');
    }

    const { longitude, latitude } = await request.json();

    const { error: err } = await supabase.from('points').insert([{ longitude: longitude, latitude: latitude, user_id: user_id }]);

    if (err) {
        throw error(500, { message: 'Something went wrong saving the point. Try again' });
    }

    getCountry(longitude, latitude, user_id);

    redirect(303, "/home");
}

async function getCountry(longitude: string, latitude: string, user_id: string | undefined) {
    let url = new URL('http://localhost:5173/api/reverseCountry');
    url.searchParams.append('longitude', longitude);
    url.searchParams.append('latitude', latitude);

    const response = await fetch(url, {
        method: 'GET',
    });

    response.json().then(async function (country) {
        await supabase.from('countries').upsert({ country: country, user_id: user_id }, { ignoreDuplicates: false })
    });
}

export const GET: RequestHandler = async ({ cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' });
    }

    const { data, error: err } = await supabase.from('points').select('longitude, latitude').eq('user_id', cookies.get('sessionId'));

    return new Response(JSON.stringify(data), { status: 200 });
}

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' });
    }

    const { longitude, latitude } = await request.json();

    const { error: err } = await supabase.from('points').delete().match({ user_id: cookies.get('sessionId'), longitude: longitude, latitude: latitude });

    redirect(303, "/home");
}