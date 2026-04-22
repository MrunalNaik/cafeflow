"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuCard } from "./MenuCard";
import { MOCK_MENU, MenuItem } from "@/data/menu";
import { Search, X } from "lucide-react";

const CATEGORIES = ["All", "Coffee", "Snacks", "Desserts"];

export function InteractiveMenu() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customItems, setCustomItems] = useState<MenuItem[]>([]);

  // Load admin-published items from localStorage
  useEffect(() => {
    const load = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("cafeflow_custom_menu") || "[]");
        setCustomItems(stored);
      } catch { /* ignore */ }
    };
    load();
    // Re-check every 3 seconds so newly published items appear without full refresh
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  const allItems = [...MOCK_MENU, ...customItems];
  const filteredMenu = allItems.filter((item) => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const searchMatch =
      q === "" ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return categoryMatch && searchMatch;
  });

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Welcome to CaféFlow. Here, we pride ourselves on offering a diverse selection
            of beverages and treats that cater to every taste.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search menu items…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-full border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex justify-center mb-10">
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full max-w-sm"
          >
            <TabsList className="grid w-full grid-cols-4 bg-muted p-1 rounded-full">
              {CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all text-xs"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results */}
        {filteredMenu.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium text-foreground">
              No results for &quot;{searchQuery}&quot;
            </p>
            <p className="text-sm mt-1">Try a different keyword or switch category.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-4 text-brand-orange hover:underline text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
