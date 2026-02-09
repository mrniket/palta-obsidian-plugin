# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Palta Note Obsidian Plugin — renders Bhatkhande notation for Tabla (Indian classical music) inside Obsidian. Users write `palta` code blocks with optional frontmatter (e.g. `vibhags: X 2 0 3`) separated by `---` from the composition body (matra lines like `Dha Dhin Dhin Dha`). The plugin parses these blocks and renders them using the `<palta-note>` web component (from the `palta-note-test` npm package).

## Commands

- **Build:** `npm run build` (type-checks with tsc, then bundles with esbuild)
- **Dev mode:** `npm run dev` (esbuild watch mode, outputs `main.js` with inline sourcemaps)
- **Test:** `npm test` (vitest)
- **Run a single test file:** `npx vitest run src/codeBlockParser.test.ts`
- **Version bump:** `npm version <patch|minor|major>` (runs `version-bump.mjs` to sync `manifest.json` and `versions.json`)

## Architecture

Entry point is `main.ts` which registers the `palta` markdown code block processor with Obsidian. The processing pipeline:

1. **`src/codeBlockParser.ts`** — Parses the raw code block string into a `PaltaCodeBlock` (frontmatter key-value pairs + matras string). Frontmatter is separated from composition by a `---` line.
2. **`src/webComponentRenderer.ts`** — Creates a `<palta-note>` custom element, sets frontmatter entries as HTML attributes, and sets matras as text content.
3. **`main.ts`** — Registers the `<palta-note>` custom element (from `palta-note-test` package) if not already defined, and wires the parser + renderer as Obsidian's code block processor.

`styles.css` maps Obsidian CSS variables (accent color, text color, font size) to `<palta-note>` CSS custom properties.

## Testing

Tests use **vitest** with **happy-dom** for DOM simulation. The `webComponentRenderer.test.ts` uses `@vitest-environment happy-dom` directive. No vitest config file — uses defaults. Test files are co-located with source as `*.test.ts` and excluded from tsconfig compilation.

## Build Output

esbuild bundles to `main.js` (CJS format, ES2018 target). The `obsidian` module and CodeMirror packages are externalized. `main.js` is gitignored — it gets uploaded to GitHub releases.

## Versioning

`manifest.json` and `versions.json` must stay in sync. The `npm version` script handles this via `version-bump.mjs`. `versions.json` maps plugin version to minimum Obsidian app version.
