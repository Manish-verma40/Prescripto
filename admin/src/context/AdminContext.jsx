import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData]=useState(false);
  const backendUrl = import.meta.env.VITE_APP_BACKEND;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/admin/all-doctors', { headers: { atoken: aToken } });
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    console.log('change availability called');
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, {
        headers: { Authorization: `Bearer ${aToken}` }
      });
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/admin/all-appointments', { headers: { atoken: aToken } });
      if (data.success) {
       
        setAppointments(data.appointments);
      
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getDashData=async ()=>{
   try{
    const {data}=await axios.get('http://localhost:4000/api/admin/dashboard',{headers:{atoken: aToken}}); 
    if(data.success){
      console.log(data.dashData);
     setDashData(data.dashData);
    }else{
      toast.error({success:false,message:data.message});
    }
   }catch(error){
  console.log(error);
  toast.error(error.message);
   }
  }
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <AdminContext.Provider value={{ aToken, setAToken, doctors, appointments, getAllAppointments, changeAvailability, getAllDoctors,dashData,getDashData }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
