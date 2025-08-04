import React from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function Sidebar({ navItems, active, onNavigate }) {
  /** Sidebar for navigation.
   *  navItems: [{ label, icon, key }]
   *  active: string (key of the active nav)
   *  onNavigate: function(navKey)
   */
  return (
    <aside style={styles.sidebar}>
      <div style={styles.title}>🍽️ <span style={{color:COLORS.primary}}>BILLGENIE</span></div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.key}
            style={{
              ...styles.navBtn,
              background:
                active === item.key ? COLORS.primary : "transparent",
              color: active === item.key ? "#fff" : COLORS.text,
            }}
            onClick={() => onNavigate(item.key)}
            aria-current={active === item.key ? "page" : undefined}
          >
            <span style={{marginRight:8}}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1 }} />
      <div style={styles.sidebarFooter}>
        <span style={{fontSize:12,color:COLORS.accent}}>Restaurant Billing System</span>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    display: "flex",
    flexDirection: "column",
    minWidth: 210,
    background: COLORS.sidebarBg,
    borderRight: `1px solid ${COLORS.border}`,
    height: "100vh",
    boxSizing: "border-box",
    position: "relative",
    boxShadow: "0 0 10px 0 #eeeeee77"
  },
  title: {
    fontWeight: 800,
    fontSize: "1.4em",
    letterSpacing: ".02em",
    padding: "32px 18px 12px 18px"
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "none",
    fontWeight: 500,
    fontSize: "1.05em",
    background: "none",
    cursor: "pointer",
    padding: "12px 20px",
    margin: "0px",
    outline: "none",
    transition: "background 0.15s,color 0.15s",
    borderRadius: "0 28px 28px 0"
  },
  sidebarFooter: {
    margin: "28px 6px 20px 14px",
    opacity:.9,
    fontFamily: "monospace"
  }
};

export default Sidebar;
