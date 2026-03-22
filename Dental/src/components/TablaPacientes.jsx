import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import pacientesService from "../services/pacientesService";

// ─── Modal de confirmación de borrado ─────────────────────────────────────────
const ModalConfirmar = ({ paciente, onConfirmar, onCancelar, cargando }) => (
  <div className="modal-overlay" onClick={onCancelar}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h3 className="modal-title">⚠️ Eliminar paciente</h3>
      <p className="modal-body">
        ¿Estás seguro de que deseas eliminar a{" "}
        <strong>
          {paciente.nombre} {paciente.apellidos}
        </strong>{" "}
        (DNI: <strong>{paciente.dni}</strong>)?
        <br />
        <br />
        Esta acción no se puede deshacer.
      </p>
      <div className="modal-actions">
        <button
          className="btn btn-ghost"
          onClick={onCancelar}
          disabled={cargando}
        >
          Cancelar
        </button>
        <button
          className="btn btn-danger"
          onClick={onConfirmar}
          disabled={cargando}
        >
          {cargando ? "Eliminando…" : "🗑️ Eliminar"}
        </button>
      </div>
    </div>
  </div>
);

// ─── Componente Principal ─────────────────────────────────────────────────────
const TablaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const [pacienteAEliminar, setPacienteAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Cargar pacientes
  const cargarPacientes = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await pacientesService.getAll();
      setPacientes(data.pacientes || []);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Error al cargar los pacientes. Verifica que la API esté activa.",
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarPacientes();
  }, [cargarPacientes]);

  // Limpiar mensajes tras 4s
  useEffect(() => {
    if (exito) {
      const t = setTimeout(() => setExito(null), 4000);
      return () => clearTimeout(t);
    }
  }, [exito]);

  // Eliminar paciente
  const handleEliminar = async () => {
    if (!pacienteAEliminar) return;
    try {
      setEliminando(true);
      await pacientesService.delete(pacienteAEliminar.dni);
      setExito(
        `Paciente ${pacienteAEliminar.nombre} ${pacienteAEliminar.apellidos} eliminado correctamente.`,
      );
      setPacienteAEliminar(null);
      cargarPacientes();
    } catch (err) {
      setError(err.response?.data?.error || "Error al eliminar el paciente.");
      setPacienteAEliminar(null);
    } finally {
      setEliminando(false);
    }
  };

  // Filtrado local por búsqueda
  const pacientesFiltrados = pacientes.filter((p) => {
    const q = busqueda.toLowerCase();
    return (
      p.dni.toLowerCase().includes(q) ||
      p.nombre.toLowerCase().includes(q) ||
      p.apellidos.toLowerCase().includes(q) ||
      (p.diagnostico || "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1>Gestión de Pacientes</h1>
        <p>Administra el registro de pacientes del sistema hospitalario.</p>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-icon blue">🏥</div>
          <div className="stat-info">
            <p>Total pacientes</p>
            <strong>{pacientes.length}</strong>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon teal">🔍</div>
          <div className="stat-info">
            <p>Resultados filtro</p>
            <strong>{pacientesFiltrados.length}</strong>
          </div>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">❌</span>
          <span>{error}</span>
        </div>
      )}
      {exito && (
        <div className="alert alert-success">
          <span className="alert-icon">✅</span>
          <span>{exito}</span>
        </div>
      )}

      {/* Tabla card */}
      <div className="card">
        <div className="card-header">
          <h2>📋 Registro de pacientes</h2>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Buscar por nombre, DNI o diagnóstico…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ width: "260px" }}
            />
            <Link to="/pacientes/nuevo" className="btn btn-primary">
              ＋ Nuevo paciente
            </Link>
          </div>
        </div>

        {cargando ? (
          <div className="loading-wrap">
            <div className="spinner" />
            <p>Cargando pacientes…</p>
          </div>
        ) : pacientesFiltrados.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🏥</span>
            <p>
              {busqueda
                ? "No se encontraron pacientes que coincidan con la búsqueda."
                : "No hay pacientes registrados. ¡Crea el primero!"}
            </p>
            {!busqueda && (
              <Link to="/pacientes/nuevo" className="btn btn-primary">
                ＋ Añadir paciente
              </Link>
            )}
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>F. Nacimiento</th>
                  <th>Teléfono</th>
                  <th>Diagnóstico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientesFiltrados.map((paciente) => (
                  <tr key={paciente.dni}>
                    <td>
                      <span className="badge-dni">{paciente.dni}</span>
                    </td>
                    <td className="td-name">{paciente.nombre}</td>
                    <td>{paciente.apellidos}</td>
                    <td className="text-muted text-sm">
                      {paciente.fechaNacimiento}
                    </td>
                    <td className="text-muted text-sm">{paciente.telefono}</td>
                    <td className="text-sm">
                      {paciente.diagnostico || (
                        <span
                          className="text-muted"
                          style={{ fontStyle: "italic" }}
                        >
                          Sin diagnóstico
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link
                          to={`/pacientes/editar/${paciente.dni}`}
                          className="btn btn-outline btn-sm"
                          title="Editar paciente"
                        >
                          ✏️ Editar
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          title="Eliminar paciente"
                          onClick={() => setPacienteAEliminar(paciente)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal confirmación */}
      {pacienteAEliminar && (
        <ModalConfirmar
          paciente={pacienteAEliminar}
          onConfirmar={handleEliminar}
          onCancelar={() => setPacienteAEliminar(null)}
          cargando={eliminando}
        />
      )}
    </div>
  );
};

export default TablaPacientes;
