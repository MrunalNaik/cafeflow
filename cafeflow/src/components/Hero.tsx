"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const SPECIALS = [
  {
    id: "s1",
    name: "Truffle Mushroom Toast",
    description: "Sourdough topped with sautéed truffle mushrooms, ricotta and a poached egg.",
    price: 320,
    badge: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1484723091739-30990093a517?w=600&q=95&fit=crop",
    category: "Snacks" as const,
  },
  {
    id: "s2",
    name: "Hazelnut Mocha",
    description: "A velvety blend of dark espresso, Belgian chocolate and roasted hazelnut.",
    price: 280,
    badge: "Seasonal",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=95&fit=crop",
    category: "Coffee" as const,
  },
  {
    id: "s3",
    name: "Crème Brûlée Tart",
    description: "Classic French vanilla custard in a crisp pastry shell, torched to perfection.",
    price: 260,
    badge: "Limited",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=95&fit=crop",
    category: "Desserts" as const,
  },
];

export function Hero() {
  const [isSpecialsOpen, setIsSpecialsOpen] = useState(false);
  const { addToCart } = useCart();

  return (
    <>
      <section className="relative overflow-hidden bg-background pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="flex flex-col items-start gap-6 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                New seasonal blends available
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight text-foreground">
                The Perfect Blend of <br/>
                <span className="text-primary italic">Aroma &amp; Ambiance</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                We&apos;re committed to ethical sourcing and sustainable practices for a better coffee experience.
              </p>
              <div className="flex gap-4 mt-2 flex-wrap">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8 text-base shadow-lg shadow-brand-orange/20"
                  onClick={() => setIsSpecialsOpen(true)}
                >
                  Explore Our Specials
                </Button>
                <a href="#menu">
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-foreground text-foreground hover:bg-foreground hover:text-background">
                    View Full Menu
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative aspect-square md:aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden rounded-t-[100px] rounded-b-[40px] border-[8px] border-white shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=95&fit=crop"
                  alt="A perfect cup of coffee"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-t-[92px] rounded-b-[32px]"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50 -z-10"></div>
            </motion.div>
          </div>
        </div>
        
        {/* Wavy bottom divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden line-height-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-20 text-muted/30">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,104.79,101.44,98.67,149.8,88.7,208.5,76.54,267.43,67.15,321.39,56.44Z" className="fill-current"></path>
          </svg>
        </div>
      </section>

      {/* Specials Modal */}
      <Dialog open={isSpecialsOpen} onOpenChange={setIsSpecialsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-foreground">
              ✨ Chef&apos;s Specials
            </DialogTitle>
            <p className="text-muted-foreground text-sm">Handpicked favourites from our kitchen — available for a limited time.</p>
          </DialogHeader>
          <div className="grid gap-5 pt-2">
            {SPECIALS.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-2xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-foreground">{item.name}</h3>
                      <span className="text-xs font-semibold bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full">{item.badge}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">₹{item.price}</span>
                    <Button
                      size="sm"
                      className="bg-emerald-green hover:bg-emerald-green/90 text-white rounded-full"
                      onClick={() => {
                        addToCart({ ...item });
                        setIsSpecialsOpen(false);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
