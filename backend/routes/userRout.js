import express from 'express'
import {registerUser} from '../controller/userController.js'
import { loginUser } from '../controller/userController.js';
import { getProfile } from '../controller/userController.js';
import authUser from '../middleware/authUser.js';
const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get("/get-profile-data",authUser,getProfile);
export default userRouter;