import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const POST: RequestHandler = async ({ request, cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' })
    }

    const { lat, long } = await request.json();
    const { error: err } = await supabase.from('points').insert([{ latitude: lat, longitude: long, user_id: cookies.get('sessionId') }])

    if (err) {
        throw error(500, { message: 'Something went wrong saving the point. Try again' })
    }

    redirect(303, "/home")
}

export const GET: RequestHandler = async ({ cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' })
    }

    const { data, error: err } = await supabase.from('points').select('latitude, longitude').eq('user_id', cookies.get('sessionId'))
    return new Response(JSON.stringify(data), { status: 200 })
}