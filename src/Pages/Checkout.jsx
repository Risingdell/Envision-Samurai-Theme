import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Layout from "../Components/Layout";
import "../Styles/Checkout.css";

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    teamName: "",
    teamSize: 1
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Redirect if cart is empty
  if (cart.length === 0) {
    navigate("/events");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/\s/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    // College validation
    if (!formData.college.trim()) {
      newErrors.college = "College name is required";
    }

    // Team size validation
    if (formData.teamSize < 1 || formData.teamSize > 10) {
      newErrors.teamSize = "Team size must be between 1 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.replace(/\s/g, ""),
          college: formData.college.trim(),
          teamName: formData.teamName.trim() || null,
          teamSize: parseInt(formData.teamSize),
          cartItems: cart
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      // Success: Clear cart and redirect to success page
      clearCart();
      navigate(`/order-success/${data.order.orderId}`);
    } catch (error) {
      console.error("Order creation error:", error);
      setServerError(error.message || "Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="checkout-container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">Complete your registration</p>
        </div>

        <div className="checkout-content">
          {/* Form Section */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2 className="form-section-title">Participant Details</h2>

              {serverError && (
                <div className="error-banner">
                  {serverError}
                </div>
              )}

              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                  placeholder="Enter your full name"
                  disabled={loading}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                  placeholder="10-digit mobile number"
                  disabled={loading}
                  maxLength={10}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              {/* College */}
              <div className="form-group">
                <label htmlFor="college">College/University *</label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className={errors.college ? "error" : ""}
                  placeholder="Your college name"
                  disabled={loading}
                />
                {errors.college && <span className="error-text">{errors.college}</span>}
              </div>

              <h2 className="form-section-title">Team Details (Optional)</h2>

              {/* Team Name */}
              <div className="form-group">
                <label htmlFor="teamName">Team Name</label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="Leave blank if participating solo"
                  disabled={loading}
                />
              </div>

              {/* Team Size */}
              <div className="form-group">
                <label htmlFor="teamSize">Team Size</label>
                <input
                  type="number"
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className={errors.teamSize ? "error" : ""}
                  min="1"
                  max="10"
                  disabled={loading}
                />
                {errors.teamSize && <span className="error-text">{errors.teamSize}</span>}
              </div>

              <button
                type="submit"
                className="proceed-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : "Proceed to Pay"}
              </button>

              <button
                type="button"
                className="back-btn"
                onClick={() => navigate("/cart")}
                disabled={loading}
              >
                Back to Cart
              </button>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="checkout-summary-section">
            <div className="checkout-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-events">
                {cart.map((event) => (
                  <div key={event.id} className="summary-event-item">
                    <div className="summary-event-details">
                      <h4>{event.name}</h4>
                      {event.isMegaEvent === 1 && (
                        <span className="summary-mega-badge">MEGA</span>
                      )}
                    </div>
                    <span className="summary-event-fee">₹{event.fee}</span>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total-row">
                <span>Total Events:</span>
                <span>{cart.length}</span>
              </div>

              <div className="summary-total-row total">
                <span>Total Amount:</span>
                <span className="summary-total-amount">₹{total.toFixed(2)}</span>
              </div>

              <div className="summary-note">
                <p>* Amount will be recalculated server-side for security</p>
                <p>* Order is immutable once created</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
