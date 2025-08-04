import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MenuBrowser from "./components/MenuBrowser";
import OrderEntry from "./components/OrderEntry";
import OrderStatus from "./components/OrderStatus";
import BillsScreen from "./components/BillsScreen";
import { COLORS } from "./theme";

// Sample Data
const sampleMenu = [
  {
    id: "M1",
    name: "Margherita Pizza",
    price: 300,
    description: "Classic cheese and tomato pizza.",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&w=400&q=60",
  },
  {
    id: "M2",
    name: "Paneer Tikka",
    price: 180,
    description: "Spicy marinated paneer cubes grilled to perfection.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=400&q=60",
  },
  {
    id: "M3",
    name: "Veg Hakka Noodles",
    price: 160,
    description: "Stir-fried noodles with fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&w=400&q=60",
  },
  {
    id: "M4",
    name: "Masala Dosa",
    price: 90,
    description: "Crispy dosa filled with spiced potato mash.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&w=400&q=60",
  },
  {
    id: "M5",
    name: "Cold Coffee",
    price: 70,
    description: "Refreshing chilled coffee with a hint of chocolate.",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&w=400&q=60",
  }
];

const initialNav = [
  { label: "New Order", icon: "🧾", key: "order" },
  { label: "Menu", icon: "🍔", key: "menu" },
  { label: "Orders", icon: "📦", key: "orders" },
  { label: "Bills", icon: "💳", key: "bills" }
];

// PUBLIC_INTERFACE
function App() {
  // Theme state & effect for light-theme
  const [theme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Navigation handling
  const [nav, setNav] = useState("order");

  // Cart/order entry state
  const [cart, setCart] = useState([]);
  // Orders [{id,table,items,status,ts}]
  const [orders, setOrders] = useState([]);
  // Bills [{id,table,items,total,ts}]
  const [bills, setBills] = useState([]);

  // Add item to cart
  const addToCart = (menuItem) => {
    setCart((prev) => {
      let found = prev.find((it) => it.id === menuItem.id);
      if (found)
        return prev.map((it) =>
          it.id === menuItem.id ? { ...it, qty: it.qty + 1 } : it
        );
      return [...prev, { ...menuItem, qty: 1 }];
    });
  };

  // Submit order event
  const handleOrderSubmit = ({ table, items }) => {
    const oid =
      "ORD-" +
      (orders.length + 1).toString().padStart(2, "0") +
      "-" +
      Math.floor(Math.random() * 900 + 100);
    setOrders((prev) => [
      ...prev,
      {
        id: oid,
        table,
        items,
        status: "pending",
        ts: Date.now(),
      },
    ]);
    window.alert("Order submitted!");
    setNav("orders");
  };

  // Update order status
  const handleOrderUpdate = (order, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      )
    );
    // If served, move to bills
    if (newStatus === "done") {
      const total = order.items.reduce(
        (sum, it) => sum + it.price * it.qty,
        0
      );
      setBills((bills) => [
        ...bills,
        {
          id: order.id,
          table: order.table,
          ts: order.ts,
          items: order.items,
          total,
        },
      ]);
    }
  };

  // Responsive sidebar
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const toggleSidebar = () => setShowMobileSidebar((v) => !v);

  return (
    <div style={styles.appShell}>
      {/* Responsive/mobile sidebar toggle */}
      <div style={{ display: "none" }} id="sidebar-toggle-btn"></div>
      <div style={styles.layout}>
        <div
          style={{
            ...styles.sidebarBox,
            ...(showMobileSidebar
              ? { left: 0, position: "fixed" }
              : {}),
          }}
        >
          <Sidebar
            navItems={initialNav}
            active={nav}
            onNavigate={setNav}
          />
        </div>
        <main style={styles.main}>
          <header style={styles.header}>
            <button
              style={styles.menuBtn}
              onClick={toggleSidebar}
              aria-label={"Show navigation"}
            >
              ☰
            </button>
            <span style={styles.headerTitle}>
              {initialNav.find((n) => n.key === nav)?.label}
            </span>
          </header>
          <section style={styles.section}>
            {nav === "order" && (
              <>
                <OrderEntry
                  cart={cart}
                  setCart={setCart}
                  onSubmit={handleOrderSubmit}
                />
                <MenuBrowser
                  menu={sampleMenu}
                  onAdd={addToCart}
                />
              </>
            )}
            {nav === "menu" && (
              <MenuBrowser menu={sampleMenu} onAdd={addToCart} />
            )}
            {nav === "orders" && (
              <OrderStatus orders={orders} onUpdate={handleOrderUpdate} />
            )}
            {nav === "bills" && (
              <BillsScreen bills={bills} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

const styles = {
  appShell: {
    background: COLORS.secondary,
    minHeight: "100vh",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Helvetica Neue,sans-serif",
  },
  layout: {
    display: "flex",
    minHeight: "100vh",
    alignItems: "stretch",
    flexDirection: "row",
  },
  sidebarBox: {
    minWidth: 210,
    width: 240,
    zIndex: 101,
    background: COLORS.sidebarBg,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    maxWidth: "100vw",
    position: "relative",
  },
  header: {
    height: 58,
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "0 28px",
    background: "#fff",
    fontWeight: 600,
    letterSpacing: ".01em",
    boxShadow: "0 3px 9px #eeeeee33",
  },
  headerTitle: { fontSize: "1.3em", color: COLORS.primary },
  menuBtn: {
    display: "none",
    background: "none",
    border: "none",
    fontSize: "1.8em",
    marginRight: "15px",
    cursor: "pointer",
    color: COLORS.accent,
  },
  section: {
    padding: "38px 35px",
    flex: 1,
    width: "100%",
    maxWidth: "980px",
    margin: "0 auto",
    boxSizing: "border-box",
  },
};

// Responsive CSS-in-JS override (for tablets)
window.addEventListener("resize", () => {
  try {
    const btn = document.getElementById("sidebar-toggle-btn");
    if (window.innerWidth < 768 && btn) btn.style.display = "block";
    else if (btn) btn.style.display = "none";
  } catch {}
});

export default App;
