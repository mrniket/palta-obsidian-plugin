import { Plugin } from "obsidian";
import { parsePaltaCodeBlock } from "src/codeBlockParser";
import { renderWebComponent } from "src/webComponentRenderer";

export default class PaltaPlugin extends Plugin {
	async onload() {
		this.addWebComponentScriptIfNotExists();

		this.registerMarkdownCodeBlockProcessor(
			"palta",
			(source, el: HTMLElement, ctx) => {
				const paltaCodeBlockData = parsePaltaCodeBlock(source);
				renderWebComponent(paltaCodeBlockData, el);
			}
		);
	}

	addWebComponentScriptIfNotExists() {
		if (!document.getElementById("paltas-wc-script")) {
			const script = document.createElement("script");
			script.id = "paltas-wc-script";
			script.src =
				"https://cdn.jsdelivr.net/npm/palta-note@1.0.1/dist/palta-note.es.js";
			script.defer = true;
			script.async = true;
			script.type = "module";
			document.head.appendChild(script);
		}
	}

	onunload() {}
}
