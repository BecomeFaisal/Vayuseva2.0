import React from "react";
import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData,setUserData]=useState({});

    const {user,setUser}= React.useContext(UserDataContext);
    const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {email:email,password:password};
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData);
    if(response.status===200){
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token',JSON.stringify(data.token));
        navigate('/Home');}
    setEmail("");
    setPassword("");
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className=" w-25 mb-2" src="/logo.png" alt="Vayuseva logo" />

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

          <button className="text-white font-semibold mb-3 bg-black rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className="text-center ">
            New Here?
            <Link to={"/signup"} className="text-blue-600">
              {" "}
              Create New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={'/captain-login'} className="bg-[#00A5E3]  flex items-center justify-center text-white font-semibold mb-5  rounded px-4 py-2 border w-full text-lg placeholder:text-base">
          Sign in as Associate
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
