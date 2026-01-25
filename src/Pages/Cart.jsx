import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import "../Styles/Cart.css";

export default function Cart() {
  const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();

  const handleRemove = (eventId, eventName) => {
    if (window.confirm(`Remove "${eventName}" from cart?`)) {
      removeFromCart(eventId);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/events");
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="cart-container">
          <div className="empty-cart">
            <h1 className="cart-title">Your Cart</h1>
            <div className="empty-cart-icon">🛒</div>
            <p className="empty-cart-text">Your cart is empty</p>
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Browse Events
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-subtitle">Review your selected events</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((event) => (
              <div key={event.id} className="cart-item">
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{event.name}</h3>
                  <p className="cart-item-description">{event.description}</p>
                  <div className="cart-item-meta">
                    <span className="cart-item-type">{event.type}</span>
                    {event.isMegaEvent === 1 && (
                      <span className="cart-item-mega">MEGA EVENT</span>
                    )}
                  </div>
                </div>
                <div className="cart-item-actions">
                  <span className="cart-item-fee">₹{event.fee}</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(event.id, event.name)}
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Total Events:</span>
                <span className="summary-value">{cart.length}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Total Amount:</span>
                <span className="summary-total">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>

            <button className="clear-cart-btn" onClick={() => {
              if (window.confirm("Clear entire cart?")) {
                clearCart();
              }
            }}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
