import axios from "axios";

const API_URL = "https://backend-part-3nl5.onrender.com/pacientes";

// La API devuelve { total, pacientes: [...] } en el GET de todos
const getAll = async () => {
  const res = await axios.get(API_URL);
  return res.data.pacientes ?? res.data;
};

const getByDni = async (dni) => {
  const res = await axios.get(`${API_URL}/${dni}`);
  return res.data;
};

const create = (paciente) => axios.post(API_URL, paciente);

const update = (dni, paciente) => axios.put(`${API_URL}/${dni}`, paciente);

const remove = (dni) => axios.delete(`${API_URL}/${dni}`);

const pacienteService = { getAll, getByDni, create, update, remove };

export default pacienteService;
