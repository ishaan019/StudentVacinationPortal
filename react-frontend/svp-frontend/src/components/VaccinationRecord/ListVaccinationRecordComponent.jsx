import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteVaccinationRecord, getVaccinationRecord, listVaccinationRecord } from '../../services/VaccinationRecord';
import { getVaccine } from '../../services/VaccineService';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const ListVaccinationRecordComponent = () => {

    const [vaccinationRecords, setVaccinationRecords] = useState([])
    const [vaccineName, setVaccineName] = useState([])
    const [classFilter, setClassFilter] = useState('');
    const [vaccineFilter, setVaccineFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [searchTerm, setSearchTerm] = useState('');

    const navigator = useNavigate();

    useEffect(() => {
        getAllVaccinationRecords();
        // getVaccineName();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, classFilter, vaccineFilter, statusFilter]);


    function getVaccineById(id) {
        console.log(id)
        return getVaccine(id).then((response) => {
            return response.data;
        }).catch(error => {
            console.error(error);
        })
    }

    async function getAllVaccinationRecords() {
        try {
            const response = await listVaccinationRecord();
            const drives = response.data;
            setVaccinationRecords(drives);
        } catch (error) {
            console.error('Failed to fetch vaccination records:', error);
        }
    }
    function addNewVaccinationRecord() {
        navigator('/add-vaccination-record')
    }

    function updateVaccinationRecord(vaccinationRecordId) {
        navigator(`/edit-vaccination-record/${vaccinationRecordId}`)
    }

    function removeVaccinationRecord(vaccinationRecordId) {
        deleteVaccinationRecord(vaccinationRecordId)
            .then(() => getAllVaccinationRecords())
            .catch(error => console.error(error));
    }

    const filteredVaccinationDrive = vaccinationRecords.filter((record) => {
        const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.studentClass.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = classFilter === '' || record.studentClass === classFilter;
        const matchesVaccine = vaccineFilter === '' || record.vaccineName === vaccineFilter;
        const matchesStatus = statusFilter === '' || record.status === statusFilter;

        return matchesSearch && matchesClass && matchesVaccine && matchesStatus;
    });

    const exportRecordsToCSV = (data) => {
        const formatted = data.map(d => ({
            'Student Name': d.studentName,
            'Class': d.studentClass,
            'Vaccine Name': d.vaccineName,
            'Vaccination Status': d.status
        }));
        const ws = XLSX.utils.json_to_sheet(formatted);
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, 'vaccination_records.csv');
    };

    const exportRecordsToExcel = (data) => {
        const formatted = data.map(d => ({
            'Student Name': d.studentName,
            'Class': d.studentClass,
            'Vaccine Name': d.vaccineName,
            'Vaccination Status': d.status
        }));
        const ws = XLSX.utils.json_to_sheet(formatted);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Records');
        const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        saveAs(blob, 'vaccination_records.xlsx');
    };

    const exportRecordsToPDF = (data) => {
        const doc = new jsPDF();
        const tableColumn = ["Student Name", "Class", "Vaccine Name", "Vaccination Status"];
        const tableRows = [];

        data.forEach(d => {
            tableRows.push([
                d.studentName,
                d.studentClass,
                d.vaccineName,
                d.status
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('vaccination_records.pdf');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVaccinationDrive.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredVaccinationDrive.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div className='container'>
            <div className="mb-3 d-flex justify-content-end gap-2">
                <button className="btn btn-outline-success" onClick={() => exportRecordsToCSV(filteredVaccinationDrive)}>Download CSV</button>
                <button className="btn btn-outline-success" onClick={() => exportRecordsToExcel(filteredVaccinationDrive)}>Download Excel</button>
                <button className="btn btn-outline-danger" onClick={() => exportRecordsToPDF(filteredVaccinationDrive)}>Download PDF</button>
            </div>
            <h2 className='text-center pt-3'>List of Vaccination Records</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-3 flex-grow-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Vaccine ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ minWidth: '200px' }}
                    />
                    <select className="form-select" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
                        <option value="">All Classes</option>
                        {[...new Set(vaccinationRecords.map(r => r.studentClass))].map((cls, index) => (
                            <option key={index} value={cls}>{cls}</option>
                        ))}
                    </select>
                    <select className="form-select" value={vaccineFilter} onChange={(e) => setVaccineFilter(e.target.value)}>
                        <option value="">All Vaccines</option>
                        {[...new Set(vaccinationRecords.map(r => r.vaccineName))].map((vaccine, index) => (
                            <option key={index} value={vaccine}>{vaccine}</option>
                        ))}
                    </select>
                </div>
                <button type="button" className="ms-3 btn btn-primary mt-2 mt-sm-0" onClick={addNewVaccinationRecord}>
                    Add Vaccination Record
                </button>
            </div>


            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Vaccine Name</th>
                        <th>Date of Vaccination</th>
                        <th>Student Vacination Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((drive) => (
                            <tr key={drive.vaccinationRecordId}>
                                <td className='align-middle'>{drive.studentName}</td>
                                <td className='align-middle'>{drive.studentClass}</td>
                                <td className='align-middle'>{drive.vaccineName}</td>
                                <td className='align-middle'>
                                    {new Date(drive.vaccinationDate).toLocaleDateString('en-GB')}
                                </td>
                                <td className='align-middle'>{drive.status}</td>
                                <td>
                                    <button type="button" className="btn btn-danger ms-2" onClick={() => removeVaccinationRecord(drive.recordId)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No Vaccination Records found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-center mt-3">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>


        </div>
    );
};

export default ListVaccinationRecordComponent