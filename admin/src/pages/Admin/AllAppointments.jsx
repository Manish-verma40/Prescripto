 import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const AllAppointments = () => {
    const {appointments}=useContext(AdminContext);
   
    return(
        <div>
            <p className="'pb-3 mt-8 ml-6 font-medium text-zinc-700 border-b"> AllAppointments</p>
            <div style={{ height: '50rem', overflow: 'auto' }} className='ml-3 p-4'>
            {
             appointments.slice(0).map((item, index) => ( !item.cancelled &&
                <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ' key={index}>
                    <div>
                        <img className='w-32 bg-indigo ' src={item.userData.image} alt="patient img" />
                    </div>
                    <div className='flex-1 text-sm text-zinc-600'>
                        <p className='text-neutral font-semibold '>Patient Name: {item.userData.name}</p>
                        <p className='text-xs'><span className='text-zinc-700 font-medium mt-1'>Doctor Name:</span> {item.docData.name}</p>
                        <p className='text-xs'>{item.docData.speciality}</p>
                        <p className='text-xs mt-1'><span className='text-sm text-neutral font-medium '>Appointment Slot:</span>{item.slotDate} | {item.slotTime}</p>
                        <p className='text-zinc-700 font-medium mt-1'>Patient Email: <span className='text-xs text-blue-500 '>{item.userData.email}</span></p>
                   
                        
                    </div>
                    <div></div>
                    <div className='flex flex-col gap-2 justify-end text-zinc-700 font-medium'>
                        { (item.payment && 
                            <div className='sm:min-w-40 py-1 px-8 border border-green-700 rounded text-green-500 text-center'>
                            payment completed
                          </div>
                          
                        )}
                         { (!item.payment && 
                            <div className='sm:min-w-40 py-1 px-8 border border-green-500 rounded text-green-500 text-center'>
                                payment pendding!
                            </div>
                        )}
                        {!item.cancelled && (
                            <button onClick={() => cancelAppointment(item._id)} className='border border-red-600 rounded text-red-500 text-center text-sm py-1 px-1  hover:bg-red-600 hover:text-white transition-all duration-500'>
                                Cancel appointment
                            </button>
                        )}
                       
                    </div>
                </div>
            ))
             
            }
       
       </div>
        
    </div>
    );
}
export default AllAppointments;

