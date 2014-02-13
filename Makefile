build:
	@component install --dev
	@component build --dev

test: build
	@component test browser

.PHONY: build test