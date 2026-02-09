/**
 * @vitest-environment happy-dom
 */

import { beforeEach, describe, it, expect, beforeAll } from "vitest";
import { renderWebComponent } from "./webComponentRenderer";
import PaltaNoteDefaults from "palta-note-test";

describe("webComponentRenderer", () => {
	beforeAll(() => {
		if (!customElements.get("palta-note")) {
			const { PaltaNote } = PaltaNoteDefaults;
			customElements.define("palta-note", PaltaNote);
		}
	})

	beforeEach(() => {
		window.document.body.innerHTML = "";
	});

	it("should render a web component", () => {
		const paltaCodeBlock = {
			frontMatter: {},
			matras: "Dha",
		};
		renderWebComponent(paltaCodeBlock, window.document.body);
		expect(window.document.body.innerHTML).toContain("palta-note");
	});

	it("should render front matter as attributes", () => {
		const paltaCodeBlock = {
			frontMatter: {
				vibhags: "X 2 0 3",
			},
			matras: "Dha",
		};
		renderWebComponent(paltaCodeBlock, window.document.body);
		const paltaNote = window.document.body.querySelector("palta-note");
		expect(paltaNote?.getAttribute("vibhags")).toBe("X 2 0 3");
	});

	it("should render matras as inner text", () => {
		const paltaCodeBlock = {
			frontMatter: {},
			matras: "Dha Dhin Dhin Dha",
		};
		renderWebComponent(paltaCodeBlock, window.document.body);
		const paltaNote = window.document.body.querySelector("palta-note");
		expect(paltaNote?.innerHTML).toEqual("Dha Dhin Dhin Dha");
	});
});
