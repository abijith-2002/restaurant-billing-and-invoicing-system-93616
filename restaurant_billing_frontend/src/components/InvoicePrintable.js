import React, { useRef } from "react";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
function InvoicePrintable({ bill, onPrint }) {
  /**
   * bill: {id, table, items: [{name, price, qty}], ts, total}
   * onPrint: function() - called after printing
   */

  const printRef = useRef();

  const handlePrint = () => {
    // Open a new window for print
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank", "width=480,height=600");
    win.document.write(`<html><head><title>Invoice #${bill.id}</title>
      <style>
        body { font-family: Arial,sans-serif; margin:0; background:#fff; }
        .inv-root { padding:32px 22px; }
        .inv-title { color:${COLORS.primary}; font-weight:800;font-size:1.5em;}
        table { width:100%; margin-top:16px; border-collapse:collapse;}
        th,td{ padding:5px 6px; text-align:left; font-size:1.06em;}
        tr:not(:last-child){border-bottom:1px solid #eee;}
        .foot{font-size:1.1em; font-weight:bold; color:${COLORS.accent}; }
      </style>
    </head><body>
    <div class="inv-root">
      ${content}
    </div>
    </body></html>`);
    win.document.close();
    win.focus();
    win.print();
    win.close();
    if (onPrint) onPrint();
  };

  if (!bill) return <div style={{marginTop:20}}>No bill selected.</div>;

  return (
    <div>
      <h2 style={{marginBottom:15}}>Invoice #{bill.id}</h2>
      <div ref={printRef}>
        <div className="inv-title">BILLGENIE</div>
        <div>Table: <b>{bill.table}</b></div>
        <div>Time: {(new Date(bill.ts)).toLocaleString()}</div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {bill.items.map((it, k) => (
              <tr key={k}>
                <td>{it.name}</td>
                <td>{it.qty}</td>
                <td>₹{it.price}</td>
                <td>₹{it.price * it.qty}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="foot">Grand Total</td>
              <td className="foot">₹{bill.total}</td>
            </tr>
          </tbody>
        </table>
        <div style={{margin:"16px 0 7px 0", fontSize:".98em",fontWeight:400}}>
          <span>Thank you for dining with us!<br/></span>
        </div>
      </div>
      <button
        style={{
          background: COLORS.primary,
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: "1.09em",
          padding: "8px 28px",
          borderRadius: 9,
          cursor: "pointer",
          marginTop: 14
        }}
        onClick={handlePrint}
      >
        Print Invoice
      </button>
    </div>
  );
}

export default InvoicePrintable;
