import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useCart } from "../context/CartContext";
import "../Styles/Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "" });
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("API response is not an array:", data);
          setEvents([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setEvents([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (event) => {
    const success = addToCart(event);
    if (success) {
      showToast(`${event.name} added to cart!`);
    } else {
      showToast(`${event.name} is already in cart!`);
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const getFilteredEvents = () => {
    // Ensure events is always an array
    const eventsArray = Array.isArray(events) ? events : [];

    if (activeCategory === "all") return eventsArray;
    if (activeCategory === "mega") return eventsArray.filter(e => e.isMegaEvent === 1);
    if (activeCategory === "technical") return eventsArray.filter(e => e.type === "Technical" && e.isMegaEvent !== 1);
    if (activeCategory === "non-technical") return eventsArray.filter(e => e.type === "Non-Technical" && e.isMegaEvent !== 1);
    return eventsArray;
  };

  const filteredEvents = getFilteredEvents();

  if (loading) {
    return (
      <Layout>
        <div className="events-container">
          <p className="loading-text">Loading events...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="events-container">
        <div className="events-header">
          <h1 className="events-title">Events</h1>
          <p className="events-subtitle">Test your skill. Prove your discipline.</p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          <button
            className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Events
          </button>
          <button
            className={`category-tab ${activeCategory === "technical" ? "active" : ""}`}
            onClick={() => setActiveCategory("technical")}
          >
            Technical
          </button>
          <button
            className={`category-tab ${activeCategory === "non-technical" ? "active" : ""}`}
            onClick={() => setActiveCategory("non-technical")}
          >
            Non-Technical
          </button>
          <button
            className={`category-tab ${activeCategory === "mega" ? "active" : ""}`}
            onClick={() => setActiveCategory("mega")}
          >
            Mega Events
          </button>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <p className="no-events">No events found in this category.</p>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                {event.isMegaEvent === 1 && <div className="mega-badge">MEGA</div>}
                <div className="event-card-header">
                  <h3 className="event-name">{event.name}</h3>
                  <span className="event-type-badge">{event.type}</span>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <span className="event-fee">₹{event.fee}</span>
                  <button
                    className={`add-to-cart-btn ${isInCart(event.id) ? "added" : ""}`}
                    onClick={() => handleAddToCart(event)}
                    disabled={isInCart(event.id)}
                  >
                    {isInCart(event.id) ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div className="toast-notification">
            {toast.message}
          </div>
        )}
      </div>
    </Layout>
  );
}
