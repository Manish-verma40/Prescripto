import React from "react";
import groupImg from "../assets/group_profiles.png";
import arrowIcon from "../assets/arrow_icon.svg";
import headerImage from "../assets/header_img.png";
const Header=()=>{
    return (
  
        <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
   {/* Leftside */}
          <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br/> with Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row item-center gap-3 text-white text-sm font-light">
            <img className="w-28" src={groupImg} alt=""/>
            <p>Simply browse through our extensive list of trusted doctors,<br></br> schedule </p>
        </div>
        <a href="#specilality" className="flex item-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">
            Book Appointment 
            <img className="w-3" src={arrowIcon} alt=""/>
        </a>
          </div>
{/* RightSide */}
          <div className='md:w-1/2 relative'>
    <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={headerImage} alt=""/>
          </div>
        </div>
    )
}
export default Header;