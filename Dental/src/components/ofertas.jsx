import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PLANES = [
  {
    id: "basico",
    nombre: "Básico",
    precio: "29",
    periodo: "/ mes",
    descripcion: "Ideal para revisiones periódicas y mantenimiento dental.",
    destacado: false,
    icono: "🦷",
    servicios: [
      "Revisión anual incluida",
      "Limpieza dental semestral",
      "Radiografías básicas",
      "Descuento 10% en tratamientos",
      "Atención de urgencias (horario laboral)",
    ],
    no_incluye: ["Ortodoncia", "Implantes", "Blanqueamiento"],
  },
  {
    id: "familiar",
    nombre: "Familiar",
    precio: "59",
    periodo: "/ mes",
    descripcion: "La opción más completa para toda la familia.",
    destacado: true,
    icono: "👨‍👩‍👧",
    servicios: [
      "Todo lo del plan Básico",
      "Hasta 4 miembros incluidos",
      "2 limpiezas anuales por miembro",
      "Descuento 20% en tratamientos",
      "Urgencias 24 horas",
      "Consulta de ortodoncia gratuita",
    ],
    no_incluye: ["Implantes con descuento especial"],
  },
  {
    id: "premium",
    nombre: "Premium",
    precio: "99",
    periodo: "/ mes",
    descripcion: "Cobertura total sin sorpresas, para los más exigentes.",
    destacado: false,
    icono: "⭐",
    servicios: [
      "Todo lo del plan Familiar",
      "Blanqueamiento dental anual",
      "Descuento 35% en implantes",
      "Ortodoncia con precio especial",
      "Urgencias 24/7 prioritarias",
      "Acceso a especialistas sin espera",
      "Segunda opinión médica incluida",
    ],
    no_incluye: [],
  },
];

const TRATAMIENTOS = [
  { nombre: "Revisión y diagnóstico", precio: "Gratuita", icono: "🔍" },
  { nombre: "Limpieza dental profesional", precio: "desde 60 €", icono: "✨" },
  { nombre: "Empaste (composite)", precio: "desde 80 €", icono: "🦷" },
  { nombre: "Extracción simple", precio: "desde 70 €", icono: "🩺" },
  { nombre: "Endodoncia", precio: "desde 250 €", icono: "💉" },
  { nombre: "Implante dental", precio: "desde 900 €", icono: "🔩" },
  { nombre: "Ortodoncia (brackets)", precio: "desde 1.500 €", icono: "😬" },
  { nombre: "Blanqueamiento dental", precio: "desde 180 €", icono: "💎" },
  { nombre: "Carillas de porcelana", precio: "desde 350 € / ud.", icono: "🌟" },
  { nombre: "Prótesis removible", precio: "desde 600 €", icono: "🦷" },
];

function Precios() {
  const [vista, setVista] = useState("planes"); // "planes" | "tratamientos"
  const navigate = useNavigate();

  return (
    <div className="precios-container">
      {/* Cabecera */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="home-hero-badge">
            <span>💰</span> Tarifas transparentes
          </div>
          <h1 className="home-hero-title">
            Precios claros, <br />
            <span className="home-hero-accent">sin sorpresas</span>
          </h1>
          <p className="home-hero-subtitulo">
            En Dental Time creemos que cuidar tu salud bucodental debe ser
            accesible. Consulta nuestros planes de mantenimiento o los precios
            por tratamiento individual.
          </p>
        </div>
        <div className="home-hero-illustration">
          <div className="home-hero-circle home-circle-1" />
          <div className="home-hero-circle home-circle-2" />
          <div className="home-tooth-icon">💰</div>
        </div>
      </section>

      {/* Selector de vista */}
      <div className="precios-selector">
        <button
          className={`precios-tab ${vista === "planes" ? "activo" : ""}`}
          onClick={() => setVista("planes")}
        >
          📋 Planes mensuales
        </button>
        <button
          className={`precios-tab ${vista === "tratamientos" ? "activo" : ""}`}
          onClick={() => setVista("tratamientos")}
        >
          🦷 Tratamientos individuales
        </button>
      </div>

      {/* Planes */}
      {vista === "planes" && (
        <section className="precios-planes">
          <div className="precios-planes-grid">
            {PLANES.map((plan) => (
              <div
                key={plan.id}
                className={`precios-plan-card ${plan.destacado ? "plan-destacado" : ""}`}
              >
                {plan.destacado && (
                  <div className="plan-badge-popular">⭐ Más popular</div>
                )}
                <div className="plan-icono">{plan.icono}</div>
                <h3 className="plan-nombre">{plan.nombre}</h3>
                <p className="plan-descripcion">{plan.descripcion}</p>
                <div className="plan-precio">
                  <span className="plan-precio-numero">{plan.precio} €</span>
                  <span className="plan-precio-periodo">{plan.periodo}</span>
                </div>
                <ul className="plan-servicios">
                  {plan.servicios.map((s) => (
                    <li key={s} className="plan-servicio-item plan-si">
                      <span>✅</span> {s}
                    </li>
                  ))}
                  {plan.no_incluye.map((s) => (
                    <li key={s} className="plan-servicio-item plan-no">
                      <span>❌</span> {s}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn ${plan.destacado ? "btn-guardar" : "btn-cancelar"} plan-cta`}
                  onClick={() => navigate("/contact")}
                >
                  Solicitar plan
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tratamientos */}
      {vista === "tratamientos" && (
        <section className="precios-tratamientos">
          <p className="precios-aviso">
            💡 Los precios indicados son orientativos. El presupuesto final se
            establece tras la revisión gratuita con el especialista.
          </p>
          <div className="precios-tabla">
            {TRATAMIENTOS.map((t) => (
              <div className="precios-fila" key={t.nombre}>
                <span className="precios-fila-icono">{t.icono}</span>
                <span className="precios-fila-nombre">{t.nombre}</span>
                <span className="precios-fila-precio">{t.precio}</span>
              </div>
            ))}
          </div>
          <div className="precios-cta">
            <p>¿Necesitas un presupuesto personalizado?</p>
            <button
              className="btn btn-guardar"
              onClick={() => navigate("/contact")}
            >
              Pedir presupuesto gratuito
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Precios;
