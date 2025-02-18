# Safelyx API

[![](https://github.com/safelyx/safelyx-cli/workflows/Run%20Tests/badge.svg)](https://github.com/safelyx/safelyx-cli/actions?workflow=Run+Tests)

> Safelyx API client

Safelyx API client for cross-platform CLI. It uses [`@safelyx/api`](https://github.com/safelyx/safelyx-js) to make requests to the Safelyx API.

You can find the API documentation at https://safelyx.com/safe-api.

### Some things to note:

1. It's simply making an HTTP request to the Safelyx API.

2. It returns the raw JSON response from the API.

## Usage

It has a command per API endpoint.

Download the binary from [the releases page](https://github.com/safelyx/safelyx-cli/releases) that's appropriate for your platform and architecture. Make sure the file is executable and is in your `PATH`.

```bash
safelyx check https://example.com
# Outputs the raw JSON response from the API.
```

## Development

Requires `deno`.

```bash
deno run --allow-net=safelyx.com main.ts check-link example.com
make format
make test
make build
```

## Publishing

Just push to the `main` branch (with the updated version in the `deno.json` file) and create a tag + release.
