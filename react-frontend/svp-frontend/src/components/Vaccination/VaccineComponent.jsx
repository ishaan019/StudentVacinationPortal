// rafce
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createVaccine, getVaccine, updateVaccine } from '../../services/VaccineService'

const VaccineComponent = () => {

    const [vaccineName, setVaccineName] = useState('')
    const [description, setDescription] = useState('')

    const { id } = useParams();

    const [errors, setErrors] = useState({
        vaccineName: '',
        description: '',
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            console.log("get api id" + id)
            getVaccine(id).then((response) => {
                console.log(response.data)
                setVaccineName(response.data.vaccineName);
                setDescription(response.data.description);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id]);

    const onCancel = () => {
        navigator('/vaccines');
    };

    function handleVaccineName(e) {
        const val = e.target.value;
        setVaccineName(val.charAt(0).toUpperCase() + val.slice(1));
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function saveOrUpdateVaccine(e) {
        e.preventDefault();

        if (validateForm()) {
            const vaccine = { vaccineName, description }
            console.log(vaccine)

            if (id) {
                updateVaccine(id, vaccine).then((respone) => {
                    console.log(respone.data);
                    navigator('/vaccines')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createVaccine(vaccine).then((response) => {
                    console.log(response.data);
                    navigator('/vaccines')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }


    function validateForm() {
        let valid = true;

        const errorCopy = { ...errors }

        if (vaccineName.trim()) {
            errorCopy.vaccineName = '';
        } else {
            errorCopy.vaccineName = 'Vaccine Name is required';
            valid = false;
        }

        if (description.trim()) {
            errorCopy.description = '';
        } else {
            errorCopy.description = 'Description is required';
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Vaccine</h2>
        } else {
            return <h2 className='text-center'>Add Vaccine</h2>
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
                                <input
                                    type='text'
                                    placeholder='Enter Vaccine Name'
                                    name='vaccineName'
                                    value={vaccineName}
                                    className={`form-control ${errors.vaccineName ? 'is-invalid' : ''}`}
                                    onChange={handleVaccineName}
                                >
                                </input>
                                {errors.vaccineName && <div className='invalid-feedback'> {errors.vaccineName} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Description :</label>
                                <input
                                    type='text'
                                    placeholder='Enter Description'
                                    name='description'
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={handleDescription}
                                >
                                </input>
                                {errors.description && <div className='invalid-feedback'> {errors.description} </div>}
                            </div>

                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-success text-align-center"
                                    type="submit"
                                    onClick={saveOrUpdateVaccine}
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

export default VaccineComponent
