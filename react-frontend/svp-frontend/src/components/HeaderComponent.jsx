import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // includes Popper

const HeaderComponent = () => {
    const handleSubmit = (e) => {
           
                console.log(response.data);
               
        };
    return (
        <div>
            <header>
                {/* <nav class="navbar navbar-dark bg-dark px-3 mb-3">
                    <a class="navbar-brand" href="#">Student Vaccination Portal</a>
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a class="nav-link text-white" to="/students">Manage Students</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" to="/vaccinations">Manage Vaccination</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link text-white" to="/logout">Log out</a>
                        </li>
                    </ul>
                </nav> */}
                <nav className="navbar navbar-dark bg-dark px-3 mb-3">
                    <Link className="navbar-brand" to="/dashboard">Student Vaccination Portal</Link>
                    <ul className="nav nav-pills">

                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/students">Manage Students</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle text-white"
                                href="#"
                                id="vaccinationDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Vaccination
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="vaccinationDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/vaccines">Manage Vaccines</Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item" to="/vaccination-drive">Manage Vaccination Drives</Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item" to="/vaccination-record">Manage Vaccination Records</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white" onClick={handleSubmit} to="/">Log out</Link>
                        </li>
                    </ul>
                </nav>
            </header>

        </div>
    )
}

export default HeaderComponent
