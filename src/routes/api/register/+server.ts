import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ locals, request }) => {
    const formData = Object.fromEntries(await request.formData())

    const { error: err } = await locals.supabase.auth.signUp({
        email: formData.email as string,
        password: formData.password as string,
    })

    if (err) {
        throw error(500, { message: 'Something went wrong registering you. Try again' })
    }

    redirect(303, "/home")
}