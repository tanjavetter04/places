import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { AuthApiError } from "@supabase/supabase-js"

export const POST: RequestHandler = async ({ locals, request }) => {
  const formData = Object.fromEntries(await request.formData())

  const { data: user, error: err } = await locals.supabase.auth.signInWithPassword({
    email: formData.email as string,
    password: formData.password as string,
  })

  redirect(303, "/home")
}