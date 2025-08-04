import React from "react";

/**
 * MenuGrid - shows the menu grid as in Figma (Figma .menu-grid, .dish-card, etc.)
 * @param {Array} menu Array of menu items
 * @param {Function} onAdd Called when "Add to order" is clicked
 */
function MenuGrid({ menu, onAdd }) {
  if (!menu) return null;
  return (
    <div className="menu-grid">
      {menu.map((item) => (
        <div key={item.id} className="dish-card">
          <img className="dish-img" src={item.image} alt={item.name} />
          <div className="dish-title">{item.name}</div>
          <div className="dish-price">
            {item.currency || "$"}
            {item.price}
          </div>
          <div className="availability">{item.available} Bowls available</div>
          <button
            className="add-btn"
            onClick={() => onAdd(item)}
            type="button"
          >
            Add to order
          </button>
        </div>
      ))}
    </div>
  );
}

export default MenuGrid;
