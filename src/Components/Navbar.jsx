import "../Styles/navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="samurai-nav">
      <div className="logo">
        <Link to="/home" onClick={closeMenu}>ENVISION</Link>
      </div>

      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="/" onClick={closeMenu}>Home</a></li>
        <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
        <li><Link to="/team" onClick={closeMenu}>Team</Link></li>
        <li><Link to="/sponsors" onClick={closeMenu}>Sponsors</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li>
          <Link to="/cart" onClick={closeMenu} className="cart-link">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
