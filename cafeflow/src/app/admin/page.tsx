"use client";

import { useEffect, useState } from "react";
import { Coffee, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { OrderCard, Order, OrderStatus } from "@/components/admin/OrderCard";
import { FlavorScribe } from "@/components/admin/FlavorScribe";
import { StockManager } from "@/components/admin/StockManager";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("cafeflow_orders");
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (e) {
          console.error("Failed to parse orders");
        }
      }
    };

    loadOrders();
    // Refresh orders every 5 seconds to simulate a live feed
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => {
      const updated = prev.map(o => o.id === id ? { ...o, status: newStatus } : o);
      localStorage.setItem("cafeflow_orders", JSON.stringify(updated));
      return updated;
    });
  };

  const handlePrint = (order: Order) => {
    setPrintingOrder(order);
    setTimeout(() => {
      window.print();
      setPrintingOrder(null);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-card border-b border-border shadow-sm print:hidden">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-brand-orange" />
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              CaféFlow <span className="text-muted-foreground font-normal text-sm ml-2">Admin Dashboard</span>
            </span>
          </div>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-8 print:hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Live Order Feed</h2>
              <span className="bg-emerald-green/10 text-emerald-green px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Live Updates Active
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground shadow-sm">
                <Coffee className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No orders yet.</p>
                <p className="text-sm">Waiting for customers to place orders...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onUpdateStatus={handleUpdateStatus} 
                    onPrint={handlePrint}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <StockManager />
            <FlavorScribe />
          </div>

        </div>
      </main>

      {/* Printable Receipt View (Visible only during print) */}
      {printingOrder && (
        <div className="hidden print:block fixed inset-0 bg-white z-50 text-black font-mono p-8 text-sm max-w-sm mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1">CaféFlow</h1>
            <p>123 Coffee Street, Bean City</p>
            <p>Tel: +1 234-567-890</p>
          </div>
          
          <div className="border-t border-b border-black py-2 mb-4 border-dashed">
            <p>Order #: {printingOrder.id.toUpperCase()}</p>
            <p>Date: {new Date(printingOrder.time).toLocaleString()}</p>
            <p>Customer: {printingOrder.customerName}</p>
            <p>Table: {printingOrder.tableNumber}</p>
          </div>

          <div className="mb-4 space-y-2">
            <div className="flex justify-between font-bold border-b border-black pb-1 mb-2">
              <span>Item</span>
              <span>Total</span>
            </div>
            {printingOrder.items.map(item => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <span className="block">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.quantity} x ₹{item.price.toFixed(2)}</span>
                </div>
                <span>₹{(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-black pt-2 border-dashed">
            <div className="flex justify-between font-bold text-lg">
              <span>TOTAL</span>
              <span>₹{printingOrder.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="text-center mt-8 text-xs">
            <p>Thank you for your visit!</p>
            <p>Please come again.</p>
          </div>
        </div>
      )}
    </div>
  );
}
