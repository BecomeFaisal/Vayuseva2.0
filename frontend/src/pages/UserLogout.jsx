import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Nothing to do - redirect to login
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        // If logout fails (401 etc.), still clear token and redirect to login
        console.error('Logout error', err?.response || err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    doLogout();
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  )
}

export default UserLogout
