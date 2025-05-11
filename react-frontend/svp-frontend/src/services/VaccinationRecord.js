import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/vaccination-record";

export const listVaccinationRecord = () => axios.get(REST_API_BASE_URL);

export const createVaccinationRecord = (vaccinationRecord) => axios.post(REST_API_BASE_URL + "/create-vaccination-record", vaccinationRecord);

export const getVaccinationRecord = (vaccinationRecordId) => axios.get(REST_API_BASE_URL + "/" + vaccinationRecordId);

export const updateVaccinationRecord = (vaccinationRecordId, vaccinationRecord) => axios.put(REST_API_BASE_URL + "/" + vaccinationRecordId, vaccinationRecord);

export const deleteVaccinationRecord = (vaccinationRecordId) => axios.delete(REST_API_BASE_URL + "/" + vaccinationRecordId);