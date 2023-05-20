<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Message } from '$lib/interfaces';
	import * as Ably from 'ably';
	import { PUBLIC_KEY } from '$env/static/public';
	import { writable } from 'svelte/store';
	import { Button, Chevron, Dropdown, Radio } from 'flowbite-svelte';

	export let data: PageData;

	let textfield = '';
	let username = data.username;
	let channel: Ably.Types.RealtimeChannelPromise | null = null;

	const chats = writable([] as Message[]);

	onMount(() => {
		const ably = new Ably.Realtime.Promise({
			key: PUBLIC_KEY,
			clientId: 'someid'
		});

		channel = ably.channels.get('your-channel-name');
		channel.subscribe((message: Ably.Types.Message) => {
			let data = message.data;
			if (room == data.room) {
				chats.update((prevChats) => [
					...prevChats.filter((ch) => ch.room == data.room),
					{
						from: data.from,
						message: data.message,
						time: data.time,
						room: data.room
					}
				]);
			}
		});

		return () => {
			if (!channel) return;
			channel.unsubscribe('your-channel-name');
			channel.detach();
			ably.close();
		};
	});

	const sendMessage = () => {
		if (!channel) return;
		channel.publish('test-message', {
			from: username,
			message: textfield,
			time: new Date().toLocaleTimeString(),
			room: room
		});
	};

	let room = 'general';
	$: {
		chats.set($chats.filter((ch) => ch.room == room));
	}
</script>

<div class="mt-4 w-[50vw]" style="height: calc(100vh - 6em)">
	<div class="h-full w-full max-w-md mx-auto bg-zinc-500 flex flex-col">
		<header
			class="px-6 py-4 border-b border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center justify-between"
		>
			<span class="font-bold text-xl">My Chat app</span>
			<Button><Chevron>{room}</Chevron></Button>
			<Dropdown class="w-44 p-3 space-y-3 text-sm">
				<li>
					<Radio name="group1" bind:group={room} value="general">general</Radio>
				</li>
				<li>
					<Radio name="group1" bind:group={room} value="chat1">chat1</Radio>
				</li>
				<li>
					<Radio name="group1" bind:group={room} value="dev">dev</Radio>
				</li>
			</Dropdown>
			<span>{username}</span>
		</header>

		<div class="h-full w-full p-4">
			{#each $chats as message}
				<div class="bg-zinc-300 rounded-xl rounded-tl-none px-4 py-3 my-4 w-fit">
					<span class="flex items-center space-between gap-4">
						<b>{message.from}</b>
						<i>{message.time}</i>
					</span>
					{message.message}
				</div>
			{/each}
		</div>

		<form
			action="#"
			on:submit|preventDefault={sendMessage}
			class="px-6 py-4 border-t border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center"
		>
			<input
				type="text"
				bind:value={textfield}
				placeholder="Type something..."
				class="bg-transparent border-none px-4 py-3 w-full"
			/>
			<button type="submit" class="shrink-0 border border-white rounded-lg px-4 py-3">Send</button>
		</form>
	</div>
</div>
