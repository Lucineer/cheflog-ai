import {
  RecipeManager,
  KitchenInventory,
  MenuPlanner,
  FoodCostAnalyzer,
  SupplierManager,
  AllergenTracker,
} from "./chef/tracker";
import type {
  Recipe,
  InventoryItem,
  MenuDay,
  Supplier,
  AllergenProfile,
} from "./chef/tracker";

// ─── Seed data ──────────────────────────────────────────────────────
const recipes = new RecipeManager([
  {
    id: "r1",
    name: "Pan-Seared Duck Breast",
    category: "entree",
    cuisine: "French",
    prepTimeMin: 20,
    cookTimeMin: 25,
    servings: 4,
    ingredients: [
      { name: "duck breast", quantity: 4, unit: "each", prepNotes: "scored skin", cost: 28.00, supplierId: "s1" },
      { name: "orange juice", quantity: 250, unit: "ml", prepNotes: "fresh squeezed", cost: 2.50, supplierId: "s2" },
      { name: "grand marnier", quantity: 30, unit: "ml", prepNotes: "", cost: 3.00, supplierId: "s3" },
      { name: "butter", quantity: 50, unit: "g", prepNotes: "cold cubes", cost: 1.20, supplierId: "s2" },
      { name: "thyme", quantity: 4, unit: "sprigs", prepNotes: "fresh", cost: 0.80, supplierId: "s2" },
    ],
    method: [
      "Score duck skin in crosshatch pattern",
      "Season generously with salt and pepper",
      "Place skin-down in cold pan, render 8 min over medium heat",
      "Flip, cook 4 min for medium-rare",
      "Rest 5 min, slice on bias",
      "Deglaze with orange juice and Grand Marnier",
      "Mount with butter, season sauce",
    ],
    plating: "Fan sliced duck across plate, swoosh orange sauce, garnish with thyme sprig and microgreens",
    costPerServing: 8.88,
    allergens: ["milk"],
    dietary: ["gluten-free"],
    tags: ["classic", "signature", "date-night"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "r2",
    name: "Miso-Glazed Black Cod",
    category: "entree",
    cuisine: "Japanese",
    prepTimeMin: 15,
    cookTimeMin: 12,
    servings: 4,
    ingredients: [
      { name: "black cod fillet", quantity: 4, unit: "each", prepNotes: "6oz portions", cost: 36.00, supplierId: "s4" },
      { name: "white miso paste", quantity: 100, unit: "g", prepNotes: "", cost: 3.50, supplierId: "s4" },
      { name: "mirin", quantity: 60, unit: "ml", prepNotes: "", cost: 2.00, supplierId: "s4" },
      { name: "sake", quantity: 30, unit: "ml", prepNotes: "", cost: 2.50, supplierId: "s4" },
      { name: "sugar", quantity: 40, unit: "g", prepNotes: "", cost: 0.30, supplierId: "s2" },
    ],
    method: [
      "Blend miso, mirin, sake, sugar into smooth paste",
      "Marinate cod 24-48 hours refrigerated",
      "Remove excess marinade",
      "Broil on high 10-12 min until caramelized",
      "Internal temp 130°F",
    ],
    plating: "Center cod on black plate, dot with yuzu aioli, pickled ginger, shiso leaf",
    costPerServing: 11.08,
    allergens: ["soybeans", "fish"],
    dietary: ["gluten-free"],
    tags: ["signature", "umami", "premium"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "r3",
    name: "Heirloom Tomato Burrata",
    category: "appetizer",
    cuisine: "Italian",
    prepTimeMin: 10,
    cookTimeMin: 0,
    servings: 4,
    ingredients: [
      { name: "burrata", quantity: 2, unit: "each", prepNotes: "room temp", cost: 12.00, supplierId: "s2" },
      { name: "heirloom tomatoes", quantity: 500, unit: "g", prepNotes: "assorted colors", cost: 8.00, supplierId: "s2" },
      { name: "basil", quantity: 20, unit: "leaves", prepNotes: "fresh", cost: 2.00, supplierId: "s2" },
      { name: "extra virgin olive oil", quantity: 30, unit: "ml", prepNotes: "premium", cost: 2.50, supplierId: "s3" },
      { name: "aged balsamic", quantity: 15, unit: "ml", prepNotes: "", cost: 3.00, supplierId: "s3" },
      { name: "flaky sea salt", quantity: 2, unit: "g", prepNotes: "", cost: 0.20, supplierId: "s3" },
    ],
    method: [
      "Slice tomatoes varying thicknesses",
      "Arrange on chilled plate",
      "Tear burrata, place center",
      "Drizzle olive oil and balsamic",
      "Scatter basil, season with flaky salt",
    ],
    plating: "Rustic arrangement on white plate, color contrast, drizzle pattern",
    costPerServing: 6.93,
    allergens: ["milk"],
    dietary: ["vegetarian", "gluten-free"],
    tags: ["seasonal", "light", "classic"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "r4",
    name: "Chocolate Fondant",
    category: "dessert",
    cuisine: "French",
    prepTimeMin: 20,
    cookTimeMin: 12,
    servings: 4,
    ingredients: [
      { name: "dark chocolate 70%", quantity: 200, unit: "g", prepNotes: "chopped", cost: 6.00, supplierId: "s3" },
      { name: "butter", quantity: 100, unit: "g", prepNotes: "cubed", cost: 2.40, supplierId: "s2" },
      { name: "eggs", quantity: 2, unit: "each", prepNotes: "whole", cost: 1.00, supplierId: "s2" },
      { name: "egg yolks", quantity: 2, unit: "each", prepNotes: "", cost: 1.00, supplierId: "s2" },
      { name: "sugar", quantity: 75, unit: "g", prepNotes: "", cost: 0.50, supplierId: "s2" },
      { name: "flour", quantity: 50, unit: "g", prepNotes: "sifted", cost: 0.30, supplierId: "s2" },
    ],
    method: [
      "Melt chocolate and butter over bain-marie",
      "Whisk eggs, yolks, sugar until ribbon stage",
      "Fold chocolate into egg mixture",
      "Fold in sifted flour gently",
      "Pour into buttered ramekins",
      "Bake 12 min at 200°C — set outside, molten center",
      "Rest 30 sec, invert onto plate",
    ],
    plating: "Center fondant, quenelle of vanilla ice cream, dust cocoa, gold leaf accent",
    costPerServing: 2.80,
    allergens: ["milk", "eggs", "wheat", "gluten"],
    dietary: [],
    tags: ["classic", "indulgent", "date-night"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "r5",
    name: "Wagyu Beef Tartare",
    category: "appetizer",
    cuisine: "French",
    prepTimeMin: 25,
    cookTimeMin: 0,
    servings: 2,
    ingredients: [
      { name: "wagyu striploin", quantity: 200, unit: "g", prepNotes: "hand-cut, fine dice", cost: 32.00, supplierId: "s1" },
      { name: "capers", quantity: 15, unit: "g", prepNotes: "drained, chopped", cost: 1.50, supplierId: "s3" },
      { name: "cornichons", quantity: 20, unit: "g", prepNotes: "finely diced", cost: 1.20, supplierId: "s3" },
      { name: "shallot", quantity: 1, unit: "each", prepNotes: "brunoise", cost: 0.50, supplierId: "s2" },
      { name: "egg yolk", quantity: 1, unit: "each", prepNotes: "pasture-raised", cost: 1.00, supplierId: "s2" },
      { name: "dijon mustard", quantity: 10, unit: "g", prepNotes: "", cost: 0.40, supplierId: "s3" },
      { name: "worcestershire", quantity: 5, unit: "ml", prepNotes: "", cost: 0.30, supplierId: "s3" },
      { name: "tabasco", quantity: 2, unit: "drops", prepNotes: "", cost: 0.10, supplierId: "s3" },
    ],
    method: [
      "Hand-dice wagyu to 3mm cubes, keep cold",
      "Combine capers, cornichons, shallot",
      "Fold in mustard, worcestershire, tabasco",
      "Season, mix gently — do not overwork",
      "Ring mold on plate, top with egg yolk",
    ],
    plating: "Quenelle in ring mold, egg yolk crown, toast soldiers, micro herbs",
    costPerServing: 18.50,
    allergens: ["eggs", "mustard", "fish", "gluten"],
    dietary: [],
    tags: ["premium", "raw", "signature"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]);

const inventory = new KitchenInventory([
  { id: "i1", name: "Duck Breast", category: "protein", unit: "each", currentStock: 24, parLevel: 40, reorderPoint: 12, reorderQty: 20, costPerUnit: 7.00, supplierId: "s1", location: "Walk-in Cooler A", lastReceived: Date.now() - 86400000, notes: "Grade A, Hudson Valley" },
  { id: "i2", name: "Black Cod Fillet", category: "protein", unit: "each", currentStock: 16, parLevel: 20, reorderPoint: 8, reorderQty: 12, costPerUnit: 9.00, supplierId: "s4", location: "Walk-in Cooler A", lastReceived: Date.now() - 172800000, notes: "Sablefish, sustainably caught" },
  { id: "i3", name: "Burrata", category: "dairy", unit: "each", currentStock: 8, parLevel: 12, reorderPoint: 4, reorderQty: 6, costPerUnit: 6.00, supplierId: "s2", location: "Walk-in Cooler B", lastReceived: Date.now() - 43200000, notes: "Deliver same-day, 2-day shelf life" },
  { id: "i4", name: "Heirloom Tomatoes", category: "produce", unit: "kg", currentStock: 5, parLevel: 10, reorderPoint: 3, reorderQty: 5, costPerUnit: 8.00, supplierId: "s2", location: "Walk-in Cooler B", lastReceived: Date.now() - 86400000, expiryDate: Date.now() + 259200000, notes: "Seasonal, mixed varieties" },
  { id: "i5", name: "Wagyu Striploin A5", category: "protein", unit: "kg", currentStock: 3, parLevel: 5, reorderPoint: 2, reorderQty: 3, costPerUnit: 160.00, supplierId: "s1", location: "Walk-in Cooler A", lastReceived: Date.now() - 259200000, notes: "Japanese import, Miyazaki prefecture" },
  { id: "i6", name: "Dark Chocolate 70%", category: "dry goods", unit: "kg", currentStock: 4, parLevel: 6, reorderPoint: 2, reorderQty: 3, costPerUnit: 15.00, supplierId: "s3", location: "Dry Storage", lastReceived: Date.now() - 604800000, notes: "Valrhona Guanaja" },
  { id: "i7", name: "White Miso Paste", category: "dry goods", unit: "kg", currentStock: 2, parLevel: 3, reorderPoint: 1, reorderQty: 2, costPerUnit: 12.00, supplierId: "s4", location: "Dry Storage", lastReceived: Date.now() - 432000000, notes: "Shiro miso, refrigerated after opening" },
  { id: "i8", name: "Unsalted Butter", category: "dairy", unit: "kg", currentStock: 8, parLevel: 12, reorderPoint: 4, reorderQty: 5, costPerUnit: 6.00, supplierId: "s2", location: "Walk-in Cooler B", lastReceived: Date.now() - 86400000, notes: "European-style, 82% fat" },
]);

const today = new Date();
const monday = new Date(today);
monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
const weekDates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(monday);
  d.setDate(d.getDate() + i);
  return d.toISOString().slice(0, 10);
});

const menuPlanner = new MenuPlanner([
  {
    date: weekDates[0],
    service: "dinner",
    items: [
      { recipeId: "r3", type: "appetizer", price: 18, featured: true },
      { recipeId: "r5", type: "appetizer", price: 28, featured: false },
      { recipeId: "r1", type: "entree", price: 38, featured: true },
      { recipeId: "r2", type: "entree", price: 42, featured: false },
      { recipeId: "r4", type: "dessert", price: 16, featured: false },
    ],
  },
  {
    date: weekDates[1],
    service: "dinner",
    items: [
      { recipeId: "r3", type: "appetizer", price: 18, featured: false },
      { recipeId: "r1", type: "entree", price: 38, featured: true },
      { recipeId: "r2", type: "entree", price: 42, featured: true },
      { recipeId: "r4", type: "dessert", price: 16, featured: true },
    ],
  },
  {
    date: weekDates[5],
    service: "brunch",
    items: [
      { recipeId: "r3", type: "appetizer", price: 16, featured: true },
      { recipeId: "r1", type: "entree", price: 36, featured: false },
    ],
  },
]);

const costAnalyzer = new FoodCostAnalyzer(0.28);
costAnalyzer.recordSales("r1", 85);
costAnalyzer.recordSales("r2", 62);
costAnalyzer.recordSales("r3", 110);
costAnalyzer.recordSales("r4", 95);
costAnalyzer.recordSales("r5", 40);

const suppliers = new SupplierManager([
  {
    id: "s1",
    name: "Prime Meats Distributors",
    category: "protein",
    contact: "Marco Bellini",
    phone: "+1-555-0101",
    email: "orders@primemeats.com",
    address: "450 Meatpacking Blvd, New York, NY 10014",
    repName: "Marco Bellini",
    terms: "Net 30",
    leadTimeDays: 2,
    minOrder: 200,
    rating: 4.8,
    notes: "Premium and wagyu specialist. Tuesday/Friday delivery.",
    orderHistory: [
      { id: "o1", date: Date.now() - 604800000, items: [{ name: "Duck Breast", qty: 40, unit: "each", unitCost: 7.00, total: 280.00 }, { name: "Wagyu Striploin A5", qty: 5, unit: "kg", unitCost: 160.00, total: 800.00 }], total: 1080.00, status: "delivered", deliveryDate: Date.now() - 518400000 },
      { id: "o2", date: Date.now() - 172800000, items: [{ name: "Duck Breast", qty: 20, unit: "each", unitCost: 7.00, total: 140.00 }], total: 140.00, status: "confirmed", deliveryDate: Date.now() + 86400000 },
    ],
  },
  {
    id: "s2",
    name: "Green Valley Farms",
    category: "produce",
    contact: "Sarah Chen",
    phone: "+1-555-0202",
    email: "orders@greenvalleyfarms.com",
    address: "120 Farm Road, Hudson Valley, NY 12534",
    repName: "Sarah Chen",
    terms: "COD",
    leadTimeDays: 1,
    minOrder: 100,
    rating: 4.9,
    notes: "Organic, farm-to-table daily delivery. Seasonal heirloom produce.",
    orderHistory: [
      { id: "o3", date: Date.now() - 86400000, items: [{ name: "Heirloom Tomatoes", qty: 10, unit: "kg", unitCost: 8.00, total: 80.00 }, { name: "Burrata", qty: 12, unit: "each", unitCost: 6.00, total: 72.00 }], total: 152.00, status: "delivered", deliveryDate: Date.now() - 43200000 },
    ],
  },
  {
    id: "s3",
    name: "Artisan Pantry Supply",
    category: "dry goods",
    contact: "Jean-Pierre Dubois",
    phone: "+1-555-0303",
    email: "supply@artisanpantry.com",
    address: "89 Culinary Way, Brooklyn, NY 11201",
    repName: "Jean-Pierre Dubois",
    terms: "Net 15",
    leadTimeDays: 3,
    minOrder: 150,
    rating: 4.6,
    notes: "Imported goods, chocolates, oils, specialty ingredients.",
    orderHistory: [],
  },
  {
    id: "s4",
    name: "Pacific Seafood Direct",
    category: "seafood",
    contact: "Kenji Tanaka",
    phone: "+1-555-0404",
    email: "chef@pacificseafood.com",
    address: "300 Harbor Dr, San Francisco, CA 94133",
    repName: "Kenji Tanaka",
    terms: "Net 14",
    leadTimeDays: 1,
    minOrder: 250,
    rating: 4.7,
    notes: "Overnight fresh seafood. Sashimi-grade fish. Black cod specialist.",
    orderHistory: [
      { id: "o4", date: Date.now() - 259200000, items: [{ name: "Black Cod Fillet", qty: 12, unit: "each", unitCost: 9.00, total: 108.00 }], total: 108.00, status: "delivered", deliveryDate: Date.now() - 172800000 },
    ],
  },
]);

const allergens = new AllergenTracker([
  { id: "a1", name: "Chef's Tasting — VIP Table", restrictions: ["shellfish", "tree nuts"], severity: { shellfish: "severe", "tree nuts": "moderate" }, notes: "Anaphylaxis risk — EpiPen on table" },
  { id: "a2", name: "Private Dining — Corporate Event", restrictions: ["milk", "gluten", "peanuts"], severity: { milk: "moderate", gluten: "mild", peanuts: "severe" }, notes: "Celiac-safe prep required" },
  { id: "a3", name: "Prix Fixe — Window Table", restrictions: ["eggs"], severity: { eggs: "moderate" }, notes: "Can tolerate baked egg" },
]);
allergens.setRecipeAllergens("r1", ["milk"]);
allergens.setRecipeAllergens("r2", ["soybeans", "fish"]);
allergens.setRecipeAllergens("r3", ["milk"]);
allergens.setRecipeAllergens("r4", ["milk", "eggs", "wheat", "gluten"]);
allergens.setRecipeAllergens("r5", ["eggs", "mustard", "fish", "gluten"]);

// ─── CORS helpers ───────────────────────────────────────────────────
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

// ─── SSE DeepSeek Chat ─────────────────────────────────────────────
async function handleChat(request: Request, env: { DEEPSEEK_API_KEY: string }): Promise<Response> {
  const { messages } = (await request.json()) as { messages: { role: string; content: string }[] };

  const systemPrompt = {
    role: "system",
    content: `You are the executive chef AI assistant for cheflog.ai — a professional kitchen management platform.
You help chefs with: recipe development, menu planning, food costing, inventory management, supplier coordination, allergen tracking, plating design, and kitchen operations.
Use professional culinary terminology. Be precise with measurements, temperatures, and techniques.
When discussing costs, use accurate food-cost percentages and menu-engineering principles.
Format recipes with: ingredients (with exact measurements), method steps, plating instructions, prep/cook times.`,
  };

  const resp = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [systemPrompt, ...messages],
      stream: true,
    }),
  });

  return new Response(resp.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      ...CORS_HEADERS,
    },
  });
}

