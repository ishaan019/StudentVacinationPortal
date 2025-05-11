import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloWorld from './HelloWorld'
import ListStudentComponent from './components/ListStudentComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import StudentComponent from './components/StudentComponent'
import ListVaccineComponent from './components/Vaccination/ListVaccineComponent'
import VaccineComponent from './components/Vaccination/VaccineComponent'

import VaccinationDriveComponent from './components/VaccinationDrive/VaccinationDriveComponent'
import ListVaccinationDriveComponent from './components/VaccinationDrive/ListVaccinationDriveComponent'
import DashboardComponent from './components/Dashboard/DashboardComponent'
import SignInComponent from './components/signin/SignInComponent'
import HeaderComponentSignIn from './components/HeaderComponentSignIn'
import ListVaccinationRecordComponent from './components/VaccinationRecord/ListVaccinationRecordComponent'
import VaccinationRecordComponent from './components/VaccinationRecord/VaccinationRecordComponent'

function App() {
  const [count, setCount] = useState(0)

  // const location = useLocation();
  const hideHeaderFooterRoutes = ['/'];

  const isSignInPage = location.pathname === '/';

  return (
    <>
      <BrowserRouter>
        {/* <HeaderComponent /> */}
        {isSignInPage ? <HeaderComponentSignIn /> : <HeaderComponent />}
          <Routes>
          
            {/* Sign In */}
            {/* // http"//localhost:3000 */}
            <Route path='/' element = { <SignInComponent/>}></Route>
            

              {/* Dashboard */}
            <Route path='/dashboard' element = { <DashboardComponent/>}></Route>

              {/* ManageStudents */}
            <Route path='/students' element = { <ListStudentComponent/>}></Route>
            <Route path='/add-student' element = { <StudentComponent/>}></Route>
            <Route path='/edit-student/:id' element = { <StudentComponent/>}></Route>

              {/* ManageVaccine */}
            <Route path='/vaccines' element = { <ListVaccineComponent/>}></Route>
            <Route path='/add-vaccine' element = { <VaccineComponent/>}></Route>
            <Route path='/edit-vaccine/:id' element = { <VaccineComponent/>}></Route>

             {/* ManageVaccinationDrive */}
            <Route path='/vaccination-drive' element = { <ListVaccinationDriveComponent/>}></Route>
            <Route path='/add-vaccination-drive' element = { <VaccinationDriveComponent/>}></Route>
            <Route path='/edit-vaccination-drive/:id' element = { <VaccinationDriveComponent/>}></Route>

            {/* ManageVaccinationrecord */}
            <Route path='/vaccination-record' element = { <ListVaccinationRecordComponent/>}></Route>
            <Route path='/add-vaccination-record' element = { <VaccinationRecordComponent/>}></Route>
            <Route path='/edit-vaccination-record/:id' element = { <VaccinationRecordComponent/>}></Route>

          </Routes>
          <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
