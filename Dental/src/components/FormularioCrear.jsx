import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pacienteService from "../services/pacienteService";

const INITIAL_STATE = {
  dni: "",
  nombre: "",
  apellidos: "",
  fechaNacimiento: "",
  direccion: "",
  localidad: "",
  codigoPostal: "",
  telefono: "",
};

function FormularioCrear() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await pacienteService.create(formData);
      navigate("/pacientes");
    } catch (err) {
      setError(
        err.response?.data?.mensaje ||
          "Error al crear el paciente. Revisa los datos e inténtalo de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="formulario-container">
      <div className="formulario-card">
        <h2>Nuevo paciente</h2>
        <p className="formulario-subtitulo">
          Rellena los datos para registrar un nuevo paciente.
        </p>

        {error && <div className="alerta alerta-error">{error}</div>}

        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dni">
                DNI <span className="requerido">*</span>
              </label>
              <input
                id="dni"
                name="dni"
                type="text"
                placeholder="12345678A"
                value={formData.dni}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombre">
                Nombre <span className="requerido">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Carlos"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">
                Apellidos <span className="requerido">*</span>
              </label>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                placeholder="García López"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaNacimiento">
                Fecha de nacimiento <span className="requerido">*</span>
              </label>
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">
                Teléfono <span className="requerido">*</span>
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="600000000"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group span-2">
              <label htmlFor="direccion">
                Dirección <span className="requerido">*</span>
              </label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                placeholder="Calle Mayor, 12, 2ºA"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="localidad">
                Localidad <span className="requerido">*</span>
              </label>
              <input
                id="localidad"
                name="localidad"
                type="text"
                placeholder="Madrid"
                value={formData.localidad}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoPostal">
                Código postal <span className="requerido">*</span>
              </label>
              <input
                id="codigoPostal"
                name="codigoPostal"
                type="text"
                placeholder="28001"
                value={formData.codigoPostal}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="formulario-acciones">
            <button
              type="button"
              className="btn btn-cancelar"
              onClick={() => navigate("/pacientes")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-guardar"
              disabled={submitting}
            >
              {submitting ? "Guardando..." : "Guardar paciente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioCrear;
