import { PaltaCodeBlock } from "./codeBlockParser";

export function renderWebComponent(
	paltaCodeBlock: PaltaCodeBlock,
	parentElement: HTMLElement
) {
	let paltaNoteElement: HTMLElement;
	// @ts-ignore
	if (parentElement.createEl !== undefined) {
		// @ts-ignore
		paltaNoteElement = parentElement.createEl("palta-note")
	} else {
		// @ts-ignore
		paltaNoteElement = document.createElement('palta-note') as HTMLElement
	}
	for (const [key, value] of Object.entries(paltaCodeBlock.frontMatter)) {
		paltaNoteElement.setAttribute(key, value);
	}
	paltaNoteElement.textContent = paltaCodeBlock.matras;
	parentElement.appendChild(paltaNoteElement);
}
