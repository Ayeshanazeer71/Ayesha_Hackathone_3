// import Image from 'next/image';
import Image from "next/image"
import React from 'react';
import Brand from '../components/brand';

const About = () => {
  return (
    <section>
      <div className="py-12 text-[#2A254B] mt-2">
        {/* Header Section */}
        <div className="my-12 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            A Brand Built on the Love of Craftsmanship, Quality, and Outstanding Customer Service
          </h1>
        </div>

        {/* First Content Block */}
        <div className="flex flex-col md:flex-row gap-8 mt-24">
          <div className="w-full md:w-1/2 px-4 md:px-12 py-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                From a Studio in London to a Global Brand with Over 400 Outlets
              </h2>
              <p className="py-6 text-base md:text-lg">
                When we started Avion, the idea was simple: make high-quality furniture affordable and available for the mass market.
              </p>
              <p className="text-sm md:text-base">
                Handmade and lovingly crafted furniture and homeware is what we live, breathe, and design. Our Chelsea boutique became the hotbed for the London interior design community.
              </p>
            </div>
            <div className="my-10">
              <button className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition-all duration-300">
                Get in Touch
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-auto">
            <Image
              src="/images/blend.png"
              height={800}
              width={800}
              alt="Chair"
              className="w-full h-full object-cover"
              loading="lazy" // Lazy load image for performance
            />
          </div>
        </div>

        {/* Second Content Block */}
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="w-full md:w-1/2 h-auto">
            <Image
              src="/images/gul.png"
              height={800}
              width={800}
              alt="Chair"
              className="w-full h-full object-cover"
              loading="lazy" // Lazy load image for performance
            />
          </div>

          <div className="w-full md:w-1/2 px-4 md:px-12 py-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                From a Studio in London to a Global Brand with Over 400 Outlets
              </h2>
              <p className="py-6 text-base md:text-lg">
                When we started Avion, the idea was simple: make high-quality furniture affordable and available for the mass market.
              </p>
              <p className="text-sm md:text-base">
                Handmade and lovingly crafted furniture and homeware is what we live, breathe, and design. Our Chelsea boutique became the hotbed for the London interior design community.
              </p>
            </div>
            <div className="my-10">
              <button className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition-all duration-300">
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        {/* What Makes Our Brand Different Section */}
        <Brand />
        

        {/* Newsletter Signup Section */}
        <div
          className="w-full h-[444px] bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage: "url('/images/back.png')",
          }}
        >
          <div className="w-full flex flex-col md:flex-row items-center justify-center">
            <input
              type="text"
              placeholder="your@email.com"
              className="p-4 bg-[#F9F9F9] w-[350px] md:w-[354px] h-[56px] outline-none mb-4 md:mb-0"
            />
            <button className="p-2 bg-[#2A254B] text-white w-[200px] md:w-[118px] h-[56px]">
              Signup
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
