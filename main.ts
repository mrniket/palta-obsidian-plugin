import { Plugin } from "obsidian";
import { parsePaltaCodeBlock } from "src/codeBlockParser";
import { renderWebComponent } from "src/webComponentRenderer";
import { setPaltaNoteTagName } from "src/paltaNoteTagName";

// Global counter for unique custom element tag names across plugin reloads.
// Stored on window so it persists when Obsidian hot-reloads the plugin.
declare global {
	interface Window {
		_paltaNoteCounter?: number;
	}
}

export default class PaltaPlugin extends Plugin {
	async onload() {
		await this.registerCustomElement();
		this.registerMarkdownCodeBlockProcessor(
			"palta",
			(source, el: HTMLElement, ctx) => {
				const paltaCodeBlockData = parsePaltaCodeBlock(source);
				renderWebComponent(paltaCodeBlockData, el);
			}
		);
	}

	async registerCustomElement() {
		const counter = (window._paltaNoteCounter ?? -1) + 1;
		window._paltaNoteCounter = counter;

		const tagName = counter === 0 ? "palta-note" : `palta-note-${counter}`;
		setPaltaNoteTagName(tagName);

		if (customElements.get(tagName)) {
			return;
		}

		try {
			const PaltaNoteDefaults = (await import("palta-note-test")).default;
			const { PaltaNote } = PaltaNoteDefaults;
			if (!customElements.get(tagName)) {
				customElements.define(tagName, class extends PaltaNote {});
			}
		} catch (e) {
			// palta-note-test's @customElement decorator may auto-register
			// "palta-note" which throws if already defined. Safe to ignore —
			// we register under our own unique tag name above.
			if (!(e instanceof DOMException && e.name === "NotSupportedError")) {
				throw e;
			}
			// Decorator auto-registered "palta-note" on first load;
			// on subsequent loads, register our new tag with the class.
			const PaltaNoteClass = customElements.get("palta-note");
			if (PaltaNoteClass && !customElements.get(tagName)) {
				customElements.define(tagName, class extends PaltaNoteClass {});
			}
		}
	}
}
