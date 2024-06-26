import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ locals, request, cookies }) => {
  const formData = Object.fromEntries(await request.formData());

  const { data, error: err } = await locals.supabase.auth.signInWithPassword({
    email: formData.email as string,
    password: formData.password as string,
  });

  if (err) {
    throw error(500, { message: 'Something went wrong logging you in.' + err.message });
  }

  cookies.set('sessionId', data.session.user.id, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 60 * 60 * 24 * 30
  });

  redirect(303, "/home");
}