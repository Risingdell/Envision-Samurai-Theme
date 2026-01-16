import "../Styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="samurai-nav">
      <div className="logo">ENVISION</div>

      <ul className="nav-links">
        <li>Events</li>
        <li>Team</li>
        <li>Sponsors</li>
        <li>About</li>
      </ul>
    </nav>
  );
}
