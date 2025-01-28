import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_APP_BACKEND;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, {
        headers: { Authorization: `Bearer ${aToken}` }
      });
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
    console.log('change avilabity called');
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

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <AdminContext.Provider value={{ aToken, setAToken, doctors, changeAvailability }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;