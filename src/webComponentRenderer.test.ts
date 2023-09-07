import { beforeEach, describe, it } from "node:test";
import { JSDOM } from "jsdom";
import assert from "node:assert";
import { renderWebComponent } from "./webComponentRenderer";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");

// Save these two objects in the global space so that libraries/tests
// can hook into them, using the above doc definition.
global.document = window.document;
// @ts-ignore
global.window = window;

describe("webComponentRenderer", () => {
	beforeEach(() => {
		window.document.body.innerHTML = "";
	});

	it("should render a web component", () => {
		const paltaCodeBlock = {
			frontMatter: {},
			matras: "",
		};
		renderWebComponent(paltaCodeBlock, window.document.body);

		assert.notEqual(window.document.body.querySelector("palta-note"), null);
	});

	it("should render front matter as attributes", () => {
		const paltaCodeBlock = {
			frontMatter: {
				vibhags: "X 2 0 3",
			},
			matras: "",
		};
		renderWebComponent(paltaCodeBlock, window.document.body);
		const paltaNote = window.document.body.querySelector("palta-note");
		assert.equal(paltaNote?.getAttribute("vibhags"), "X 2 0 3");
	});

	it("should render matras as inner text", () => {
		const paltaCodeBlock = {
			frontMatter: {},
			matras: "Dha Dhin Dhin Dha",
		};
		renderWebComponent(paltaCodeBlock, window.document.body);
		const paltaNote = window.document.body.querySelector("palta-note");
		assert.equal(paltaNote?.innerHTML, "Dha Dhin Dhin Dha");
	});
});
