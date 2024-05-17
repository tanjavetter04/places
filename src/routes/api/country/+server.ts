import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const GET: RequestHandler = async ({ cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' })
    }

    const { data, error: err } = await supabase.from('countries').select('country').eq('user_id', cookies.get('sessionId'));

    return new Response(JSON.stringify(data), { status: 200 });
}

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' });
    }

    const { longitude, latitude } = await request.json();

    let url = new URL('http://localhost:5173/api/reverseCountry');
    url.searchParams.append('longitude', longitude);
    url.searchParams.append('latitude', latitude);

    const response = await fetch(url, {
        method: 'GET',
    });

    response.json().then(async function (country) {
        const { error:err } = await supabase.from('countries').delete().match({ user_id: cookies.get('sessionId'), country: country });
    });

    
    redirect(303, "/home");
}