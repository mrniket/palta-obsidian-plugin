import { describe, it, expect } from "vitest";
import { parsePaltaCodeBlock } from "./codeBlockParser";

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
        expect(actual).toStrictEqual(expected);
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
		expect(actual).toStrictEqual(expected);
	});

	it("should parse palta code blocks with matras as dashes", () => {
		const source = `
            vibhags: X 2 0 3
            ---
            - - - -
            - - - -
            - - - -
            - - - -
        `;
		const expected = {
			frontMatter: {
				vibhags: "X 2 0 3",
			},
			matras: `- - - -
            - - - -
            - - - -
            - - - -
            `.trim(),
		};
		const actual = parsePaltaCodeBlock(source);
		expect(actual).toStrictEqual(expected);
	});
});
