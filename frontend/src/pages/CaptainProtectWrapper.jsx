import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.status === 200) {
                    setCaptain(res.data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Error fetching captain profile', err);
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        };

        fetchProfile();
    }, [token, navigate, setCaptain]);

    if (isLoading) return <div>Loading...</div>;

    return <>{children}</>;
};

export default CaptainProtectedWrapper;
