import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext); 
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
     console.log(userData);
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("dob", userData.dob);
            formData.append("gender", userData.gender);
            formData.append("address", userData.address);
            formData.append('phone', userData.phone);
            formData.append("userId",userData._id);
            image && formData.append('image', image);
            
            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return userData && (
        <div className='max-w-lg mx-auto p-4 flex flex-col gap-4 text-sm'>
            {
                isEdit
                    ? <label htmlFor="image">
                        <div className="inline-block relative cursor-pointer">
                            <img
                                className="w-36 rounded opacity-75"
                                src={image ? URL.createObjectURL(image) : userData.image}
                                alt="Profile Preview"
                            />
                            <img
                                className="w-10 absolute bottom-12 right-12"
                                src={assets.upload_icon}
                                alt="Upload Icon"
                            />
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </div>
                    </label>
                    : <img className='w-36 h-36 rounded-full mx-auto' src={userData.image} alt="Profile" />
            }
            <hr className='border-gray-300' />
            
            <div>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Name:</p>
                    { 
                        isEdit
                            ? <input className='bg-gray-100 p-2 rounded-lg w-full' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                            : <div>
                                <p className='text-blue-500'>{userData.name}</p>
                              </div>
                    }
                    </div>
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
                            ? <input className='bg-gray-100 p-2 rounded-lg w-full' type="text" value={userData.address} onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))} />
                            : <div>
                                <p>{userData.address}</p>
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
                            ? <select
                            className='bg-gray-100 p-2 rounded-lg'
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                            value={userData.gender}
                        >
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
                        ? <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={updateUserProfileData}>Save Information</button>
                        : <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>
        </div>
    );
};

export default MyProfile;
