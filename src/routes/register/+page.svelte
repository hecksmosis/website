<script lang="ts">
	import type { ActionData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';

	let sections = [
		{ name: 'Home', href: '/', show: true },
		{ name: 'Login', href: '/login', show: true },
		{ name: 'Register', href: '/register', show: true, active: true }
	];

	export let form: ActionData;
</script>

<main>
	<Navbar {sections} />
	<form method="post" action="?/login">
		<section class="mt-lg-4 mt-md-3 mt-sm-1 gradient-custom">
			<div class="container py-5 h-100">
				<div class="row d-flex justify-content-center align-items-center h-100">
					<div class="col-12 col-md-8 col-lg-6 col-xl-5">
						<div class="card bg-light text-black" style="border-radius: 1rem;">
							<div class="card-body p-5 text-center">
								<div class="mb-md-5 mt-md-4 pb-5">
									<h2 class="fw-bold mb-2 text-uppercase">Register</h2>
									<p class="text-black-50 mb-5">Please enter desired email address and password</p>

									<div class="form-floating mb-3">
										<input
											type="email"
											class="form-control"
											class:is-invalid={form?.status == 400}
											id="floatingInput"
											name="email"
											placeholder="name@example.com"
										/>
										<label for="floatingInput" style="color: black">Email address</label>
									</div>
									<div class="form-floating mb-4">
										<input
											type="password"
											class="form-control"
											class:is-invalid={form?.status == 400}
											id="floatingPassword"
											name="password"
											placeholder="Password"
										/>
										<label for="floatingPassword" style="color: black">Password</label>
									</div>

									<button class="btn btn-outline-dark btn-lg px-5" type="submit">Register</button>

									<div class="d-flex justify-content-center text-center mt-4 pt-1" id="login-error">
										{#if form?.status == 400}
											<p style="color: #bb0000;">Error: {form?.message}</p>
										{/if}
									</div>
								</div>

								<div>
									<p class="mb-0">
										Already have an account?
										<a href="/login" class="text-black-50 fw-bold">Log in</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</form>
</main>
