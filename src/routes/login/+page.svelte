<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<div class="flex justify-center items-center h-screen">
	<article class="prose text-center">
		{#if !data.session}
			<h1>Log in with email and password</h1>
			<form action="/api/login" method="POST">
				<label class="input input-bordered flex items-center gap-2 m-5">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/></svg>
					<input type="email" class="grow" placeholder="E-Mail" name="email" required/>
				</label>
				<label class="input input-bordered flex items-center gap-2 m-5">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd"/></svg>
					<input type="password" class="grow" placeholder="Password" name="password" required/>
				</label>
				<button type="submit" class="btn btn-primary bg-indigo-500 hover:bg-indigo-400">Login</button>
			</form>
			<h4>New here?</h4>
			<a href="/login/register" class="btn btn-primary bg-indigo-500 hover:bg-indigo-400">Sign up</a>
			<h4>Forgot password?</h4>
			<a href="/login/passwordReset">Password reset</a>
		{:else}
			<h1>You are already logged in</h1>
			<form action="/api/logout" method="POST">
				<button type="submit" class="btn btn-primary bg-indigo-500 hover:bg-indigo-400">Logout</button>
			</form>
		{/if}
	</article>
</div>
