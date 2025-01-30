import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
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
    const { userId } = req.body;
    const user = await userModel.findOne({ userId }).select('-password'); 
    
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
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;
            console.log(imageUrl);
            const updated= await userModel.findByIdAndUpdate(userId,{name:name},{phone,phone},{address:address},{dob:dob},{gender:gender},{image:imageUrl});
            if(!updated){
              res.json({success:false,message:"fail to update user Profile"});
            }
            res.json({success:true,message:"user Profile updated"});

  }catch(error){
    console.log(error);
    res.json({success:false,message:"server not working properly"});
  }
}

export {registerUser,loginUser,getProfile,updateProfile};