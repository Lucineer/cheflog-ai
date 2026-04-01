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
export default {
  async fetch(request: Request, env: { DEEPSEEK_API_KEY: string }): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Serve static HTML
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return env.ASSETS
        ? new Response(env.ASSETS as any)
        : new Response(null, { status: 404 });
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
