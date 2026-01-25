import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import "../Styles/OrderSuccess.css";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      navigate("/events");
      return;
    }

    // Fetch order details
    fetch(`http://localhost:5000/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrder(data.order);
        } else {
          setError(data.message || "Order not found");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
        setLoading(false);
      });
  }, [orderId, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="order-success-container">
          <p className="loading-text">Loading order details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className="order-success-container">
          <div className="error-state">
            <h1>❌ Error</h1>
            <p>{error}</p>
            <button className="btn-primary" onClick={() => navigate("/events")}>
              Browse Events
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const orderItems = order.items ? JSON.parse(order.items) : [];

  return (
    <Layout>
      <div className="order-success-container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1 className="success-title">Order Created Successfully!</h1>
          <p className="success-subtitle">Your registration is pending payment</p>

          <div className="order-details-card">
            <h2 className="section-title">Order Details</h2>

            <div className="detail-row">
              <span className="detail-label">Order ID:</span>
              <span className="detail-value order-id">{order.order_id}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{order.name}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{order.email}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{order.phone}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">College:</span>
              <span className="detail-value">{order.college}</span>
            </div>

            {order.team_name && (
              <>
                <div className="detail-row">
                  <span className="detail-label">Team Name:</span>
                  <span className="detail-value">{order.team_name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Team Size:</span>
                  <span className="detail-value">{order.team_size}</span>
                </div>
              </>
            )}

            <div className="divider"></div>

            <h3 className="subsection-title">Selected Events</h3>
            <div className="event-items">
              {orderItems.map((item, index) => (
                <div key={index} className="event-item">
                  <span className="event-name">{item.event_name}</span>
                  <span className="event-fee">₹{parseFloat(item.event_fee).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="total-row">
              <span className="total-label">Total Amount:</span>
              <span className="total-amount">₹{parseFloat(order.total_amount).toFixed(2)}</span>
            </div>

            <div className="status-badge pending">
              Status: {order.status}
            </div>
          </div>

          <div className="info-box">
            <h3>Next Steps:</h3>
            <ul>
              <li>Check your email for order confirmation</li>
              <li>Payment instructions will be sent shortly</li>
              <li>Save your Order ID: <strong>{order.order_id}</strong></li>
              <li>Contact support if you have any questions</li>
            </ul>
          </div>

          <div className="action-buttons">
            <button className="btn-primary" onClick={() => navigate("/events")}>
              Browse More Events
            </button>
            <button className="btn-secondary" onClick={() => window.print()}>
              Print Order
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
