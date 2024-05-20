import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ locals, request }) => {
    const formData = Object.fromEntries(await request.formData());

    const { error: err } = await locals.supabase.auth.resetPasswordForEmail(formData.email as string, {
        redirectTo: 'http://localhost:5173/login/newPassword',
    });

    if (err) {
        throw error(500, { message: 'Something went wrong resetting your password.' + err.message });
    }

    redirect(303, "/");
}