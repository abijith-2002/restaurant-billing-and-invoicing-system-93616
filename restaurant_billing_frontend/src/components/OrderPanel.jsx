import React from "react";

/**
 * OrderPanel - right sidebar cart and checkout, Figma dark style
 * @param {Array} cart Cart array [{ id, name, price, qty, image }]
 * @param {Function} onQty (id, delta)
 * @param {Function} onRemove (id)
 * @param {String} orderType (active order tab)
 * @param {Function} setOrderType (string) => void
 * @param {Object} notes { [id]: text }
 * @param {Function} onNoteChange (id, val)
 */
const orderTabs = ["Dine In", "To Go", "Delivery"];

function OrderPanel({
  cart,
  onQty,
  onRemove,
  orderType,
  setOrderType,
  notes,
  onNoteChange,
}) {
  // Sum totals
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <aside className="order-panel">
      <div className="order-panel-header">
        <div className="order-title">Orders #34562</div>
        <nav className="tab-list">
          {orderTabs.map((ot) => (
            <button
              key={ot}
              className={`tab-btn${orderType === ot ? " active" : ""}`}
              onClick={() => setOrderType(ot)}
              type="button"
            >
              {ot}
            </button>
          ))}
        </nav>
      </div>
      {/* Cart Table */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th style={{ width: 28 }}></th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ color: "#aaa", textAlign: "center" }}>
                Cart is empty.
              </td>
            </tr>
          ) : (
            cart.map((dish) => (
              <tr key={dish.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className="cart-image"
                      src={dish.image}
                      alt={dish.name}
                    />
                    <span>
                      {dish.name.length > 20
                        ? dish.name.substring(0, 17) + "..."
                        : dish.name}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => onQty(dish.id, -1)}
                      data-action="decrease"
                      type="button"
                    >
                      -
                    </button>
                    <span className="qty-value">{dish.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onQty(dish.id, 1)}
                      data-action="increase"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  $
                  {(dish.price * dish.qty).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                  <button
                    className="trash-btn"
                    title="Remove"
                    onClick={() => onRemove(dish.id)}
                    type="button"
                  >
                    <span role="img" aria-label="Remove">
                      🗑️
                    </span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Notes: one input below cart table per item */}
      {cart.length > 0 && (
        <div>
          {cart.map((dish) => (
            <div className="note-input-row" style={{ marginBottom: 6 }} key={dish.id + "-note"}>
              <input
                className="note-input"
                type="text"
                placeholder={`Note for ${dish.name}...`}
                value={notes[dish.id] || ""}
                onChange={e => onNoteChange(dish.id, e.target.value)}
                style={{
                  width: "100%",
                }}
              />
            </div>
          ))}
        </div>
      )}
      {/* Order Summary */}
      <div className="order-summary">
        <div className="order-summary-row">
          <span>Discount</span>
          <span>$0</span>
        </div>
        <div className="order-summary-row">
          <span>Sub total</span>
          <span>
            $
            {subtotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
      {/* CTA */}
      <button className="cta-btn">Continue to Payment</button>
    </aside>
  );
}

export default OrderPanel;
