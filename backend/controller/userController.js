import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
//API to register user
const registerUser = async (req, res) => {
    try{
      const {name,email,password}=req.body;
      if(!name || !email || !password){
      return res.json({success:false,message:"Missing Details"});
      }
      if(!validator.isEmail(email)){
       return res.json({success:false,message:"Email is not correct"});
      }
      if(password.length<=8){
        return res.json({success:false,message:"password length must be greater then 8"});
      }

      //hashing user password 
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);
     const userData={
      name,
      email,
      password : hashedPassword
     }
     const newUser=new userModel(userData);
    const user=await newUser.save();
   const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({success:true,token})
    }catch(error){

        console.log(error);
     res.json({success:false,message:error.message})
    }
}
export {registerUser}