import React, { useState,useContext} from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

import axios from 'axios';
const AddDoctors=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [experience,setExperience]=useState('1 year');
    const [fees,setFees]=useState('');
    const [speciality,setSpeciality]=useState('General physician');
    const [education,setEducation]=useState('');
    const [docImag,setDocImag]=useState('');
    const [address,setAddress]=useState('');
   
    const [about,setAbout]=useState('');
    const {backendUrl,aToken}=useContext(AdminContext);

   const onSubmitHandler=async(e)=>{
    console.log(aToken,"hello");
    console.log('submitting');
     e.preventDefault();
    try{
        if(!docImag){
        return toast.error('Please upload doctor image');
        }
        const formData=new FormData();
        formData.append('email',email);
        formData.append('password',password);
        formData.append('name',name);
        formData.append('experience',experience);
        formData.append('fees',Number(fees));
        formData.append('speciality',speciality);
        formData.append('degree',education);
         formData.append('address',address);
     
        formData.append('about',about);
        formData.append('image',docImag);

         //console log form Data
         formData.forEach((value,key) => {
            console.log(`${key} : ${value}`);
         });

const {data}=await axios.post(`${backendUrl}/api/admin/add-doctor`,formData,{headers:{atoken:aToken}});
  if(data.success){
    console.log('uploaded');
    toast.success(data.message);
    setEmail('');
    setPassword('');
    setName('');
    setExperience('1 year');
    setFees('');
    setSpeciality('General physician');
    setEducation('');
    setDocImag(false);
    setAddress('');
   
    setAbout('');

  }else{
    
    console.log(data.error);
   data.error && toast.error(data.error);
  }

    }catch(err){
        console.log(err);
        err.response && toast.error(err.response.data.error);
    }
   }
    return (
       <form onSubmit={onSubmitHandler} className="m-5 w-full ">
        <p className='mb-3 text-lg font-medium'>
           Add Doctors
        </p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
            <div className="flex items-center gap-4 mb-8 text-gray-600">
                <label htmlFor='doc-img'>
                    <img className="w-16 rounded-full cursor-pointer bg-gray-100" src={docImag ? URL.createObjectURL(docImag): assets.upload_area} alt=""></img>
                </label>
                <input onChange={(e)=>setDocImag(e.target.files[0])} type="file" id="doc-img" hidden></input>
                <p>Upload doctor <br/> picture</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                <div className="w-full lg:flex-1 flex flex-col gap-4">
                    <div className="flex-1 flex flex-col gap-1 ">
                        <p>Doctor Name</p>
                        <input onChange={(e)=>setName(e.target.value)} value={name}className='border-rounded px-3 py-2 ' type="text" placeholder='Name' required></input>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 ">
                        <p>Doctor Email</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email}className='border-rounded px-3 py-2 ' type="email" placeholder='Doc-Email' required></input>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 ">
                        <p>Doctor password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password}className='border-rounded px-3 py-2 ' type="password" placeholder='password' required></input>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 ">
                        <p>Experience</p>
                        <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border-rounded px-3 py-2 ' name="" id="">
                           <option value={"1 Year"}>1 Year</option>
                           <option value={"2 Year"}>2 Year</option>
                           <option value={"3 Year"}>3 Year</option>
                           <option value={"4 Year"}>4 Year</option>
                           <option value={"5 Year"}>5 Year</option>
                           <option value={"6 Year"}>6 Year</option>
                           <option value={"7 Year"}>7 Year</option>
                           <option value={"8 Year"}>8 Year</option>
                           <option value={"9 Year"}>9 Year</option>
                           <option value={"10 Year"}>10 Year</option>
                        </select>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 ">
                        <p>Fees</p>
                        <input onChange={(e)=>setFees(e.target.value)} value={fees}className='border-rounded px-3 py-2 ' type="number" placeholder='fees' required></input>
                    </div>
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality</p>
                            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border-rounded px-3 py-2 ' name="" id="">
                           <option value={"General physician"}>General physician</option>
                           <option value={"Nurologist"}>Nurologist</option>
                           <option value={"Pediatricians"}>Pediatricians</option>
                           <option value={"Gastroenterologist"}>Gastroenterologist</option>
                           <option value={"Gynecologist"}>Gynecologist</option>
                           <option value={"Dermatologist"}>Dermatologist</option>
                           
                        </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1 ">
                        <p>Education</p>
                        <input onChange={(e)=>setEducation(e.target.value)} value={education} className='border-rounded px-3 py-2 ' type="text" placeholder='Education' required></input>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <p>Address</p>
                        <input onChange={(e)=>setAddress(e.target.value)} value={address}className='border-rounded px-3 py-2 ' type="text" placeholder='address' required ></input>
                    </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="mt-4 mb-2">
                    About Doctor
                </p>
                <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded" name="" id="" cols="80" rows="5" placeholder='write about doctor...' required>

                </textarea>
            </div>
            <button type="submit" className="bg-primary text-white rounded-full px-10 py-3 mt-4 rounded-full">Add Doctor</button>
        </div>
       </form>
    )
}
export default AddDoctors;