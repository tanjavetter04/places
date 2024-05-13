import { error, redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ locals, cookies }) => {
	const { error: err } = await locals.supabase.auth.signOut()

	if (err) {
		throw error(500, "Something went wrong logging you out. Try again")
	}

	await cookies.delete('sessionId', { path: '/' })
	console.log(cookies.get('sessionId'));

	redirect(303, "/")
}