# @runapi.ai/seedream-mcp

RunAPI MCP server for the **Seedream** model line. Create tasks,
poll their status, and check pricing through a single RunAPI API key.

## Tools

- `edit_image` — create a Seedream task (edit image) and (optionally) poll until it reaches a terminal status. Returns the task id, status, output URLs, and a price snapshot. Models: `seedream-4.5-edit`, `seedream-5-lite-edit`, `seedream-v4-edit`, `seedream-4.5-text-to-image`, `seedream-5-lite-text-to-image`, `seedream-v4-text-to-image`.
- `text_to_image` — create a Seedream task (text to image) and (optionally) poll until it reaches a terminal status. Returns the task id, status, output URLs, and a price snapshot. Models: `seedream-4.5-edit`, `seedream-5-lite-edit`, `seedream-v4-edit`, `seedream-4.5-text-to-image`, `seedream-5-lite-text-to-image`, `seedream-v4-text-to-image`.
- `get_task` — fetch the current status and latest payload for a task.
- `check_pricing` — look up pricing for a model in this line.

## Configuration

Set a RunAPI API key via the `RUNAPI_API_KEY` environment variable, or write
it to `~/.config/runapi/config.json`:

```bash
mkdir -p ~/.config/runapi
echo '{"api_key":"YOUR_KEY"}' > ~/.config/runapi/config.json
```

Get an API key at https://runapi.ai. Pricing is listed at
https://runapi.ai/pricing.

## Usage

Run the server over stdio:

```bash
npx -y @runapi.ai/seedream-mcp
```

Add it to an MCP client (see `examples/` for per-client configs):

```json
{
  "mcpServers": {
    "seedream": {
      "command": "npx",
      "args": ["-y", "@runapi.ai/seedream-mcp"],
      "env": { "RUNAPI_API_KEY": "${RUNAPI_API_KEY}" }
    }
  }
}
```

## License

Apache-2.0
