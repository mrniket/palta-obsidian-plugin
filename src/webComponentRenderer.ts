import { PaltaCodeBlock } from "./codeBlockParser";

export function renderWebComponent(
	paltaCodeBlock: PaltaCodeBlock,
	parentElement: HTMLElement
) {
	const paltaNoteElement = document.createElement("palta-note");
	for (const [key, value] of Object.entries(paltaCodeBlock.frontMatter)) {
		paltaNoteElement.setAttribute(key, value);
	}
	paltaNoteElement.textContent = paltaCodeBlock.matras;
	parentElement.appendChild(paltaNoteElement);
}
