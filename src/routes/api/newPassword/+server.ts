import { redirect, error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ locals, request }) => {
    const formData = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.supabase.auth.updateUser({
        password: formData.password as string,
    });

    if (err) {
        throw error(500, { message: 'Something went wrong setting your new password. Try again' });
    }

    redirect(303, "/login");
}