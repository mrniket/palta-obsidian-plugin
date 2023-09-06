import { Plugin } from "obsidian";

export default class PaltaPlugin extends Plugin {
	async onload() {
		this.addWebComponentScriptIfNotExists();

		this.registerMarkdownCodeBlockProcessor(
			"palta",
			(source, el: HTMLElement, ctx) => {
				const [vibhagsStr, matrasStr] =
					this.splitVibhagsAndMatras(source);
				// @ts-ignore
				const paltaNote = el.createEl("palta-note");
				paltaNote.setAttribute("vibhags", vibhagsStr);
				paltaNote.innerHTML = matrasStr;
			}
		);
	}

	splitVibhagsAndMatras(source: string): [string, string] {
		const sourceTrimmed = source.trim();
		const newLineIndex = sourceTrimmed.indexOf("\n");
		const vibhags = sourceTrimmed.substring(0, newLineIndex);
		const matras = sourceTrimmed.substring(newLineIndex + 1);
		return [vibhags, matras];
	}

	addWebComponentScriptIfNotExists() {
		if (!document.getElementById("paltas-wc-script")) {
			const script = document.createElement("script");
			script.id = "paltas-wc-script";
			script.src =
				"https://cdn.jsdelivr.net/npm/palta-note@1.0.0/dist/palta-note.es.js";
			script.defer = true;
			script.async = true;
			script.type = "module";
			document.head.appendChild(script);
		}
	}

	onunload() {}
}