// ─── Route handlers ─────────────────────────────────────────────────
function handleRecipes(request: Request): Response {
  const url = new URL(request.url);

  if (request.method === "POST") {
    const body = request.json() as Promise<Partial<Recipe>>;
    return body.then((data) => json(recipes.add(data as any)));
  }

  const query = url.searchParams.get("q");
  if (query) return json(recipes.search(query));

  const category = url.searchParams.get("category");
  const cuisine = url.searchParams.get("cuisine");
  const allergen = url.searchParams.get("allergen");
  const dietary = url.searchParams.get("dietary");
  return json(recipes.list({ category: category ?? undefined, cuisine: cuisine ?? undefined, allergen: allergen ?? undefined, dietary: dietary ?? undefined }));
}

function handleInventory(request: Request): Response {
  const url = new URL(request.url);
  const action = url.pathname.replace("/api/inventory", "").replace("/", "");

  if (action === "below-par") return json(inventory.belowPar());
  if (action === "total-value") return json({ totalValue: inventory.totalValue() });

  if (request.method === "POST") {
    const body = request.json() as Promise<Partial<InventoryItem>>;
    return body.then((data) => json(inventory.add(data as any)));
  }

  if (request.method === "PUT") {
    const id = url.searchParams.get("id");
    if (!id) return json({ error: "id required" }, 400);
    return request.json().then((patch) => json(inventory.update(id, patch as any) ?? { error: "not found" }, 404));
  }

  const category = url.searchParams.get("category");
  const belowPar = url.searchParams.get("belowPar");
  return json(inventory.list({ category: category ?? undefined, belowPar: belowPar === "true" }));
}

