<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	let { users, supabase } = data;

	type UserDeleteArgs = { data: FormData };

	async function deleteUser({ data }: UserDeleteArgs) {
		const username = data.get('user');
		// Get the user's id
		const { data: user, error: error0 } = await supabase
			.from('profiles')
			.select('id')
			.eq('username', username)
			.single();

		if (error0) {
			console.log(error0);
			return;
		}

		if (!user) {
			console.log('User not found');
			return;
		}

		const { error: error1 } = await supabase.auth.admin.deleteUser(user.id);
		if (error1) {
			console.log(error1);
			return;
		}
	}

	async function removeRole() {}
</script>

<div
	class="p-6 mt-4 space-y-4 md:space-y-6 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700"
>
	<!--Create a table that displays users-->
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
	>
		Users
	</h1>
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3"> Username </th>
					<th scope="col" class="px-6 py-3"> Email </th>
					<th scope="col" class="px-6 py-3"> Full name </th>
					<th scope="col" class="px-6 py-3"> Website </th>
					<th scope="col" class="px-6 py-3"> Roles </th>
					<th scope="col" class="px-6 py-3"> Action </th>
				</tr>
			</thead>
			<tbody>
				{#each users as user}
					<tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{user.username}
						</th>
						<td class="px-6 py-4">{user.email}</td>
						<td class="px-6 py-4">{user.full_name}</td>
						<td class="px-6 py-4">{user.website}</td>
						<td class="px-6 py-4 flex flex-row">
							<div class="bg-green-600 rounded-lg p-1 px-2 m-1">
								<div class="flex flex-row">
									<div class=" first-letter:uppercase mr-2">{user.role}</div>
									<!-- Add x icon to remove the role -->
									<form method="POST" action="/api/roles/remove">
										<input type="hidden" name="user" value={user.username} />
										<input type="hidden" name="role" value={user.role} />
										<button
											class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-red-900"
											><svg
												class="h-3 w-3"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg></button
										>
									</form>
								</div>
							</div>
						</td>
						<td class="px-6 py-4">
							<form method="POST" action="/api/delete" use:enhance={deleteUser}>
								<input type="hidden" name="user" value={user.username} />
								<button
									class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-red-900"
									>Delete</button
								>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
