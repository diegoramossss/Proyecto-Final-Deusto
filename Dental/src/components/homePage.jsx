import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pacienteService from "../services/pacienteService";

function HomePage() {
  const [stats, setStats] = useState({ total: 0, loading: true });
  const navigate = useNavigate();

  useEffect(() => {
    const cargarStats = async () => {
      try {
        const pacientes = await pacienteService.getAll();
        setStats({ total: pacientes.length, loading: false });
      } catch {
        setStats({ total: 0, loading: false });
      }
    };
    cargarStats();
  }, []);

  return (
    <div className="home-container">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-hero-badge">
            <span>🦷</span> Dental Time
          </div>
          <h1 className="home-hero-title">
            Gestión de pacientes <br />
            <span className="home-hero-accent">simple y eficiente</span>
          </h1>
          <p className="home-hero-subtitulo">
            Registra, consulta y administra la información de tus pacientes
            desde un solo lugar.
          </p>
          <div className="home-hero-acciones">
            <button
              className="btn btn-guardar home-btn-primary"
              onClick={() => navigate("/pacientes")}
            >
              Ver pacientes
            </button>
            <button
              className="btn btn-cancelar home-btn-secondary"
              onClick={() => navigate("/crear")}
            >
              + Nuevo paciente
            </button>
          </div>
        </div>
        <div className="home-hero-illustration">
          <div className="home-hero-circle home-circle-1" />
          <div className="home-hero-circle home-circle-2" />
          <div className="home-tooth-icon">🦷</div>
        </div>
      </section>

      {/* Estadística rápida */}
      <section className="home-stats">
        <div className="home-stat-card">
          <span className="home-stat-icon">👥</span>
          <div>
            <p className="home-stat-numero">
              {stats.loading ? "..." : stats.total}
            </p>
            <p className="home-stat-label">Pacientes registrados</p>
          </div>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-icon">📋</span>
          <div>
            <p className="home-stat-numero">Tratamientos </p>
            <p className="home-stat-label">
              Implantes, ortodoncia, limpieza dental y más.
            </p>
          </div>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-icon">🩺</span>
          <div>
            <p className="home-stat-numero">Nuestro Equipo</p>
            <p className="home-stat-label">
              Especialistas cualificados con años de experiencia
            </p>
          </div>
        </div>
      </section>

      {/* Tarjetas de acceso rápido */}
      <section className="home-cards">
        <h2 className="home-cards-titulo">Acceso rápido</h2>
        <div className="home-cards-grid">
          <div
            className="home-card"
            onClick={() => navigate("/about")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/about")}
          >
            <div className="home-card-icono">ℹ️</div>
            <h3>About us</h3>
            <p>Conoce más sobre nuestro equipo y nuestra misión.</p>
          </div>

          <div
            className="home-card home-card-destacada"
            onClick={() => navigate("/precios")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/precios")}
          >
            <div className="home-card-icono">💰</div>
            <h3>Planes y Ofertas</h3>
            <p>Explora nuestros planes y ofertas especiales.</p>
          </div>

          <div
            className="home-card home-card-info"
            onClick={() => navigate("/contact")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/contact")}
          >
            <div className="home-card-icono">📧</div>
            <h3>Contact us</h3>
            <p>
              ¿Tienes preguntas? Contáctanos para más información o soporte.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
