import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <section className="px-8 py-12">
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-[60%] h-auto md:h-[580px] bg-[#2A254B] text-white px-4 md:px-12 py-6 md:py-12 flex flex-col justify-between border border-black">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              The furniture brand for the future with <br /> the timeless designs
            </h1>
            <div className="flex justify-center md:justify-start mt-6 md:mt-12">
              <button className="w-[170px] h-[56px] bg-transparent text-white border border-gray-600 font-bold hover:bg-gray-700 transition-colors">
                View collection
              </button>
            </div>
          </div>

          <div className="my-4 md:my-0">
            <p className="text-sm md:text-base">
              A new era in eco-friendly furniture with Avion, the French luxury retail brand
              <br /> with sleek fonts, full colors, and a beautiful way to display things digitally
              <br /> using modern web technologies.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex w-full md:w-[40%] h-auto md:h-[580px] bg-white justify-center items-end">
          <Image 
            src={'/images/rightt.png'} 
            width={400} 
            height={400} 
            alt="right" 
            loading="lazy" // Lazy loading for performance
            className="object-cover" // Ensures the image fits within its container
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
