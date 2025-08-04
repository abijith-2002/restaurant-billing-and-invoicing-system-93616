import React, { useState } from "react";
import InvoicePrintable from "./InvoicePrintable";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function BillsScreen({ bills }) {
  /**
   * bills: [{id, table, ts, items:[{name, price, qty}], total}]
   */
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h2 style={styles.heading}>Bills / Invoices</h2>
      <div style={styles.grid}>
        <div style={{ flex: 1 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Table</th>
                <th>Time</th>
                <th>Total</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {bills.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ color: "#666" }}>No bills yet.</td>
                </tr>
              ) : (
                bills.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.table}</td>
                    <td>{(new Date(b.ts)).toLocaleString()}</td>
                    <td style={{ color: COLORS.accent, fontWeight: 600 }}>₹{b.total}</td>
                    <td>
                      <button
                        onClick={() => setSelected(b)}
                        style={styles.selBtn}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div style={styles.invoiceBox}>
          {selected && <InvoicePrintable bill={selected} />}
        </div>
      </div>
    </div>
  );
}
const styles = {
  heading: { fontSize: "1.4em", fontWeight: 700, margin: "8px 0" },
  grid: { display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 7,
    minWidth: 330,
    boxShadow: "0 2px 7px #eeeeee66",
    marginBottom: 10
  },
  selBtn: {
    background: COLORS.primary,
    color: "#fff",
    fontWeight: 600,
    fontSize: ".98em",
    border: "none",
    borderRadius: 6,
    padding: "5px 13px",
    cursor: "pointer"
  },
  invoiceBox: {
    minWidth: 360,
    maxWidth: 430,
    marginLeft: 10,
    background: "#fafafa",
    borderRadius: 12,
    boxShadow: "0 1px 3px #ddd",
    padding: "6px 20px",
    flex: 1
  }
};
export default BillsScreen;
