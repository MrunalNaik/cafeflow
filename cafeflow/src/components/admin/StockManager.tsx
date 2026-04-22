"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, Plus, Minus, RefreshCw, AlertTriangle } from "lucide-react";
import { MOCK_MENU } from "@/data/menu";
import { getStockMap, setStock, initStock } from "@/lib/stock";

interface StockRow {
  id: string;
  name: string;
  category: string;
  stock: number;
}

export function StockManager() {
  const [rows, setRows] = useState<StockRow[]>([]);

  const loadStock = useCallback(() => {
    initStock();
    const map = getStockMap();
    // Load custom items too
    let customItems: { id: string; name: string; category: string }[] = [];
    try {
      customItems = JSON.parse(localStorage.getItem("cafeflow_custom_menu") || "[]");
    } catch { /* ignore */ }

    const all = [
      ...MOCK_MENU.map((item) => ({ id: item.id, name: item.name, category: item.category })),
      ...customItems,
    ];

    setRows(
      all.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        stock: map[item.id] ?? 20,
      }))
    );
  }, []);

  useEffect(() => {
    loadStock();
    const interval = setInterval(loadStock, 4000);
    return () => clearInterval(interval);
  }, [loadStock]);

  const adjust = (id: string, delta: number) => {
    const row = rows.find((r) => r.id === id);
    if (!row) return;
    const newQty = Math.max(0, row.stock + delta);
    setStock(id, newQty);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, stock: newQty } : r)));
  };

  const restock = (id: string) => {
    setStock(id, 20);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, stock: 20 } : r)));
  };

  const outOfStock = rows.filter((r) => r.stock === 0).length;
  const lowStock = rows.filter((r) => r.stock > 0 && r.stock <= 5).length;

  return (
    <Card className="border-border shadow-sm print:hidden">
      <CardHeader className="bg-muted/50 border-b border-border pb-4">
        <CardTitle className="font-heading flex items-center gap-2 text-foreground">
          <Package className="w-5 h-5 text-brand-orange" />
          Stock Manager
        </CardTitle>
        {/* Summary badges */}
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
            {rows.length} items
          </span>
          {outOfStock > 0 && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> {outOfStock} out of stock
            </span>
          )}
          {lowStock > 0 && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
              ⚠ {lowStock} low stock
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-4 px-3">
        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {rows.map((row) => {
            const isOut = row.stock === 0;
            const isLow = row.stock > 0 && row.stock <= 5;

            return (
              <div
                key={row.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  isOut
                    ? "border-red-200 bg-red-50"
                    : isLow
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-border bg-card"
                }`}
              >
                {/* Item info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{row.name}</p>
                  <p className="text-xs text-muted-foreground">{row.category}</p>
                </div>

                {/* Stock badge */}
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full min-w-[52px] text-center ${
                    isOut
                      ? "bg-red-600 text-white"
                      : isLow
                      ? "bg-yellow-500 text-white"
                      : "bg-emerald-green/10 text-emerald-green"
                  }`}
                >
                  {isOut ? "0 — SOLD" : `${row.stock} left`}
                </span>

                {/* Controls */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => adjust(row.id, -1)}
                    disabled={row.stock === 0}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => adjust(row.id, +1)}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  {isOut && (
                    <button
                      onClick={() => restock(row.id)}
                      className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-orange/90 transition-colors"
                      title="Restock to 20"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
