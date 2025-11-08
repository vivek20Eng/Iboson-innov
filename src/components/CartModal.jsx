import React from 'react';
import { FiX, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import '../styles/Cart.css';

export default function CartModal({ items, cart, setCart, open, onClose }) {

  const update = (id, delta) => {
    setCart(prev => {
      const qty = (prev[id] || 0) + delta;
      if (qty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: qty };
    });
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = items.find(i => i.id === +id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const count = Object.values(cart).reduce((s, q) => s + q, 0);

  if (!open) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart" onClick={e => e.stopPropagation()}>
        <header className="cart__head">
          <h2>Shopping Cart <span>({count})</span></h2>
          <button className="close" onClick={onClose} aria-label="Close cart">
            <FiX />
          </button>
        </header>

        {count === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add items to get started!</p>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {Object.entries(cart).map(([id, qty]) => {
                const p = items.find(i => i.id === +id);
                if (!p) return null;
                return (
                  <li key={id} className="cart-item">
                    <img src={p.image} alt={p.name} className="cart-img" />
                    <div className="info">
                      <h4>{p.name}</h4>
                      <p className="price">${p.price.toFixed(0)} each</p>
                    </div>
                    <div className="qty-controls">
                      <button onClick={() => update(+id, -1)} aria-label="Decrease">
                        <FiMinus />
                      </button>
                      <span>{qty}</span>
                      <button onClick={() => update(+id, 1)} aria-label="Increase">
                        <FiPlus />
                      </button>
                    </div>
                    <p className="subtotal">${(p.price * qty).toFixed(0)}</p>
                    <button
                      className="del"
                      onClick={() => update(+id, -999)}
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                );
              })}
            </ul>

            <footer className="cart-foot">
              <div className="total">
                <span>Total:</span>
                <strong>${total.toFixed(0)}</strong>
              </div>
              <div className="actions">
                <button className="clear-btn" onClick={() => setCart({})}>
                  Clear Cart
                </button>
                <button
                  className="checkout-btn"
                  onClick={() => {
                    alert('Order placed successfully!');
                    setCart({});
                    onClose();
                  }}
                >
                  Checkout
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}