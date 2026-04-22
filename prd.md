# PROJECT: CaféFlow - Smart Menu & Order Management

## 1. VISION & DESIGN TONE
- **Vibe:** Modern Boutique Café (Warm tones, Glassmorphism, Rounded corners).
- **Primary Colors:** Coffee Brown (`#4b3621`), Soft Cream (`#f5f5dc`), Emerald Green for 'Order' buttons.
- **Animations:** Framer Motion staggered list entries, smooth slide-in Cart drawer.

## 2. TECH STACK (Optimized for Speed)
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Shadcn UI (Card, Button, Badge, Tabs, Dialog/Modal).
- **Icons:** Lucide React (Coffee, Utensils, ShoppingCart, CheckCircle).
- **Animations:** Framer Motion.
- **State Management:** React `useState` & `useEffect` (Local storage for persistence).

## 3. CORE FEATURES & COMPONENTS
### A. Customer Experience (The "Front-End")
1. **Interactive Menu:** Filterable tabs (Coffee, Snacks, Desserts). 
   - Grid of cards with image, price, and "Add to Cart" button.
2. **Shopping Cart Drawer:** Slide-out panel to update quantities and see subtotal.
3. **Checkout Modal:** Simple form for "Customer Name" and "Table Number".

### B. Admin Experience (The "Back-End" Dashboard)
1. **Order Feed:** A list of cards showing incoming orders.
   - **Status Badges:** Dynamic colors for New (Blue), Preparing (Yellow), Done (Green).
2. **Printable Bill Generator:** A button that opens a clean, minimal "Thermal Receipt" view for printing.

### C. AI FEATURE: "FlavorScribe"
1. **Admin Input:** A text field where the admin types a dish name (e.g., "Blueberry Muffin").
2. **AI Action:** A button that generates a 2-line "mouth-watering" description using a prompt.
   - *Prompt Logic:* "Write a 15-word delicious description for [Dish Name] to make it irresistible on a menu."

## 4. FUNCTIONALITY LOGIC
- Use a `MockOrders` array to simulate incoming orders for the Admin view.
- When a customer clicks "Place Order", add that object to the `orders` state.
- **Print Logic:** Use a specific `@media print` CSS block to hide everything except the Receipt component when printing.

## 5. UI/UX "VIBE" EXTRAS (For 50% Score)
- Hover effect on menu items (subtle scale up).
- Confetti effect (canvas-confetti) when an order is placed.
- Empty State: A cute "Your cart is thirsty" message when no items are selected.