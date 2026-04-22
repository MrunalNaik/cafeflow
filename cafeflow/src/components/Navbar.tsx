"use client";

import { Coffee, Search, ShoppingBag, Menu, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleBookTable = () => {
    // Simulate booking process
    setTimeout(() => {
      setBookingComplete(true);
      setTimeout(() => {
        setIsBookOpen(false);
        setBookingComplete(false);
      }, 2000);
    }, 500);
  };

  const handleSearch = () => {
    // In a real app, this would filter context or navigate.
    // For now, close modal and scroll to menu
    setIsSearchOpen(false);
    window.location.hash = "menu";
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-foreground" />
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              CaféFlow
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
            <a href="#menu" className="hover:text-primary transition-colors">Our Menu</a>
            <a href="#shop" className="hover:text-primary transition-colors">Shop</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <button className="text-foreground/80 hover:text-primary transition-colors hidden sm:block">
                  <Search className="h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Search Menu</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 py-4">
                  <Input 
                    placeholder="Search for coffee, snacks..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    autoFocus
                  />
                  <Button onClick={handleSearch} className="bg-emerald-green hover:bg-emerald-green/90 text-white">Search</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <button 
              className="relative text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white rounded-full text-xs border border-white">
                  {totalItems}
                </Badge>
              )}
            </button>

            <Dialog open={isBookOpen} onOpenChange={setIsBookOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="hidden sm:inline-flex border-foreground text-foreground hover:bg-foreground hover:text-background rounded-full font-semibold">
                  Book a Table
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                {bookingComplete ? (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                    <CheckCircle className="h-16 w-16 text-emerald-green animate-bounce" />
                    <h3 className="text-2xl font-heading font-bold text-foreground">Table Booked!</h3>
                    <p className="text-muted-foreground">We look forward to serving you.</p>
                  </div>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="font-heading text-2xl">Reserve Your Spot</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time</Label>
                          <Input id="time" type="time" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Input id="guests" type="number" min="1" max="10" placeholder="2" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleBookTable} className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full">
                        Confirm Reservation
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>

            <button className="md:hidden text-foreground">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer />
    </>
  );
}
