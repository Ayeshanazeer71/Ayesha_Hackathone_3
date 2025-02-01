"use client"; // Interactive component

import { createContext, useContext, useEffect, useState } from "react";

interface WishlistItem {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    // ✅ Load wishlist from localStorage when initializing state
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToWishlist = (product: WishlistItem) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item._id === product._id);
      if (!exists) {
        const updatedWishlist = [...prevWishlist, product];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // ✅ Update localStorage immediately
        return updatedWishlist;
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((item) => item._id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // ✅ Update localStorage immediately
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
