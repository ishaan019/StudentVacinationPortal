// rafce
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createVaccinationDrive, getVaccinationDrive, getVaccinationDriveWithClass, updateVaccinationDrive } from '../../services/VaccinationDrive'
// services/Vaccine.js
import axios from 'axios';
import { listVaccines } from '../../services/VaccineService';
import { getStudentNamesList } from '../../services/StudentService';
import { createVaccinationRecord, getVaccinationRecord } from '../../services/VaccinationRecord';

const VaccinationRecordComponent = () => {

    const [recordId, setRecordId] = useState('')
    const [studentId, setStudentId] = useState('');
    const [driveId, setDriveId] = useState('')
    const [vaccineId, setVaccineId] = useState('')
    const [vaccinationDate, setVaccinationDate] = useState('')
    const [status, setStatus] = useState('')
    const [studentClass, setStudentClass] = useState('')
    const [applicableClasses, setApplicableClasses] = useState('')
    const [availableDoses, setAvailableDoses] = useState([])
    const [studentNamesList, setStudentNamesList] = useState([]);
    const [vaccinationDriveList, setVaccinationDriveList] = useState([]);
    const [showDoseAlert, setShowDoseAlert] = useState(false);

    const { id } = useParams();

    const [studentName, setStudentName] = useState('');

    const [errors, setErrors] = useState({
        recordId: '',
        studentId: '',
        driveId: '',
        vaccineId: '',
        vaccinationDate: '',
        status: '',
    })



    const navigator = useNavigate();

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setVaccinationDate(currentDate);
        setStatus("Vaccinated");

        if (id) {
            getVaccinationRecord(id)
                .then((response) => {
                    const data = response.data;
                    setRecordId(data.recordId);
                    setStudentClass(data.studentClass);
                    setDriveId(data.driveId);
                    setVaccinationDate(data.vaccinationDate);
                    setStatus(data.status);
                    setAvailableDoses(data.availableDoses);

                    // First fetch names and drives, then set student ID and name
                    getStudentNames(data.studentClass).then((students) => {
                        const selectedStudent = students.find(s => s.id === data.studentId);
                        setStudentId(data.studentId);
                        setStudentName(selectedStudent?.name || '');
                    });

                    getVaccinationDriveThruClass(data.studentClass);

                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);



    function handleStudentClass(e) {
        const selectedClass = e.target.value;
        setStudentClass(selectedClass);
        getStudentNames(selectedClass);
        getVaccinationDriveThruClass(selectedClass);
    }

    function handleStudentId(e) {
        const selectedId = e.target.value;
        setStudentId(selectedId);

        const selectedStudent = studentNamesList.find(s => s.id === selectedId);
        setStudentName(selectedStudent?.name || '');
    }

    function handleDriveId(e) {
        setDriveId(e.target.value);
    }

    const onCancel = () => {
        navigator('/vaccination-record');
    };

    function saveOrUpdateVaccinationRecord(e) {
        e.preventDefault();

        if (validateForm()) {
            const selectedDrive = vaccinationDriveList.find(
                (drive) => drive.driveId.toString() === driveId.toString()
            );

            const vaccineName = selectedDrive ? selectedDrive.vaccineName : '';
            const vaccineId = selectedDrive ? selectedDrive.vaccineId : '';
            const availableDoses = selectedDrive ? selectedDrive.availableDoses : '';;
            const vaccinationRecord = {
                recordId,
                studentId,
                driveId,
                vaccineId,
                vaccinationDate,
                status,
                studentClass,
                studentName,
                vaccineName,
                availableDoses
            };
            console.log(vaccinationRecord)

            if (id) {
                // updateVaccinationRecord(id, vaccinationRecord).then((response) => {
                //     console.log(response.data);
                //     navigator('/vaccination-record')
                // }).catch(error => {
                //     console.error(error);
                // })
            } else {
                createVaccinationRecord(vaccinationRecord).then((response) => {
                    console.log(response.data);
                    navigator('/vaccination-record')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function getStudentNames(studentClass) {
        return getStudentNamesList(studentClass)
            .then((response) => {
                const names = response.data.map(student => ({
                    id: student.studentId,
                    name: `${student.firstName} ${student.lastName}`
                }));
                setStudentNamesList(names);
                return names;
            })
            .catch(error => {
                console.error(error);
                return [];
            });
    }


    function getVaccinationDriveThruClass(studentClass) {
        getVaccinationDriveWithClass(studentClass)
            .then((response) => {
                console.log(response.data);
                const names = response.data.map(vaccinationDrive => ({
                    driveId: vaccinationDrive.vaccinationDriveId,
                    vaccineId: vaccinationDrive.vaccineId,
                    vaccineName: vaccinationDrive.vaccineName,
                    availableDoses: vaccinationDrive.availableDoses
                }));
                setVaccinationDriveList(names);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function validateForm() {
        let valid = true;
        const errorCopy = { ...errors }

        // Validate if class is selected
        if (!studentClass) {
            errorCopy.studentClass = 'Class selection is required';
            valid = false;
        } else {
            errorCopy.studentClass = '';
        }

        if (studentClass && !studentId) {
            errorCopy.studentId = 'Student selection is required';
            valid = false;
        } else {
            errorCopy.studentId = '';
        }

        if (studentClass && !driveId) {
            errorCopy.driveId = 'Vaccination Drive selection is required';
            valid = false;
        } else {
            errorCopy.driveId = '';
        }

        const selectedDrive = vaccinationDriveList.find(
            (drive) => drive.driveId.toString() === driveId.toString()
        );

        // if (selectedDrive && Number(selectedDrive.availableDoses) < 1) {
        //     alert('No available doses left for the selected vaccination drive.');
        //     valid = false;
        // }

        if (selectedDrive && Number(selectedDrive.availableDoses) < 1) {
            setShowDoseAlert(true);  // Show the modal
            valid = false;
        }


        setErrors(errorCopy);
        return valid;
    }


    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Vaccination Record</h2>
        } else {
            return <h2 className='text-center'>Add Vaccination Record</h2>
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Class :</label>
                                <select
                                    name="class"
                                    value={studentClass}
                                    className={`form-select ${errors.studentClass ? 'is-invalid' : ''}`}
                                    onChange={handleStudentClass}
                                >
                                    <option value="">Choose Class</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
                                    ))}
                                </select>
                                {errors.studentClass && <div className='invalid-feedback'> {errors.studentClass} </div>}
                            </div>


                            <div className='form-group mb-2'>
                                <label className='form-label'>Student Name : </label>
                                <select
                                    name="student"
                                    value={studentId}
                                    className={`form-select ${errors.studentId ? 'is-invalid' : ''}`}
                                    onChange={handleStudentId}
                                    disabled={!studentClass}
                                >
                                    <option value="">Choose Student</option>
                                    {studentNamesList.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.id} - {student.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.studentId && <div className='invalid-feedback'> {errors.studentId} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Vaccination Drive : </label>
                                <select
                                    name="vaccinationDrive"
                                    value={driveId}
                                    className={`form-select ${errors.driveId ? 'is-invalid' : ''}`}
                                    onChange={handleDriveId}
                                    disabled={!studentClass}
                                >
                                    <option value="">Choose Vaccination Drive</option>
                                    {vaccinationDriveList.map(vaccinationDrive => (
                                        <option key={vaccinationDrive.driveId} value={vaccinationDrive.driveId}>
                                            {vaccinationDrive.driveId} - {vaccinationDrive.vaccineName}
                                        </option>
                                    ))}
                                </select>
                                {errors.driveId && <div className='invalid-feedback'> {errors.driveId} </div>}
                            </div>


                            <div className='form-group mb-2'>
                                <label className='form-label'>Vaccination Record Status :</label>
                                <input
                                    type="text"
                                    value="Vaccinated"
                                    className="form-select"
                                    disabled
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Available Doses :</label>
                                <input
                                    type="text"
                                    value={
                                        vaccinationDriveList.find(d => d.driveId.toString() === driveId.toString())?.availableDoses || ''
                                    }
                                    className="form-control"
                                    readOnly
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Vaccination Date :</label>
                                <input
                                    type="date"
                                    name="vaccinationDate"
                                    value={vaccinationDate}
                                    className="form-select"
                                    disabled
                                />
                            </div>

                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-success text-align-center"
                                    type="submit"
                                    onClick={saveOrUpdateVaccinationRecord}
                                    value="Submit"> Submit
                                </button>
                                <button
                                    className="btn btn-secondary ms-3"
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showDoseAlert && (
                <>
                    <div className="modal show fade" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content border-danger">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title">Insufficient Doses</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowDoseAlert(false)}
                                    ></button>
                                </div>
                                <div className="modal-body text-danger fw-bold">
                                    <p>No available doses left for the selected vaccination drive. Please choose another drive.</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => setShowDoseAlert(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

        </div>
    )
}

export default VaccinationRecordComponent
