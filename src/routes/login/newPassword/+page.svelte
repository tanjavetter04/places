<div class="flex justify-center items-center h-screen">
    <article class="prose text-center">
        <h1>Change password</h1>
        <form action="/api/login/newPassword" method="POST">
            <label class="input input-bordered flex items-center gap-2 m-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
                <input type="password" class="grow" placeholder="Password" name="password" required/>
            </label>
            <button type="submit" class="btn btn-primary bg-indigo-500 hover:bg-indigo-400">Confirm</button>
        </form>
    </article>
</div>