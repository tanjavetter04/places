<div class="flex justify-center items-center h-screen">
    <article class="prose text-center">
        <h1>Enter your E-Mail to reset password</h1>
        <form action="/api/passwordReset" method="POST">
            <label class="input input-bordered flex items-center gap-2 m-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="email" class="grow" placeholder="E-Mail" name="email"/>
            </label>
            <button type="submit" class="btn btn-primary">Send</button>
        </form>
    </article>
</div>