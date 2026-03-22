import axios from "axios";

// URL base de la API REST
const API_BASE_URL = "http://localhost:3001";

// Instancia de Axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Servicio de Pacientes ────────────────────────────────────────────────────
const pacientesService = {
  /**
   * Obtiene todos los pacientes
   * @returns {Promise} Lista de pacientes
   */
  getAll: async () => {
    const response = await api.get("/pacientes");
    return response.data;
  },

  /**
   * Obtiene un paciente por DNI
   * @param {string} dni - DNI del paciente
   * @returns {Promise} Datos del paciente
   */
  getByDni: async (dni) => {
    const response = await api.get(`/pacientes/${dni}`);
    return response.data;
  },

  /**
   * Crea un nuevo paciente
   * @param {Object} paciente - Datos del nuevo paciente
   * @returns {Promise} Paciente creado
   */
  create: async (paciente) => {
    const response = await api.post("/pacientes", paciente);
    return response.data;
  },

  /**
   * Actualiza un paciente existente
   * @param {string} dni - DNI del paciente a actualizar
   * @param {Object} datos - Nuevos datos del paciente
   * @returns {Promise} Paciente actualizado
   */
  update: async (dni, datos) => {
    const response = await api.put(`/pacientes/${dni}`, datos);
    return response.data;
  },

  /**
   * Elimina un paciente por DNI
   * @param {string} dni - DNI del paciente a eliminar
   * @returns {Promise} Confirmación de eliminación
   */
  delete: async (dni) => {
    const response = await api.delete(`/pacientes/${dni}`);
    return response.data;
  },
};

export default pacientesService;
