"use client"; // This is an interactive component

import { useWishlist } from "../context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { AiOutlineDelete } from "react-icons/ai"; // React Icons import

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  // Memoize the wishlist to avoid unnecessary re-renders
  const memoizedWishlist = useMemo(() => wishlist, [wishlist]);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  return (
    <section className="px-6 md:px-12 py-16 text-[#2A254B]">
      <h1 className="text-3xl font-bold text-center md:text-4xl mb-10">My Wishlist</h1>
      
      {memoizedWishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {memoizedWishlist.map((product) => (
            <div
              key={product._id}
              className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-[1.05] hover:shadow-2xl duration-300"
            >
              {/* Product Image */}
              <Link href={`/products/${product.slug}`} className="block">
                <Image
                  src={product.imageUrl}
                  height={700}
                  width={700}
                  alt={product.name}
                  className="w-full h-[250px] object-cover rounded-t-lg transition-transform duration-300 ease-in-out"
                  loading="lazy"
                />
              </Link>

              {/* Product Info */}
              <div className="p-5 text-[#2A254B]">
                <p className="text-lg font-semibold truncate">{product.name}</p>
                <p className="text-sm text-gray-500 mt-1">${product.price}</p>

                {/* Delete Button with Animation */}
                <button
                  className="mt-4 w-full flex justify-center items-center bg-red-500 text-white py-2 px-4 rounded-full transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95 focus:ring focus:ring-red-300"
                  onClick={() => handleRemove(product._id)}
                >
                  <AiOutlineDelete size={22} className="transition-transform duration-200 hover:rotate-12" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">Your wishlist is empty 🛒</p>
      )}
    </section>
  );
}
