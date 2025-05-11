import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/vaccines";

export const listVaccines = () => axios.get(REST_API_BASE_URL);

export const createVaccine = (vaccine) => axios.post(REST_API_BASE_URL + "/createVaccine", vaccine);

export const getVaccine = (vaccineId) => axios.get(REST_API_BASE_URL + "/" + vaccineId);

export const updateVaccine = (vaccineId, vaccine) => axios.put(REST_API_BASE_URL + "/" + vaccineId, vaccine);

export const deleteVaccine = (vaccineId) => axios.delete(REST_API_BASE_URL + "/" + vaccineId);