/*
 * MenuBrowser - Browse restaurant menu and add items to order
 */
import React from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function MenuBrowser({ menu, onAdd }) {
  /**
   * menu: [{id, name, description, price, image}]
   * onAdd: function(item) - Called when item is added
   */
  return (
    <div>
      <h2 style={styles.heading}>Menu</h2>
      <div style={styles.menuGrid}>
        {menu.map((item) => (
          <div key={item.id} style={styles.menuCard}>
            {item.image && <img src={item.image} alt={item.name} style={styles.image} />}
            <div style={{flex: 1}}>
              <h3 style={{margin: "0 0 0.2em 0"}}>{item.name}</h3>
              <div style={styles.desc}>{item.description}</div>
              <div style={styles.priceRow}>
                <span style={styles.price}>₹{item.price}</span>
                <button style={styles.addBtn} onClick={() => onAdd(item)}>
                  ＋ Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  heading: {
    fontSize: "1.7em",
    fontWeight: 700,
    margin: "8px 0"
  },
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "10px"
  },
  menuCard: {
    background: COLORS.secondary,
    borderRadius: 12,
    boxShadow: "0 2px 6px 0 #eee",
    border: `1px solid ${COLORS.border}`,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minHeight: 120
  },
  image: {
    width: "100%",
    maxHeight: 90,
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 7,
  },
  desc: {
    fontSize: "1em",
    color: "#555",
    margin: "3px 0 13px 0"
  },
  priceRow: { display: "flex", justifyContent: "space-between", alignItems:"center" },
  price: {
    color: COLORS.primary,
    fontWeight: 700,
    fontSize: "1.07em"
  },
  addBtn: {
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "6px 15px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: ".98em"
  }
};
export default MenuBrowser;
