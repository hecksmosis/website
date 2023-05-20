<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main class="mt-5 w-96">
	<div
		class="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
	>
		<form class="space-y-6" action="?/signup" method="post">
			<h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up</h5>
			<div>
				<label
					for="email-address-icon"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label
				>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							class="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
							/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg
						>
					</div>
					<input
						type="email"
						id="email-address-icon"
						name="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name@example.com"
					/>
				</div>
			</div>

			<div>
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Your password</label
				>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							fill="none"
							class="w-5 h-5 text-gray-500 dark:text-gray-400"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
							/>
						</svg>
					</div>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
			</div>

			<div>
				{#if form?.status == 400}
					<div class="text-red-500 text-sm font-medium">{form?.message}</div>
				{/if}
			</div>

			<button
				type="submit"
				class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Sign up</button
			>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Already registered? <a
					href="/signin"
					class="text-blue-700 hover:underline dark:text-blue-500">Sign in</a
				>
			</div>
		</form>
	</div>
</main>
