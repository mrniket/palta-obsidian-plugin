import { PaltaCodeBlock } from "./codeBlockParser";
import { getPaltaNoteTagName } from "./paltaNoteTagName";

export function renderWebComponent(
	paltaCodeBlock: PaltaCodeBlock,
	parentElement: HTMLElement
) {
	const tagName = getPaltaNoteTagName();
	let paltaNoteElement: HTMLElement;
	// @ts-ignore
	if (parentElement.createEl !== undefined) {
		// @ts-ignore
		paltaNoteElement = parentElement.createEl(tagName)
	} else {
		// @ts-ignore
		paltaNoteElement = document.createElement(tagName) as HTMLElement
	}
	paltaNoteElement.setAttribute("renderMode", "shorthand");
	for (const [key, value] of Object.entries(paltaCodeBlock.frontMatter)) {
		paltaNoteElement.setAttribute(key, value);
	}
	paltaNoteElement.textContent = paltaCodeBlock.matras;
	parentElement.appendChild(paltaNoteElement);
}