function handleMenuPlanning(request: Request): Response {
  const url = new URL(request.url);

  if (request.method === "POST") {
    const body = request.json() as Promise<MenuDay>;
    return body.then((data) => json(menuPlanner.setDay(data)));
  }

  const week = url.searchParams.get("week");
  if (week) return json(menuPlanner.getWeek(week));

  const date = url.searchParams.get("date");
  if (date) return json(menuPlanner.getDay(date) ?? { error: "not found" }, 404);

  const month = url.searchParams.get("seasonal");
  if (month) return json({ month: Number(month), produce: menuPlanner.seasonalProduce(Number(month)) });

  return json(menuPlanner.toJSON());
}

function handleCosting(request: Request): Response {
  const url = new URL(request.url);

  if (url.pathname.endsWith("/menu-engineering")) {
    const allRecipes = recipes.list();
    const menuItems = allRecipes
      .map((r) => {
        const menuEntry = menuPlanner.toJSON().flatMap((d) => d.items).find((i) => i.recipeId === r.id);
        return menuEntry ? { recipe: r, price: menuEntry.price } : null;
      })
      .filter(Boolean) as { recipe: Recipe; price: number }[];
    return json(costAnalyzer.engineerMenu(menuItems));
  }

  const recipeId = url.searchParams.get("recipeId");
  if (recipeId) {
    const r = recipes.get(recipeId);
    if (!r) return json({ error: "Recipe not found" }, 404);
    return json(costAnalyzer.analyzeRecipe(r));
  }

  return json({
    targetFoodCostPct: costAnalyzer["targetFoodCostPct"],
    recipes: recipes.list().map((r) => costAnalyzer.analyzeRecipe(r)),
  });
}

function handleSuppliers(request: Request): Response {
  const url = new URL(request.url);
  const action = url.pathname.replace("/api/suppliers", "").replace("/", "");

  if (action === "orders") {
    const supplierId = url.searchParams.get("supplierId");
    if (!supplierId) return json({ error: "supplierId required" }, 400);
    return json(suppliers.getOrders(supplierId));
  }

  if (request.method === "POST") {
    const body = request.json() as Promise<Partial<Supplier>>;
    return body.then((data) => json(suppliers.add(data as any)));
  }

  const category = url.searchParams.get("category");
  return json(suppliers.list({ category: category ?? undefined }));
}

function handleAllergens(request: Request): Response {
  const url = new URL(request.url);
  const action = url.pathname.replace("/api/allergens", "").replace("/", "");

  if (action === "major") return json(AllergenTracker.majorAllergens());
  if (action === "matrix") return json(allergens.matrix());
  if (action === "check") {
    const recipeId = url.searchParams.get("recipeId");
    const profileId = url.searchParams.get("profileId");
    if (!recipeId || !profileId) return json({ error: "recipeId and profileId required" }, 400);
    return json(allergens.checkSafe(recipeId, profileId));
  }

  if (request.method === "POST") {
    const body = request.json() as Promise<Partial<AllergenProfile>>;
    return body.then((data) => json(allergens.addProfile(data as any)));
  }

  return json(allergens.toJSON());
}

