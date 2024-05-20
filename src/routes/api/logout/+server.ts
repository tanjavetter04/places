import { error, redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ locals, cookies }) => {
	const { error: err } = await locals.supabase.auth.signOut();

	if (err) {
		throw error(500, "Something went wrong logging you out." + err.message)
	};

	await cookies.delete('sessionId', { path: '/' });

	redirect(303, "/");
}