import React, { createContext, useEffect } from 'react';
// import { doctors } from "../assets/assets";
import axios from 'axios';
import { useState } from 'react';
import {toast} from 'react-toastify';
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
   
    const [doctors, setDoctors] = useState([]);
    const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
   const getDoctorsData= async ()=>{
     try{
       const {data}=await axios.get('http://localhost:4000/api/doctor/list');
       if(data.success){
            setDoctors(data.doctors);
       }else{
       toast.message(data.message);
       }
     }catch(error){
        console.log(error);
        toast.error(error.message);
     }
   }
   
   const value = {
    doctors,
    token,setToken,backendUrl
};

  useEffect(() => {
    getDoctorsData();
  }, []);

    //
getDoctorsData();
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

// export { AppContextProvider};
