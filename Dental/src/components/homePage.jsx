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
            <p className="home-stat-numero">CRUD</p>
            <p className="home-stat-label">Operaciones disponibles</p>
          </div>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-icon">☁️</span>
          <div>
            <p className="home-stat-numero">Online</p>
            <p className="home-stat-label">API en la nube</p>
          </div>
        </div>
      </section>

      {/* Tarjetas de acceso rápido */}
      <section className="home-cards">
        <h2 className="home-cards-titulo">Acceso rápido</h2>
        <div className="home-cards-grid">
          <div
            className="home-card"
            onClick={() => navigate("/pacientes")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/pacientes")}
          >
            <div className="home-card-icono">📂</div>
            <h3>Lista de pacientes</h3>
            <p>
              Consulta, edita y elimina los pacientes registrados en el sistema.
            </p>
            <span className="home-card-link">Ver todos →</span>
          </div>

          <div
            className="home-card home-card-destacada"
            onClick={() => navigate("/crear")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/crear")}
          >
            <div className="home-card-icono">➕</div>
            <h3>Nuevo paciente</h3>
            <p>Registra un nuevo paciente rellenando el formulario de alta.</p>
            <span className="home-card-link">Crear ahora →</span>
          </div>

          <div className="home-card home-card-info">
            <div className="home-card-icono">🔒</div>
            <h3>Datos seguros</h3>
            <p>
              Toda la información se almacena de forma segura en nuestra API
              REST.
            </p>
            <span className="home-card-link home-card-link-muted">
              Dental Time API
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
