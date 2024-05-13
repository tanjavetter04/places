<nav>
	<slot>
		<div class="navbar bg-base-100 bg-indigo-500">
			<div class="flex-1">
				<a href="/home" class="btn btn-ghost text-xl text-black hover:bg-indigo-300">Places</a>
			</div>
			<div class="flex-none">
				<form action="/login">
					<button type="submit" class="btn btn-ghost text-xl text-black hover:bg-indigo-300">Login</button>
				</form>
				<form action="/api/logout" method="POST">
					<button type="submit" class="btn btn-ghost text-xl text-black hover:bg-indigo-300">Logout</button>
				</form>
			</div>
		</div>
	</slot>
</nav>
