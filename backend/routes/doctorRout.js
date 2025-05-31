import express from 'express'
import  {allDoctors,loginDoctor,appointmetsDoctor,appointmentCompleted,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile}  from '../controller/doctorsController.js'
import authDoctor from '../middleware/authDoctor.js';
const doctorRouter =express.Router();

doctorRouter.get('/list',allDoctors);
doctorRouter.post('/login',loginDoctor);
doctorRouter.post('/appointments',authDoctor,appointmetsDoctor);
doctorRouter.post('/complete-appointment',authDoctor,appointmentCompleted);
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel);
doctorRouter.get('/dashboard',authDoctor,doctorDashboard);
doctorRouter.get('/profile',authDoctor,doctorProfile);
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile);
export default doctorRouter;