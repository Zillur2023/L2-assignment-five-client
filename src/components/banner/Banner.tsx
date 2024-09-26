import React from 'react';

const BannerSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-8">
      {/* Left Side - Image */}
      <div className="w-full h-full md:w-1/2 mb-4 md:mb-0">
        <img
          src="https://i.ibb.co.com/BgqJYVw/Banner-Image-Template-5ca020fa-f643-4599-afb2-f6df4974d328.png"
          alt="Banner"
          className="w-full h-96 object-fill rounded"
          // className="w-96 h-96 object-fill rounded-full"
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Banner Title
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          This is a sample description text for the banner section. Add some
          details here to attract your users.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Call to Action
        </button>
      </div>
    </div>
  );
};

export default BannerSection;
