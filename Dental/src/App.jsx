import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import TablaPacientes from "../src/components/TablaPacientes";
import FormularioPaciente from "../src/components/FormularioPaciente";
import "../src/styles/App.css";

// ─── Wrapper con mensaje de éxito desde navegación ───────────────────────────
const PaginaTabla = () => {
  const location = useLocation();
  const [exito, setExito] = React.useState(location.state?.exito || null);

  useEffect(() => {
    if (exito) {
      const t = setTimeout(() => setExito(null), 4000);
      return () => clearTimeout(t);
    }
  }, [exito]);

  return (
    <>
      {exito && (
        <div className="alert alert-success" style={{ marginBottom: "1rem" }}>
          <span className="alert-icon">✅</span>
          <span>{exito}</span>
        </div>
      )}
      <TablaPacientes />
    </>
  );
};

// ─── App principal ────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Lista de pacientes */}
            <Route path="/" element={<PaginaTabla />} />

            {/* Crear nuevo paciente */}
            <Route
              path="/pacientes/nuevo"
              element={<FormularioPaciente modo="crear" />}
            />

            {/* Editar paciente por DNI */}
            <Route
              path="/pacientes/editar/:dni"
              element={<FormularioPaciente modo="editar" />}
            />

            {/* Ruta no encontrada */}
            <Route
              path="*"
              element={
                <div className="empty-state" style={{ paddingTop: "5rem" }}>
                  <span className="empty-icon">🔍</span>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--c-primary)",
                    }}
                  >
                    Página no encontrada
                  </h2>
                  <p>La ruta que buscas no existe.</p>
                  <a
                    href="/"
                    className="btn btn-primary"
                    style={{ marginTop: "1rem" }}
                  >
                    ← Volver al inicio
                  </a>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
