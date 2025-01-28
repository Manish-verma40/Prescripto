import express from 'express'
import  {allDoctors}  from '../controller/doctorsController.js'
const doctorRouter =express.Router();

doctorRouter.get('/list',allDoctors);

export default doctorRouter;