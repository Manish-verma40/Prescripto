import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const changeAvilability = async (req, res) => {
    try{
        const {docId}=req.body;
        const docData= await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available});
        req.json({success:true,message:"Availability Changed"});
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const allDoctors=async (req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select(["-password","-email"]);
        res.json({success:true,doctors})
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//Api to login Doctors
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });  
        if(!doctor){
            return res.json({ success: false, message: "Doctor not found" });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        } 
        const token = jwt.sign({ email: doctor.email, id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ success: true, doctor, token });   

    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//Api to get all appointmets of a doctor
const appointmetsDoctor = async (req, res) => {
    try{
    const {docId}=req.body;
    const appointments=await appointmentModel.find({docId});
    res.json({success:true,appointments});
    }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
    }
}
//Api to mark appointment completed for doctor panel
const appointmentCompleted=async(req,res)=>{
    try{
       const {docId,appointmentId}=req.body;
       const appointmentData=await appointmentModel.findById(appointmentId);
       if(appointmentData && appointmentData.docId===docId){
           await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
           res.json({success:true,message:"Appointment Completed"}); 
       }else{
        return res.json({ success: false, message:"Mark failed" });
       }
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//Api to mark cancel appointment for doctor panel
const appointmentCancel=async(req,res)=>{
    try{
       const {docId,appointmentId}=req.body;
       const appointmentData=await appointmentModel.findById(appointmentId);
       if(appointmentData && appointmentData.docId===docId){
           await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
           res.json({success:true,message:"Appointment Cancelled"}); 
       }else{
        return res.json({ success: false, message:"Cancele failed" });
       }
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//Api to get data for doctor dashboard
const doctorDashboard=async(req,res)=>{
    try{
        const {docId}=req.body;
        const appointments=await appointmentModel.find({docId});
        let earnings=0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+=item.amount;
            }
        })
        let patients=[]
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })
        const dashData={
            earnings,
            patients:patients.length,
            appointments:appointments.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData});
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Api to get doctor profile 
const doctorProfile=async(req,res)=>{
    try{
        const {docId}=req.body;
 const profileData=await doctorModel.findById(docId).select("-password");
 if(profileData){
    return res.json({success:true,profileData});
 }else{
    res.json({success:true,message:"Doctor not found"});
 }
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//Api to update yhe doctor profile
const updateDoctorProfile=async(req,res)=>{
    try{
        const {docId,fees,address,available}=req.body;

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available});
        res.json({success:true,message:"Profile Updated"});
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export {changeAvilability,allDoctors,loginDoctor,appointmetsDoctor,appointmentCompleted,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile};