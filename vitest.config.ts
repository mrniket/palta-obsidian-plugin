import { defineConfig } from "vitest/config";

export default defineConfig({
	ssr: {
		noExternal: ["palta-note-test"],
	},
	test: {
		setupFiles: ["src/test-setup.ts"],
	},
});
