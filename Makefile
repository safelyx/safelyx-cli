.PHONY: format
format:
	deno fmt

.PHONY: test
test:
	deno fmt --check
	deno lint
	deno test --check=all --allow-read=.env --allow-env

.PHONY: build
build:
	deno compile --allow-net=safelyx.com --allow-read=.env --allow-env=SAFELYX_KEY_CODE --output=safelyx main.ts
