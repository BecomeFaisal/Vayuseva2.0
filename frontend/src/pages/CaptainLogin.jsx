import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
    const navigate = useNavigate();
    
      const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
          const captain = { email: email, password: password };
          // backend route: POST /captain/login
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain);
          if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
          }
          setEmail("");
          setPassword("");
        } catch (err) {
          console.error('Captain login error', err);
          const resp = err?.response?.data;
          if (resp) {
            setError(resp.message || (Array.isArray(resp.errors) ? resp.errors.map(e=>e.msg||e.message).join('; ') : JSON.stringify(resp)));
          } else {
            setError('Failed to login. Check credentials and try again.');
          }
        } finally {
          setLoading(false);
        }
      }
    
  return (
    <div>
       <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className=" w-25 mb-2" src="/AsLogo.png" alt="Vayuseva logo" />

        <form onSubmit={(e)=>{submitHandler(e)}} className="mt-10">
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            type="password"
            required
            className="bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button type="submit" disabled={loading} className="text-white font-semibold mb-3 bg-black rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center ">
            Join Our Mission?
            <Link to={"/captain-signup"} className="text-blue-600">
              {" "}
              Register as Associate
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={'/login'} className="bg-[#72bf6a]  flex items-center justify-center text-white font-semibold mb-5  rounded px-4 py-2 border w-full text-lg placeholder:text-base">
          Sign in as User
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Captainlogin
