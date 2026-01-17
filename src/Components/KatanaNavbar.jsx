import { useState } from "react";
import { Link } from "react-router-dom";
import "./katanaNavbar.css";

export default function KatanaNavbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className={`katana-nav ${open ? "open" : ""}`}>
      
      {/* TSUKA (Handle / Logo) */}
      <div className="tsuka" onClick={toggleMenu}>
        <Link to="/home" className="logo" onClick={closeMenu}>
          ENVISION
        </Link>
      </div>

      {/* BLADE CONTAINER with Blade and Nav Links */}
      <div className="blade-container">
        {/* Blade (White Sword) */}
        <div className="blade" aria-hidden="true" />

        {/* Navigation Links on Blade */}
        <ul className="nav-links">
          <li><a href="/" onClick={closeMenu}>Home</a></li>
          <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
          <li><Link to="/team" onClick={closeMenu}>Team</Link></li>
          <li><Link to="/sponsors" onClick={closeMenu}>Sponsors</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        </ul>

        {/* SAYA (Sheath) - Covers Blade */}
        <div className="saya" />
      </div>

      {/* SLASH EFFECT - Line from top to bottom */}
      <div className="slash-line" aria-hidden="true" />
    </nav>
  );
}
