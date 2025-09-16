import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogout = () => {
  const navigate = useNavigate();
  const { setCaptain } = React.useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const doLogout = async () => {
      setLoading(true);
      setError('');
      try {
        // Call backend logout route
        await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, { withCredentials: true });
      } catch (err) {
        console.error('Captain logout error', err);
        setError(err?.response?.data?.message || 'Failed to logout');
      } finally {
        // Clear client state regardless
        localStorage.removeItem('token');
        if (typeof setCaptain === 'function') setCaptain(null);
        setLoading(false);
        navigate('/captain-login');
      }
    }
    doLogout();
  }, []);

  if (loading) return <div className="p-6">Logging out...</div>

  return (
    <div className="p-6">
      {error ? <p className="text-red-600">{error}</p> : <p>Logged out</p>}
    </div>
  )
}

export default CaptainLogout
