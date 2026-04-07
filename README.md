# cheflog-ai — AI Kitchen Companion

Skip the blog posts and get straightforward answers for your cooking questions.

---

### What It Is
A serverless AI assistant for your kitchen. It runs on Cloudflare's edge network, meaning it's fast, private, and has no backend servers for you to manage. The public demo stores no data permanently.

**Live Demo:** https://cheflog-ai.casey-digennaro.workers.dev

---

### How It Works
- Your cooking data (recipes, preferences) stays within your own Cloudflare KV store. No telemetry.
- You control the LLM. Swap between supported providers by changing an API key.
- Built as a single-file Cloudflare Worker with zero external npm dependencies.
- Follows the Cocapn Fleet protocol, offering standard endpoints for interoperability.

---

### Features
- Get cooking help: ingredient substitutions, recipe scaling, technique explanations.
- Support for multiple LLM providers via API key (DeepSeek, Moonshot, DeepInfra, SiliconFlow).
- Persistent storage for your recipes and preferences using Cloudflare KV.
- A static, dark-mode interface designed for use in a kitchen.
- Implements required Fleet endpoints (`/health`, `/setup`, `/chat`).

**One Limitation:** The interface uses a service worker for offline functionality, but this is a progressive enhancement and may not work consistently across all browsers or after updates.

---

## Quick Start
Deploy your own private instance in a few minutes:
1. **Fork this repository.**
2. Run `npx wrangler deploy` to deploy to Cloudflare Workers.
3. Add your LLM API key as a Cloudflare Secret (e.g., `DEEPSEEK_API_KEY`).
4. Your instance is ready. Visit its URL.

For detailed setup, visit the `/setup` path on your deployed worker.

---

## Configuration
The agent uses a single API key. Set one of these secrets in your Cloudflare dashboard:
- `DEEPSEEK_API_KEY`
- `MOONSHOT_API_KEY`
- `DEEPINFRA_API_KEY`
- `SILICONFLOW_API_KEY`

---

## Project Details
The entire application is contained in `index.ts`. It serves the frontend HTML and handles chat requests by proxying to your configured LLM API. There is no build step.

---

## Contributing
This project follows a fork-first philosophy. You are encouraged to fork and adapt it for your own kitchen. If you build a generally useful feature, consider opening a pull request.

---

## License
MIT

Superinstance & Lucineer (DiGennaro et al.)

---
<div>
  <a href="https://the-fleet.casey-digennaro.workers.dev">Fleet</a> · 
  <a href="https://cocapn.ai">Cocapn</a>
</div>