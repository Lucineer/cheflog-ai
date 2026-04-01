// cheflog.ai — Professional Kitchen Management Tracker

export interface Recipe {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  prepTimeMin: number;
  cookTimeMin: number;
  servings: number;
  ingredients: RecipeIngredient[];
  method: string[];
  plating: string;
  costPerServing: number;
  allergens: string[];
  dietary: string[];
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  prepNotes: string;
  cost: number;
  supplierId?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  parLevel: number;
  reorderPoint: number;
  reorderQty: number;
  costPerUnit: number;
  supplierId: string;
  location: string;
  lastReceived: number;
  expiryDate?: number;
  notes: string;
}

export interface MenuDay {
  date: string;
  service: "lunch" | "dinner" | "brunch" | "special";
  items: MenuItem[];
}

export interface MenuItem {
  recipeId: string;
  type: "appetizer" | "entree" | "dessert" | "special" | "soup" | "side";
  price: number;
  featured: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  repName: string;
  terms: string;
  leadTimeDays: number;
  minOrder: number;
  rating: number;
  notes: string;
  orderHistory: Order[];
}

export interface Order {
  id: string;
  date: number;
  items: { name: string; qty: number; unit: string; unitCost: number; total: number }[];
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  deliveryDate?: number;
}

export interface AllergenProfile {
  id: string;
  name: string;
  restrictions: string[];
  severity: Record<string, "mild" | "moderate" | "severe">;
  notes: string;
}

// ─── RecipeManager ──────────────────────────────────────────────────
export class RecipeManager {
  private recipes: Map<string, Recipe> = new Map();

  constructor(seed?: Recipe[]) {
    if (seed) seed.forEach((r) => this.recipes.set(r.id, r));
  }

  add(recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">): Recipe {
    const now = Date.now();
    const r: Recipe = { ...recipe, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
    this.recipes.set(r.id, r);
    return r;
  }

  get(id: string): Recipe | undefined {
    return this.recipes.get(id);
  }

  update(id: string, patch: Partial<Recipe>): Recipe | null {
    const existing = this.recipes.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch, id, updatedAt: Date.now() };
    this.recipes.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.recipes.delete(id);
  }

  list(filter?: { category?: string; cuisine?: string; allergen?: string; dietary?: string }): Recipe[] {
    let results = [...this.recipes.values()];
    if (filter?.category) results = results.filter((r) => r.category === filter.category);
    if (filter?.cuisine) results = results.filter((r) => r.cuisine === filter.cuisine);
    if (filter?.allergen) results = results.filter((r) => !r.allergens.includes(filter.allergen!));
    if (filter?.dietary) results = results.filter((r) => r.dietary.includes(filter.dietary!));
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }

  search(query: string): Recipe[] {
    const q = query.toLowerCase();
    return [...this.recipes.values()].filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.category.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q),
    );
  }

  toJSON(): Recipe[] {
    return [...this.recipes.values()];
  }
}

// ─── KitchenInventory ───────────────────────────────────────────────
export class KitchenInventory {
  private items: Map<string, InventoryItem> = new Map();

  constructor(seed?: InventoryItem[]) {
    if (seed) seed.forEach((i) => this.items.set(i.id, i));
  }

  add(item: Omit<InventoryItem, "id">): InventoryItem {
    const i: InventoryItem = { ...item, id: crypto.randomUUID() };
    this.items.set(i.id, i);
    return i;
  }

  get(id: string): InventoryItem | undefined {
    return this.items.get(id);
  }

  update(id: string, patch: Partial<InventoryItem>): InventoryItem | null {
    const existing = this.items.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch, id };
    this.items.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  list(filter?: { category?: string; belowPar?: boolean; location?: string }): InventoryItem[] {
    let results = [...this.items.values()];
    if (filter?.category) results = results.filter((i) => i.category === filter.category);
    if (filter?.belowPar) results = results.filter((i) => i.currentStock <= i.reorderPoint);
    if (filter?.location) results = results.filter((i) => i.location === filter.location);
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }

  belowPar(): InventoryItem[] {
    return [...this.items.values()].filter((i) => i.currentStock <= i.reorderPoint);
  }

  totalValue(): number {
    return [...this.items.values()].reduce((sum, i) => sum + i.currentStock * i.costPerUnit, 0);
  }

  adjustStock(id: string, delta: number): InventoryItem | null {
    const item = this.items.get(id);
    if (!item) return null;
    item.currentStock = Math.max(0, item.currentStock + delta);
    return item;
  }

  toJSON(): InventoryItem[] {
    return [...this.items.values()];
  }
}

