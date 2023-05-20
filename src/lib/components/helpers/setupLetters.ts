export default function setupLetters(component: HTMLDivElement): void {
	component.innerHTML =
		component.textContent?.replace(
			/\S/g,
			`<span class='letter-${component.id}' style='display: inline-block'>$&</span>`
		) ?? '';
}
