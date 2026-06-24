<h1 align="center">RunAPI Seedream MCP Server</h1>

<p align="center">
  <strong>Seedream API access for AI agents: create image generation tasks, poll results, and check pricing through one focused MCP server.</strong>
</p>

<p align="center">
  <sub>Works with Claude Code, Codex, Cursor, Windsurf, VS Code, Roo Code, and any MCP-compatible host.</sub>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@runapi.ai/seedream-mcp"><img src="https://img.shields.io/npm/v/%40runapi.ai/seedream-mcp?style=flat-square&color=blue" alt="npm version"></a>
  <a href="https://github.com/runapi-ai/seedream-mcp"><img src="https://img.shields.io/badge/GitHub-runapi--ai%2Fseedream-mcp-24292f?style=flat-square" alt="GitHub repository"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square" alt="Apache-2.0 license"></a>
  <img src="https://img.shields.io/badge/Type-MCP_Server-blue?style=flat-square" alt="MCP Server">
  <img src="https://img.shields.io/badge/Models-6-16a34a?style=flat-square" alt="6 models">
</p>

<p align="center">
  <a href="#install">Install</a> |
  <a href="#tools">Tools</a> |
  <a href="#models">Models</a> |
  <a href="#agent-prompts">Agent Prompts</a> |
  <a href="#configuration">Configuration</a> |
  <a href="#links">Links</a>
</p>

---

## Why This Package?

`@runapi.ai/seedream-mcp` is a focused Model Context Protocol server for the **Seedream** model line on RunAPI.
It gives MCP-compatible assistants direct access to 2 endpoints and 6 model variants without loading the full RunAPI catalog.

Use this per-model server when an agent should stay scoped to Seedream. Use [`@runapi.ai/mcp`](https://github.com/runapi-ai/mcp) when one assistant should discover every RunAPI model line.

---

## Install

Add it to Claude Code:

```bash
claude mcp add seedream -s user -- npx -y @runapi.ai/seedream-mcp
```

Use project scope when the server should be shared with a repository:

```bash
claude mcp add seedream -s project -- npx -y @runapi.ai/seedream-mcp
```

Codex, Cursor, Windsurf, VS Code, Roo Code, and other MCP hosts can use the same stdio command:

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

Create an API key at [runapi.ai](https://runapi.ai) and expose it as `RUNAPI_API_KEY`. `check_pricing` can run without a key; task creation and status polling require one.

Ready-made examples are in [`examples/`](examples/) for Claude, Cursor, Windsurf, VS Code, and Roo Code.

---

## Tools

| Tool | Auth | Purpose |
|---|---|---|
| `edit_image` | Yes | Create a Seedream edit image task and optionally wait for a terminal status. Returns the task id, status, output URLs, and pricing snapshot. |
| `text_to_image` | Yes | Create a Seedream text to image task and optionally wait for a terminal status. Returns the task id, status, output URLs, and pricing snapshot. |
| `get_task` | Yes | Fetch the current status and latest payload for an existing task. |
| `check_pricing` | No | Look up the current pricing snapshot for a Seedream model and endpoint. |

---

## Models

Seedream covers 6 model variants across 2 endpoints. Each tool accepts the models listed for it:

| Tool | Models |
|---|---|
| `edit_image` | `seedream-4.5-edit`, `seedream-5-lite-edit`, `seedream-v4-edit` |
| `text_to_image` | `seedream-4.5-text-to-image`, `seedream-5-lite-text-to-image`, `seedream-v4-text-to-image` |

Model availability can change between releases. Use `check_pricing` or the [Seedream model page](https://runapi.ai/models/seedream) for the current catalog view.

---

## Agent Prompts

Ask your assistant in natural language; it can inspect pricing, create the task, and return the task id plus output URLs.

### Create a task

```text
Run a Seedream edit image task with RunAPI.
```

The assistant can call `check_pricing`, then `edit_image`, and return the task id, status, and output URLs.

### Submit without waiting

```text
Create the task but don't wait for it to finish.
```

The assistant calls the create tool with `wait: false` and returns the task id. Check on it later with `get_task`.

### Check pricing before creating

```text
Check current Seedream pricing, then create the task if it matches my request.
```

The assistant calls `check_pricing` and can link to the [Seedream model page](https://runapi.ai/models/seedream) for the canonical catalog entry.

---

## Configuration

The server reads the API key in this order:

1. `RUNAPI_API_KEY` environment variable
2. `~/.config/runapi/config.json`

Example config file:

```json
{
  "apiKey": "your_runapi_key"
}
```

Do not commit real API keys. Get one at [runapi.ai](https://runapi.ai).

---

## Links

| Resource | URL |
|---|---|
| Seedream model page | [https://runapi.ai/models/seedream](https://runapi.ai/models/seedream) |
| npm package | [@runapi.ai/seedream-mcp](https://www.npmjs.com/package/@runapi.ai/seedream-mcp) |
| GitHub repository | [runapi-ai/seedream-mcp](https://github.com/runapi-ai/seedream-mcp) |
| RunAPI MCP overview | [runapi.ai/mcp](https://runapi.ai/mcp) |
| RunAPI docs | [runapi.ai/docs](https://runapi.ai/docs) |

---

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
