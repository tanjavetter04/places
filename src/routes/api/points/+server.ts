import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const POST: RequestHandler = async ({ request, cookies }) => {
    const user_id = cookies.get('sessionId');

    if (!user_id) {
        throw error(401, { message: 'You are not logged in' });
    }
    
    const { longitude, latitude } = await request.json();

    const { error: err } = await supabase.from('points').insert([{ longitude: longitude, latitude: latitude, user_id: user_id }]);

    let url = new URL('http://localhost:5173/api/reverseCountry');
    url.searchParams.append('longitude', longitude);
    url.searchParams.append('latitude', latitude);

    const response = await fetch(url, {
        method: 'GET',
    });

    response.json().then(async function (value) {
        let country = value.country;
        let countryUrl = new URL('http://localhost:5173/api/country');
        countryUrl.searchParams.append('country', country);
        countryUrl.searchParams.append('user_id', user_id!!)

        const countryResponse = await fetch(countryUrl, {
			method: 'GET'
		});

        countryResponse.json().then(async function (point_count) {
            if (point_count.length != 0) {
                let newPoint_count = point_count[0].point_count + 1;
                const putResponse = await fetch('http://localhost:5173/api/country', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ country, newPoint_count, user_id })
                })
            } else {
                const postResponse = await fetch('http://localhost:5173/api/country', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ country, user_id })
                })
            }
        })
    });

    redirect(303, "/home");
}

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

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const user_id = cookies.get('sessionId');

    if (!user_id) {
        throw error(401, { message: 'You are not logged in' });
    }

    const { longitude, latitude } = await request.json();

    const { error: err } = await supabase.from('points').delete().match({ user_id: user_id, longitude: longitude, latitude: latitude });

    let url = new URL('http://localhost:5173/api/reverseCountry');
    url.searchParams.append('longitude', longitude);
    url.searchParams.append('latitude', latitude);

    const response = await fetch(url, {
        method: 'GET',
    });

    response.json().then(async function (value) {
        let country = value.country;
        let countryUrl = new URL('http://localhost:5173/api/country');
        countryUrl.searchParams.append('country', country);
        countryUrl.searchParams.append('user_id', user_id!!);

        const countryResponse = await fetch(countryUrl, {
			method: 'GET'
		});

        countryResponse.json().then(async function (point_count) {
            if (point_count[0].point_count > 1) {
                let newPoint_count = point_count[0].point_count - 1;
                const response = await fetch('http://localhost:5173/api/country', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ country, newPoint_count, user_id })
                })
            } else {
                const response = await fetch('http://localhost:5173/api/country', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ country, user_id })
                })
            }
        })
    });

    redirect(303, "/home");
}