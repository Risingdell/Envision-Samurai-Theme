import { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import './EventCard.css';

export const EventCard = ({ event }) => {
    const { cart, addToCart } = useCart();
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCursorPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    // Check if event is already in cart
    const isInCart = cart.some(item => item.id === event.id);

    // Handle add to cart
    const handleAddToCart = () => {
        if (!isInCart) {
            const success = addToCart(event);
            if (success) {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            }
        }
    };

    // Get type badge styling
    const getTypeBadge = () => {
        return event.type === 'Technical'
            ? { bg: 'rgba(59, 130, 246, 0.3)', text: '#60a5fa', icon: '⚡' }
            : { bg: 'rgba(236, 72, 153, 0.3)', text: '#f472b6', icon: '🎨' };
    };

    const badge = getTypeBadge();

    return (
        <div
            ref={cardRef}
            className={`event-card ${event.isMegaEvent ? 'mega-event' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Gradient hover effect */}
            <div
                className="event-card-glow"
                style={{
                    opacity: hoverOpacity,
                    background: `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,157,0,0.15), transparent 40%)`,
                }}
            />

            {/* Mega Event Badge */}
            {event.isMegaEvent === 1 && (
                <div className="mega-badge">
                    🌟 MEGA EVENT
                </div>
            )}

            {/* Header */}
            <div className="event-card-header">
                <h3 className="event-name">{event.name}</h3>
                <div className="event-fee">₹{event.fee}</div>
            </div>

            {/* Department */}
            <div className="event-department">📍 {event.department}</div>

            {/* Description */}
            <p className="event-description">
                {event.description || 'An exciting event awaits! More details coming soon.'}
            </p>

            {/* Footer */}
            <div className="event-card-footer">
                <div className="event-type-badge" style={{
                    background: badge.bg,
                    color: badge.text
                }}>
                    <span className="type-icon">{badge.icon}</span>
                    {event.type}
                </div>
                <button
                    className={`register-btn ${isInCart ? 'in-cart' : ''}`}
                    onClick={handleAddToCart}
                    disabled={isInCart}
                >
                    {isInCart ? (
                        <>
                            <svg viewBox="0 0 24 24" className="register-icon">
                                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                            </svg>
                            In Cart
                        </>
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" className="register-icon">
                                <path fill="currentColor" d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path>
                            </svg>
                            Add to Cart
                        </>
                    )}
                </button>
            </div>

            {/* Success Notification */}
            {showNotification && (
                <div className="cart-notification">
                    ✓ Added to cart!
                </div>
            )}
        </div>
    );
};
