'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'



const Touch = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/contact')
  }
  return (
    <>
      <section className="py-12 text-[#2A254B] mt-12">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="w-full md:w-[720px] h-auto px-4 md:px-12 py-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 md:mb-6">
                From a studio in London to a global brand with over 400 outlets
              </h1>
              <h2 className="py-4 text-lg md:text-xl leading-relaxed">
                When we started Avion, the idea was simple. Make high-quality furniture affordable and available for the mass market.
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Handmade and lovingly crafted furniture and homeware is what we live, breathe, and design. Our Chelsea boutique became the hotbed for the London interior design community.
              </p>
            </div>

            {/* Get in touch Button */}
            <div className="my-10">
              <button className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B] font-medium transition duration-300 ease-in-out hover:bg-[#2A254B] hover:text-white" onClick={handleButtonClick}>
                Get in touch
              </button>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="w-full md:w-[890px] h-auto mt-6 md:mt-0">
            <Image
              src="/images/blend.png"
              height={800}
              width={800}
              alt="Decorative Furniture"
              className="w-full h-full object-cover"
              loading="lazy" // Lazy load image for better performance
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Touch;
