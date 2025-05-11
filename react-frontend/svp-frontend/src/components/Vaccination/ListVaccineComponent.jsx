import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteVaccine, listVaccines } from '../../services/VaccineService';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ListVaccineComponent = () => {

    const [vaccines, setVaccines] = useState([])

    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;








    const navigator = useNavigate();

    useEffect(() => {
        getAllVaccines();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage]);


    function getAllVaccines() {
        listVaccines().then((response) => {
            setVaccines(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewVaccine() {
        navigator('/add-vaccine')
    }

    function updateVaccine(vaccineId) {
        navigator(`/edit-vaccine/${vaccineId}`)
    }

    function removeVaccine(vaccineId) {
        console.log(vaccineId);
        deleteVaccine(vaccineId).then((response) => {
            getAllVaccines();
        }).catch(error => {
            console.error(error);
        })
    }

    const filteredVaccines = vaccines.filter((vaccine) =>
        vaccine.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccine.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination: Get the vaccines for the current page
    const indexOfLastVaccine = currentPage * itemsPerPage;
    const indexOfFirstVaccine = indexOfLastVaccine - itemsPerPage;
    const currentVaccines = filteredVaccines.slice(indexOfFirstVaccine, indexOfLastVaccine);

    // Calculate total pages
    const totalPages = Math.ceil(filteredVaccines.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }




    const exportVaccinesToCSV = (data) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, 'vaccines.csv');
    };

    const exportVaccinesToExcel = (data) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Vaccines');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'vaccines.xlsx');
    };

    const exportVaccinesToPDF = (data) => {
        const doc = new jsPDF();
        const tableColumn = ["ID", "Name", "Description"];
        const tableRows = [];

        data.forEach(vaccine => {
            tableRows.push([
                vaccine.vaccineId,
                vaccine.vaccineName,
                vaccine.description
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('vaccines.pdf');
    };


    return (
        <div className='container'>
            <div className="mb-3 d-flex justify-content-end gap-2">
                <button className="btn btn-outline-success" onClick={() => exportVaccinesToCSV(filteredVaccines)}>Download CSV</button>
                <button className="btn btn-outline-success" onClick={() => exportVaccinesToExcel(filteredVaccines)}>Download Excel</button>
                <button className="btn btn-outline-danger" onClick={() => exportVaccinesToPDF(filteredVaccines)}>Download PDF</button>
            </div>
            <h2 className='text-center pt-3'>List of Vaccines</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* 🔍 Search Bar */}
                <div className="col-md-10 flex-grow-1 me-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name or Description"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button type="button" class="btn btn-primary float-right" onClick={addNewVaccine} >Add Vaccine</button>
            </div>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Vaccine Id</th>
                        <th>Vaccine Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {currentVaccines.length > 0 ? (
                        currentVaccines.map((vaccine) => (
                            <tr key={vaccine.vaccineId}>
                                <td className='align-middle'>{vaccine.vaccineId}</td>
                                <td className='align-middle'>{vaccine.vaccineName}</td>
                                <td className='align-middle'>{vaccine.description}</td>
                                <td>
                                    <button type="button" className="btn btn-info" onClick={() => updateVaccine(vaccine.vaccineId)}>Update</button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={() => removeVaccine(vaccine.vaccineId)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">No Vaccines found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* <div className="d-flex justify-content-center mt-3">
                    <button
                        className="btn btn-outline-secondary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            className={`btn btn-outline-secondary ${page === currentPage ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="btn btn-outline-secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div> */}

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
    )
}

export default ListVaccineComponent
