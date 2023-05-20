import type { Section } from '$lib/interfaces';
import { writable } from 'svelte/store';

export const title = writable<string>('Kake');
export const sections = writable<Section[]>([]);

sections.subscribe((value) => {
	console.log('SECTIONS VALUEEEEEEE:' + value);
});
