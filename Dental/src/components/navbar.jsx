import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🦷</span>
        <span className="navbar-title">Dental Time</span>
      </div>
      <div className="navbar-links">
        <Link
          to="/"
          className={`navbar-link ${location.pathname === "/" ? "activo" : ""}`}
        >
          Pacientes
        </Link>
        <Link
          to="/crear"
          className={`navbar-link ${location.pathname === "/crear" ? "activo" : ""}`}
        >
          + Nuevo
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
