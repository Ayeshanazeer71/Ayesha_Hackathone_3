import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuSprout } from "react-icons/lu";
import { MdOutlinePriceChange } from "react-icons/md";

// Define the interface for brand items
interface BrandItem {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const brandItems: BrandItem[] = [
  {
    Icon: TbTruckDelivery,
    title: 'Next day as standard',
    description: 'Order before 3pm and get your order the next day as standard.',
  },
  {
    Icon: IoIosCheckmarkCircleOutline,
    title: 'Made by true artisans',
    description: 'Hand-crafted goods made with real passion and craftsmanship.',
  },
  {
    Icon: MdOutlinePriceChange,
    title: 'Unbeatable prices',
    description: 'For our material and quality, you won’t find better prices anywhere.',
  },
  {
    Icon: LuSprout,
    title: 'Recycled packaging',
    description: 'We use 100% recycled packaging to ensure our footprint is manageable.',
  },
];

const Brand = () => {
  return (
    <section className="px-4 md:px-8 py-12 text-[#2A254B] mt-12">
      {/* Title */}
      <h1 className="text-center text-xl md:text-2xl font-semibold">
        What makes our brand different
      </h1>

      {/* Features */}
      <div className="flex flex-col md:flex-row gap-8 mt-12 text-base md:text-lg">
        {brandItems.map((item, index) => (
          <div key={index} className="flex flex-col items-start md:w-1/4 p-4 rounded-lg">
            <item.Icon size={30} className="text-[#2A254B]" aria-hidden="true" />
            <h2 className="py-4 font-semibold">{item.title}</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brand;
