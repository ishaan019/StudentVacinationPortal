// // rafce
// import React, { useEffect, useState } from 'react'
// import { createStudent, getStudent, updateStudent } from '../services/StudentService'
// import { useNavigate, useParams } from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const StudentComponent = () => {

//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState('')
//     const [studentClass, setStudentClass] = useState('')
//     const [gender, setGender] = useState('')
//     const [dob, setDob] = useState('')
//     const [studentEmail, setStudentEmail] = useState('')
//     const [studentContactNumber, setStudentContactNumber] = useState('')
//     const [guardianName, setGuardianName] = useState('')

//     const { id } = useParams();

//     const [errors, setErrors] = useState({
//         firstName: '',
//         lastName: '',
//         studentClass: '',
//         gender: '',
//         dob: '',
//         studentEmail: '',
//         studentContactNumber: '',
//         guardianName: ''
//     })

//     const navigator = useNavigate();

//     const onCancel = () => {
//         navigator('/students');
//     };

//     useEffect(() => {
//         if (id) {
//             getStudent(id).then((response) => {
//                 const data = response.data;

//                 let formattedDob = '';
//                 if (data.dob) {
//                     const [day, month, year] = data.dob.split('/');
//                     formattedDob = `${year}-${month}-${day}`;
//                 }

//                 setFirstName(data.firstName);
//                 setLastName(data.lastName);
//                 setStudentClass(data.studentClass);
//                 setGender(data.gender);
//                 setDob(formattedDob);
//                 setStudentEmail(data.studentEmail);
//                 setStudentContactNumber(data.studentContactNumber);
//                 setGuardianName(data.guardianName);
//             }).catch(error => {
//                 console.error(error);
//             });
//         }
//     }, [id]);

//     function handleFirstName(e) {
//         const val = e.target.value;
//         setFirstName(val.charAt(0).toUpperCase() + val.slice(1));
//     }

//     function handleLastName(e) {
//         const val = e.target.value;
//         setLastName(val.charAt(0).toUpperCase() + val.slice(1));
//     }

//     function handleStudentClass(e) {
//         setStudentClass(e.target.value);
//     }

//     function handleGender(e) {
//         setGender(e.target.value);
//     }
//     function handleDob(e) {
//         setDob(e.target.value);
//     }
//     function handleStudentEmail(e) {
//         setStudentEmail(e.target.value);
//     }

//     function handleStudentContactNumber(e) {
//         setStudentContactNumber(e.target.value);
//     }

//     function handleGuardianName(e) {
//         const val = e.target.value;
//         setGuardianName(val.charAt(0).toUpperCase() + val.slice(1));
//     }

//     function saveOrUpdateStudent(e) {
//         e.preventDefault();

//         if (validateForm()) {
//             const student = { firstName, lastName, studentClass, gender, dob, studentEmail, studentContactNumber, guardianName }
//             console.log(student)

//             if (id) {
//                 updateStudent(id, student).then((respone) => {
//                     console.log(respone.data);
//                     navigator('/students')
//                 }).catch(error => {
//                     console.error(error);
//                 })
//             } else {
//                 createStudent(student).then((response) => {
//                     console.log(response.data);
//                     navigator('/students')
//                 }).catch(error => {
//                     console.error(error);
//                     const errorMessage =
//                         error.response?.data?.message || // If backend sends { message: "..." }
//                         error.response?.data ||          // If backend sends plain string (like "Invalid credentials")
//                         "An unexpected error occurred."; // Fallback
//                     toast.error(errorMessage, {
//                         position: "top-center",
//                         autoClose: 3000,
//                     });
//                 });
//             }
//         }
//     }

//     function validateForm() {
//         let valid = true;

//         const errorCopy = { ...errors }

//         if (firstName.trim()) {
//             errorCopy.firstName = '';
//         } else {
//             errorCopy.firstName = 'First Name is required';
//             valid = false;
//         }

//         if (lastName.trim()) {
//             errorCopy.lastName = '';
//         } else {
//             errorCopy.lastName = 'Last Name is required';
//             valid = false;
//         }

