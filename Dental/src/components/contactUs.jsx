function ContactUs() {
  const CONTACTO = [
    {
      etiqueta: "Teléfono",
      lineas: ["+34 944 123 456", "+34 600 987 654"],
      accion: { texto: "Llamar", href: "tel:+34944123456" },
    },
    {
      etiqueta: "Correo electrónico",
      lineas: ["info@dentaltime.es", "citas@dentaltime.es"],
      accion: { texto: "Enviar email", href: "mailto:info@dentaltime.es" },
    },
    {
      etiqueta: "Dirección",
      lineas: ["Calle Gran Vía, 45, 2.ª planta", "48011 Bilbao, Bizkaia"],
      accion: {
        texto: "Ver en el mapa",
        href: "https://maps.google.com/?q=Gran+Vía+45+Bilbao",
        externo: true,
      },
    },
    {
      etiqueta: "Horario de atención",
      lineas: ["Lunes – Viernes: 9:00 – 20:00", "Sábados: 9:00 – 14:00"],
      accion: null,
    },
  ];

  const COMO_LLEGAR = [
    { medio: "Metro", detalle: "Moyua (L1 y L2) — 3 min a pie" },
    { medio: "Autobús", detalle: "Líneas 13, 27 y 38 — parada Gran Vía" },
    { medio: "Coche", detalle: "Parking Gran Vía a 50 m" },
  ];

  return (
    <div className="contacto-pro-wrapper">
      {/* Cabecera */}
      <section className="contacto-pro-hero">
        <div className="contacto-pro-hero-inner">
          <p className="about-pro-eyebrow">Dental Time · Contacto</p>
          <h1 className="about-pro-hero-title">Estamos a tu disposición</h1>
          <p className="about-pro-hero-desc">
            Puedes contactarnos por teléfono, correo electrónico o visitarnos
            directamente en nuestra clínica. Respondemos en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* Tarjetas de contacto */}
      <section className="contacto-pro-cards-section">
        <div className="contacto-pro-cards-grid">
          {CONTACTO.map((item) => (
            <div className="contacto-pro-card" key={item.etiqueta}>
              <p className="contacto-pro-card-etiqueta">{item.etiqueta}</p>
              <div className="contacto-pro-card-lineas">
                {item.lineas.map((linea) => (
                  <p key={linea}>{linea}</p>
                ))}
              </div>
              {item.accion && (
                <a
                  href={item.accion.href}
                  className="contacto-pro-link"
                  target={item.accion.externo ? "_blank" : undefined}
                  rel={item.accion.externo ? "noopener noreferrer" : undefined}
                >
                  {item.accion.texto} →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Urgencias */}
      <section className="contacto-pro-urgencias">
        <div className="contacto-pro-urgencias-inner">
          <div>
            <p className="contacto-pro-urgencias-titulo">Urgencias dentales</p>
            <p className="contacto-pro-urgencias-desc">
              Si tienes una urgencia, llámanos directamente. Nuestro equipo te
              atenderá lo antes posible, también fuera del horario habitual.
            </p>
          </div>
          <a href="tel:+34600987654" className="btn btn-guardar">
            +34 600 987 654
          </a>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
