"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { decrementStock } from "@/lib/stock";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    if (!customerName || !tableNumber) return;
    
    // Simulate order placement
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      customerName,
      tableNumber,
      items: cart,
      total: subtotal,
      status: "New",
      time: new Date().toISOString(),
    };
    
    // Get existing mock orders
    const existingOrders = JSON.parse(localStorage.getItem("cafeflow_orders") || "[]");
    localStorage.setItem("cafeflow_orders", JSON.stringify([newOrder, ...existingOrders]));

    // Decrement stock for each ordered item
    decrementStock(cart.map((i) => ({ id: i.id, quantity: i.quantity })));

    // Confetti effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#059669", "#d97d43", "#4b3621"]
    });

    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCustomerName("");
    setTableNumber("");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md bg-background border-border p-0">
        <SheetHeader className="p-6 border-b border-border text-left">
          <SheetTitle className="font-heading text-2xl text-foreground">Your Order</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">🥤</span>
              </div>
              <h3 className="font-heading text-xl text-foreground font-semibold">Your cart is thirsty!</h3>
              <p>Looks like you haven&apos;t added any items yet.</p>
              <Button 
                variant="outline" 
                className="mt-4 rounded-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                onClick={() => setIsCartOpen(false)}
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-card p-3 rounded-2xl border border-border shadow-sm">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                    {item.image && item.image.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <span className={`text-3xl ${item.image && item.image.length > 0 ? "hidden" : ""}`}>
                      {item.emoji ?? "🛍️"}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-primary">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-muted-foreground/20"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-orange/90"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="text-xl font-bold text-foreground">₹{subtotal.toFixed(2)}</span>
            </div>
            
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
              <DialogTrigger asChild>
                <Button className="w-full h-12 bg-emerald-green hover:bg-emerald-green/90 text-white rounded-full text-lg shadow-lg shadow-emerald-green/20">
                  Place Order
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md border-border bg-card">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-foreground">Complete Your Order</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-foreground">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g. John Doe" 
                      className="border-border bg-background focus-visible:ring-brand-orange h-12 rounded-xl"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="table" className="text-foreground">Table Number</Label>
                    <Input 
                      id="table" 
                      placeholder="e.g. 5" 
                      type="number"
                      className="border-border bg-background focus-visible:ring-brand-orange h-12 rounded-xl"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    className="w-full h-12 bg-emerald-green hover:bg-emerald-green/90 text-white rounded-full text-base font-semibold shadow-lg"
                    onClick={handleCheckout}
                    disabled={!customerName || !tableNumber}
                  >
                    Confirm Order - ₹{subtotal.toFixed(2)}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
