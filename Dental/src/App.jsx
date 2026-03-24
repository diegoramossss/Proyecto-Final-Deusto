import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TablaPacientes from "./components/TablaPacientes";
import FormularioCrear from "./components/FormularioCrear";
import FormularioEditar from "./components/FormularioEditar";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<TablaPacientes />} />
          <Route path="/crear" element={<FormularioCrear />} />
          <Route path="/editar/:dni" element={<FormularioEditar />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
