import React, { useEffect, useState } from 'react';
import { deleteStudent, listStudents } from '../services/StudentService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchClass, setSearchClass] = useState('');
    const [searchGender, setSearchGender] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);  // Current page
    const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page (default 5)
    const navigator = useNavigate();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadCSV = async () => {
        if (!file) return alert("Please select a file.");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:8082/students/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(res.data);
        } catch (err) {
            alert("Upload failed: " + err.response?.data || err.message);
        }
        getAllStudents();
    };

    useEffect(() => {
        getAllStudents();
    }, []);

    const getAllStudents = () => {
        listStudents().then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        });
    };

    const addNewStudent = () => {
        navigator('/add-student');
    };

    const updateStudent = (studentId) => {
        navigator(`/edit-student/${studentId}`);
    };

    const removeStudent = (studentId) => {
        deleteStudent(studentId).then(() => {
            getAllStudents();
        }).catch(error => {
            console.error(error);
        });
    };

    const filteredStudents = students.filter((student) =>
        (student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentContactNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (searchClass ? student.studentClass === searchClass : true) &&  // Fixed comparison
        (searchGender ? student.gender === searchGender : true) &&
        (searchStatus ? student.status === searchStatus : true)
    );

    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const exportToExcel = (data) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, 'students.xlsx');
    };

    const exportToCSV = (data) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, 'students.csv');
    };

    const exportToPDF = (data) => {
        const doc = new jsPDF();
        const tableColumn = ["ID", "First Name", "Last Name", "Class", "Gender", "DOB", "Email", "Contact", "Guardian", "Status"];
        const tableRows = [];

        data.forEach(student => {
            const studentData = [
                student.studentId,
                student.firstName,
                student.lastName,
                student.studentClass,
                student.gender,
                student.dob,
                student.studentEmail,
                student.studentContactNumber,
                student.guardianName,
                student.status
            ];
            tableRows.push(studentData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('students.pdf');
    };

    return (
        <div className='container'>

            {/* Bulk Upload and Add Student */}
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h5>Bulk Upload (.csv)</h5>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="form-control mb-2"
                        />
                        <button
                            className={`btn ${file ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={uploadCSV}
                            disabled={!file} // Disable if no file is selected
                        >
                            Upload
                        </button>
                    </div>
                    <div className="mb-3 d-flex justify-content-end gap-2">

                        <button className="btn btn-outline-success" onClick={() => exportToCSV(filteredStudents)}>Download CSV</button>
                        <button className="btn btn-outline-success" onClick={() => exportToExcel(filteredStudents)}>Download Excel</button>
                        <button className="btn btn-outline-danger" onClick={() => exportToPDF(filteredStudents)}>Download PDF</button>

                        <button type="button" className="btn btn-primary" onClick={addNewStudent}>Add Student</button>
                    </div>
                </div>
            </div>

            <h2 className='text-center pt-3'>List of Students</h2>

            {/* Search Bar and Filters */}
            <div className="d-flex justify-content-between mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name, Class, Email or Contact Number"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dropdown Filters */}
                <div className="d-flex col-md-6">
                    <select
                        className="form-select ms-2"
                        value={searchClass}
                        onChange={(e) => setSearchClass(e.target.value)}
                    >
                        <option value="">Filter by Class</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
                        ))}
                    </select>

                    <select
                        className="form-select ms-2"
                        value={searchGender}
                        onChange={(e) => setSearchGender(e.target.value)}
                    >
                        <option value="">Filter by Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <select
                        className="form-select ms-2"
                        value={searchStatus}
                        onChange={(e) => setSearchStatus(e.target.value)}
                    >
                        <option value="">Filter by Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Vaccinated">Vaccinated</option>
                    </select>
                </div>
            </div>

            {/* Students Table */}
            <table className='table table-striped table-bordered'>
                <thead className="table-dark">
                    <tr>
                        <th>Student Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Guardian Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.length > 0 ? (
                        currentStudents.map((student) => (
                            <tr key={student.studentId}>
                                <td>{student.studentId}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.studentClass}</td>
                                <td>{student.gender}</td>
                                <td>{student.dob}</td>
                                <td>{student.studentEmail}</td>
                                <td>{student.studentContactNumber}</td>
                                <td>{student.guardianName}</td>
                                <td>{student.status}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-info btn-sm" onClick={() => updateStudent(student.studentId)}>Update</button>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => removeStudent(student.studentId)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>



            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(number)}>{number}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                    <li className="d-flex ml-auto ms-5">
                        <div className="d-flex mb-3">
                            <label className="me-2">Entries per page:</label>
                            <select
                                className="form-select w-auto"
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </nav>


        </div>
    );
};

export default ListStudentComponent;
