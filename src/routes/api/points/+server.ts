import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { supabase } from "$lib/supabaseClient"
import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

export const POST: RequestHandler = async ({ request, cookies }) => {
    let user_id: string | undefined
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' })
    } else {
        user_id = cookies.get('sessionId')
    }
    
    const { long, lat } = await request.json();

    const { error: err } = await supabase.from('points').insert([{ longitude: long, latitude: lat, user_id: user_id }])

    if (err) {
        throw error(500, { message: 'Something went wrong saving the point. Try again' })
    }

    getCountry(long, lat, user_id)

    redirect(303, "/home")
}

async function getCountry(long: string, lat: string, user_id: string | undefined) {
    let url = new URL('https://api.mapbox.com/search/geocode/v6/reverse')
    url.searchParams.append('longitude', long)
    url.searchParams.append('latitude', lat)
    url.searchParams.append('access_token', PUBLIC_MAPBOX_TOKEN)
    
    console.log(long + "; " + lat)
    const response = await fetch(url, {
        method: 'GET'
    })
  
    response.json().then(function (value) {
        saveCountry(value.features[0].properties.context.country.country_code_alpha_3, user_id)
    });
}

async function saveCountry(country: string, user_id: string | undefined) {
    const { error: err } = await supabase.from('countries').upsert({ country: country, user_id: user_id }, {ignoreDuplicates: false })
}

export const GET: RequestHandler = async ({ cookies }) => {
    if (cookies.get('sessionId') == undefined) {
        throw error(401, { message: 'You are not logged in' })
    }

    const { data, error: err } = await supabase.from('points').select('longitude, latitude').eq('user_id', cookies.get('sessionId'))
    return new Response(JSON.stringify(data), { status: 200 })
}