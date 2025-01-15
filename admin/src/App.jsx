import './index.css';
import React,{useContext} from 'react';
import Login from './pages/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from './components/Sidebar.jsx';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import AddDoctors from './pages/Admin/AddDoctors.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';

function App() {
  const {aToken}=useContext(AdminContext);
  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <Navbar></Navbar>
      <div className="flex items-start">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<></>}>
          </Route>
          <Route path="/admin-dashboard" element={<Dashboard></Dashboard>}>
          </Route>
          <Route path="/all-appoinments" element={<AllAppointments></AllAppointments>}>
          </Route>
          <Route path="/add-doctor" element={<AddDoctors></AddDoctors>}>
          </Route>
          <Route path="/doctor-list" element={<DoctorsList></DoctorsList>}>
          </Route>
        </Routes>
      </div>
      <ToastContainer/>
    </div>
  ) :(
    <div>
       <Login></Login>
       <ToastContainer/>
    </div>
  );
}

export default App;
