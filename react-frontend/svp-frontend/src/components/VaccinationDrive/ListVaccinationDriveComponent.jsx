import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteVaccinationDrive, getVaccinationDrive, listVaccinationDrives } from '../../services/VaccinationDrive';
import { getVaccine } from '../../services/VaccineService';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const ListVaccinationDriveComponent = () => {

    const [vaccinationDrives, setVaccinationDrives] = useState([])
    const [vaccineName, setVaccineName] = useState([])
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    const [searchTerm, setSearchTerm] = useState('');

    const navigator = useNavigate();

    useEffect(() => {
        getAllVaccinationDrives();
    }, [])
    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, searchTerm, itemsPerPage]);



    function getVaccineById(id) {
        console.log(id)
        return getVaccine(id).then((response) => {
            return response.data;
        }).catch(error => {
            console.error(error);
        })
    }

    async function getAllVaccinationDrives() {
        try {
            const response = await listVaccinationDrives();
            const drives = response.data;

            const enrichedDrives = await Promise.all(
                drives.map(async (drive) => {
                    try {
                        console.log(drive.vaccineId)
                        const vaccineResponse = getVaccineById(drive.vaccineId);
                        console.log(vaccineResponse)
                        const vaccineName1 = vaccineResponse.vaccineName || "Unknown";
                        return { ...drive, vaccineName1 };
                    } catch (err) {
                        console.error(`Failed to get vaccine name for drive ${drive.vaccinationDriveId}:`, err);
                        return { ...drive, vaccineName: 'Error fetching name' };
                    }
                })
            );

            setVaccinationDrives(enrichedDrives);
        } catch (error) {
            console.error('Failed to fetch vaccination drives:', error);
        }
    }

    function addNewVaccinationDrive() {
        navigator('/add-vaccination-drive')
    }

    function updateVaccinationDrive(vaccinationDriveId) {
        navigator(`/edit-vaccination-drive/${vaccinationDriveId}`)
    }

    function removeVaccinationDrive(vaccinationDriveId) {
        deleteVaccinationDrive(vaccinationDriveId)
            .then(() => getAllVaccinationDrives())
            .catch(error => console.error(error));
    }

    const filteredVaccinationDrive = vaccinationDrives.filter((drive) => {
        const matchesSearch = (
            drive.startDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drive.endDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drive.vaccinationDriveStatus.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesStatus = statusFilter === '' || drive.vaccinationDriveStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const exportDrivesToCSV = (data) => {
        const formatted = data.map(d => ({
            'Drive ID': d.vaccinationDriveId,
            'Vaccine Name': d.vaccineName,
            'Applicable Class': d.applicableClasses,
            'Available Doses': d.availableDoses,
            'Start Date': d.startDate,
            'End Date': d.endDate,
            'Status': d.vaccinationDriveStatus
        }));
        const ws = XLSX.utils.json_to_sheet(formatted);
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, 'vaccination_drives.csv');
    };

    const exportDrivesToExcel = (data) => {
        const formatted = data.map(d => ({
            'Drive ID': d.vaccinationDriveId,
            'Vaccine Name': d.vaccineName,
            'Applicable Class': d.applicableClasses,
            'Available Doses': d.availableDoses,
            'Start Date': d.startDate,
            'End Date': d.endDate,
            'Status': d.vaccinationDriveStatus
        }));
        const ws = XLSX.utils.json_to_sheet(formatted);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Drives');
        const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        saveAs(blob, 'vaccination_drives.xlsx');
    };

    const exportDrivesToPDF = (data) => {
        const doc = new jsPDF();
        const tableColumn = ["Drive ID", "Vaccine Name", "Applicable Class", "Available Doses", "Start Date", "End Date", "Status"];
        const tableRows = [];

        data.forEach(d => {
            tableRows.push([
                d.vaccinationDriveId,
                d.vaccineName,
                d.applicableClasses,
                d.availableDoses,
                d.startDate,
                d.endDate,
                d.vaccinationDriveStatus
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('vaccination_drives.pdf');
    };

    // Compute pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDrives = filteredVaccinationDrive.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredVaccinationDrive.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }


    return (
        <div className='container'>
            <div className="mb-3 d-flex justify-content-end gap-2">
                <button className="btn btn-outline-success" onClick={() => exportDrivesToCSV(filteredVaccinationDrive)}>Download CSV</button>
                <button className="btn btn-outline-success" onClick={() => exportDrivesToExcel(filteredVaccinationDrive)}>Download Excel</button>
                <button className="btn btn-outline-danger" onClick={() => exportDrivesToPDF(filteredVaccinationDrive)}>Download PDF</button>
            </div>

            <h2 className='text-center pt-3'>List of Vaccination Drives</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-grow-1 me-3">
                    <input
                        type="text"
                        className="form-control me-3"
                        placeholder="Search by Start Date, End Date or Status"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    { /* Dropdown added here */}
                    <select
                        className="form-select"
                        style={{ maxWidth: '200px' }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Filter by Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <button type="button" className="btn btn-primary" onClick={addNewVaccinationDrive}>
                    Add Vaccination Drive
                </button>
            </div>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Vaccination Drive Id</th>
                        <th>Vaccine Name</th>
                        <th>Applicable Class</th>
                        <th>Available Doses</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Vaccination Drive Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVaccinationDrive.length > 0 ? (
                        currentDrives.map((drive) => (
                            <tr key={drive.vaccinationDriveId}>
                                <td className='align-middle'>{drive.vaccinationDriveId}</td>
                                <td className='align-middle'>{drive.vaccineName}</td>
                                <td className='align-middle'>{drive.applicableClasses}</td>
                                <td className='align-middle'>{drive.availableDoses}</td>
                                {/* <td className='align-middle'>{drive.startDate}</td> */}

                                <td className='align-middle'>
                                    {new Date(drive.startDate).toLocaleDateString('en-GB')}
                                </td>
                                <td className='align-middle'>
                                    {new Date(drive.endDate).toLocaleDateString('en-GB')}
                                </td>

                                {/* <td className='align-middle'>{drive.endDate}</td> */}
                                <td className='align-middle'>{drive.vaccinationDriveStatus}</td>
                                <td>
                                    <button type="button" className="btn btn-info" onClick={() => updateVaccinationDrive(drive.vaccinationDriveId)} disabled={drive.vaccinationDriveStatus === 'Completed'}>Update</button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={() => removeVaccinationDrive(drive.vaccinationDriveId)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No Vaccination Drives found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center align-items-center flex-wrap">
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

                    <li className="d-flex align-items-center ms-4">
                        <label className="me-2 mb-0">Entries per page:</label>
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
                    </li>
                </ul>
            </nav>

        </div>
    );
};

export default ListVaccinationDriveComponent