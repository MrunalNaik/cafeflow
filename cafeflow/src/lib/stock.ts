import { MOCK_MENU } from "@/data/menu";

const STOCK_KEY = "cafeflow_stock";
const DEFAULT_STOCK = 20;

// Returns the full stock map { [itemId]: quantity }
export function getStockMap(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STOCK_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return {};
}

// Get stock for a single item (falls back to default if not set)
export function getStock(itemId: string): number {
  const map = getStockMap();
  return map[itemId] ?? DEFAULT_STOCK;
}

// Set stock for a single item
export function setStock(itemId: string, qty: number): void {
  const map = getStockMap();
  map[itemId] = Math.max(0, qty);
  localStorage.setItem(STOCK_KEY, JSON.stringify(map));
}

// Decrement stock for multiple items (called after order placed)
export function decrementStock(items: { id: string; quantity: number }[]): void {
  const map = getStockMap();
  for (const item of items) {
    const current = map[item.id] ?? DEFAULT_STOCK;
    map[item.id] = Math.max(0, current - item.quantity);
  }
  localStorage.setItem(STOCK_KEY, JSON.stringify(map));
}

// Initialize stock for all default items if not already set
export function initStock(): void {
  const map = getStockMap();
  let changed = false;
  for (const item of MOCK_MENU) {
    if (map[item.id] === undefined) {
      map[item.id] = DEFAULT_STOCK;
      changed = true;
    }
  }
  if (changed) localStorage.setItem(STOCK_KEY, JSON.stringify(map));
}
