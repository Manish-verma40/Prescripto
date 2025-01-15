import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
const Navbar=()=>{

    const {aToken,setAToken}=useContext(AdminContext);
    const navigate=useNavigate();
 console.log(aToken);
      const logout=()=>{
        navigate('/');
       aToken && localStorage.removeItem('aToken');
        aToken && setAToken('');
      }
return (<div className="flex justify-between px-4 item-center sm:px-10 py-3 bg-white border-b">
<div className="flex items-center gap-2 text-xs">
        <img className="cursor-pointer w-36 sm:w-40 " src={assets.admin_logo} alt="logo" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken?'Admin':'Doctor'}</p>
     </div>
     <button className="bg-primary text-sm px-10 py-2 rounded-full" onClick={logout}>Logout</button>
</div>
     
)
}
export default Navbar;