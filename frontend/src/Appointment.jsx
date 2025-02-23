import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from './context/AppContext'; // Ensure the path is correct
import { assets } from './assets/assets';
import RelatedDoctors from './components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors,token,getDoctorsData } = useContext(AppContext);
    const navigate=useNavigate();
    const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);  // Initialize as an empty array
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    useEffect(() => {
        const fetchDocInfo = async () => {
            const docInfo = doctors.find(doc => doc._id === docId);
            setDocInfo(docInfo);
        };
        fetchDocInfo();
    }, [doctors, docId]);

    const getAvailableSlots = async () => {
        // Initialize an empty array to hold all slots
        let allSlots = [];

        // Getting current date
        let today = new Date();
        for (let i = 0; i < 7; i++) {
             
            // Getting date with index
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
           
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            // Setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                let day=currentDate.getDate();
                let month=currentDate.getMonth()+1;
                let year=currentDate.getFullYear();
                const slotDate=day+"_"+month+"_"+year;
                const slotTime=formattedTime;
                const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)?false:true;
                if(isSlotAvailable){
  // Add slot to array
  timeSlots.push({
    datetime: new Date(currentDate),
    time: formattedTime
});
                }

                
                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            // Add day's slots to allSlots array
            allSlots.push(timeSlots);
        }
         
        // Update state once all slots are collected
        setDocSlots(allSlots);
    }
  const bookAppointment = async()=>{
     if(!token){
        toast.warn('Login to BookAppointment');
        return navigate('/login');
     }
     try{
         const date=docSlots[slotIndex][0].datetime;
         const day=date.getDate();
         const month=date.getMonth()+1;
         const year=date.getFullYear();
     const slotDate=day+"_"+month+"_"+year;
     console.log(slotDate);
     const {data}=await axios.post('http://localhost:4000/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}});
     if(data.success){
      toast.success(data.message);
      getDoctorsData();
      navigate('/my-appointments');
     }else{
       toast.error(data.message);
     }
     }catch(error){
    console.log(error);
    toast.error(error.message);
     }
  }
    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    useEffect(() => {
       // console.log(docSlots);
    }, [docSlots]);

    return docInfo && (
        <div>
            {/* doctor's info */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="Doctor" />
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    {/* doc info name, degree, experience */}
                    <p className='flex item-center text-2xl font-medium text-gray-900 gap-2'>
                        {docInfo.name} <img className="w-5 pt-2" src={assets.verified_icon} alt="Verified" />
                    </p>
                    <div className='flex item-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    {/* Doctors About */}
                    <div>
                        <p className='flex item-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="Info" /></p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>Appointment fee:<span className='text-gray-600'>${docInfo.fees}</span></p> 
                </div>
            </div>
            {/* Booking Slots */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                {docSlots.length > 0 && docSlots.map((item, index) => (
    item.length > 0 && (
        <div onClick={()=>setSlotIndex(index)} className={`text-center cursor-pointer rounded-full py-6 min-w-16 ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-600'}`} key={index}>
            <p>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
            <p>{item[0] && item[0].datetime.getDate()}</p>
        </div>
    )
    
)


)}

                </div>
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 scrollbar-dark'>
    {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 && docSlots[slotIndex].map((item, index) => (
        <p onClick={()=>setSlotTime(item.time)} className={`w-20 text-sm font-light flex-shrink-0 py-2 pl-2 border rounded-full border-gray-600  cursor-pointer ${item.time===slotTime ? 'bg-primary text-white' :'text-gray-400 border border-gray-300 '}`} key={index}>
            {item.time.toLowerCase()}
        </p>
    ))}
</div>

            </div>
            <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ml-60'>Book an Appointment</button>

            {/*..................... RelatedDoctors................. */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality}></RelatedDoctors>
        </div>
    );
}

export default Appointment;
