// import React, { useEffect, useState } from 'react';
// import { getAllVaccinatedStudent, listStudents } from '../../services/StudentService';
// import { listVaccines } from '../../services/VaccineService';
// import { getOngoingVaccinationDrives, getScheduledVaccinationDrives, listVaccinationDrives } from '../../services/VaccinationDrive';
// import { listVaccinationRecord } from '../../services/VaccinationRecord';

// const DashboardComponent = () => {
//     const [totalStudents, setStudents] = useState([]);
//     const [totalVaccines, setVaccines] = useState([]);
//     const [totalVaccinationDrives, setVaccinationDrives] = useState([]);
//     const [totalVaccinatedStudents, setTotalVaccinatedStudents] = useState([]);
//     const [upcomingDrive, setUpcomingDrive] = useState([]);
//     const [ongoingDrive, setOngoingDrive] = useState([]);

//     function getAllVaccines() {
//         listVaccines().then((response) => {
//             setVaccines(response.data);
//         }).catch(console.error);
//     }

//     function getAllStudents() {
//         listStudents().then((response) => {
//             setStudents(response.data);
//         }).catch(console.error);
//     }

//     function getAllVacinationDrives() {
//         listVaccinationDrives().then((response) => {
//             const drives = response.data;
//             setVaccinationDrives(drives);
//         }).catch(console.error);
//     }

//     function getTotalVaccinatedStudents() {
//         getAllVaccinatedStudent().then((response) => {
//             setTotalVaccinatedStudents(response.data);
//         }).catch(console.error);
//     }

//     function getUpcomingVaccinationDrives() {
//         getScheduledVaccinationDrives().then((response) => {
//             setUpcomingDrive(response.data);
//         }).catch(console.error);
//     }

//     function getOngoingVaccinationDrives1() {
//         getOngoingVaccinationDrives().then((response) => {
//             setOngoingDrive(response.data);
//         }).catch(console.error);
//     }

//     useEffect(() => {
//         getAllStudents();
//         getAllVaccines();
//         getAllVacinationDrives();
//         getTotalVaccinatedStudents();
//         getUpcomingVaccinationDrives();
//         getOngoingVaccinationDrives1();
//     }, []);

//     const vaccinationRate = totalStudents.length > 0
//         ? (totalVaccinatedStudents.length / totalStudents.length) * 100
//         : 0;

//     return (
//         <div className="container py-4">
//             {/* Cards */}
//             <div className="row mb-4">
//                 <div className="col-md-4 mb-3">
//                     <div className="card text-center border-primary">
//                         <div className="card-body">
//                             <h5 className="card-title">Total Students</h5>
//                             <p className="display-6 text-primary">{totalStudents.length}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4 mb-3">
//                     <div className="card text-center border-success">
//                         <div className="card-body">
//                             <h5 className="card-title">Total Vaccines</h5>
//                             <p className="display-6 text-success">{totalVaccines.length}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4 mb-3">
//                     <div className="card text-center border-info">
//                         <div className="card-body">
//                             <h5 className="card-title">Students Vaccinated</h5>
//                             <p className="display-6 text-info">{totalVaccinatedStudents.length}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-4 mb-3">
//                     <div className="card text-center border-info">
//                         <div className="card-body">
//                             <h5 className="card-title">Total Vaccination Drives</h5>
//                             {totalVaccinationDrives.length === 0 ? (
//                                 <p className="text-muted fs-5">No Upcoming Drives</p>
//                             ) : (
//                                 <p className="display-6 text-info">{totalVaccinationDrives.length}</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Vaccination Progress */}
//             <div className="card mb-4">
//                 <div className="card-body">
//                     <h5 className="card-title mb-3">Vaccination Completion Rate</h5>
//                     <div className="progress" style={{ height: '25px' }}>
//                         <div
//                             className="progress-bar bg-primary"
//                             role="progressbar"
//                             style={{ width: `${vaccinationRate.toFixed(1)}%` }}
//                             aria-valuenow={vaccinationRate}
//                             aria-valuemin="0"
//                             aria-valuemax="100"
//                         >
//                             {vaccinationRate.toFixed(1)}%
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Upcoming Drive Preview */}
//             <div className="card mb-4 border-warning">
//                 <div className="card-body">
//                     <h5 className="card-title">Upcoming Vaccination Drives</h5>
//                     {upcomingDrive && upcomingDrive.length > 0 ? (
//                         <ul>
//                             {upcomingDrive.map((drive, index) => (
//                                 <li key={index}>
//                                     <p><strong>ID:</strong> {drive.vaccinationDriveId || 'N/A'}</p>
//                                     <p><strong>Vaccine:</strong> {drive.vaccineName || 'N/A'}</p>
//                                     <p><strong>Date:</strong> {new Date(drive.startDate).toLocaleDateString()} - {new Date(drive.endDate).toLocaleDateString()}</p>
//                                     <p><strong>Available Doses:</strong> {drive.availableDoses ?? 'N/A'}</p>
//                                     <p><strong>Applicable Classes:</strong> {drive.applicableClasses || 'TBD'}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-muted">No upcoming drives scheduled.</p>
//                     )}
//                 </div>
//             </div>

