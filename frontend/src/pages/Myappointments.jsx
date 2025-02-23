import React, { useContext } from 'react';
import { useState,useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
    const { token,getDoctorsData} = useContext(AppContext);
    const [appointments,setAppointments]=useState([])
     const getUserAppointments=async ()=>{
        try {
            const {data}=await axios.get("http://localhost:4000/api/user/appointments",{headers:{token}});
            
            if(data.success){
                setAppointments(data.appointments);
              
            }else{
                toast.error(data.message);
            }
        } catch (error) {
             console.log(error);
             toast.error(error.message);
        }
     }
     const cancelAppointment=async(appointmentId)=>{
        try{
                //check url link
          const {data}=await axios.post('http://localhost:4000/api/user/cancel-appointment',{appointmentId},{headers:{token}});
          if(data.success){
            toast.success(data.message);
            getUserAppointments()
            getDoctorsData()
          }else{
            toast.error(data.message);
          }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
     }
     useEffect(()=>{
     if(token){
        getUserAppointments();
     }
     },[token])
    console.log(appointments);
    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
          
            <div>
                {
                  appointments.slice(0).map((item, index) => (
                    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ' key={index}>
                        <div>
                            <img className='w-32 bg-indigo ' src={item.docData.image} alt="Doctor" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral font-semibold '>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                            <p className='text-xs'>{item.docData.address}</p>
                            <p className='text-xs mt-1'><span className='text-sm text-neutral font-medium '>Date & Time:</span>{item.slotDate} | {item.slotTime}</p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end text-zinc-700 font-medium'>
                            {!item.cancelled && (
                                <button className='border border-black text-sm py-1 px-1 hover:bg-primary hover:text-white transition-all duration-500'>
                                    Pay Online
                                </button>
                            )}
                            {!item.cancelled && (
                                <button onClick={() => cancelAppointment(item._id)} className='border border-black text-sm py-1 px-1 hover:bg-red-600 hover:text-white transition-all duration-500'>
                                    Cancel appointment
                                </button>
                            )}
                            {item.cancelled && (
                                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>
                            )}
                        </div>
                    </div>
                ))
                
                
                    
                }
            </div>
        </div>
    );
}
export default MyAppointments;
