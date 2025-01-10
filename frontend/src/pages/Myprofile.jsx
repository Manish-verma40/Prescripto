import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: "Manish Verma",
        image: assets.profile_pic,
        email: 'vermanish@gmail.com',
        phone: '+1 123 456 7890',
        address: {
            line1: '57th cross, Richmond',
            line2: 'circle, church road, London'
        },
        gender: 'male',
        dob: '2000-01-20'
    });
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className='max-w-lg mx-auto p-4 flex flex-col gap-4 text-sm'>
            <img className='w-36 h-36 rounded-full mx-auto' src={userData.image} alt="Profile" />
            {
                isEdit
                    ? <input className='bg-gray-50 text-3xl font-medium text-center mt-4 p-2 rounded-lg w-full' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                    : <p className='text-3xl font-medium text-neutral-800 text-center mt-4'>{userData.name}</p>
            }
            <hr className='border-gray-300' />

            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {
                        isEdit
                            ? <input className='bg-gray-100 p-2 rounded-lg w-full' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                            : <p className='text-blue-400'>{userData.phone}</p>
                    }
                    <p className='font-medium'>Address:</p>
                    {
                        isEdit
                            ? <div className='space-y-2'>
                                <input className='bg-gray-100 p-2 rounded-lg w-full' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                                <input className='bg-gray-100 p-2 rounded-lg w-full' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                              </div>
                            : <div>
                                <p>{userData.address.line1}</p>
                                <p>{userData.address.line2}</p>
                              </div>
                    }
                </div>
            </div>

            <div>
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Gender:</p>
                    {
                        isEdit
                            ? <select className='bg-gray-100 p-2 rounded-lg' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            : <p>{userData.gender}</p>
                    }
                    <p className='font-medium'>Birthday:</p>
                    {
                        isEdit
                            ? <input className='bg-gray-100 p-2 rounded-lg' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                            : <p>{userData.dob}</p>
                    }
                </div>
            </div>

            <div className='flex justify-center mt-6'>
                {
                    isEdit
                        ? <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={() => setIsEdit(false)}>Save Information</button>
                        : <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>
        </div>
    );
}

export default MyProfile;