// ─── MenuPlanner ────────────────────────────────────────────────────
export class MenuPlanner {
  private menus: Map<string, MenuDay> = new Map();

  constructor(seed?: MenuDay[]) {
    if (seed) seed.forEach((m) => this.menus.set(m.date, m));
  }

  setDay(day: MenuDay): MenuDay {
    this.menus.set(day.date, day);
    return day;
  }

  getDay(date: string): MenuDay | undefined {
    return this.menus.get(date);
  }

  getWeek(startMonday: string): MenuDay[] {
    const days: MenuDay[] = [];
    const start = new Date(startMonday);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      days.push(this.menus.get(key) ?? { date: key, service: "dinner", items: [] });
    }
    return days;
  }

  removeDay(date: string): boolean {
    return this.menus.delete(date);
  }

  seasonalProduce(month: number): string[] {
    const seasons: Record<string, string[]> = {
      spring: ["asparagus", "peas", "artichoke", "rhubarb", "fava beans", "morels", "radishes"],
      summer: ["tomatoes", "corn", "zucchini", "peaches", "berries", "basil", "watermelon"],
      fall: ["pumpkin", "butternut squash", "apples", "brussels sprouts", "figs", "cranberries", "parsnips"],
      winter: ["citrus", "kale", "beets", "turnips", "leeks", "persimmons", "pomegranate"],
    };
    if (month >= 3 && month <= 5) return seasons.spring;
    if (month >= 6 && month <= 8) return seasons.summer;
    if (month >= 9 && month <= 11) return seasons.fall;
    return seasons.winter;
  }

  toJSON(): MenuDay[] {
    return [...this.menus.values()];
  }
}

// ─── FoodCostAnalyzer ───────────────────────────────────────────────
export interface CostBreakdown {
  ingredient: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  pct: number;
}

export interface RecipeCostReport {
  recipeId: string;
  recipeName: string;
  servings: number;
  totalCost: number;
  costPerServing: number;
  breakdown: CostBreakdown[];
  foodCostPct: number;
  suggestedPrice: number;
}

export interface MenuEngineeringItem {
  recipeId: string;
  name: string;
  foodCost: number;
  menuPrice: number;
  foodCostPct: number;
  contribution: number;
  popularity: number;
  classification: "star" | "plowhorse" | "puzzle" | "dog";
}

export class FoodCostAnalyzer {
  private targetFoodCostPct: number;
  private salesData: Map<string, number> = new Map(); // recipeId -> units sold

  constructor(targetFoodCostPct = 0.30) {
    this.targetFoodCostPct = targetFoodCostPct;
  }

  setTarget(pct: number) {
    this.targetFoodCostPct = pct;
  }

  recordSales(recipeId: string, units: number) {
    this.salesData.set(recipeId, (this.salesData.get(recipeId) ?? 0) + units);
  }

  analyzeRecipe(recipe: Recipe): RecipeCostReport {
    const totalCost = recipe.ingredients.reduce((s, i) => s + i.cost, 0);
    const costPerServing = totalCost / recipe.servings;
    const breakdown: CostBreakdown[] = recipe.ingredients.map((i) => ({
      ingredient: i.name,
      quantity: i.quantity,
      unit: i.unit,
      unitCost: i.cost / i.quantity,
      totalCost: i.cost,
      pct: (i.cost / totalCost) * 100,
    }));
    const suggestedPrice = costPerServing / this.targetFoodCostPct;
    return {
      recipeId: recipe.id,
      recipeName: recipe.name,
      servings: recipe.servings,
      totalCost,
      costPerServing,
      breakdown,
      foodCostPct: this.targetFoodCostPct,
      suggestedPrice: Math.ceil(suggestedPrice * 100) / 100,
    };
  }

  engineerMenu(items: { recipe: Recipe; price: number }[]): MenuEngineeringItem[] {
    const avgPopularity = items.length
      ? items.reduce((s, i) => s + (this.salesData.get(i.recipe.id) ?? 0), 0) / items.length
      : 0;
    const avgFoodCostPct = items.length
      ? items.reduce((s, i) => {
          const cost = i.recipe.ingredients.reduce((ss, ing) => ss + ing.cost, 0);
          return s + cost / i.recipe.servings / i.price;
        }, 0) / items.length
      : 0;

    return items.map(({ recipe, price }) => {
      const foodCost = recipe.ingredients.reduce((s, i) => s + i.cost, 0) / recipe.servings;
      const foodCostPct = foodCost / price;
      const contribution = price - foodCost;
      const popularity = this.salesData.get(recipe.id) ?? 0;
      const highProfit = foodCostPct < avgFoodCostPct;
      const highPop = popularity >= avgPopularity;
      const classification: MenuEngineeringItem["classification"] = highProfit && highPop
        ? "star"
        : !highProfit && highPop
          ? "plowhorse"
          : highProfit && !highPop
            ? "puzzle"
            : "dog";
      return { recipeId: recipe.id, name: recipe.name, foodCost, menuPrice: price, foodCostPct, contribution, popularity, classification };
    });
  }
}

