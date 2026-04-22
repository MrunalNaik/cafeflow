"use client";

import { MenuItem } from "@/data/menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { getStock } from "@/lib/stock";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart();
  const [stock, setStock] = useState<number>(20);

  useEffect(() => {
    const load = () => setStock(getStock(item.id));
    load();
    // Re-check stock every 4 seconds to reflect admin changes
    const interval = setInterval(load, 4000);
    return () => clearInterval(interval);
  }, [item.id]);

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      whileHover={isOutOfStock ? {} : { y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className={`overflow-hidden border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300 ${isOutOfStock ? "opacity-70" : ""}`}>
        <div className="relative h-48 w-full overflow-hidden">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-5xl">☕</span>
            </div>
          )}

          {/* Badge */}
          {item.badge && !isOutOfStock && (
            <Badge className="absolute top-3 left-3 bg-brand-orange hover:bg-brand-orange text-white border-none">
              {item.badge}
            </Badge>
          )}

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full tracking-wide">
                Out of Stock
              </span>
            </div>
          )}

          {/* Low stock warning */}
          {isLowStock && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Only {stock} left!
            </div>
          )}

          {/* Stock count pill (always visible when in stock) */}
          {!isOutOfStock && !isLowStock && (
            <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
              {stock} in stock
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-semibold text-lg text-foreground">{item.name}</h3>
            <span className="font-semibold text-primary">₹{item.price}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
            {item.description}
          </p>
          <Button
            className={`w-full rounded-full transition-all group ${
              isOutOfStock
                ? "bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted"
                : "bg-emerald-green hover:bg-emerald-green/90 text-white"
            }`}
            onClick={() => !isOutOfStock && addToCart(item)}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? (
              "Out of Stock"
            ) : (
              <>
                <span>Add to Cart</span>
                <Plus className="w-4 h-4 ml-2 group-hover:rotate-90 transition-transform duration-300" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
