import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/vaccination-drive";

export const listVaccinationDrives = () => axios.get(REST_API_BASE_URL);

export const createVaccinationDrive = (vaccinationDrive) => axios.post(REST_API_BASE_URL + "/create-vaccination-drive", vaccinationDrive);

export const getVaccinationDrive = (vaccinationDriveId) => axios.get(REST_API_BASE_URL + "/" + vaccinationDriveId);

export const updateVaccinationDrive = (vaccinationDriveId, vaccinationDrive) => axios.put(REST_API_BASE_URL + "/" + vaccinationDriveId, vaccinationDrive);

export const deleteVaccinationDrive = (vaccinationDriveId) => axios.delete(REST_API_BASE_URL + "/" + vaccinationDriveId);

// export const getVaccinationDriveWithClass = (className) => axios.get(REST_API_BASE_URL + "/getVaccinationDriveWithClass/" +  className);

export const getVaccinationDriveWithClass = (className) => axios.get(`${REST_API_BASE_URL}/getVaccinationDriveWithClass/${className}`);

export const getScheduledVaccinationDrives = () => axios.get(`${REST_API_BASE_URL}/getScheduledVaccinationDrives`);

export const getOngoingVaccinationDrives = () => axios.get(`${REST_API_BASE_URL}/getOngoingVaccinationDrives`);

