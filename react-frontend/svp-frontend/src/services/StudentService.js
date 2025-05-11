import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/students";

export const listStudents = () => axios.get(REST_API_BASE_URL);

export const createStudent = (student) => axios.post(REST_API_BASE_URL + "/createStudent", student);

export const getStudent = (studentId) => axios.get(REST_API_BASE_URL + "/" + studentId);

export const updateStudent = (studentId, student) => axios.put(REST_API_BASE_URL + "/" + studentId, student);

export const deleteStudent = (studentId) => axios.delete(REST_API_BASE_URL + "/" + studentId);

export const getStudentNamesList = (className) => axios.get(`${REST_API_BASE_URL}/getStudentNamesList/${className}`);

export const getAllVaccinatedStudent = () => axios.get(REST_API_BASE_URL + "/getAllVaccinatedStudent");