//         if (studentClass.trim()) {
//             errorCopy.studentClass = '';
//         } else {
//             errorCopy.studentClass = 'Class is required';
//             valid = false;
//         }

//         if (gender) {
//             errorCopy.gender = '';
//         } else {
//             errorCopy.gender = 'Gender is required';
//             valid = false;
//         }

//         if (dob.trim()) {
//             errorCopy.dob = '';
//         } else {
//             errorCopy.dob = 'DOB is required';
//             valid = false;
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (studentEmail.trim()) {
//             if (!emailRegex.test(studentEmail)) {
//                 errorCopy.studentEmail = 'Enter a valid email address';
//                 valid = false;
//             } else {
//                 errorCopy.studentEmail = '';
//             }
//         } else {
//             errorCopy.studentEmail = 'Email is required';
//             valid = false;
//         }

//         const phoneRegex = /^[6-9]\d{9}$/;
//         if (studentContactNumber.trim()) {
//             if (!phoneRegex.test(studentContactNumber)) {
//                 errorCopy.studentContactNumber = 'Enter a valid 10-digit contact number';
//                 valid = false;
//             } else {
//                 errorCopy.studentContactNumber = '';
//             }
//         } else {
//             errorCopy.studentContactNumber = 'Contact Number is required';
//             valid = false;
//         }

//         if (guardianName.trim()) {
//             errorCopy.guardianName = '';
//         } else {
//             errorCopy.guardianName = 'Guardian Name is required';
//             valid = false;
//         }
//         setErrors(errorCopy);
//         return valid;
//     }

//     function pageTitle() {
//         if (id) {
//             return <h2 className='text-center'>Update Student</h2>
//         } else {
//             return <h2 className='text-center'>Add Student</h2>
//         }
//     }

//     return (
//         <div className='container'>
//             <ToastContainer />
//             <div className='row'>
//                 <div className='card col-md-6 offset-md-3'>
//                     {
//                         pageTitle()
//                     }
//                     <div className='card-body'>
//                         <form>
//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>First Name:</label>
//                                 <input
//                                     type='text'
//                                     placeholder='Enter Student First Name'
//                                     name='firstName'
//                                     value={firstName}
//                                     className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
//                                     onChange={handleFirstName}
//                                 >
//                                 </input>
//                                 {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Last Name:</label>
//                                 <input
//                                     type='text'
//                                     placeholder='Enter Student Last Name'
//                                     name='lastName'
//                                     value={lastName}
//                                     className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
//                                     onChange={handleLastName}
//                                 >
//                                 </input>
//                                 {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Student Class:</label>
//                                 <select
//                                     name="studentClass"
//                                     value={studentClass}
//                                     className={`form-select ${errors.studentClass ? 'is-invalid' : ''}`}
//                                     onChange={handleStudentClass}
//                                 >
//                                     <option value="">Choose Class</option>
//                                     {[...Array(12)].map((_, i) => (
//                                         <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
//                                     ))}
//                                 </select>
//                                 {errors.studentClass && <div className='invalid-feedback'> {errors.studentClass} </div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Gender:</label>
//                                 <select
//                                     aria-label="Default select example"
//                                     name='gender'
//                                     value={gender}
//                                     className={`form-select ${errors.studentClass ? 'is-invalid' : ''}`}
//                                     onChange={handleGender}>
//                                     <option selected>Choose Gender</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Others">Others</option>
//                                 </select>
//                                 {errors.gender && <div className='invalid-feedback'> {errors.gender} </div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>DOB:</label>
//                                 <input
//                                     type='date'
//                                     placeholder='DOB'
//                                     name='dob'
//                                     value={dob}
//                                     className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
//                                     onChange={handleDob}
//                                 >
//                                 </input>
//                                 {errors.dob && <div className='invalid-feedback'> {errors.dob} </div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label class="form-label">Email address</label>
//                                 <input
//                                     type="email"
//                                     placeholder="name@example.com"
//                                     name='studentEmail'
//                                     value={studentEmail}
//                                     className={`form-control ${errors.studentEmail ? 'is-invalid' : ''}`}
//                                     onChange={handleStudentEmail}
//                                 >
//                                 </input>
//                                 {errors.studentEmail && <div className='invalid-feedback'> {errors.studentEmail} </div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Student Contatct Number:</label>
//                                 <input
//                                     type='text'
//                                     placeholder='studentContactNumber'
//                                     name='studentContactNumber'
//                                     value={studentContactNumber}
//                                     className={`form-control ${errors.studentContactNumber ? 'is-invalid' : ''}`}
//                                     onChange={handleStudentContactNumber}
//                                 >
//                                 </input>
//                                 {errors.studentContactNumber && <div className='invalid-feedback'> {errors.studentContactNumber} </div>}
//                             </div>

//                             <div className='form-group mb-2'>
//                                 <label className='form-label'>Guardian Name:</label>
//                                 <input
//                                     type='text'
//                                     placeholder='Enter Guardian Name'
//                                     name='guardianName'
//                                     value={guardianName}
//                                     className={`form-control ${errors.guardianName ? 'is-invalid' : ''}`}
//                                     onChange={handleGuardianName}
//                                 >
//                                 </input>
//                                 {errors.guardianName && <div className='invalid-feedback'> {errors.guardianName} </div>}
//                             </div>

//                             <div className="d-flex justify-content-center">
//                                 <button
//                                     className="btn btn-success text-align-center"
//                                     type="submit"
//                                     onClick={saveOrUpdateStudent}
//                                     value="Submit"> Submit
//                                 </button>
//                                 <button
//                                     className="btn btn-secondary ms-3"
//                                     type="button"
//                                     onClick={onCancel}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default StudentComponent


// rafce
import React, { useEffect, useState } from 'react';
import { createStudent, getStudent, updateStudent } from '../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentContactNumber, setStudentContactNumber] = useState('');
    const [guardianName, setGuardianName] = useState('');

    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        studentClass: '',
        gender: '',
        dob: '',
        studentEmail: '',
        studentContactNumber: '',
        guardianName: ''
    });

    const navigator = useNavigate();

    const onCancel = () => {
        navigator('/students');
    };

    useEffect(() => {
        if (id) {
            getStudent(id).then((response) => {
                const data = response.data;

                let formattedDob = '';
                if (data.dob) {
                    try {
                        const dateObj = new Date(data.dob);
                        formattedDob = dateObj.toISOString().split('T')[0]; // yyyy-mm-dd
                    } catch (e) {
                        console.error("Invalid DOB format from backend:", data.dob);
                    }
                }

                setFirstName(data.firstName);
                setLastName(data.lastName);
                setStudentClass(data.studentClass);
                setGender(data.gender);
                setDob(formattedDob);
                setStudentEmail(data.studentEmail);
                setStudentContactNumber(data.studentContactNumber);
                setGuardianName(data.guardianName);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function handleFirstName(e) {
        const val = e.target.value;
        setFirstName(val.charAt(0).toUpperCase() + val.slice(1));
    }

    function handleLastName(e) {
        const val = e.target.value;
        setLastName(val.charAt(0).toUpperCase() + val.slice(1));
    }

    function handleStudentClass(e) {
        setStudentClass(e.target.value);
    }

    function handleGender(e) {
        setGender(e.target.value);
    }

    function handleDob(e) {
        setDob(e.target.value);
    }

    function handleStudentEmail(e) {
        setStudentEmail(e.target.value);
    }

    function handleStudentContactNumber(e) {
        setStudentContactNumber(e.target.value);
    }

    function handleGuardianName(e) {
        const val = e.target.value;
        setGuardianName(val.charAt(0).toUpperCase() + val.slice(1));
    }

    function saveOrUpdateStudent(e) {
        e.preventDefault();

        if (validateForm()) {
            const student = {
                firstName, lastName, studentClass, gender,
                dob, studentEmail, studentContactNumber, guardianName
            };

            if (id) {
                updateStudent(id, student).then((response) => {
                    console.log(response.data);
                    navigator('/students');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createStudent(student).then((response) => {
                    console.log(response.data);
                    navigator('/students');
                }).catch(error => {
                    console.error(error);
                    const errorMessage =
                        error.response?.data?.message ||
                        error.response?.data ||
                        "An unexpected error occurred.";
                    toast.error(errorMessage, {
                        position: "top-center",
                        autoClose: 3000,
                    });
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorCopy = { ...errors };

        if (firstName.trim()) errorCopy.firstName = '';
        else { errorCopy.firstName = 'First Name is required'; valid = false; }

        if (lastName.trim()) errorCopy.lastName = '';
        else { errorCopy.lastName = 'Last Name is required'; valid = false; }

        if (studentClass.trim()) errorCopy.studentClass = '';
        else { errorCopy.studentClass = 'Class is required'; valid = false; }

        if (gender) errorCopy.gender = '';
        else { errorCopy.gender = 'Gender is required'; valid = false; }

        if (dob.trim()) errorCopy.dob = '';
        else { errorCopy.dob = 'DOB is required'; valid = false; }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (studentEmail.trim()) {
            if (!emailRegex.test(studentEmail)) {
                errorCopy.studentEmail = 'Enter a valid email address';
                valid = false;
            } else {
                errorCopy.studentEmail = '';
            }
        } else {
            errorCopy.studentEmail = 'Email is required';
            valid = false;
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (studentContactNumber.trim()) {
            if (!phoneRegex.test(studentContactNumber)) {
                errorCopy.studentContactNumber = 'Enter a valid 10-digit contact number';
                valid = false;
            } else {
                errorCopy.studentContactNumber = '';
            }
        } else {
            errorCopy.studentContactNumber = 'Contact Number is required';
            valid = false;
        }

        if (guardianName.trim()) errorCopy.guardianName = '';
        else { errorCopy.guardianName = 'Guardian Name is required'; valid = false; }

        setErrors(errorCopy);
        return valid;
    }

    function pageTitle() {
        return <h2 className='text-center'>{id ? 'Update Student' : 'Add Student'}</h2>;
    }

    return (
        <div className='container'>
            <ToastContainer />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Student First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={handleFirstName}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Student Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleLastName}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Student Class:</label>
                                <select
                                    name="studentClass"
                                    value={studentClass}
                                    className={`form-select ${errors.studentClass ? 'is-invalid' : ''}`}
                                    onChange={handleStudentClass}
                                >
                                    <option value="">Choose Class</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
                                    ))}
                                </select>
                                {errors.studentClass && <div className='invalid-feedback'>{errors.studentClass}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Gender:</label>
                                <select
                                    name='gender'
                                    value={gender}
                                    className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                                    onChange={handleGender}
                                >
                                    <option value="">Choose Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                                {errors.gender && <div className='invalid-feedback'>{errors.gender}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>DOB:</label>
                                <input
                                    type='date'
                                    name='dob'
                                    value={dob}
                                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                    onChange={handleDob}
                                />
                                {errors.dob && <div className='invalid-feedback'>{errors.dob}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className="form-label">Email address</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    name='studentEmail'
                                    value={studentEmail}
                                    className={`form-control ${errors.studentEmail ? 'is-invalid' : ''}`}
                                    onChange={handleStudentEmail}
                                />
                                {errors.studentEmail && <div className='invalid-feedback'>{errors.studentEmail}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Student Contact Number:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Contact Number'
                                    name='studentContactNumber'
                                    value={studentContactNumber}
                                    className={`form-control ${errors.studentContactNumber ? 'is-invalid' : ''}`}
                                    onChange={handleStudentContactNumber}
                                />
                                {errors.studentContactNumber && <div className='invalid-feedback'>{errors.studentContactNumber}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Guardian Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Guardian Name'
                                    name='guardianName'
                                    value={guardianName}
                                    className={`form-control ${errors.guardianName ? 'is-invalid' : ''}`}
                                    onChange={handleGuardianName}
                                />
                                {errors.guardianName && <div className='invalid-feedback'>{errors.guardianName}</div>}
                            </div>

                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-success"
                                    type="submit"
                                    onClick={saveOrUpdateStudent}
                                >
                                    Submit
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
    );
};

export default StudentComponent;
