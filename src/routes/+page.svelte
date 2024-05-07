<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Places</title>
</svelte:head>

	<div class="flex justify-center items-center h-screen">
		<article class="prose text-center">
			<h1>Places</h1>
			<h2>visualize where you have been</h2>
			<br>
			{#if !data.session}
				<form action="/login">
					<button class="btn btn-primary">Login</button>
				</form>
			{:else}
				<form action="/api/logout" method="POST">
					<button class="btn btn-primary">Logout</button>
				</form>
			{/if}
		</article>
	</div>
