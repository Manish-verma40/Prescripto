import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
const DoctorsList = () => {
    const {doctors,getAllDoctors,aToken}=useContext(AdminContext);
    console.log(doctors);
    useEffect(()=>{
        getAllDoctors();
    },[aToken]);
    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
        <h1>All Doctors</h1>
        <div>{
           
             doctors.map((item,index)=>{
                <div key={index}>
                 <img src={item.image} alt={item.name} />
                  <div>
                  <p>{item.name}</p>
                  <p>{item.speciality
                  }</p>
                  <div>
                    <input type="checkbox" checked={item.available} />
                    <p>Available</p>
                  </div>
                  </div>
                </div>
    
    })
            }
     
        </div>
        
        </div>
    )
}
export default DoctorsList;