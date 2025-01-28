'use client'
import React, { useState } from 'react';

const Benefit = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      // Handle form submission logic here
      console.log('Email submitted:', email);
    }
  };

  return (
    <section>
      <div className='py-12 bg-[#F9F9F9] text-[#2A254B] mt-12'>
        <div className='w-full max-w-[640px] md:max-w-[1340px] h-[350px] bg-white mx-auto flex justify-center items-center flex-col px-4'>
          <h1 className='text-2xl md:text-4xl text-center font-semibold'>
            Join the club and get the benefits
          </h1>
          <h2 className='text-center py-4 md:text-base'>
            Sign up for our newsletter and receive exclusive offers on new
            <br /> ranges, sales, pop-up stores, and more.
          </h2>
          <div className='mt-4 w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center justify-center'>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="your@email.com"
                className="p-4 bg-[#F9F9F9] w-full md:w-[354px] h-[56px] outline-none mb-4 md:mb-0"
                aria-label="Email Address"
                required
              />
              <button
                type="submit"
                className='p-2 bg-[#2A254B] text-white w-full md:w-[118px] h-[56px]'
                disabled={!email}
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
