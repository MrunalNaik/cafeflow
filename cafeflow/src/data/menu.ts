export type MenuItem = {
  id: string;
  category: "Coffee" | "Snacks" | "Desserts";
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  stock?: number; // optional; managed via localStorage
};

export const MOCK_MENU: MenuItem[] = [
  {
    id: "1",
    category: "Coffee",
    name: "Cold Brew",
    description: "Brewed slowly for a smooth, refreshing taste.",
    price: 250,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=90&fit=crop",
  },
  {
    id: "2",
    category: "Coffee",
    name: "Latte",
    description: "Smooth and creamy classic espresso.",
    price: 200,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&q=90&fit=crop",
    badge: "New",
  },
  {
    id: "3",
    category: "Coffee",
    name: "Matcha Latte",
    description: "A creamy and vibrant green tea blend.",
    price: 220,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=90&fit=crop",
  },
  {
    id: "4",
    category: "Coffee",
    name: "Espresso Delight",
    description: "A rich and bold espresso shot to wake you up.",
    price: 150,
    image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=800&q=90&fit=crop",
  },
  {
    id: "5",
    category: "Snacks",
    name: "Grilled Cheese",
    description: "Classic comfort food with melted cheddar.",
    price: 180,
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=90&fit=crop",
  },
  {
    id: "6",
    category: "Snacks",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce tossed with dressing.",
    price: 210,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=90&fit=crop",
    badge: "New",
  },
  {
    id: "7",
    category: "Desserts",
    name: "Chocolate Cake",
    description: "A rich and moist chocolate cake topped with cream.",
    price: 280,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=90&fit=crop",
  },
  {
    id: "8",
    category: "Desserts",
    name: "Almond Croissant",
    description: "A buttery, flaky croissant filled with rich almond.",
    price: 160,
    image: "https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=800&q=90&fit=crop",
  },
];
