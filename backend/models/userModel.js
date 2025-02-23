import mongoose from "mongoose";
import _default from "validator";
 
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,default:"https://media.gettyimages.com/id/1796422866/photo/semi-final-icc-mens-cricket-world-cup-india-2023.jpg?s=2048x2048&w=gi&k=20&c=VqquPlCruyvMbFOOj-mSJ4EoVTICXlkixxe7LCeB6YA="},
    address:{type:String,default:"Not Updated"},
    gender:{type:String,default:"Not Selected"},
    dob:{type:String,default:"Not Selected"},
    phone:{type:String,default:"0000000000"}
},{minimize: false})

const userModel=mongoose.models.user || mongoose.model('user',userSchema)
export default userModel;
