import axios from "axios";

const API_URL = "http://localhost:3000/pacientes";

const getAll = () => axios.get(API_URL);

const getByDni = (dni) => axios.get(`${API_URL}/${dni}`);

const create = (paciente) => axios.post(API_URL, paciente);

const update = (dni, paciente) => axios.put(`${API_URL}/${dni}`, paciente);

const remove = (dni) => axios.delete(`${API_URL}/${dni}`);

const pacienteService = { getAll, getByDni, create, update, remove };

export default pacienteService;
