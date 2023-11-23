import { Plugin } from "obsidian";
import { parsePaltaCodeBlock } from "src/codeBlockParser";
import { renderWebComponent } from "src/webComponentRenderer";
import PaltaNoteDefaults from "palta-note-test";

export default class PaltaPlugin extends Plugin {
	async onload() {
		this.registerCustomElementIfNotExists();
		this.addCSSVariables()
		this.registerMarkdownCodeBlockProcessor(
			"palta",
			(source, el: HTMLElement, ctx) => {
				const paltaCodeBlockData = parsePaltaCodeBlock(source);
				renderWebComponent(paltaCodeBlockData, el);
			}
		);
	}

	private addCSSVariables() {
		const body = document.body;
		const computedStyle = getComputedStyle(body);
		body.style.setProperty("--palta-accent-color", computedStyle.getPropertyValue("--interactive-accent"));
		body.style.setProperty("--palta-text-color", computedStyle.getPropertyValue("--text-normal"));
	}

	registerCustomElementIfNotExists() {
		if (customElements.get("palta-note") !== undefined) {
			return;
		}
		const { PaltaNote } = PaltaNoteDefaults;
		customElements.define("palta-note", PaltaNote);
	}
}
