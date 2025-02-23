import React from "react"
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import Myprofile from "./pages/Myprofile"
import Contact from "./pages/Contact"
import Myappointments from "./pages/Myappointments"
import Appointment from "./Appointment.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import About from "./pages/About.jsx"
import { ToastContainer, toast } from 'react-toastify';  

function App() {
  return (
    <>
    <div className="mx-4 sm: mx-[10%]">
    <ToastContainer />
      <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:speciality' element={<Doctors/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/my-profile' element={<Myprofile/>}/>
      <Route path='/my-appointments' element={<Myappointments/>}/>
      <Route path='/appointment/:docId' element={<Appointment/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
    <Footer></Footer>
    </div>
     
    </>
  )
}

export default App