// ─── SupplierManager ────────────────────────────────────────────────
export class SupplierManager {
  private suppliers: Map<string, Supplier> = new Map();

  constructor(seed?: Supplier[]) {
    if (seed) seed.forEach((s) => this.suppliers.set(s.id, s));
  }

  add(supplier: Omit<Supplier, "id" | "orderHistory">): Supplier {
    const s: Supplier = { ...supplier, id: crypto.randomUUID(), orderHistory: [] };
    this.suppliers.set(s.id, s);
    return s;
  }

  get(id: string): Supplier | undefined {
    return this.suppliers.get(id);
  }

  update(id: string, patch: Partial<Supplier>): Supplier | null {
    const existing = this.suppliers.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch, id };
    this.suppliers.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.suppliers.delete(id);
  }

  list(filter?: { category?: string }): Supplier[] {
    let results = [...this.suppliers.values()];
    if (filter?.category) results = results.filter((s) => s.category === filter.category);
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }

  addOrder(supplierId: string, order: Omit<Order, "id">): Order | null {
    const supplier = this.suppliers.get(supplierId);
    if (!supplier) return null;
    const o: Order = { ...order, id: crypto.randomUUID() };
    supplier.orderHistory.push(o);
    return o;
  }

  getOrders(supplierId: string): Order[] {
    return this.suppliers.get(supplierId)?.orderHistory ?? [];
  }

  toJSON(): Supplier[] {
    return [...this.suppliers.values()];
  }
}

// ─── AllergenTracker ────────────────────────────────────────────────
const MAJOR_ALLERGENS = [
  "milk", "eggs", "fish", "shellfish", "tree nuts", "peanuts",
  "wheat", "soybeans", "sesame", "celery", "mustard", "lupin",
  "molluscs", "sulphites", "gluten",
];

export class AllergenTracker {
  private profiles: Map<string, AllergenProfile> = new Map();
  private recipeAllergens: Map<string, string[]> = new Map();

  constructor(seed?: AllergenProfile[]) {
    if (seed) seed.forEach((p) => this.profiles.set(p.id, p));
  }

  static majorAllergens(): string[] {
    return [...MAJOR_ALLERGENS];
  }

  addProfile(profile: Omit<AllergenProfile, "id">): AllergenProfile {
    const p: AllergenProfile = { ...profile, id: crypto.randomUUID() };
    this.profiles.set(p.id, p);
    return p;
  }

  getProfile(id: string): AllergenProfile | undefined {
    return this.profiles.get(id);
  }

  updateProfile(id: string, patch: Partial<AllergenProfile>): AllergenProfile | null {
    const existing = this.profiles.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch, id };
    this.profiles.set(id, updated);
    return updated;
  }

  deleteProfile(id: string): boolean {
    return this.profiles.delete(id);
  }

  listProfiles(): AllergenProfile[] {
    return [...this.profiles.values()];
  }

  setRecipeAllergens(recipeId: string, allergens: string[]): void {
    this.recipeAllergens.set(recipeId, allergens);
  }

  getRecipeAllergens(recipeId: string): string[] {
    return this.recipeAllergens.get(recipeId) ?? [];
  }

  checkSafe(recipeId: string, profileId: string): { safe: boolean; conflicts: string[] } {
    const recipeAllergens = this.getRecipeAllergens(recipeId);
    const profile = this.profiles.get(profileId);
    if (!profile) return { safe: false, conflicts: ["Unknown profile"] };
    const conflicts = recipeAllergens.filter((a) => profile.restrictions.includes(a));
    return { safe: conflicts.length === 0, conflicts };
  }

  matrix(): Record<string, Record<string, boolean>> {
    const profiles = [...this.profiles.values()];
    const matrix: Record<string, Record<string, boolean>> = {};
    for (const [recipeId, allergens] of this.recipeAllergens) {
      matrix[recipeId] = {};
      for (const profile of profiles) {
        const conflicts = allergens.filter((a) => profile.restrictions.includes(a));
        matrix[recipeId][profile.id] = conflicts.length === 0;
      }
    }
    return matrix;
  }

  toJSON(): { profiles: AllergenProfile[]; recipeAllergens: Record<string, string[]> } {
    return {
      profiles: [...this.profiles.values()],
      recipeAllergens: Object.fromEntries(this.recipeAllergens),
    };
  }
}
