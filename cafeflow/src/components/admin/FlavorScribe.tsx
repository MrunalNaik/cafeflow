"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, CheckCircle, PlusCircle, Image as ImageIcon } from "lucide-react";

type Category = "Coffee" | "Snacks" | "Desserts";

const CATEGORY_OPTIONS: Category[] = ["Coffee", "Snacks", "Desserts"];

// Map category → curated Unsplash food search keyword for reliable images
const CATEGORY_IMAGE_KEYWORDS: Record<Category, string> = {
  Coffee: "coffee,cafe,espresso",
  Snacks: "food,snack,sandwich",
  Desserts: "dessert,pastry,cake",
};

function getImageUrl(dishName: string, category: Category): string {
  const keyword = encodeURIComponent(`${dishName} ${CATEGORY_IMAGE_KEYWORDS[category]}`);
  // Use Unsplash source URL — returns a relevant image without needing an API key
  return `https://source.unsplash.com/featured/800x800/?${keyword}`;
}

export function FlavorScribe() {
  const [dishName, setDishName] = useState("");
  const [category, setCategory] = useState<Category>("Coffee");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const handleGenerate = () => {
    if (!dishName.trim()) return;
    setIsGenerating(true);
    setIsPublished(false);
    setDescription("");
    setImageUrl("");

    setTimeout(() => {
      const desc = `Indulge in our exquisite ${dishName}, meticulously crafted to tantalize your taste buds with every delightful bite. A must-try for every connoisseur.`;
      const img = getImageUrl(dishName, category);
      setDescription(desc);
      setImageUrl(img);
      setIsGenerating(false);
    }, 1500);
  };

  const handlePublish = () => {
    if (!description || !dishName || !price) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      category,
      name: dishName.trim(),
      description,
      price: parseFloat(price),
      image: imageUrl,
      badge: "New",
    };

    const existing = JSON.parse(localStorage.getItem("cafeflow_custom_menu") || "[]");
    localStorage.setItem("cafeflow_custom_menu", JSON.stringify([...existing, newItem]));

    setIsPublished(true);

    // Reset after 3s
    setTimeout(() => {
      setDishName("");
      setDescription("");
      setImageUrl("");
      setPrice("");
      setIsPublished(false);
    }, 3000);
  };

  return (
    <Card className="border-border shadow-sm print:hidden">
      <CardHeader className="bg-muted/50 border-b border-border pb-4">
        <CardTitle className="font-heading flex items-center gap-2 text-foreground">
          <Sparkles className="w-5 h-5 text-brand-orange" />
          AI FlavorScribe
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-5 space-y-4">
        <p className="text-sm text-muted-foreground">
          Generate a mouth-watering description and publish new items directly to the customer menu.
        </p>

        {/* Dish name */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Dish Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. Blueberry Muffin"
              value={dishName}
              onChange={(e) => { setDishName(e.target.value); setIsPublished(false); }}
              className="border-border bg-background"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            <Button
              onClick={handleGenerate}
              disabled={!dishName.trim() || isGenerating}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white shrink-0"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate"}
            </Button>
          </div>
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full h-9 rounded-lg border border-border bg-background text-sm text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Price (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-border bg-background"
            />
          </div>
        </div>

        {/* Generated preview */}
        {description && (
          <div className="mt-2 rounded-2xl border border-border overflow-hidden">
            {/* Image preview */}
            <div className="relative w-full h-40 bg-muted flex items-center justify-center">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={dishName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                />
              ) : null}
              <div className={`hidden flex-col items-center gap-2 text-muted-foreground ${!imageUrl ? "flex" : ""}`}>
                <ImageIcon className="w-8 h-8" />
                <span className="text-xs">Image loading…</span>
              </div>
            </div>

            {/* Description + publish */}
            <div className="p-4 space-y-3 bg-muted/30">
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">{dishName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{category} · ₹{price || "—"}</p>
              </div>
              <p className="text-sm italic text-foreground">&quot;{description}&quot;</p>

              {isPublished ? (
                <div className="flex items-center gap-2 text-emerald-green font-semibold text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Published to customer menu!
                </div>
              ) : (
                <Button
                  onClick={handlePublish}
                  disabled={!price || !dishName}
                  className="w-full bg-emerald-green hover:bg-emerald-green/90 text-white rounded-full"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Publish to Menu
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
