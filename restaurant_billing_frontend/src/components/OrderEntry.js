import React, { useState } from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function OrderEntry({ cart, setCart, onSubmit }) {
  /** 
   * OrderEntry - manage cart, handle quantity, removal, and submit order
   * cart: [{id, name, price, qty}]
   * setCart: function
   * onSubmit: function(cart)
   **/

  const increment = (id) => setCart((prev) =>
    prev.map((it) => it.id === id ? { ...it, qty: it.qty + 1 } : it)
  );

  const decrement = (id) => setCart((prev) =>
    prev
      .map((it) => it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)
      .filter((it) => it.qty > 0)
  );

  const remove = (id) => setCart((prev) => prev.filter((it) => it.id !== id));

  const [tableNo, setTableNo] = useState("");

  // PUBLIC_INTERFACE
  const submitOrder = () => {
    if (!tableNo.trim()) return alert("Please enter table number");
    if (!cart.length) return alert("No items in cart.");
    onSubmit({ table: tableNo.trim(), items: cart });
    setTableNo("");
    setCart([]);
  };

  const grandTotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div>
      <h2 style={styles.heading}>New Order</h2>
      <div style={{marginBottom:18}}>
        <input
          style={styles.input}
          placeholder="Table Number"
          value={tableNo}
          onChange={e => setTableNo(e.target.value)}
        />
      </div>
      <div>
        {cart.length === 0 ? (
          <div style={styles.empty}>No items added to the order.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Dish</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cart.map((it) => (
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td>
                    <button style={styles.xsBtn} onClick={() => decrement(it.id)}>-</button>
                    <span style={{margin: "0 7px"}}>{it.qty}</span>
                    <button style={styles.xsBtn} onClick={() => increment(it.id)}>+</button>
                  </td>
                  <td>₹{it.price}</td>
                  <td>₹{it.price * it.qty}</td>
                  <td>
                    <button style={styles.delBtn} onClick={() => remove(it.id)}>Remove</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} style={{ textAlign: "right", fontWeight: 700 }}>Grand Total</td>
                <td colSpan={2} style={{ fontWeight: 700, color: COLORS.accent }}>₹{grandTotal}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div style={{marginTop:30}}>
        <button style={styles.submitBtn} onClick={submitOrder} disabled={!cart.length}>
          Submit Order
        </button>
      </div>
    </div>
  );
}
const styles = {
  heading: { fontSize: "1.45em", fontWeight: 700, margin: "8px 0" },
  input: {
    fontSize: "1.07em",
    padding: "7px 15px",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 7,
    minWidth: 120,
    outline: "none"
  },
  table: {
    width: "100%",
    margin: "0 auto",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 6px #efefef77"
  },
  xsBtn: {
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "1.5px 7px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: ".96em"
  },
  delBtn: {
    background: COLORS.accent,
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "3px 8px",
    cursor: "pointer"
  },
  empty: {
    color: "#666",
    fontSize: "1.05em",
    margin: "12px"
  },
  submitBtn: {
    background: COLORS.accent,
    border: "none",
    color: "#fff",
    padding: "9px 30px",
    fontWeight: 700,
    borderRadius: 9,
    fontSize: "1.02em",
    cursor: "pointer",
    boxShadow: "0 1px 3px #ffe0b077",
    opacity: 1,
    transition: "opacity 0.2s"
  }
};

export default OrderEntry;
