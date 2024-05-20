import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const GET: RequestHandler = async ({ cookies, url }) => {
    let country = url.searchParams.get('country');
    let user_id = url.searchParams.get('user_id');

    if (!country || !user_id) {
        throw error(400, { message: 'Missing parameters' });
    }

    const { data, error: err } = await supabase.from('countries').select('point_count').match({ user_id: user_id, country: country });

    if (err) {
        throw error(500, { message: 'Database query failed' + err.message });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}

export const PUT: RequestHandler = async ({ request }) => {
    const { country, newPoint_count, user_id } = await request.json();

    if (!country || !newPoint_count || !user_id) {
        throw error(400, { message: 'Missing parameters' });
    }

    const { data, error: err } = await supabase.from('countries').update({ point_count: newPoint_count }).match({ user_id: user_id, country: country });

    if (err) {
        throw error(500, { message: 'Database update failed' + err.message });
    }
    
    return new Response(JSON.stringify(data), { status: 200 });
}

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const { country, user_id } = await request.json();
    
    if (!country || !user_id) {
        throw error(400, { message: 'Missing parameters' });
    }

    const { data, error: err } = await supabase.from('countries').delete().match({ user_id: user_id, country: country });

    if (err) {
        throw error(500, { message: 'Database delete failed' + err.message });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}

export const POST: RequestHandler = async ({ request, cookies }) => {
    const { country, user_id } = await request.json();
    
    if (!country || !user_id) {
        throw error(400, { message: 'Missing parameters' });
    }

    const { data, error: err } = await supabase.from('countries').insert({ user_id: user_id, country: country, point_count: 1 });

    if (err) {
        throw error(500, { message: 'Database insert failed' + err.message });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}