//             {/* Ongoing Drive Preview */}
//             <div className="card border-warning">
//                 <div className="card-body">
//                     <h5 className="card-title">Ongoing Vaccination Drives</h5>
//                     {ongoingDrive && ongoingDrive.length > 0 ? (
//                         <ul>
//                             {ongoingDrive.map((drive, index) => (
//                                 <li key={index}>
//                                     <p><strong>ID:</strong> {drive.vaccinationDriveId || 'N/A'}</p>
//                                     <p><strong>Vaccine:</strong> {drive.vaccineName || 'N/A'}</p>
//                                     <p><strong>Date:</strong> {new Date(drive.startDate).toLocaleDateString()} - {new Date(drive.endDate).toLocaleDateString()}</p>
//                                     <p><strong>Available Doses:</strong> {drive.availableDoses ?? 'N/A'}</p>
//                                     <p><strong>Applicable Classes:</strong> {drive.applicableClasses || 'TBD'}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-muted">No ongoing drives scheduled.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardComponent;


import React, { useEffect, useState } from 'react';
import { getAllVaccinatedStudent, listStudents } from '../../services/StudentService';
import { listVaccines } from '../../services/VaccineService';
import { getOngoingVaccinationDrives, getScheduledVaccinationDrives, listVaccinationDrives } from '../../services/VaccinationDrive';
import { listVaccinationRecord } from '../../services/VaccinationRecord';
import { FaUsers, FaSyringe, FaCheckCircle, FaClipboardList } from 'react-icons/fa';  // Icons

const DashboardComponent = () => {
  const [data, setData] = useState({
    totalStudents: [],
    totalVaccines: [],
    totalVaccinationDrives: [],
    totalVaccinatedStudents: [],
    upcomingDrive: [],
    ongoingDrive: []
  });

  const fetchData = async () => {
    try {
      const [students, vaccines, drives, vaccinatedStudents, upcoming, ongoing] = await Promise.all([
        listStudents(),
        listVaccines(),
        listVaccinationDrives(),
        getAllVaccinatedStudent(),
        getScheduledVaccinationDrives(),
        getOngoingVaccinationDrives()
      ]);

      setData({
        totalStudents: students.data,
        totalVaccines: vaccines.data,
        totalVaccinationDrives: drives.data,
        totalVaccinatedStudents: vaccinatedStudents.data,
        upcomingDrive: upcoming.data,
        ongoingDrive: ongoing.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const vaccinationRate = data.totalStudents.length > 0
    ? (data.totalVaccinatedStudents.length / data.totalStudents.length) * 100
    : 0;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-5 text-primary">Dashboard Overview</h2>

      {/* Cards */}
      <div className="row mb-4">
        {[
          {
            title: 'Total Students',
            count: data.totalStudents.length,
            color: 'primary',
            icon: <FaUsers size={40} />,
            emptyMessage: 'No students found'
          },
          {
            title: 'Total Vaccines',
            count: data.totalVaccines.length,
            color: 'success',
            icon: <FaSyringe size={40} />,
            emptyMessage: 'No vaccines available'
          },
          {
            title: 'Students Vaccinated',
            count: data.totalVaccinatedStudents.length,
            color: 'info',
            icon: <FaCheckCircle size={40} />,
            emptyMessage: 'No students vaccinated'
          },
          {
            title: 'Total Vaccination Drives',
            count: data.totalVaccinationDrives.length,
            color: 'warning',
            icon: <FaClipboardList size={40} />,
            emptyMessage: 'No upcoming drives'
          }
        ].map((card, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className={`card text-center border-${card.color} shadow-lg p-3 rounded`}>
              <div className="card-body">
                <div className="mb-3">{card.icon}</div>
                <h5 className="card-title">{card.title}</h5>
                <p className={`display-6 text-${card.color}`}>
                  {card.count === 0 ? <span className="text-muted">{card.emptyMessage}</span> : card.count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vaccination Progress */}
      <div className="card mb-4 shadow-lg border-info">
        <div className="card-body">
          <h5 className="card-title mb-3">Vaccination Completion Rate</h5>
          <div className="progress" style={{ height: '30px' }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${vaccinationRate.toFixed(1)}%` }}
              aria-valuenow={vaccinationRate}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {vaccinationRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Drive Preview */}
      <div className="card mb-4 shadow-lg border-warning">
        <div className="card-body">
          <h5 className="card-title">Upcoming Vaccination Drives</h5>
          {data.upcomingDrive.length > 0 ? (
            <ul>
              {data.upcomingDrive.map((drive, index) => (
                <li key={index} className="mb-3">
                  <p><strong>ID:</strong> {drive.vaccinationDriveId || 'N/A'}</p>
                  <p><strong>Vaccine:</strong> {drive.vaccineName || 'N/A'}</p>
                  <p><strong>Date:</strong> {formatDate(drive.startDate)} - {formatDate(drive.endDate)}</p>
                  <p><strong>Available Doses:</strong> {drive.availableDoses ?? 'N/A'}</p>
                  <p><strong>Applicable Classes:</strong> {drive.applicableClasses || 'TBD'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No upcoming drives scheduled.</p>
          )}
        </div>
      </div>

      {/* Ongoing Drive Preview */}
      <div className="card shadow-lg border-warning">
        <div className="card-body">
          <h5 className="card-title">Ongoing Vaccination Drives</h5>
          {data.ongoingDrive.length > 0 ? (
            <ul>
              {data.ongoingDrive.map((drive, index) => (
                <li key={index} className="mb-3">
                  <p><strong>ID:</strong> {drive.vaccinationDriveId || 'N/A'}</p>
                  <p><strong>Vaccine:</strong> {drive.vaccineName || 'N/A'}</p>
                  <p><strong>Date:</strong> {formatDate(drive.startDate)} - {formatDate(drive.endDate)}</p>
                  <p><strong>Available Doses:</strong> {drive.availableDoses ?? 'N/A'}</p>
                  <p><strong>Applicable Classes:</strong> {drive.applicableClasses || 'TBD'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No ongoing drives scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
