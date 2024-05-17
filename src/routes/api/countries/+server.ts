import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const GET: RequestHandler = async ({ cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' })
    }

    const { data, error: err } = await supabase.from('countries').select('country').eq('user_id', cookies.get('sessionId'));

    return new Response(JSON.stringify(data), { status: 200 });
}