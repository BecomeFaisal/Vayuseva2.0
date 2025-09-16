import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {
     const navigate = useNavigate();

        const [email,setEmail]=useState("");
        const [password,setPassword]=useState("");
        const [firstname,setfirstname]=useState("");
        const [lastname,setlastname]=useState("");
        const [userData,setUserData]=useState({});
        const {captain,setCaptain}= React.useContext(CaptainDataContext);
        const [vehicleColor, setVehicleColor] = useState("");
        const [vehiclePlate, setVehiclePlate] = useState("");
        const [vehicleCapacity, setVehicleCapacity] = useState("");
        const [vehicleType, setVehicleType] = useState("");
        
        
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorsArr, setErrorsArr] = useState([]);

    const submitHandler = async(e) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      try{
        // quick client-side checks to avoid predictable validation errors
        const validationProblems = [];
        if (!firstname || firstname.trim().length < 3) validationProblems.push('First name must be at least 3 characters long');
        if (!password || password.length < 6) validationProblems.push('Password must be at least 6 characters long');
        if (!vehicleColor || vehicleColor.trim().length < 3) validationProblems.push('Vehicle color must be at least 3 characters long');
        if (!vehiclePlate || vehiclePlate.trim().length < 3) validationProblems.push('Vehicle plate must be at least 3 characters long');
        if (!vehicleCapacity || Number(vehicleCapacity) < 1) validationProblems.push('Vehicle capacity must be at least 1');
        if (!vehicleType) validationProblems.push('Select a vehicle type');
        if (validationProblems.length) {
          setError(validationProblems.join('; '));
          setLoading(false);
          return;
        }
    // Backend expects `vehicle` object with keys: color, plate, capacity, vehicleType
    const captainData = {
      email,
      password,
      fullname: { firstname, lastname },
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
                // backend validator expects one of ['drone1','drone2','drone3']
                vehicleType: vehicleType,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
       if(response.status===201){
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token',data.token);
        navigate('/captain-home');
       }
      // reset only after success/navigated; keep simple reset here
      setEmail("");
      setPassword("");
      setfirstname("");
      setlastname("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
      }catch(err){
        // Helpful logging for debugging
        console.error('Captain signup error', err);
        const resp = err?.response?.data;
        console.error('Signup response data:', resp || err?.response || err);
        // express-validator returns { errors: [ { msg, param, ... } ] }
        if (resp) {
          if (Array.isArray(resp.errors)) {
            setErrorsArr(resp.errors);
            const msgs = resp.errors.map(e => e.msg || e.message || `${e.path || e.param}: invalid`).join('; ');
            setError(msgs);
          } else if (resp.message) {
            setError(resp.message);
          } else if (typeof resp === 'string') {
            setError(resp);
          } else {
            setError('Failed to register. Check input and try again.');
          }
        } else {
          setError('Failed to register. Check input and try again.');
        }
      }finally{
        setLoading(false);
      }
    }
  return (
     <div>
       <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className=" w-20 mb-2" src="/AsLogo.png" alt="Vayuseva logo" />

        <form onSubmit={(e)=>{submitHandler(e)}} className="mt-10">
          
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div children="flex gap-4 mb-5">
             <input
            type="text"
            required
            className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border  text-base placeholder:text-sm"
            placeholder="First Name"
            value={firstname} onChange={(e)=>{setfirstname(e.target.value)} }
          /> 

          <input
            type="text"
            required
            className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm"
            placeholder="Last Name"
            value={lastname} onChange={(e)=>{setlastname(e.target.value)} } 
          />
          </div>
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            type="email"
            required
           
            className="bg-[#eeeeee] mb-5  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            placeholder="email@example.com"
            value={email} onChange={(e)=>{setEmail(e.target.value)} }   
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>

          <input
            type="password"
            required
            className="bg-[#eeeeee] mb-5  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            placeholder="password"
            value={password} onChange={(e)=>{setPassword(e.target.value)} }

          />
        <h3 className="text-base font-medium mb-2">Vehicle Details</h3>
        <div className="flex gap-4 mb-5">
            <input
                type="text"
                required
                className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
                type="text"
                required
                className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
            />
        </div>
        <div className="flex gap-4 mb-5">
            <input
                type="number"
                required
                min="1"
                className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
                required
                className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
            >
                <option value="" disabled>
                    Select Vehicle Type
                </option>
                <option value="drone1">Drone 1</option>
                <option value="drone2">Drone 2</option>
                <option value="drone3">Drone 3</option>
            </select>
        </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}
          {errorsArr && errorsArr.length > 0 && (
            <ul className="text-sm text-red-600 mb-2 list-disc list-inside">
              {errorsArr.map((e, idx) => (
                <li key={idx}>{e.msg || e.message || `${e.param || e.path}: invalid`}</li>
              ))}
            </ul>
          )}
          <button type="submit" disabled={loading} className="text-white font-semibold mb-3 bg-black rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            {loading ? 'Creating...' : 'Create Associate Account'}
          </button>
          <p className="text-center ">
             Already Have an Associate Account?
            <Link to={"/captain-login"} className="text-blue-600">
              {" "}
              Login Here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={'/login'} className="bg-[#00A5E3]  flex items-center justify-center text-white font-semibold mb-5  rounded px-4 py-2 border w-full text-lg placeholder:text-base">
          Sign in as User
        </Link>
      </div>
    </div>
    </div>
  )
}

export default CaptainSignup
