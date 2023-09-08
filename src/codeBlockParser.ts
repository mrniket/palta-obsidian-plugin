export interface PaltaCodeBlock {
	frontMatter: { [key: string]: string };
	matras: string;
}

function splitFrontMatterAndComposition(
	source: string
): [string | null, string] {
	// check if front matter is present
	if (source.match(/\s+-+\s+/i) === null) {
		return [null, source.trim()];
	}
	const [frontMatter, composition] = source.trim().split(/\s+-+\s+/i, 2);
	return [frontMatter, composition];
}

function parseFrontMatter(frontMatter: string | null): {
	[key: string]: string;
} {
	if (frontMatter === null) {
		return {};
	}
	const attributes: { [key: string]: string } = {};
	const lines = frontMatter.split("\n");
	for (const line of lines) {
		const [key, value] = line.split(":").map((s) => s.trim());
		attributes[key] = value;
	}
	return attributes;
}

export function parsePaltaCodeBlock(source: string): PaltaCodeBlock {
	const [frontMatter, matras] = splitFrontMatterAndComposition(source);
	const attributes = parseFrontMatter(frontMatter);
	return { frontMatter: attributes, matras };
}
