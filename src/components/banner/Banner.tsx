import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/BgqJYVw/Banner-Image-Template-5ca020fa-f643-4599-afb2-f6df4974d328.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Go CarWash: Shine On the Go!</h1>
        {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">FAST, FUN, FLOWLESS: GO CAR WASH</h1> */}
        <p className="text-lg md:text-xl mb-8">At Go CarWash, we believe that every car deserves to shine. Our eco-friendly car wash services provide a convenient and thorough cleaning experience that enhances the look of your vehicle while protecting the environment.</p>
        {/* <p className="text-lg md:text-xl mb-8">At Go Car Wash, we protect one of your most treasured possessions: your vehiles.After each GO was, experience the same pride of ownershipp as you did the day you took your vehicle off the lot!</p> */}
        <Link to="/all-service" >
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition duration-300">
          Book Your Wash!
        </button>
        </Link>
      </div>

     

   
    </div>
  );
};

export default Hero;
