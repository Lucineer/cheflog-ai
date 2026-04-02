# cheflog.ai

Professional kitchen management platform. Cloudflare Worker + static HTML.

## Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/chat` | POST | SSE chat via DeepSeek (culinary AI assistant) |
| `/api/recipes` | GET/POST | Recipe database with costs, prep times, plating |
| `/api/inventory` | GET/POST/PUT | Kitchen inventory with par levels & reorder tracking |
| `/api/menu-planning` | GET/POST | Weekly menu planner with seasonal produce |
| `/api/costing` | GET | Food cost analysis & menu engineering matrix |
| `/api/suppliers` | GET/POST | Vendor directory with order history |
| `/api/allergens` | GET/POST | Dietary restriction management & cross-reference matrix |

## Architecture

```
src/
  index.ts          — Cloudflare Worker (API router + seed data)
  chef/tracker.ts   — RecipeManager, KitchenInventory, MenuPlanner,
                      FoodCostAnalyzer, SupplierManager, AllergenTracker
public/
  app.html          — Professional kitchen UI
```

## Setup

```bash
npm install
export DEEPSEEK_API_KEY=your-key
npx wrangler dev
```

Open `http://localhost:8787/app.html`.

## Deploy

```bash
npx wrangler deploy
```

## Author

Superinstance

## License

MIT — Built with ❤️ by [Superinstance](https://github.com/superinstance) & [Lucineer](https://github.com/Lucineer) (DiGennaro et al.)
