import express from 'express'
import {registerUser, updateProfile} from '../controller/userController.js'
import { loginUser,bookAppointment,listAppointment,cancelAppointment} from '../controller/userController.js';
import { getProfile } from '../controller/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
const userRouter = express.Router();                                                    
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get("/get-profile-data",authUser,getProfile);
userRouter.post("/update-profile",authUser,upload.single('image'),updateProfile);
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get("/appointments",authUser,listAppointment);
userRouter.post('/cancel-appointment',authUser,cancelAppointment);
export default userRouter;