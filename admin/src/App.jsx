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
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';

function App() {
  const {aToken}=useContext(AdminContext);
  const {dToken}=useContext(AdminContext);
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <Navbar></Navbar>
      <div className="flex items-start">
        <Sidebar></Sidebar>
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>}>
          </Route>
          <Route path="/admin-dashboard" element={<Dashboard></Dashboard>}>
          </Route>
          <Route path="/all-appointments" element={<AllAppointments></AllAppointments>}>
          </Route>
          <Route path="/add-doctor" element={<AddDoctors></AddDoctors>}>
          </Route>
          <Route path="/doctor-list" element={<DoctorsList></DoctorsList>}>
         

          </Route>
           {/* DoctorRoutes */}
           <Route path="/doctor-dashboard" element={<DoctorDashboard></DoctorDashboard>}>
           </Route>
           <Route path="/doctor-profile" element={<DoctorProfile></DoctorProfile>}>
           </Route>
           <Route path="/doctor-appointments" element={<DoctorAppointments></DoctorAppointments>}>
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
