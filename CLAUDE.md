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

Tests use **vitest** with **happy-dom** for DOM simulation. The `webComponentRenderer.test.ts` uses `@vitest-environment happy-dom` directive. `vitest.config.ts` configures `ssr.noExternal` for `palta-note-test` (required because the package has extensionless ESM imports) and a setup file (`src/test-setup.ts`) that polyfills `attachInternals` for happy-dom. Test files are co-located with source as `*.test.ts` and excluded from tsconfig compilation.

## Build Output

esbuild bundles to `main.js` (CJS format, ES2018 target). The `obsidian` module and CodeMirror packages are externalized. `main.js` is gitignored — it gets uploaded to GitHub releases.

## Versioning

`manifest.json` and `versions.json` must stay in sync. The `npm version` script handles this via `version-bump.mjs`. `versions.json` maps plugin version to minimum Obsidian app version.

## Updating Dependencies

Upgrade order matters — foundational tooling first, then tools that depend on it:

1. **TypeScript** first (eslint and vitest depend on it)
2. **esbuild** (independent, verify `npm run build`)
3. **@typescript-eslint/\*** and **eslint** together (eslint version must satisfy @typescript-eslint peer dep)
4. **vitest** and **happy-dom** together (verify `npm test`)
5. **Remaining dev deps** (@types/node, tslib, tsx, builtin-modules, glob)
6. **obsidian** types (verify `npm run build` for type compatibility)
7. **palta-note-test** last (verify both tests and build)

After each step, run `npm run build` and/or `npm test` to catch breakage early.

### Known issues when upgrading

- **palta-note-test ESM resolution:** The `palta-note-test` package uses extensionless ESM imports internally. Newer vitest/Vite is strict about this, so `vitest.config.ts` must include `ssr: { noExternal: ["palta-note-test"] }` to bundle it during tests.
- **happy-dom `attachInternals`:** `@material/web` components (used by palta-note-test) call `attachInternals()` which happy-dom doesn't implement. The polyfill in `src/test-setup.ts` handles this — if new `ElementInternals` methods are needed, add stubs there.
- **@typescript-eslint v8** requires ESLint 8.57+ or 9.x. Install eslint as a direct dev dependency if needed.

## Releasing

1. `npm version patch` (or `minor`/`major`) — bumps version, syncs `manifest.json` and `versions.json`, creates git tag
2. `npm run build` — produces `main.js`
3. `git push --follow-tags` then `git push origin <tag>` if the tag didn't push
4. The GitHub Actions workflow (`.github/workflows/release.yaml`) builds and creates a **draft** release on tag push
5. Go to GitHub releases and publish the draft
