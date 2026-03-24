import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pacienteService from "../services/pacienteService";

function FormularioEditar() {
  const { dni } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPaciente = async () => {
      try {
        const data = await pacienteService.getByDni(dni);
        // La API puede devolver el objeto directamente o dentro de una propiedad
        setFormData(data.paciente ?? data);
      } catch (err) {
        setError("No se encontró el paciente con ese DNI.");
      } finally {
        setLoading(false);
      }
    };
    cargarPaciente();
  }, [dni]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await pacienteService.update(dni, formData);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.mensaje || "Error al actualizar el paciente.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="estado-mensaje">Cargando datos del paciente...</div>;
  if (error && !formData)
    return <div className="estado-mensaje error">{error}</div>;

  return (
    <div className="formulario-container">
      <div className="formulario-card">
        <h2>Editar paciente</h2>
        <p className="formulario-subtitulo">
          Modificando datos del paciente con DNI <strong>{dni}</strong>
        </p>

        {error && <div className="alerta alerta-error">{error}</div>}

        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dni">DNI</label>
              <input
                id="dni"
                name="dni"
                type="text"
                value={formData.dni}
                disabled
                className="input-disabled"
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
                value={formData.telefono}
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
                value={formData.apellidos}
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
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-guardar"
              disabled={submitting}
            >
              {submitting ? "Actualizando..." : "Actualizar paciente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioEditar;
