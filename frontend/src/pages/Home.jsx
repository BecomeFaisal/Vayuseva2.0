import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <div
                className="h-screen pt-8 w-full flex justify-between flex-col bg-cover"
                style={{ backgroundImage: "url('./public/bgimg.png')" }}
            >
                <img className=" w-30 ml-8 py-3 px-4" src="/logo.png" alt="" />

                <div className="bg-white py-4 px-4 pb-7">
                    <h2 className="text-3xl font-bold">Get Started With VayuSeva</h2>
                    <Link to={'/login'} className="flex items-center justify-center  w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;