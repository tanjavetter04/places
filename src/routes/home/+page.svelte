<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if data.session}
	<div class="flex justify-center items-center h-screen">
		<article class="prose text-center">
			<h1>Welcome, {data.session.user.email}</h1>
			<form action="/api/logout" method="POST">
				<button type="submit" class="btn btn-primary">Logout</button>
			</form>
		</article>
	</div>
{:else}
<div class="flex justify-center items-center h-screen">
    <article class="prose text-center">
        <h1>Not logged in</h1>
        <form action="/login">
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </article>
</div>
{/if}