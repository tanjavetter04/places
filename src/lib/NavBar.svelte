<nav>
	<slot>
		<div class="navbar bg-base-100">
			<div class="flex-1">
				<a href="/home" class="btn btn-ghost text-xl">Places</a>
			</div>
			<div class="flex-none">
				<form action="/api/logout" method="POST">
					<button type="submit" class="btn btn-ghost text-xl">Logout</button>
				</form>
				<form action="/login">
					<button type="submit" class="btn btn-ghost text-xl">Login</button>
				</form>
			</div>
		</div>
	</slot>
</nav>
