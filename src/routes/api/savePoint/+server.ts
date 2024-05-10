import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const POST: RequestHandler = async ({ request }) => {
    const { lat, long, userId } = await request.json();
    const { error: err } = await supabase.from('points').insert([{ latitude: lat, longitude: long, user_id: userId }])

    if (err) {
        throw error(500, { message: 'Something went wrong saving the point. Try again' })
    }

    redirect(303, "/home")
}

export const GET: RequestHandler = async ({ request }) => {
    console.log(...request.headers);

    const { error: err } = await supabase.from('points').select('latitude, longitude').eq('user_id', 'test' )
    return new Response(JSON.stringify("hallo"), { status: 200 })
}