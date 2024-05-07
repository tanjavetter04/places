import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { AuthApiError } from "@supabase/supabase-js"

export const POST: RequestHandler = async ({ locals, request }) => {
    const formData = Object.fromEntries(await request.formData())
    
    const { data, error } = await locals.supabase.auth.resetPasswordForEmail(formData.email as string, {
        redirectTo: 'http://localhost:5173/login/newPassword',
    })

    redirect(303, "/")
}