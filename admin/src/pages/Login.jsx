import axios from 'axios';
import {assets} from '../assets/assets.js';
import React,{ useState,useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
const Login=()=>{
    const [state,setstate]=useState('Admin');
    const [email,setEmail]=useState('');
    
    const [password,setPassword]=useState('');

    const {setAToken,backendUrl}=useContext(AdminContext);

  
    const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try{
    if(state === 'Admin'){
        
       
        const {data}=await axios.post('http://localhost:4000/api/admin/login',{email,password});
        if(data.success){
            //inspect->application->local storage->http://localhost:3000->aToken
            localStorage.setItem('aToken',data.token);
            console.log(data.token);
            setAToken(data.token);
        }else{
         toast.error(data.message);
        }
    }
    }catch(err){
        console.log(err);
    }
};
   
    return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex item-center">
    <div className="flex flex-col gap-3 m-auto item-start p-8 min-w-[300px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm  shadow-lg">
        <p className="text-2xl font-semibold m-auto "><span className="text-primary">
            {state}</span> Login</p>
       <div className="w-full">
        <p>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required></input>
       </div>
      
       <div>
        <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1"  type="password" required></input>
       </div>
       <button className="bg-primary py-2 text-white w-full rounded-md text-base " type='submit'>Login</button>
       {
         state==='Admin'?<p>Login Doctor? <span className="text-primary underline cursor-pointer" onClick={()=>setstate('Doctor')}>click here</span></p>
             :<p>Login Admin? <span className="text-primary underline cursor-pointer" onClick={()=>setstate('Admin')}>click here</span></p>
       }
     </div>
    </form>);
    
    
}

export default Login;