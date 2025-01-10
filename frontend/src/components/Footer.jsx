import React from 'react'
import logo from "../assets/logo.svg";
const Footer=()=>{
    return <div className='md:mx-10'>
    <div className="flex text-sm flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        {/* Left section */}
        <div className="mb-5 w-50 ">
           <img className='w-44 cursor-pointer mb-2' src={logo} alt="" />
           <p className="text-gray-600 w-full md:w-2/3"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        {/* middle Section */}
        <div>
     <p className="text-xl font-medium mb-5">COMPANY</p>
     <ul className="flex flex-col gap-2 text-gray-600">
     <li>Home</li>
     <li>Contact us</li>
     <li>About us</li>
     <li>Privacy Policy</li>
     </ul>
    
        </div>
       {/* right section */}
       <div>
    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
     <ul className="flex flex-col gap-2 text-gray-600">
        <li>+1-212-456-7890</li>
        <li>greatstackdev@gmail.com</li>
     </ul>
       </div>
    </div>
    <div>
    <hr className="border-gray-400 mb-2" />

    <p className="mb-2 text-center text-gray-600 text-medium">Copyright © 2024 GreatStack - All Right Reserved.</p>
    </div>
    
    </div>
}
export default Footer;