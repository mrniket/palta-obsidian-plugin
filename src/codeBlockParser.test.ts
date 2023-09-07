import { describe, it } from "node:test";
import { parsePaltaCodeBlock } from "./codeBlockParser";
import * as assert from "node:assert";

describe("codeBlockParser", () => {
	it("should parse palta code blocks", () => {
		const source = `
            vibhags: X 2 0 3
            ---
            Dha Dhin Dhin Dha
            Dha Dhin Dhin Dha
            Dha Tin Tin Ta
            Ta Dhin Dhin Dha
        `;

		const expected = {
			frontMatter: {
				vibhags: "X 2 0 3",
			},
			matras: `Dha Dhin Dhin Dha
            Dha Dhin Dhin Dha
            Dha Tin Tin Ta
            Ta Dhin Dhin Dha
            `.trim(),
		};

		const actual = parsePaltaCodeBlock(source);
		assert.deepStrictEqual(actual, expected);
	});

	it("should parse palta code blocks with no front matter", () => {
		const source = `
            Dha Dhin Dhin Dha
            Dha Dhin Dhin Dha
            Dha Tin Tin Ta
            Ta Dhin Dhin Dha
        `;
		const expected = {
			frontMatter: {},
			matras: `Dha Dhin Dhin Dha
            Dha Dhin Dhin Dha
            Dha Tin Tin Ta
            Ta Dhin Dhin Dha
            `.trim(),
		};
		const actual = parsePaltaCodeBlock(source);
		assert.deepStrictEqual(actual, expected);
	});
});
