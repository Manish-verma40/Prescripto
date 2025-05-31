import express from 'express'
import  {addDoctor,loginAdmin,allDoctors,allAppointments,adminDashboard}  from '../controller/adminController.js'
import  upload from "../middleware/multer.js"
import authAdmin from '../middleware/authAdmin.js';
import {changeAvilability} from '../controller/doctorsController.js'
const adminRouter =express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-doctors',authAdmin,allDoctors)
adminRouter.get('/all-appointments',authAdmin,allAppointments);
adminRouter.post('/change-avilablity',authAdmin,changeAvilability)
adminRouter.get('/dashboard',authAdmin,adminDashboard);
export default adminRouter;