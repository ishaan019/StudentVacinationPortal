// rafce
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { createVaccinationDrive, getVaccinationDrive, updateVaccinationDrive } from '../../services/VaccinationDrive'
// services/Vaccine.js
import axios from 'axios';
import { listVaccines } from '../../services/VaccineService';


const VaccinationDriveComponent = () => {

    const [vaccineId, setVaccineId] = useState('')
    const [vaccineName, setVaccineName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [availableDoses, setAvailableDoses] = useState('')
    const [applicableClasses, setApplicableClasses] = useState('')
    const [vaccinationDriveStatus, setVaccinationDriveStatus] = useState('')
    const [vaccineList, setVaccineList] = useState([]);


    const { id } = useParams();

    const [errors, setErrors] = useState({
        vaccineName: '',
        startDate: '',
        endDate: '',
        availableDoses: '',
        applicableClasses: '',
        vaccinationDriveStatus: '',
    })

    const navigator = useNavigate();

    function getAllVaccines() {
        listVaccines().then((response) => {
            setVaccineList(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const onCancel = () => {
        // Reset any form state here if needed
        navigator('/vaccination-drive');
    };

    // useEffect(() => {
    //     getAllVaccines()
    //     if (id) {
    //         console.log("get api id" + id)
    //         getVaccinationDrive(id).then((response) => {
    //             console.log(response.data)
    //             setVaccineName(response.data.vaccineName);
    //             setStartDate(response.data.startDate);
    //             setEndDate(response.data.endDate);
    //             setAvailableDoses(response.data.availableDoses);
    //             setApplicableClasses(
    //                 response.data.applicableClasses
    //                   ? response.data.applicableClasses.split(',').map(cls => cls.trim())
    //                   : []
    //               );

    //             setVaccinationDriveStatus(response.data.vaccinationDriveStatus);
    //         }).catch(error => {
    //             console.error(error);
    //         })
    //     }
    // }, [id]);
    useEffect(() => {
        getAllVaccines();

        if (id) {
            getVaccinationDrive(id).then((response) => {
                setVaccineId(response.data.vaccineId);  // ensure vaccineId is set
                setStartDate(response.data.startDate);
                setEndDate(response.data.endDate);
                setAvailableDoses(response.data.availableDoses);
                setApplicableClasses(
                    response.data.applicableClasses
                        ? response.data.applicableClasses.split(',').map(cls => cls.trim())
                        : []
                );
                setVaccinationDriveStatus(response.data.vaccinationDriveStatus);
            }).catch(console.error);
        }
    }, [id]);


    useEffect(() => {
        if (!startDate || !endDate) return;

        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Reset time to 00:00:00 for accurate comparison
        today.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        if (today < start) {
            setVaccinationDriveStatus('Scheduled');
        } else if (today >= start && today <= end) {
            setVaccinationDriveStatus('Ongoing');
        } else if (today > end) {
            setVaccinationDriveStatus('Completed');
        }
    }, [startDate, endDate]);





    function handleVaccineNameAndId(e) {
        setVaccineId(e.target.value);
    }


    function handleStartDate(e) {
        setStartDate(e.target.value);
    }

    function handleEndDate(e) {
        setEndDate(e.target.value);
    }

    function handleAvailableDoses(e) {
        setAvailableDoses(e.target.value);
    }

    // function handleApplicableClasses(e) {
    //     setApplicableClasses(e.target.value);
    // }

    function handleApplicableClasses(e) {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setApplicableClasses(selectedOptions);
    }

    function handleVaccinationDriveStatus(e) {
        setVaccinationDriveStatus(e.target.value);
    }

    function saveOrUpdateVaccinationDrive(e) {
        e.preventDefault();

        if (validateForm()) {
            const vaccinationDrive = {
                vaccineId,
                startDate,
                endDate,
                availableDoses,
                // applicableClasses,
                applicableClasses: applicableClasses.join(','),
                vaccinationDriveStatus
            };
            console.log(vaccinationDrive)

            if (id) {
                updateVaccinationDrive(id, vaccinationDrive).then((respone) => {
                    console.log(respone.data);
                    navigator('/vaccination-drive')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createVaccinationDrive(vaccinationDrive).then((response) => {
                    console.log(response.data);
                    navigator('/vaccination-drive')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;

        const errorCopy = { ...errors }

        if (vaccineId.trim()) {
            errorCopy.vaccineName = '';
        } else {
            errorCopy.vaccineName = 'Vaccine selection is required';
            valid = false;
        }

        if (startDate.trim()) {
            errorCopy.startDate = '';
        } else {
            errorCopy.startDate = 'Start Date is required';
            valid = false;
        }

        if (endDate.trim()) {
            errorCopy.endDate = '';
        } else {
            errorCopy.endDate = 'End Date is required';
            valid = false;
        }

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            errorCopy.endDate = 'End Date should be after Start Date';
            valid = false;
        }

        if (availableDoses.trim()) {
            errorCopy.availableDoses = '';
        } else {
            errorCopy.availableDoses = 'Available Doses are required';
            valid = false;
        }

        if (applicableClasses.length > 0) {
            errorCopy.applicableClasses = '';
        } else {
            errorCopy.applicableClasses = 'Applicable Classes are required';
            valid = false;
        }

        if (vaccinationDriveStatus.trim() && vaccinationDriveStatus !== "") {
            errorCopy.vaccinationDriveStatus = '';
        } else {
            errorCopy.vaccinationDriveStatus = 'Vaccination Drive Status is required';
            valid = false;
        }
        setErrors(errorCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Vaccination Drive</h2>
        } else {
            return <h2 className='text-center'>Add Vaccination Drive</h2>
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
                                <label className='form-label'>Vaccine Name:</label>
                                <select
                                    name='vaccineId'
                                    value={vaccineId}
                                    className={`form-select ${errors.vaccineId ? 'is-invalid' : ''}`}
                                    onChange={handleVaccineNameAndId}
                                >
                                    <option value="">Choose Vaccine</option>
                                    {vaccineList.map(vaccine => (
                                        <option key={vaccine.vaccineId} value={vaccine.vaccineId}>
                                            {vaccine.vaccineName}
                                        </option>
                                    ))}
                                </select>
                                {errors.vaccineId && <div className='invalid-feedback'> {errors.vaccineId} </div>}

                                {errors.vaccineName && <div className='invalid-feedback'> {errors.vaccineName} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Start Date :</label>
                                <input
                                    type='date'
                                    placeholder='Enter Start Date'
                                    name='startDate'
                                    value={startDate}
                                    className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                                    onChange={handleStartDate}
                                >
                                </input>
                                {errors.startDate && <div className='invalid-feedback'> {errors.startDate} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>End Date :</label>
                                <input
                                    type='date'
                                    placeholder='Enter End Date'
                                    name='endDate'
                                    value={endDate}
                                    className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                                    onChange={handleEndDate}
                                >
                                </input>
                                {errors.endDate && <div className='invalid-feedback'> {errors.endDate} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Available Doses :</label>
                                <input
                                    type='number'
                                    placeholder='Enter Available Doses'
                                    name='availableDoses'
                                    value={availableDoses}
                                    className={`form-control ${errors.availableDoses ? 'is-invalid' : ''}`}
                                    onChange={handleAvailableDoses}
                                >
                                </input>
                                {errors.availableDoses && <div className='invalid-feedback'> {errors.availableDoses} </div>}
                            </div>


                            <div className='form-group mb-2'>
                                <label className='form-label'>Applicable Classes :</label>
                                <select
                                    multiple
                                    name='applicableClasses'
                                    value={applicableClasses}
                                    className={`form-control ${errors.applicableClasses ? 'is-invalid' : ''}`}
                                    onChange={handleApplicableClasses}
                                >
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
                                    ))}
                                </select>
                                {errors.applicableClasses && <div className='invalid-feedback'> {errors.applicableClasses} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Vaccination Drive Status :</label>
                                <select
                                    // className="form-select"
                                    aria-label="Default select example"
                                    name='vaccinationDriveStatus'
                                    value={vaccinationDriveStatus}
                                    className={`form-select ${errors.vaccinationDriveStatus ? 'is-invalid' : ''}`}
                                    onChange={handleVaccinationDriveStatus}>
                                    <option value="">Choose Vaccination Drive Status</option>
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                {errors.vaccinationDriveStatus && <div className='invalid-feedback'> {errors.vaccinationDriveStatus} </div>}
                            </div>

                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-success text-align-center"
                                    type="submit"
                                    onClick={saveOrUpdateVaccinationDrive}
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

        </div>
    )
}

export default VaccinationDriveComponent
