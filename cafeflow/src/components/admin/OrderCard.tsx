"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/context/CartContext";
import { Clock, Printer } from "lucide-react";

export type OrderStatus = "New" | "Preparing" | "Done";

export interface Order {
  id: string;
  customerName: string;
  tableNumber: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  time: string;
}

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (id: string, newStatus: OrderStatus) => void;
  onPrint: (order: Order) => void;
}

export function OrderCard({ order, onUpdateStatus, onPrint }: OrderCardProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "New": return "bg-blue-500 hover:bg-blue-600";
      case "Preparing": return "bg-yellow-500 hover:bg-yellow-600 text-black";
      case "Done": return "bg-emerald-green hover:bg-emerald-green/90";
      default: return "bg-gray-500";
    }
  };

  const formattedTime = new Date(order.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="border-border shadow-sm flex flex-col h-full print:hidden">
      <CardHeader className="bg-muted/50 border-b border-border p-4 flex flex-row items-center justify-between space-y-0">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Table {order.tableNumber}</h3>
          <p className="text-sm text-muted-foreground">{order.customerName}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className={`${getStatusColor(order.status)} border-none`}>
            {order.status}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {formattedTime}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1 space-y-3 mb-6">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-sm">
              <div className="flex gap-2">
                <span className="font-semibold text-foreground">{item.quantity}x</span>
                <span className="text-foreground/80">{item.name}</span>
              </div>
              <span className="text-muted-foreground font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-border mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-primary text-lg">₹{order.total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 rounded-full border-border text-foreground hover:bg-muted"
              onClick={() => {
                const nextStatus: Record<OrderStatus, OrderStatus> = {
                  "New": "Preparing",
                  "Preparing": "Done",
                  "Done": "Done"
                };
                onUpdateStatus(order.id, nextStatus[order.status]);
              }}
              disabled={order.status === "Done"}
            >
              {order.status === "New" ? "Start Prep" : order.status === "Preparing" ? "Mark Done" : "Completed"}
            </Button>
            <Button 
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:bg-muted"
              onClick={() => onPrint(order)}
            >
              <Printer className="w-4 h-4 text-foreground" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
