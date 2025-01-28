"use client"; 
import { useWishlist } from "../context/WishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // React Icons import

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

export default function WishlistButton({ product }: { product: Product }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <button
      className={`p-2 rounded-full transition ${
        isInWishlist ? "text-red-500" : "text-gray-500 hover:text-red-500"
      }`}
      onClick={() => (isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product))}
    >
      {isInWishlist ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
    </button>
  );
}
