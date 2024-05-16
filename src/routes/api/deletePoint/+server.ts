import { error, redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' })
    }

    const { longitude, latitude } = await request.json();

    const { error: err } = await supabase.from('points').delete().match({user_id: cookies.get('sessionId'), longitude: longitude, latitude: latitude})

    redirect(303, "/home")
}