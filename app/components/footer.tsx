'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebookSquare, FaTwitter, FaPinterest } from 'react-icons/fa';
import { IoLogoSkype } from 'react-icons/io';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      // Handle email submission logic here
      console.log('Email submitted:', email);
    }
  };

  return (
    <div className="px-6 md:px-12 py-12 bg-[#2A254B] mt-12">
      <div className="flex flex-wrap gap-12 md:gap-[100px] lg:gap-[200px]">
        {/* Menu Section */}
        <div className="text-white w-full sm:w-auto">
          <h2 className="text-lg md:text-xl font-bold">Menu</h2>
          <ul className="space-y-2">
            <li><Link href="/">New Arrivals</Link></li>
            <li><Link href="/">Best Sellers</Link></li>
            <li><Link href="/">Recently Viewed</Link></li>
            <li><Link href="/">Popular this Week</Link></li>
            <li><Link href="/">All Products</Link></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className="text-white w-full sm:w-auto">
          <h2 className="text-lg md:text-xl font-bold">Categories</h2>
          <ul className="space-y-2">
            <li><Link href="/">Crockery</Link></li>
            <li><Link href="/">Furniture</Link></li>
            <li><Link href="/">Homeware</Link></li>
            <li><Link href="/">Plant Pots</Link></li>
            <li><Link href="/">Chairs</Link></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="text-white w-full sm:w-auto">
          <h2 className="text-lg md:text-xl font-bold">Our Company</h2>
          <ul className="space-y-2">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/">Vacancies</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/">Privacy</Link></li>
            <li><Link href="/">Return Policy</Link></li>
          </ul>
        </div>

        {/* Mailing List Section */}
        <div className="text-white w-full sm:w-auto">
          <h2 className="text-lg md:text-xl font-bold">Join Our Mailing List</h2>
          <form onSubmit={handleEmailSubmit} className="mt-4 flex flex-col sm:flex-row items-center justify-center">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
              className="w-full sm:w-[250px] lg:w-[300px] h-[48px] p-2 bg-transparent opacity-80 border border-white rounded-md"
              aria-label="Email Address"
              required
            />
            <button type="submit" className="mt-2 sm:mt-0 sm:ml-2 w-full sm:w-[100px] h-[48px] bg-white text-[#2A254B] rounded-md">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <hr className="bg-[#4E4D93] my-8" />

      {/* Footer Bottom Section */}
      <div className="flex flex-wrap justify-between items-center text-white gap-4">
        <div>
          <p>© 2022 Avion LTD. All Rights Reserved.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </Link>
          <Link href="/" aria-label="Facebook">
            <FaFacebookSquare size={20} />
          </Link>
          <Link href="/" aria-label="Instagram">
            <FaInstagram size={20} />
          </Link>
          <Link href="/" aria-label="Skype">
            <IoLogoSkype size={20} />
          </Link>
          <Link href="/" aria-label="Twitter">
            <FaTwitter size={20} />
          </Link>
          <Link href="/" aria-label="Pinterest">
            <FaPinterest size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
