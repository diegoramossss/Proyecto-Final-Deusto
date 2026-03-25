import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🦷</span>
        <Link to="/" className="navbar-title">
          Dental Time
        </Link>
      </div>
      <div className="navbar-links">
        <Link
          to="/pacientes"
          className={`navbar-link ${location.pathname === "/pacientes" ? "activo" : ""}`}
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
