import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay';
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

//APT for userLogin 
const loginUser = async (req, res) => {
  try{
    const {email,password}=req.body;
    const user=await userModel.findOne({email});
    if(!user){
     console.log(error);
     return res.json({success:false,message:"user not found"});
    }
    
      const match = await bcrypt.compare(password, user.password);

      if(match) {
          const token = jwt.sign({id:user._id},process.env.JWT_SECRET); 
          res.json({success:true,token});
      }else{
        res.json({success:false,message:"Invalid credentials"});

      }
  }catch(error){
    console.log(error);
    res.json({success:false,message:error.message});
  }
}
//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const  {userId}  = req.body;
    const user = await userModel.findOne({_id: userId }).select('-password'); 
   
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

//API to update the user profile
const updateProfile= async (req,res)=>{ 
  try{
  const {userId,name,phone,address,dob,gender}=req.body;
    const imageFile=req.file;
    if(!name || !phone || !address || !dob || !gender){
      res.json({success:false,message:"missing information"});
    }
    
    if(imageFile){
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      var imageUrl = imageUpload.secure_url;
      console.log(imageUrl);
    }
    
            const data= await userModel.findByIdAndUpdate(userId,{name: name,
              phone: phone,
              dob: dob,
              gender: gender,
              image: imageUrl,
              address: address});
             console.log(data);
            if(!data){
              res.json({success:false,message:"user profile not updated"});
            }else{
              res.json({success:true,message:"user Profile updated"});
            }
       

  }catch(error){
    console.log(error);
    res.json({success:false,message:"server not working properly"});
  }
}
//API to book appointments
const bookAppointment= async (req,res)=>{
  try{
   const {docId,userId,slotDate,slotTime}=req.body;
   
   const docData=await doctorModel.findById(docId).select('-password');
   if(!docData.available){
    return res.json({success:false,message:"Doctor not available"});
   }
   let slots_booked=docData.slots_booked;
   
   //checking availability
   if(slots_booked[slotDate]){
    if(slots_booked[slotDate].includes(slotTime)){
      return res.json({success:false,message:'slot not available'});
    }else{
      slots_booked[slotDate].push(slotTime)
    }
    //checked
   }else{
    slots_booked[slotDate]=[]
    slots_booked[slotDate].push(slotTime)
   }
   //checked
   const userData=await userModel.findById(userId).select('-password');
   delete docData.slots_booked
   const appointmentData={
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
   }
   const newAppointment =new appointmentModel(appointmentData);
   await newAppointment.save();
   //save new slots data in docData
   await doctorModel.findByIdAndUpdate(docId,{slots_booked})
   res.json({success:true,message:'Appointment Booked'})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"server not working properly"});
  }
}
//Api to get all users Appointments for my-appointment page
const listAppointment=async (req,res)=>{
    try{
     const {userId}=req.body
     const appointments=await appointmentModel.find({userId});
     
     res.json({success:true,appointments});
    }catch(error){
      console.log(error);
      res.json({success:false,message:error.message});
    }
}
//Api to cancel the appointment 
const cancelAppointment=async(req,res)=>{
  try {
      const {userId,appointmentId}=req.body;     
    const appointmentData=await appointmentModel.findById(appointmentId)
    //verify appointment user
    if(appointmentData.userId !==userId){
      return res.json({success:false,message:'Unauthorized action'})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    //releasing doctor slot 
    const {docId,slotDate,slotTime,}=appointmentData;
     const doctorData=await doctorModel.findById(docId);
     console.log(slotDate);
     let slots_booked=doctorData.slots_booked[slotDate].filter(e=>e !==slotTime)
     await doctorModel.findByIdAndUpdate(docId,{slots_booked})
     return res.json({success:true,message:'appointment cancelled'})
  } catch (error) {
    console.log(error);
      res.json({success:false,message:error.message});
  }
}

//Api to make payment using razorpay
const razorpayInstance=new razorpay({
  key_id:'',
  key_secret:''
})
const paymentRazorpay= async (req,res)=>{

}
export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment};