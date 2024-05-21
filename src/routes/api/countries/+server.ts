import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const GET: RequestHandler = async ({ cookies }) => {
    const sessionId = cookies.get('sessionId');
    
    if (!sessionId) {
        throw error(401, { message: 'You are not logged in' })
    }

    const { data, error: err } = await supabase.from('countries').select('country').eq('user_id', sessionId);

    if (err) {
        throw error(500, { message: 'Database query failed' + err.message });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}