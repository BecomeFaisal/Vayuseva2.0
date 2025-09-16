import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [firstname,setfirstname]=useState("");
    const [lastname,setlastname]=useState("");
    const [userData,setUserData]=useState({});
    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({email:email,password:password,fullname:{firstname:firstname,lastname:lastname}});
        setEmail("");
        setPassword("");
        setfirstname("");
        setlastname("");
    }
  return (
    <div>
       <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className=" w-20 mb-2" src="/logo.png" alt="Vayuseva logo" />

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

          <button className="text-white font-semibold mb-3 bg-black rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            Sign Up
          </button>
          <p className="text-center ">
             Already Have a Account?
            <Link to={"/login"} className="text-blue-600">
              {" "}
              Login Here
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
    </div>
  )
}

export default UserSignup
