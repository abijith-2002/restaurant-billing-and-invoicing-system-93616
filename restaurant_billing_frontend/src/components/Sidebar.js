import React from "react";

// PUBLIC_INTERFACE
/**
 * Sidebar navigation: vertical icon bar as per Figma
 * @param navItems [{ label, icon, key }]
 * @param active string (active nav key)
 * @param onNavigate function(navKey)
 */
function Sidebar({ navItems, active, onNavigate }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/shop.png"
          width={40}
          alt="Logo"
        />
      </div>
      {/* Vertical nav */}
      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-btn${active === item.key ? " active" : ""}`}
            title={item.label}
            onClick={() => onNavigate(item.key)}
            type="button"
          >
            <span>{item.icon}</span>
          </button>
        ))}
      </nav>
      {/* Logout at bottom */}
      <button className="nav-btn logout-btn" title="Logout" style={{ marginTop: "auto" }}>
        <span role="img" aria-label="Logout">🚪</span>
      </button>
    </aside>
  );
}

export default Sidebar;
