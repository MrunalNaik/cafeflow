"use client";

import { Hero } from "@/components/Hero";
import { InteractiveMenu } from "@/components/InteractiveMenu";
import { Coffee, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";

const SHOP_ITEMS = [
  { id: "sh1", emoji: "☕", name: "Signature Blend Beans", desc: "Our house-roasted, ethically sourced whole beans. 250g.", price: 599, displayPrice: "₹599", category: "Snacks" as const, description: "Our house-roasted, ethically sourced whole beans. 250g.", image: "" },
  { id: "sh2", emoji: "🫙", name: "Cold Brew Concentrate", desc: "Ready-to-dilute cold brew. Just add water or milk.", price: 449, displayPrice: "₹449", category: "Coffee" as const, description: "Ready-to-dilute cold brew. Just add water or milk.", image: "" },
  { id: "sh3", emoji: "🍵", name: "Ceremonial Matcha Tin", desc: "Premium grade Japanese matcha. 50g tin.", price: 799, displayPrice: "₹799", category: "Snacks" as const, description: "Premium grade Japanese matcha. 50g tin.", image: "" },
  { id: "sh4", emoji: "☕", name: "CaféFlow Mug", desc: "Our signature 350ml ceramic mug, heat-retaining glaze.", price: 349, displayPrice: "₹349", category: "Snacks" as const, description: "Our signature 350ml ceramic mug, heat-retaining glaze.", image: "" },
  { id: "sh5", emoji: "🎁", name: "Gift Hamper", desc: "Beans + mug + cookies — the perfect gift for a coffee lover.", price: 1299, displayPrice: "₹1,299", category: "Snacks" as const, description: "Beans + mug + cookies — the perfect gift for a coffee lover.", image: "" },
  { id: "sh6", emoji: "🃏", name: "Gift Card", desc: "Share the love. Available in ₹500, ₹1000 and ₹2000 values.", price: 500, displayPrice: "From ₹500", category: "Snacks" as const, description: "Share the love. Available in ₹500, ₹1000 and ₹2000 values.", image: "" },
];

export default function Home() {
  const { addToCart } = useCart();
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Menu Section */}
      <section id="menu" className="scroll-mt-16">
        <InteractiveMenu />
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 space-y-3">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Our Shop
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Take a piece of CaféFlow home. From premium beans to curated gift hampers, crafted with the same love as everything on our menu.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {SHOP_ITEMS.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-3">
                <span className="text-4xl">{item.emoji}</span>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="font-bold text-primary text-base">{item.displayPrice}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="text-sm font-semibold bg-brand-orange/10 text-brand-orange hover:bg-brand-orange hover:text-white rounded-full px-4 py-1.5 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 scroll-mt-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah L.", role: "Regular since 2022", text: "The Cold Brew here is life-changing. Absolutely love the cozy yet modern vibe!" },
              { name: "James K.", role: "Food Blogger", text: "Best almond croissants in the city. The staff is incredibly friendly and welcoming." },
              { name: "Emily R.", role: "Freelancer", text: "I come here to work and relax. The matcha latte is perfect every single time." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className="text-brand-orange">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground italic flex-1">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#4b3621] scroll-mt-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Story */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-6 h-6 text-brand-orange" />
                <span className="text-brand-orange font-semibold tracking-wider text-sm uppercase">Our Story</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                More than coffee.<br />A feeling.
              </h2>
              <p className="text-white/75 leading-relaxed">
                CaféFlow was born in 2019 from a simple belief — that a great cup of coffee should feel like a warm hug. 
                Founded by two friends who quit their corporate jobs to chase the perfect espresso, we&apos;ve built a 
                space where the aroma of freshly ground beans meets the buzz of a creative community.
              </p>
              <p className="text-white/75 leading-relaxed">
                Every bean we use is ethically sourced from small farms across Coorg, Chikmagalur, and beyond. 
                Our pastries are baked fresh at 5 AM every morning. We believe that what you serve is only as good 
                as how it makes someone feel — and we aim to make you feel exceptional.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-3xl font-heading font-bold text-brand-orange">5+</span>
                <span className="text-white/60 text-sm">Years of<br />crafting moments</span>
                <span className="mx-4 w-px h-10 bg-white/20" />
                <span className="text-3xl font-heading font-bold text-brand-orange">10K+</span>
                <span className="text-white/60 text-sm">Happy<br />customers</span>
                <span className="mx-4 w-px h-10 bg-white/20" />
                <span className="text-3xl font-heading font-bold text-brand-orange">100%</span>
                <span className="text-white/60 text-sm">Ethically<br />sourced</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-6 h-6 text-brand-orange" />
                <span className="text-brand-orange font-semibold tracking-wider text-sm uppercase">Find Us</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                Come visit us.
              </h2>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Address</p>
                    <p className="text-white/70 text-sm mt-1">12, Brew Lane, Indiranagar<br />Bengaluru, Karnataka — 560038</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-white/70 text-sm mt-1">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-white/70 text-sm mt-1">hello@cafeflow.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Hours</p>
                    <div className="text-white/70 text-sm mt-1 space-y-0.5">
                      <p>Mon – Fri: 7:00 AM – 10:00 PM</p>
                      <p>Sat – Sun: 8:00 AM – 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3a2a18] py-8 text-center text-white/50 text-sm">
        <p>© 2025 CaféFlow. Crafted with ☕ and care in Bengaluru.</p>
        <a
          href="/admin"
          className="inline-block mt-2 text-xs text-white/25 hover:text-white/60 transition-colors"
        >
          Staff Portal →
        </a>
      </footer>
    </div>
  );
}

