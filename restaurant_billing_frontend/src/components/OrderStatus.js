import React from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function OrderStatus({ orders, onUpdate }) {
  /**
   * orders: [{id, table, status, items, ts}]
   * onUpdate: function(order, newStatus)
   */

  const nextStatus = (status) => {
    return status === "pending" ? "preparing"
      : status === "preparing" ? "served"
      : "done";
  };

  return (
    <div>
      <h2 style={styles.heading}>Current Orders</h2>
      {orders.length === 0 ? (
        <div style={styles.empty}>No active orders.</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Table</th>
              <th>Status</th>
              <th>#Items</th>
              <th>Time</th>
              <th>Next</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.table}</td>
                <td>
                  <span style={{
                    color:
                      o.status === "pending" ? COLORS.accent :
                      o.status === "preparing" ? COLORS.primary : "#777",
                    fontWeight:600
                  }}>{o.status}</span>
                </td>
                <td>{o.items.length}</td>
                <td>{(new Date(o.ts)).toLocaleTimeString()}</td>
                <td>
                  {o.status !== "done" && (
                    <button style={styles.nextBtn}
                      onClick={() => onUpdate(o, nextStatus(o.status))}
                    >
                      {nextStatus(o.status)}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
const styles = {
  heading: { fontSize: "1.4em", fontWeight: 700, margin: "8px 0" },
  table: {
    width: "100%",
    margin: "0 auto",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 6px #eeeeee77"
  },
  nextBtn: {
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: 7,
    padding: "5px 15px",
    fontWeight: 700,
    fontSize: ".97em",
    cursor: "pointer"
  },
  empty: {
    color: "#666",
    fontSize: "1.1em",
    margin: "14px"
  }
};

export default OrderStatus;
