// Polyfill attachInternals for happy-dom — required by @material/web components
// used within palta-note-test
if (typeof HTMLElement !== "undefined" && !HTMLElement.prototype.attachInternals) {
	HTMLElement.prototype.attachInternals = function () {
		return {
			setFormValue() {},
			setValidity() {},
			states: new Set(),
		} as unknown as ElementInternals;
	};
}
