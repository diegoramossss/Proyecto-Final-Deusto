import { useNavigate } from "react-router-dom";

const STATS = [
  { numero: "+15", label: "Años de experiencia" },
  { numero: "+5.000", label: "Pacientes atendidos" },
  { numero: "8", label: "Especialistas" },
  { numero: "4,9", label: "Valoración media" },
];

const EQUIPO = [
  {
    nombre: "Dra. Laura Fernández",
    especialidad: "Ortodoncista",
    experiencia: "12 años de experiencia",
    iniciales: "LF",
  },
  {
    nombre: "Dr. Miguel Torres",
    especialidad: "Implantología",
    experiencia: "15 años de experiencia",
    iniciales: "MT",
  },
  {
    nombre: "Dra. Ana Ruiz",
    especialidad: "Odontología General",
    experiencia: "8 años de experiencia",
    iniciales: "AR",
  },
  {
    nombre: "Dr. Carlos Vega",
    especialidad: "Periodoncia",
    experiencia: "10 años de experiencia",
    iniciales: "CV",
  },
];

const VALORES = [
  {
    titulo: "Diagnóstico preciso",
    descripcion:
      "Utilizamos tecnología de diagnóstico digital avanzada para ofrecer tratamientos exactos y personalizados.",
  },
  {
    titulo: "Trato cercano",
    descripcion:
      "Cada paciente recibe atención individualizada. Nos tomamos el tiempo necesario para escuchar y explicar.",
  },
  {
    titulo: "Formación continua",
    descripcion:
      "Nuestro equipo se actualiza constantemente con las últimas técnicas y protocolos clínicos.",
  },
  {
    titulo: "Transparencia",
    descripcion:
      "Presupuestos claros y detallados antes de comenzar cualquier tratamiento. Sin costes ocultos.",
  },
];

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-pro-wrapper">
      {/* Hero */}
      <section className="about-pro-hero">
        <div className="about-pro-hero-inner">
          <p className="about-pro-eyebrow">Dental Time · Desde 2010</p>
          <h1 className="about-pro-hero-title">
            Especialistas en salud
            <br />
            bucodental
          </h1>
          <p className="about-pro-hero-desc">
            Somos una clínica dental de referencia comprometida con la salud y
            el bienestar de nuestros pacientes. Combinamos experiencia clínica,
            tecnología de vanguardia y un trato humano en cada visita.
          </p>
          <div className="about-pro-hero-ctas">
            <button
              className="btn btn-guardar"
              onClick={() => navigate("/contact")}
            >
              Solicitar cita
            </button>
            <button
              className="btn btn-cancelar"
              onClick={() => navigate("/precios")}
            >
              Ver tratamientos
            </button>
          </div>
        </div>
        <div className="about-pro-hero-side">
          <div className="about-pro-hero-accent-line" />
          <blockquote className="about-pro-hero-quote">
            <p>
              "La prevención y la precisión son los pilares de una buena salud
              dental."
            </p>
            <cite>— Equipo médico Dental Time</cite>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="about-pro-stats">
        {STATS.map((s) => (
          <div className="about-pro-stat" key={s.label}>
            <span className="about-pro-stat-num">{s.numero}</span>
            <span className="about-pro-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Valores */}
      <section className="about-pro-section">
        <div className="about-pro-section-header">
          <h2>Nuestro compromiso</h2>
          <p>
            Cuatro principios que guían cada decisión clínica y cada interacción
            con el paciente.
          </p>
        </div>
        <div className="about-pro-valores-grid">
          {VALORES.map((v, i) => (
            <div className="about-pro-valor-card" key={v.titulo}>
              <span className="about-pro-valor-num">0{i + 1}</span>
              <h3>{v.titulo}</h3>
              <p>{v.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="about-pro-section">
        <div className="about-pro-section-header">
          <h2>El equipo</h2>
          <p>
            Profesionales con formación especializada y vocación por la medicina
            dental.
          </p>
        </div>
        <div className="about-pro-equipo-grid">
          {EQUIPO.map((m) => (
            <div className="about-pro-equipo-card" key={m.nombre}>
              <div className="about-pro-equipo-avatar">{m.iniciales}</div>
              <div className="about-pro-equipo-info">
                <h3>{m.nombre}</h3>
                <p className="about-pro-equipo-especialidad">
                  {m.especialidad}
                </p>
                <p className="about-pro-equipo-exp">{m.experiencia}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
