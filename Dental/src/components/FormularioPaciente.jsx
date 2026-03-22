import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import pacientesService from "../services/pacientesService";

// ─── Valores iniciales del formulario ─────────────────────────────────────────
const FORM_INICIAL = {
  dni: "",
  nombre: "",
  apellidos: "",
  fechaNacimiento: "",
  telefono: "",
  email: "",
  diagnostico: "",
  fechaIngreso: "",
};

// ─── Componente de formulario compartido ──────────────────────────────────────
const FormularioPaciente = ({ modo }) => {
  const esEdicion = modo === "editar";
  const { dni } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(esEdicion);

  // En modo edición, carga los datos del paciente
  useEffect(() => {
    if (!esEdicion) return;

    const cargarPaciente = async () => {
      try {
        setCargandoDatos(true);
        const data = await pacientesService.getByDni(dni);
        setForm({
          dni: data.dni || "",
          nombre: data.nombre || "",
          apellidos: data.apellidos || "",
          fechaNacimiento: data.fechaNacimiento || "",
          telefono: data.telefono || "",
          email: data.email || "",
          diagnostico: data.diagnostico || "",
          fechaIngreso: data.fechaIngreso || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "No se pudo cargar el paciente. Comprueba que el DNI sea correcto.",
        );
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarPaciente();
  }, [esEdicion, dni]);

  // Actualizar campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  // Validación del lado cliente
  const validar = () => {
    const nuevosErrores = {};
    if (!form.dni.trim()) nuevosErrores.dni = "El DNI es obligatorio.";
    else if (!/^[0-9]{7,8}[A-Za-z]$/.test(form.dni.trim()))
      nuevosErrores.dni = "Formato de DNI inválido (ej: 12345678A).";

    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.apellidos.trim())
      nuevosErrores.apellidos = "Los apellidos son obligatorios.";
    if (!form.fechaNacimiento)
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    if (!form.telefono.trim())
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    else if (!/^[0-9]{9}$/.test(form.telefono.trim()))
      nuevosErrores.telefono = "El teléfono debe tener 9 dígitos.";

    if (!form.email.trim()) nuevosErrores.email = "El email es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nuevosErrores.email = "Formato de email inválido.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validar()) return;

    try {
      setCargando(true);
      if (esEdicion) {
        await pacientesService.update(dni, form);
      } else {
        await pacientesService.create(form);
      }
      navigate("/", {
        state: {
          exito: esEdicion
            ? `Paciente ${form.nombre} ${form.apellidos} actualizado correctamente.`
            : `Paciente ${form.nombre} ${form.apellidos} creado correctamente.`,
        },
      });
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar el paciente.");
    } finally {
      setCargando(false);
    }
  };

  if (cargandoDatos) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <p>Cargando datos del paciente…</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1>{esEdicion ? "✏️ Editar paciente" : "➕ Nuevo paciente"}</h1>
        <p>
          {esEdicion
            ? `Modificando los datos de ${form.nombre || "paciente"} ${form.apellidos || ""}.`
            : "Rellena el formulario para registrar un nuevo paciente."}
        </p>
      </div>

      {/* Error global */}
      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">❌</span>
          <span>{error}</span>
        </div>
      )}

      {/* Formulario */}
      <div className="card">
        <div className="card-header">
          <h2>📝 Datos del paciente</h2>
          <Link to="/" className="btn btn-ghost btn-sm">
            ← Volver
          </Link>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* DNI */}
              <div className="form-group">
                <label className="form-label">
                  DNI <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="dni"
                  className="form-control"
                  value={form.dni}
                  onChange={handleChange}
                  placeholder="12345678A"
                  readOnly={esEdicion}
                  maxLength={9}
                />
                {errores.dni && (
                  <small
                    style={{ color: "var(--c-danger)", fontSize: "0.78rem" }}
                  >
                    {errores.dni}
                  </small>
                )}
              </div>

              {/* Nombre */}
              <div className="form-group">
                <label className="form-label">
                  Nombre <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ana"
                />
                {errores.nombre && (
                  <small
                    style={{ color: "var(--c-danger)", fontSize: "0.78rem" }}
                  >
                    {errores.nombre}
                  </small>
                )}
              </div>

              {/* Apellidos */}
              <div className="form-group">
                <label className="form-label">
                  Apellidos <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="apellidos"
                  className="form-control"
                  value={form.apellidos}
                  onChange={handleChange}
                  placeholder="García López"
                />
                {errores.apellidos && (
                  <small
                    style={{ color: "var(--c-danger)", fontSize: "0.78rem" }}
                  >
                    {errores.apellidos}
                  </small>
                )}
              </div>

              {/* Fecha Nacimiento */}
              <div className="form-group">
                <label className="form-label">
                  Fecha de nacimiento <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  className="form-control"
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errores.fechaNacimiento && (
                  <small
                    style={{ color: "var(--c-danger)", fontSize: "0.78rem" }}
                  >
                    {errores.fechaNacimiento}
                  </small>
                )}
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label className="form-label">
                  Teléfono <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  className="form-control"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="600123456"
                  maxLength={9}
                />
                {errores.telefono && (
                  <small
                    style={{ color: "var(--c-danger)", fontSize: "0.78rem" }}
                  >
                    {errores.telefono}
                  </small>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="paciente@email.com"
                />
                {errores.email && (
                  <small
                    style={{ color: "var(--c-danger)", fontSize: "0.78rem" }}
                  >
                    {errores.email}
                  </small>
                )}
              </div>

              {/* Fecha Ingreso */}
              <div className="form-group">
                <label className="form-label">Fecha de ingreso</label>
                <input
                  type="date"
                  name="fechaIngreso"
                  className="form-control"
                  value={form.fechaIngreso}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Diagnóstico */}
              <div className="form-group full-width">
                <label className="form-label">Diagnóstico</label>
                <input
                  type="text"
                  name="diagnostico"
                  className="form-control"
                  value={form.diagnostico}
                  onChange={handleChange}
                  placeholder="Ej: Hipertensión arterial, Diabetes tipo 2…"
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="form-actions">
              <Link to="/" className="btn btn-ghost">
                Cancelar
              </Link>
              <button
                type="submit"
                className={`btn ${esEdicion ? "btn-accent" : "btn-primary"}`}
                disabled={cargando}
              >
                {cargando
                  ? esEdicion
                    ? "Guardando…"
                    : "Creando…"
                  : esEdicion
                    ? "💾 Guardar cambios"
                    : "➕ Crear paciente"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioPaciente;
