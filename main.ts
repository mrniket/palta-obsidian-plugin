import { Plugin } from "obsidian";
import { parsePaltaCodeBlock } from "src/codeBlockParser";
import { renderWebComponent } from "src/webComponentRenderer";
import PaltaNoteDefaults from "palta-note-test";

export default class PaltaPlugin extends Plugin {
	async onload() {
		this.registerCustomElementIfNotExists();
		this.registerMarkdownCodeBlockProcessor(
			"palta",
			(source, el: HTMLElement, ctx) => {
				const paltaCodeBlockData = parsePaltaCodeBlock(source);
				renderWebComponent(paltaCodeBlockData, el);
			}
		);
	}


	registerCustomElementIfNotExists() {
		if (customElements.get("palta-note") !== undefined) {
			return;
		}
		const { PaltaNote } = PaltaNoteDefaults;
		customElements.define("palta-note", PaltaNote);
	}
}
