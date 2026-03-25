import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../src/components/navbar";
import TablaPacientes from "../src/components/TablaPacientes";
import FormularioCrear from "../src/components/FormularioCrear";
import FormularioEditar from "../src/components/FormularioEditar";
import HomePage from "../src/components/homePage";
import Footer from "../src/components/footer";
import "./index.css";

function Layout() {
  const location = useLocation();

  // rutas donde NO quieres navbar
  const hideNavbarRoutes = ["/"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pacientes" element={<TablaPacientes />} />
          <Route path="/crear" element={<FormularioCrear />} />
          <Route path="/editar/:dni" element={<FormularioEditar />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
