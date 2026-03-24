import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pacienteService from "../services/pacienteService";

function TablaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const cargarPacientes = async () => {
    try {
      setLoading(true);
      const response = await pacienteService.getAll();
      setPacientes(response.data);
      setError(null);
    } catch (err) {
      setError(
        "Error al cargar los pacientes. Asegúrate de que la API está en marcha.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  const handleEliminar = async (dni) => {
    if (!window.confirm(`¿Eliminar al paciente con DNI ${dni}?`)) return;
    try {
      await pacienteService.remove(dni);
      setPacientes((prev) => prev.filter((p) => p.dni !== dni));
    } catch (err) {
      alert("Error al eliminar el paciente.");
    }
  };

  if (loading)
    return <div className="estado-mensaje">Cargando pacientes...</div>;
  if (error) return <div className="estado-mensaje error">{error}</div>;

  return (
    <div className="tabla-container">
      <div className="tabla-header">
        <h2>Pacientes registrados</h2>
        <button className="btn btn-nuevo" onClick={() => navigate("/crear")}>
          + Nuevo paciente
        </button>
      </div>

      {pacientes.length === 0 ? (
        <div className="estado-mensaje">No hay pacientes registrados aún.</div>
      ) : (
        <div className="tabla-wrapper">
          <table className="tabla">
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Dirección</th>
                <th>Localidad</th>
                <th>C.P.</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.dni}>
                  <td className="dni-cell">{paciente.dni}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.apellidos}</td>
                  <td>{paciente.direccion}</td>
                  <td>{paciente.localidad}</td>
                  <td>{paciente.codigoPostal}</td>
                  <td>{paciente.telefono}</td>
                  <td className="acciones-cell">
                    <button
                      className="btn btn-editar"
                      onClick={() => navigate(`/editar/${paciente.dni}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-eliminar"
                      onClick={() => handleEliminar(paciente.dni)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TablaPacientes;
