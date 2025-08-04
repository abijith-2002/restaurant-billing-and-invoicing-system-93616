import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MenuGrid from "./components/MenuGrid";
import OrderPanel from "./components/OrderPanel";

/**
 * Sample dishes matching Figma HTML content and layout.
 */
const sampleMenu = [
  {
    id: "dish1",
    name: "Spicy seasoned seafood noodles",
    price: 2.29,
    currency: "$",
    description: "",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&w=400&q=60",
    available: 20,
  },
  {
    id: "dish2",
    name: "Salted Pasta with mushroom sauce",
    price: 2.69,
    currency: "$",
    description: "",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=400&q=60",
    available: 11,
  },
  {
    id: "dish3",
    name: "Beef dumpling in hot and sour soup",
    price: 2.99,
    currency: "$",
    description: "",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&w=400&q=60",
    available: 16,
  },
  {
    id: "dish4",
    name: "Hot spicy fried rice with omelet",
    price: 3.49,
    currency: "$",
    description: "",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&w=400&q=60",
    available: 13,
  },
  {
    id: "dish5",
    name: "Spicy instant noodle with special omelette",
    price: 3.59,
    currency: "$",
    description: "",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&w=400&q=60",
    available: 17,
  },
  {
    id: "dish6",
    name: "Healthy noodle with spinach leaf",
    price: 3.29,
    currency: "$",
    description: "",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=400&q=60",
    available: 22,
  },
];

// Menu categories from Figma tabs
const menuCategories = [
  "Hot Dishes",
  "Cold Dishes",
  "Soup",
  "Grill",
  "Appetizer",
  "Dessert",
];

const initialNav = [
  { label: "Home", icon: "🏠", key: "home" },
  { label: "Discounts", icon: "🏷️", key: "discounts" },
  { label: "Dashboard", icon: "📊", key: "dashboard" },
  { label: "Messages", icon: "💬", key: "messages" },
  { label: "Notifications", icon: "🔔", key: "notifications" },
  { label: "Settings", icon: "⚙️", key: "settings" },
];

function App() {
  // Sidebar nav index (for Figma sidebar vertical nav)
  const [activeSidebar, setActiveSidebar] = useState("home");
  // Menu tab/category
  const [category, setCategory] = useState(menuCategories[0]);
  // Cart state: { id, name, price, qty, image }
  const [cart, setCart] = useState([]);
  // Tab in cart area ("Dine In", "To Go", ...)
  const [orderType, setOrderType] = useState("Dine In");
  // Basic search
  const [search, setSearch] = useState("");

  // (Figma: add to cart on menu grid)
  const handleAddDish = (dish) => {
    setCart((prev) => {
      const found = prev.find((it) => it.id === dish.id);
      if (found)
        return prev.map((it) =>
          it.id === dish.id ? { ...it, qty: it.qty + 1 } : it
        );
      return [...prev, { ...dish, qty: 1 }];
    });
  };

  // (Figma: quantity increment/decrement in cart)
  const handleQty = (dishId, delta) => {
    setCart((prev) =>
      prev
        .map((it) =>
          it.id === dishId ? { ...it, qty: Math.max(1, it.qty + delta) } : it
        )
        .filter((it) => it.qty > 0)
    );
  };

  // Remove (Figma: trash) in cart
  const handleRemoveFromCart = (dishId) => {
    setCart((prev) => prev.filter((it) => it.id !== dishId));
  };

  // Cart notes: maintain notes per item id
  const [cartNotes, setCartNotes] = useState({});
  const handleNoteChange = (dishId, val) =>
    setCartNotes((n) => ({ ...n, [dishId]: val }));

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--color-bg)" }}>
      {/* Sidebar */}
      <Sidebar
        navItems={initialNav}
        active={activeSidebar}
        onNavigate={setActiveSidebar}
      />

      {/* Main Figma-style content */}
      <main style={{ flex: 1, minWidth: 0, padding: "40px 0 0 140px", display: "flex" }}>
        {/* Section: menu/food grid */}
        <section style={{ flex: 2, minWidth: 450, maxWidth: 750, paddingRight: 36 }}>
          {/* Figma Topbar/Header */}
          <header className="topbar">
            <div>
              <div className="restaurant-title">Jaegar Resto</div>
              <div className="date-caption">Tuesday, 2 Feb 2021</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <div className="menu-searchbox">
                <span style={{ color: "var(--color-placeholder)", display: "flex" }}>
                  <svg width="20" height="20" style={{ marginRight: 3 }} fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="9" r="7"/><path d="M14 14L19 19"/>
                  </svg>
                </span>
                <input
                  type="search"
                  placeholder="Search for food, coffee, etc.."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ background: "none", border: "none", color: "var(--color-light)", font: "var(--font-body)", flex: 1, outline: "none", marginLeft: 8 }}
                />
              </div>
            </div>
          </header>
          {/* Tabs (dishes categories) */}
          <nav style={{ margin: "32px 0 12px 0" }}>
            {menuCategories.map((cat) => (
              <button
                key={cat}
                className={`tab-category${category === cat ? " active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
          {/* Menu Grid */}
          <MenuGrid
            menu={sampleMenu.filter((dish) =>
              dish.name.toLowerCase().includes(search.toLowerCase()) &&
              (category === "Hot Dishes" ? true : true) /* For demo: categories don't filter (could add) */
            )}
            onAdd={handleAddDish}
          />
        </section>
        {/* Right: Order/Cart Panel */}
        <OrderPanel
          cart={cart}
          onQty={handleQty}
          onRemove={handleRemoveFromCart}
          orderType={orderType}
          setOrderType={setOrderType}
          notes={cartNotes}
          onNoteChange={handleNoteChange}
        />
      </main>
    </div>
  );
}

export default App;