// ─── Main worker ────────────────────────────────────────────────────

function getAppHTML(): string {
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>cheflog.ai — Professional Kitchen Management</title>\n<style>\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:root{\n  --steel:#E5E7EB;--steel-dark:#9CA3AF;--steel-light:#F3F4F6;\n  --black:#111827;--black-mid:#1F2937;--black-light:#374151;\n  --red:#DC2626;--red-dark:#991B1B;--red-light:#FEE2E2;\n  --white:#FFFFFF;--success:#059669;--warning:#D97706;\n  --font:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;\n  --mono:\'SF Mono\',\'Fira Code\',monospace;\n}\nhtml{font-family:var(--font);background:var(--steel-light);color:var(--black)}\na{color:var(--red);text-decoration:none}\n\n/* Layout */\n.app{display:flex;height:100vh;overflow:hidden}\n.sidebar{width:260px;background:var(--black);color:var(--steel);display:flex;flex-direction:column;flex-shrink:0}\n.sidebar-brand{padding:20px;border-bottom:1px solid var(--black-light)}\n.sidebar-brand h1{font-size:20px;color:var(--white);letter-spacing:-0.5px}\n.sidebar-brand h1 span{color:var(--red)}\n.sidebar-brand p{font-size:11px;color:var(--steel-dark);margin-top:2px;text-transform:uppercase;letter-spacing:1px}\n.sidebar-nav{flex:1;overflow-y:auto;padding:8px 0}\n.nav-item{display:flex;align-items:center;gap:10px;padding:10px 20px;color:var(--steel-dark);cursor:pointer;font-size:13px;border-left:3px solid transparent;transition:all .15s}\n.nav-item:hover{background:var(--black-mid);color:var(--steel)}\n.nav-item.active{background:var(--black-mid);color:var(--white);border-left-color:var(--red)}\n.nav-icon{width:18px;text-align:center;font-size:14px}\n.sidebar-footer{padding:12px 20px;border-top:1px solid var(--black-light);font-size:11px;color:var(--steel-dark)}\n\n.main{flex:1;display:flex;flex-direction:column;overflow:hidden}\n.topbar{height:48px;background:var(--white);border-bottom:1px solid var(--steel);display:flex;align-items:center;padding:0 24px;gap:16px;flex-shrink:0}\n.topbar-title{font-size:14px;font-weight:600;color:var(--black)}\n.topbar-right{margin-left:auto;display:flex;align-items:center;gap:12px}\n.topbar-badge{background:var(--red);color:var(--white);font-size:10px;padding:2px 8px;border-radius:10px;font-weight:600}\n.content{flex:1;overflow-y:auto;padding:24px}\n\n/* Cards & Tables */\n.card{background:var(--white);border-radius:8px;border:1px solid var(--steel);margin-bottom:16px}\n.card-header{padding:16px 20px;border-bottom:1px solid var(--steel);display:flex;align-items:center;justify-content:between}\n.card-header h3{font-size:14px;font-weight:600}\n.card-body{padding:20px}\n.card-body.no-pad{padding:0}\n\ntable{width:100%;border-collapse:collapse;font-size:13px}\nth{text-align:left;padding:10px 16px;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--steel-dark);border-bottom:2px solid var(--steel);font-weight:600;background:var(--steel-light)}\ntd{padding:10px 16px;border-bottom:1px solid var(--steel)}\ntr:last-child td{border-bottom:none}\ntr:hover td{background:var(--steel-light)}\n\n/* Buttons */\n.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;border:1px solid transparent;transition:all .15s}\n.btn-primary{background:var(--red);color:var(--white)}.btn-primary:hover{background:var(--red-dark)}\n.btn-secondary{background:var(--white);color:var(--black);border-color:var(--steel)}.btn-secondary:hover{background:var(--steel-light)}\n.btn-sm{padding:5px 10px;font-size:12px}\n.btn-ghost{background:transparent;color:var(--steel-dark)}.btn-ghost:hover{background:var(--steel-light)}\n\n/* Tags */\n.tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:500}\n.tag-red{background:var(--red-light);color:var(--red-dark)}\n.tag-green{background:#D1FAE5;color:#065F46}\n.tag-yellow{background:#FEF3C7;color:#92400E}\n.tag-gray{background:var(--steel);color:var(--black-light)}\n\n/* Stats row */\n.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:24px}\n.stat{background:var(--white);border:1px solid var(--steel);border-radius:8px;padding:16px 20px}\n.stat-label{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--steel-dark);margin-bottom:4px}\n.stat-value{font-size:24px;font-weight:700;color:var(--black)}\n.stat-sub{font-size:12px;color:var(--steel-dark);margin-top:2px}\n\n/* Chat */\n.chat-container{display:flex;flex-direction:column;height:100%}\n.chat-messages{flex:1;overflow-y:auto;padding:20px}\n.msg{margin-bottom:16px;display:flex;gap:10px}\n.msg-user .msg-bubble{background:var(--black);color:var(--white);border-radius:12px 12px 4px 12px}\n.msg-ai .msg-bubble{background:var(--steel-light);color:var(--black);border-radius:12px 12px 12px 4px}\n.msg-bubble{max-width:70%;padding:12px 16px;font-size:13px;line-height:1.6;white-space:pre-wrap}\n.msg-user{flex-direction:row-reverse}\n.chat-input{padding:16px;border-top:1px solid var(--steel);display:flex;gap:8px}\n.chat-input input{flex:1;padding:10px 16px;border:1px solid var(--steel);border-radius:8px;font-size:13px;outline:none}\n.chat-input input:focus{border-color:var(--red)}\n\n/* Recipe detail */\n.recipe-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}\n.recipe-ingredients{list-style:none}\n.recipe-ingredients li{padding:6px 0;border-bottom:1px solid var(--steel);font-size:13px;display:flex;justify-content:space-between}\n.recipe-method{counter-reset:step;list-style:none}\n.recipe-method li{counter-increment:step;padding:8px 0 8px 32px;position:relative;font-size:13px;line-height:1.5}\n.recipe-method li::before{content:counter(step);position:absolute;left:0;top:8px;width:22px;height:22px;background:var(--red);color:var(--white);border-radius:50%;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:600}\n\n/* Allergen matrix */\n.matrix-table td,.matrix-table th{text-align:center;padding:8px}\n.matrix-check{color:var(--success);font-size:18px}\n.matrix-x{color:var(--red);font-size:18px;font-weight:700}\n\n/* Forms */\n.form-group{margin-bottom:16px}\n.form-group label{display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--black-light)}\n.form-group input,.form-group select,.form-group textarea{width:100%;padding:8px 12px;border:1px solid var(--steel);border-radius:6px;font-size:13px;outline:none}\n.form-group input:focus,.form-group select:focus{border-color:var(--red)}\n.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n\n/* Progress bar */\n.progress{height:8px;background:var(--steel);border-radius:4px;overflow:hidden}\n.progress-bar{height:100%;border-radius:4px;transition:width .3s}\n.progress-green .progress-bar{background:var(--success)}\n.progress-red .progress-bar{background:var(--red)}\n.progress-yellow .progress-bar{background:var(--warning)}\n\n/* Modal */\n.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:100}\n.modal{background:var(--white);border-radius:12px;width:90%;max-width:600px;max-height:80vh;overflow-y:auto}\n.modal-header{padding:16px 20px;border-bottom:1px solid var(--steel);display:flex;align-items:center;justify-content:space-between}\n.modal-header h3{font-size:16px;font-weight:600}\n.modal-body{padding:20px}\n\n/* Utilities */\n.flex{display:flex}.gap-8{gap:8px}.gap-16{gap:16px}.gap-24{gap:24px}\n.ml-auto{margin-left:auto}\n.text-sm{font-size:13px}.text-xs{font-size:11px}\n.text-gray{color:var(--steel-dark)}.text-red{color:var(--red)}.text-green{color:var(--success)}.text-bold{font-weight:600}\n.mt-8{margin-top:8px}.mt-16{margin-top:16px}.mb-16{margin-bottom:16px}\n.hidden{display:none!important}\n.tab-bar{display:flex;gap:0;border-bottom:2px solid var(--steel);margin-bottom:20px}\n.tab{padding:8px 20px;font-size:13px;cursor:pointer;color:var(--steel-dark);border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .15s}\n.tab:hover{color:var(--black)}.tab.active{color:var(--red);border-bottom-color:var(--red);font-weight:600}\n.search-input{padding:8px 12px;border:1px solid var(--steel);border-radius:6px;font-size:13px;outline:none;width:240px}\n.search-input:focus{border-color:var(--red)}\n.engineering-star{color:#F59E0B}.engineering-puzzle{color:#8B5CF6}.engineering-plowhorse{color:#3B82F6}.engineering-dog{color:var(--steel-dark)}\n.plating-box{background:var(--black);color:var(--steel);padding:12px 16px;border-radius:6px;font-style:italic;font-size:13px;line-height:1.5}\n</style>\n</head>\n<body>\n<div class="app">\n  <!-- Sidebar -->\n  <aside class="sidebar">\n    <div class="sidebar-brand">\n      <h1>cheflog<span>.ai</span></h1>\n      <p>Kitchen Command</p>\n    </div>\n    <nav class="sidebar-nav">\n      <div class="nav-item active" data-view="chat"><span class="nav-icon">&#9998;</span> Chef Chat</div>\n      <div class="nav-item" data-view="recipes"><span class="nav-icon">&#9776;</span> Recipes</div>\n      <div class="nav-item" data-view="inventory"><span class="nav-icon">&#9733;</span> Inventory</div>\n      <div class="nav-item" data-view="menu"><span class="nav-icon">&#9776;</span> Menu Planner</div>\n      <div class="nav-item" data-view="costing"><span class="nav-icon">&#9830;</span> Food Costing</div>\n      <div class="nav-item" data-view="suppliers"><span class="nav-icon">&#9993;</span> Suppliers</div>\n      <div class="nav-item" data-view="allergens"><span class="nav-icon">&#9888;</span> Allergens</div>\n    </nav>\n    <div class="sidebar-footer">cheflog.ai v1.0 &mdash; Professional Edition</div>\n  </aside>\n\n  <!-- Main -->\n  <main class="main">\n    <div class="topbar">\n      <span class="topbar-title" id="topbar-title">Chef Chat</span>\n      <div class="topbar-right">\n        <span class="topbar-badge" id="alert-badge" style="display:none">0</span>\n      </div>\n    </div>\n    <div class="content" id="content">\n      <!-- Views injected here -->\n    </div>\n  </main>\n</div>\n\n<script>\nconst API = \'\';\nlet currentView = \'chat\';\nlet chatMessages = [];\nlet allRecipes = [];\nlet allInventory = [];\nlet allSuppliers = [];\nlet allAllergens = {};\n\n// ─── Navigation ─────────────────────────────────────────────────────\ndocument.querySelectorAll(\'.nav-item\').forEach(item => {\n  item.addEventListener(\'click\', () => {\n    document.querySelectorAll(\'.nav-item\').forEach(n => n.classList.remove(\'active\'));\n    item.classList.add(\'active\');\n    currentView = item.dataset.view;\n    document.getElementById(\'topbar-title\').textContent = {\n      chat:\'Chef Chat\',recipes:\'Recipe Database\',inventory:\'Kitchen Inventory\',\n      menu:\'Menu Planner\',costing:\'Food Cost Analysis\',suppliers:\'Supplier Directory\',allergens:\'Allergen Management\'\n    }[currentView];\n    loadView(currentView);\n  });\n});\n\nfunction loadView(view) {\n  const c = document.getElementById(\'content\');\n  switch(view) {\n    case \'chat\': renderChat(c); break;\n    case \'recipes\': loadRecipes(); break;\n    case \'inventory\': loadInventory(); break;\n    case \'menu\': loadMenu(); break;\n    case \'costing\': loadCosting(); break;\n    case \'suppliers\': loadSuppliers(); break;\n    case \'allergens\': loadAllergens(); break;\n  }\n}\n\n// ─── API helpers ────────────────────────────────────────────────────\nasync function api(path, opts = {}) {\n  const r = await fetch(API + path, { headers: {\'Content-Type\':\'application/json\'}, ...opts });\n  return r.json();\n}\n\n// ─── Chat View ──────────────────────────────────────────────────────\nfunction renderChat(container) {\n  container.innerHTML = `\n    <div class="chat-container">\n      <div class="chat-messages" id="chat-messages">\n        <div class="msg msg-ai">\n          <div class="msg-bubble">Good evening, Chef. Your kitchen is ready.\\n\\nI can help with recipe development, menu planning, food costing, inventory, and plating. What are we working on tonight?</div>\n        </div>\n      </div>\n      <div class="chat-input">\n        <input type="text" id="chat-input" placeholder="Ask about recipes, costs, techniques..." autocomplete="off">\n        <button class="btn btn-primary" onclick="sendChat()">Send</button>\n      </div>\n    </div>`;\n  document.getElementById(\'chat-input\').addEventListener(\'keydown\', e => { if(e.key===\'Enter\') sendChat(); });\n}\n\nasync function sendChat() {\n  const input = document.getElementById(\'chat-input\');\n  const msg = input.value.trim();\n  if (!msg) return;\n  input.value = \'\';\n\n  const messagesDiv = document.getElementById(\'chat-messages\');\n  messagesDiv.innerHTML += `<div class="msg msg-user"><div class="msg-bubble">${escHtml(msg)}</div></div>`;\n\n  chatMessages.push({ role:\'user\', content: msg });\n  messagesDiv.innerHTML += `<div class="msg msg-ai" id="stream-msg"><div class="msg-bubble" id="stream-bubble">...</div></div>`;\n  messagesDiv.scrollTop = messagesDiv.scrollHeight;\n\n  try {\n    const resp = await fetch(API + \'/api/chat\', {\n      method:\'POST\',\n      headers:{\'Content-Type\':\'application/json\'},\n      body: JSON.stringify({ messages: chatMessages })\n    });\n    const reader = resp.body.getReader();\n    const decoder = new TextDecoder();\n    let full = \'\';\n    const bubble = document.getElementById(\'stream-bubble\');\n    while(true) {\n      const {done, value} = await reader.read();\n      if(done) break;\n      const chunk = decoder.decode(value);\n      const lines = chunk.split(\'\\n\');\n      for(const line of lines) {\n        if(line.startsWith(\'data: \')) {\n          const data = line.slice(6);\n          if(data === \'[DONE]\') continue;\n          try {\n            const j = JSON.parse(data);\n            const delta = j.choices?.[0]?.delta?.content || \'\';\n            full += delta;\n            bubble.textContent = full;\n          } catch {}\n        }\n      }\n      messagesDiv.scrollTop = messagesDiv.scrollHeight;\n    }\n    chatMessages.push({ role:\'assistant\', content: full });\n  } catch(e) {\n    document.getElementById(\'stream-bubble\').textContent = \'Connection error. The DeepSeek API key may not be configured.\';\n  }\n}\n\n// ─── Recipes View ───────────────────────────────────────────────────\nasync function loadRecipes() {\n  allRecipes = await api(\'/api/recipes\');\n  renderRecipes();\n}\n\nfunction renderRecipes() {\n  const c = document.getElementById(\'content\');\n  c.innerHTML = `\n    <div class="flex gap-16 mb-16">\n      <input class="search-input" id="recipe-search" placeholder="Search recipes..." oninput="filterRecipes()">\n      <button class="btn btn-primary" onclick="showRecipeForm()">+ New Recipe</button>\n    </div>\n    <div class="card"><div class="card-body no-pad">\n      <table>\n        <thead><tr><th>Recipe</th><th>Category</th><th>Cuisine</th><th>Prep</th><th>Cost/Srv</th><th>Allergens</th><th></th></tr></thead>\n        <tbody id="recipe-tbody"></tbody>\n      </table>\n    </div></div>\n    <div id="recipe-detail"></div>`;\n  renderRecipeRows(allRecipes);\n}\n\nfunction renderRecipeRows(recipes) {\n  const tbody = document.getElementById(\'recipe-tbody\');\n  if(!tbody) return;\n  tbody.innerHTML = recipes.map(r => `\n    <tr onclick="showRecipeDetail(\'${r.id}\')" style="cursor:pointer">\n      <td class="text-bold">${escHtml(r.name)}</td>\n      <td><span class="tag tag-gray">${r.category}</span></td>\n      <td>${r.cuisine}</td>\n      <td>${r.prepTimeMin}+${r.cookTimeMin} min</td>\n      <td>$${r.costPerServing.toFixed(2)}</td>\n      <td>${r.allergens.map(a=>`<span class="tag tag-red">${a}</span>`).join(\' \') || \'—\'}</td>\n      <td><span class="btn btn-sm btn-ghost">View</span></td>\n    </tr>`).join(\'\');\n}\n\nfunction filterRecipes() {\n  const q = document.getElementById(\'recipe-search\').value.toLowerCase();\n  const filtered = allRecipes.filter(r =>\n    r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) ||\n    r.tags.some(t => t.toLowerCase().includes(q)) || r.category.toLowerCase().includes(q)\n  );\n  renderRecipeRows(filtered);\n}\n\nfunction showRecipeDetail(id) {\n  const r = allRecipes.find(x => x.id === id);\n  if(!r) return;\n  const detail = document.getElementById(\'recipe-detail\');\n  detail.innerHTML = `\n    <div class="card"><div class="card-header"><h3>${escHtml(r.name)}</h3>\n      <div class="flex gap-8 ml-auto">\n        ${r.dietary.map(d=>`<span class="tag tag-green">${d}</span>`).join(\'\')}\n        ${r.allergens.map(a=>`<span class="tag tag-red">${a}</span>`).join(\'\')}\n      </div>\n    </div></div>\n    <div class="recipe-grid">\n      <div class="card"><div class="card-header"><h3>Ingredients</h3><span class="text-xs text-gray">${r.servings} servings</span></div>\n        <div class="card-body"><ul class="recipe-ingredients">\n          ${r.ingredients.map(i=>`<li><span>${i.quantity} ${i.unit} ${escHtml(i.name)} ${i.prepNotes?\'<span class="text-gray text-xs">(\'+escHtml(i.prepNotes)+\')</span>\':\'\'}</span><span>$${i.cost.toFixed(2)}</span></li>`).join(\'\')}\n        </ul></div>\n      </div>\n      <div class="card"><div class="card-header"><h3>Method</h3><span class="text-xs text-gray">${r.prepTimeMin} prep + ${r.cookTimeMin} cook</span></div>\n        <div class="card-body"><ol class="recipe-method">\n          ${r.method.map(s=>`<li>${escHtml(s)}</li>`).join(\'\')}\n        </ol></div>\n      </div>\n    </div>\n    <div class="card mt-16"><div class="card-header"><h3>Plating</h3></div>\n      <div class="card-body"><div class="plating-box">${escHtml(r.plating)}</div></div>\n    </div>\n    <div class="card mt-16"><div class="card-header"><h3>Tags</h3></div>\n      <div class="card-body"><div class="flex gap-8">${r.tags.map(t=>`<span class="tag tag-gray">${t}</span>`).join(\'\')}</div></div>\n    </div>`;\n}\n\nfunction showRecipeForm() {\n  const detail = document.getElementById(\'recipe-detail\');\n  if(!detail) return;\n  detail.innerHTML = `\n    <div class="card"><div class="card-header"><h3>New Recipe</h3><button class="btn btn-sm btn-ghost" onclick="document.getElementById(\'recipe-detail\').innerHTML=\'\'">Close</button></div>\n      <div class="card-body">\n        <div class="form-row"><div class="form-group"><label>Recipe Name</label><input id="nr-name"></div>\n        <div class="form-group"><label>Category</label><select id="nr-cat"><option>entree</option><option>appetizer</option><option>dessert</option><option>soup</option><option>side</option></select></div></div>\n        <div class="form-row"><div class="form-group"><label>Cuisine</label><input id="nr-cuisine" value="French"></div>\n        <div class="form-group"><label>Servings</label><input id="nr-servings" type="number" value="4"></div></div>\n        <div class="form-row"><div class="form-group"><label>Prep Time (min)</label><input id="nr-prep" type="number" value="15"></div>\n        <div class="form-group"><label>Cook Time (min)</label><input id="nr-cook" type="number" value="20"></div></div>\n        <div class="form-group"><label>Plating Notes</label><textarea id="nr-plating" rows="2"></textarea></div>\n        <button class="btn btn-primary" onclick="submitRecipe()">Create Recipe</button>\n      </div>\n    </div>`;\n}\n\nasync function submitRecipe() {\n  const recipe = {\n    name: document.getElementById(\'nr-name\').value,\n    category: document.getElementById(\'nr-cat\').value,\n    cuisine: document.getElementById(\'nr-cuisine\').value,\n    servings: +document.getElementById(\'nr-servings\').value,\n    prepTimeMin: +document.getElementById(\'nr-prep\').value,\n    cookTimeMin: +document.getElementById(\'nr-cook\').value,\n    plating: document.getElementById(\'nr-plating\').value,\n    ingredients: [], method: [], allergens: [], dietary: [], tags: [], costPerServing: 0,\n  };\n  await api(\'/api/recipes\', { method:\'POST\', body: JSON.stringify(recipe) });\n  loadRecipes();\n}\n\n// ─── Inventory View ─────────────────────────────────────────────────\nasync function loadInventory() {\n  allInventory = await api(\'/api/inventory\');\n  const belowPar = await api(\'/api/inventory/below-par\');\n  const val = await api(\'/api/inventory/total-value\');\n  renderInventory(allInventory, belowPar.length, val.totalValue);\n}\n\nfunction renderInventory(items, alertCount, totalVal) {\n  const alertBadge = document.getElementById(\'alert-badge\');\n  if(alertCount > 0) { alertBadge.style.display = \'\'; alertBadge.textContent = alertCount; }\n\n  const c = document.getElementById(\'content\');\n  c.innerHTML = `\n    <div class="stats">\n      <div class="stat"><div class="stat-label">Total Items</div><div class="stat-value">${items.length}</div></div>\n      <div class="stat"><div class="stat-label">Inventory Value</div><div class="stat-value">$${totalVal.toFixed(0)}</div></div>\n      <div class="stat"><div class="stat-label">Below Par</div><div class="stat-value text-red">${alertCount}</div></div>\n      <div class="stat"><div class="stat-label">Categories</div><div class="stat-value">${new Set(items.map(i=>i.category)).size}</div></div>\n    </div>\n    <div class="card"><div class="card-header"><h3>Inventory Items</h3>\n      <select class="search-input ml-auto" onchange="filterInventory(this.value)" style="width:160px">\n        <option value="">All Categories</option>\n        ${[...new Set(items.map(i=>i.category))].map(c=>`<option value="${c}">${c}</option>`).join(\'\')}\n      </select>\n    </div>\n    <div class="card-body no-pad"><table>\n      <thead><tr><th>Item</th><th>Category</th><th>Stock</th><th>Par Level</th><th>Status</th><th>Location</th><th>Unit Cost</th><th>Value</th></tr></thead>\n      <tbody>${items.map(i => {\n        const pct = (i.currentStock / i.parLevel) * 100;\n        const status = pct <= 25 ? \'tag-red\' : pct <= 75 ? \'tag-yellow\' : \'tag-green\';\n        const statusText = pct <= 25 ? \'Low\' : pct <= 75 ? \'Adequate\' : \'Good\';\n        return `<tr>\n          <td class="text-bold">${escHtml(i.name)}</td>\n          <td><span class="tag tag-gray">${i.category}</span></td>\n          <td>${i.currentStock} ${i.unit}</td>\n          <td>${i.parLevel} ${i.unit}</td>\n          <td><span class="tag ${status}">${statusText}</span>\n            <div class="progress progress-${pct<=25?\'red\':pct<=75?\'yellow\':\'green\'}" style="width:60px;margin-top:4px"><div class="progress-bar" style="width:${Math.min(pct,100)}%"></div></div>\n          </td>\n          <td class="text-xs">${escHtml(i.location)}</td>\n          <td>$${i.costPerUnit.toFixed(2)}</td>\n          <td>$${(i.currentStock * i.costPerUnit).toFixed(2)}</td>\n        </tr>`;\n      }).join(\'\')}</tbody>\n    </table></div></div>`;\n}\n\nfunction filterInventory(cat) {\n  if(!cat) { renderInventory(allInventory, 0, 0); return; }\n  const filtered = allInventory.filter(i => i.category === cat);\n  renderInventory(filtered, filtered.filter(i=>i.currentStock<=i.reorderPoint).length, filtered.reduce((s,i)=>s+i.currentStock*i.costPerUnit,0));\n}\n\n// ─── Menu Planner View ──────────────────────────────────────────────\nasync function loadMenu() {\n  const today = new Date();\n  const monday = new Date(today);\n  monday.setDate(today.getDate() - ((today.getDay()+6)%7));\n  const weekKey = monday.toISOString().slice(0,10);\n  const week = await api(\'/api/menu-planning?week=\'+weekKey);\n  const seasonal = await api(\'/api/menu-planning?seasonal=\'+(today.getMonth()+1));\n  allRecipes = allRecipes.length ? allRecipes : await api(\'/api/recipes\');\n  renderMenu(week, seasonal);\n}\n\nfunction renderMenu(week, seasonal) {\n  const days = [\'Monday\',\'Tuesday\',\'Wednesday\',\'Thursday\',\'Friday\',\'Saturday\',\'Sunday\'];\n  const c = document.getElementById(\'content\');\n  c.innerHTML = `\n    <div class="stats">\n      <div class="stat"><div class="stat-label">Seasonal Produce</div><div class="stat-value text-sm" style="font-size:14px">${seasonal.produce.join(\', \')}</div></div>\n    </div>\n    <div class="card"><div class="card-header"><h3>Weekly Menu</h3></div>\n    <div class="card-body no-pad"><table>\n      <thead><tr><th>Day</th><th>Service</th><th>Items</th></tr></thead>\n      <tbody>${week.map((d,i) => {\n        const itemCount = d.items.length;\n        const items = d.items.map(mi => {\n          const recipe = allRecipes.find(r=>r.id===mi.recipeId);\n          const featured = mi.featured ? \' <span class="tag tag-red">Featured</span>\' : \'\';\n          return recipe ? `<span class="tag tag-gray">${recipe.name} — $${mi.price}</span>${featured}` : \'\';\n        }).join(\' \');\n        return `<tr><td class="text-bold">${days[i]}</td><td><span class="tag tag-gray">${d.service}</span></td>\n          <td>${itemCount ? items : \'<span class="text-gray">No service</span>\'}</td></tr>`;\n      }).join(\'\')}</tbody>\n    </table></div></div>`;\n}\n\n// ─── Costing View ───────────────────────────────────────────────────\nasync function loadCosting() {\n  const data = await api(\'/api/costing\');\n  const engineering = await api(\'/api/costing/menu-engineering\');\n  renderCosting(data, engineering);\n}\n\nfunction renderCosting(data, engineering) {\n  const c = document.getElementById(\'content\');\n  const avgCost = data.recipes.length ? data.recipes.reduce((s,r)=>s+r.costPerServing,0)/data.recipes.length : 0;\n  c.innerHTML = `\n    <div class="stats">\n      <div class="stat"><div class="stat-label">Target Food Cost</div><div class="stat-value">${(data.targetFoodCostPct*100).toFixed(0)}%</div></div>\n      <div class="stat"><div class="stat-label">Avg Cost/Serving</div><div class="stat-value">$${avgCost.toFixed(2)}</div></div>\n      <div class="stat"><div class="stat-label">Recipes Analyzed</div><div class="stat-value">${data.recipes.length}</div></div>\n    </div>\n    <div class="card"><div class="card-header"><h3>Recipe Cost Breakdown</h3></div>\n    <div class="card-body no-pad"><table>\n      <thead><tr><th>Recipe</th><th>Total Cost</th><th>Servings</th><th>Cost/Serving</th><th>Suggested Price</th><th>Food Cost %</th></tr></thead>\n      <tbody>${data.recipes.map(r => `<tr>\n        <td class="text-bold">${escHtml(r.recipeName)}</td>\n        <td>$${r.totalCost.toFixed(2)}</td>\n        <td>${r.servings}</td>\n        <td>$${r.costPerServing.toFixed(2)}</td>\n        <td class="text-green text-bold">$${r.suggestedPrice.toFixed(2)}</td>\n        <td>${(r.foodCostPct*100).toFixed(0)}%</td>\n      </tr>`).join(\'\')}</tbody>\n    </table></div></div>\n    <div class="card mt-16"><div class="card-header"><h3>Menu Engineering Matrix</h3></div>\n    <div class="card-body no-pad"><table>\n      <thead><tr><th>Item</th><th>Food Cost</th><th>Menu Price</th><th>Cost %</th><th>Contribution</th><th>Popularity</th><th>Classification</th></tr></thead>\n      <tbody>${engineering.map(e => {\n        const cls = {star:\'engineering-star\',plowhorse:\'engineering-puzzle\',puzzle:\'engineering-puzzle\',dog:\'engineering-dog\'}[e.classification];\n        const label = e.classification.charAt(0).toUpperCase()+e.classification.slice(1);\n        return `<tr>\n          <td class="text-bold">${escHtml(e.name)}</td>\n          <td>$${e.foodCost.toFixed(2)}</td>\n          <td>$${e.menuPrice.toFixed(2)}</td>\n          <td>${(e.foodCostPct*100).toFixed(1)}%</td>\n          <td class="text-green text-bold">$${e.contribution.toFixed(2)}</td>\n          <td>${e.popularity} sold</td>\n          <td class="${cls} text-bold">${label}</td>\n        </tr>`;\n      }).join(\'\')}</tbody>\n    </table></div></div>`;\n}\n\n// ─── Suppliers View ─────────────────────────────────────────────────\nasync function loadSuppliers() {\n  allSuppliers = await api(\'/api/suppliers\');\n  renderSuppliers(allSuppliers);\n}\n\nfunction renderSuppliers(suppliers) {\n  const c = document.getElementById(\'content\');\n  c.innerHTML = `\n    <div class="stats">\n      ${suppliers.map(s => `\n        <div class="stat">\n          <div class="stat-label">${escHtml(s.category).toUpperCase()}</div>\n          <div class="stat-value" style="font-size:16px">${escHtml(s.name)}</div>\n          <div class="stat-sub">${s.leadTimeDays}d lead &bull; $${s.minOrder} min &bull; ${s.terms}</div>\n        </div>`).join(\'\')}\n    </div>\n    ${suppliers.map(s => `\n    <div class="card"><div class="card-header">\n      <h3>${escHtml(s.name)}</h3>\n      <div class="flex gap-8 ml-auto">\n        <span class="tag tag-gray">${s.category}</span>\n        <span class="tag tag-green">Rating: ${s.rating}/5</span>\n      </div>\n    </div><div class="card-body">\n      <div class="form-row">\n        <div><strong>Rep:</strong> ${escHtml(s.repName)}</div>\n        <div><strong>Phone:</strong> ${escHtml(s.phone)}</div>\n        <div><strong>Email:</strong> ${escHtml(s.email)}</div>\n      </div>\n      <div class="mt-8"><strong>Address:</strong> ${escHtml(s.address)}</div>\n      <div class="mt-8 text-sm text-gray">${escHtml(s.notes)}</div>\n      ${s.orderHistory.length ? `<table class="mt-16"><thead><tr><th>Order Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>\n        <tbody>${s.orderHistory.map(o => {\n          const statusCls = o.status===\'delivered\'?\'tag-green\':o.status===\'confirmed\'?\'tag-yellow\':\'tag-gray\';\n          return `<tr><td>${new Date(o.date).toLocaleDateString()}</td>\n            <td class="text-sm">${o.items.map(i=>escHtml(i.name)).join(\', \')}</td>\n            <td class="text-bold">$${o.total.toFixed(2)}</td>\n            <td><span class="tag tag-${statusCls}">${o.status}</span></td></tr>`;\n        }).join(\'\')}</tbody></table>` : \'<div class="text-gray text-sm mt-16">No orders on file.</div>\'}\n    </div></div>`).join(\'\')}`;\n}\n\n// ─── Allergens View ─────────────────────────────────────────────────\nasync function loadAllergens() {\n  allAllergens = await api(\'/api/allergens\');\n  const major = await api(\'/api/allergens/major\');\n  const matrix = await api(\'/api/allergens/matrix\');\n  allRecipes = allRecipes.length ? allRecipes : await api(\'/api/recipes\');\n  renderAllergens(major, matrix);\n}\n\nfunction renderAllergens(major, matrix) {\n  const profiles = allAllergens.profiles || [];\n  const recipeAllergens = allAllergens.recipeAllergens || {};\n  const c = document.getElementById(\'content\');\n  c.innerHTML = `\n    <div class="stats">\n      <div class="stat"><div class="stat-label">Profiles Tracked</div><div class="stat-value">${profiles.length}</div></div>\n      <div class="stat"><div class="stat-label">Recipes Mapped</div><div class="stat-value">${Object.keys(recipeAllergens).length}</div></div>\n      <div class="stat"><div class="stat-label">Major Allergens</div><div class="stat-value">${major.length}</div></div>\n    </div>\n    <div class="card"><div class="card-header"><h3>Allergen Profiles</h3></div>\n    <div class="card-body no-pad"><table>\n      <thead><tr><th>Profile</th><th>Restrictions</th><th>Severity</th><th>Notes</th></tr></thead>\n      <tbody>${profiles.map(p => `<tr>\n        <td class="text-bold">${escHtml(p.name)}</td>\n        <td>${p.restrictions.map(r=>`<span class="tag tag-red">${r}</span>`).join(\' \')}</td>\n        <td>${Object.entries(p.severity).map(([k,v])=>`<span class="text-xs">${k}: ${v}</span>`).join(\', \')}</td>\n        <td class="text-sm text-gray">${escHtml(p.notes)}</td>\n      </tr>`).join(\'\')}</tbody>\n    </table></div></div>\n    <div class="card mt-16"><div class="card-header"><h3>Cross-Reference Matrix</h3><span class="text-xs text-gray ml-auto">Safe = recipe has no conflict with profile restrictions</span></div>\n    <div class="card-body no-pad"><table class="matrix-table">\n      <thead><tr><th>Recipe</th>${profiles.map(p=>`<th>${escHtml(p.name).split(\'—\')[0].trim()}</th>`).join(\'\')}</tr></thead>\n      <tbody>${Object.entries(matrix).map(([rid, profs]) => {\n        const recipe = allRecipes.find(r=>r.id===rid);\n        return `<tr><td class="text-bold">${recipe?escHtml(recipe.name):rid}</td>\n          ${profiles.map(p=>`<td>${profs[p.id]?\'<span class="matrix-check">&#10003;</span>\':\'<span class="matrix-x">&#10007;</span>\'}</td>`).join(\'\')}</tr>`;\n      }).join(\'\')}</tbody>\n    </table></div></div>\n    <div class="card mt-16"><div class="card-header"><h3>Recipe Allergen Map</h3></div>\n    <div class="card-body no-pad"><table>\n      <thead><tr><th>Recipe</th><th>Contains Allergens</th></tr></thead>\n      <tbody>${Object.entries(recipeAllergens).map(([rid,allgs]) => {\n        const recipe = allRecipes.find(r=>r.id===rid);\n        return `<tr><td class="text-bold">${recipe?escHtml(recipe.name):rid}</td>\n          <td>${allgs.map(a=>`<span class="tag tag-red">${a}</span>`).join(\' \')}</td></tr>`;\n      }).join(\'\')}</tbody>\n    </table></div></div>`;\n}\n\n// ─── Utils ──────────────────────────────────────────────────────────\nfunction escHtml(s) {\n  const d = document.createElement(\'div\');\n  d.textContent = s;\n  return d.innerHTML;\n}\n\n// ─── Init ───────────────────────────────────────────────────────────\nloadView(\'chat\');\n</script>\n</body>\n</html>\n';
}

export default {
  async fetch(request: Request, env: { DEEPSEEK_API_KEY: string }): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Serve static HTML
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(getAppHTML(), { headers: { 'Content-Type': 'text/html' } });
    }

    // API routes
    if (url.pathname === "/api/chat" && request.method === "POST") {
      return handleChat(request, env);
    }
    if (url.pathname.startsWith("/api/recipes")) {
      return handleRecipes(request);
    }
    if (url.pathname.startsWith("/api/inventory")) {
      return handleInventory(request);
    }
    if (url.pathname.startsWith("/api/menu-planning")) {
      return handleMenuPlanning(request);
    }
    if (url.pathname.startsWith("/api/costing")) {
      return handleCosting(request);
    }
    if (url.pathname.startsWith("/api/suppliers")) {
      return handleSuppliers(request);
    }
    if (url.pathname.startsWith("/api/allergens")) {
      return handleAllergens(request);
    }

    return json({ error: "Not found" }, 404);
  },
};
