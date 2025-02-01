'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useWishlist } from '@/app/context/WishlistContext';
import { Loader } from 'lucide-react';
import { addToCart } from '@/app/redux/cartSlice';
import { client } from '@/sanity/lib/client';
import Brand from '@/app/components/brand';

type Product = {
  _id: number;
  name: string;
  slug: string;
  imageUrl: string;
  categoryName: string;
  description: string;
  price: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  tags: string[];
  features: string[];
};

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "categoryName": category->name,
    description,
    price,
    "dimensions": dimensions {
      width,
      height,
      depth
    },
    tags,
    features,
    "categorySlug": category->slug.current
  }`;

  const product = await client.fetch(query);
  if (!product) return null;

  const relatedQuery = `*[_type == "product" && category->slug.current == "${product.categorySlug}" && slug.current != "${slug}"]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    price
  }`;

  const relatedProducts = await client.fetch(relatedQuery);
  return { product, relatedProducts };
}

const ProductListing = ({ params }: { params: { slug: string } }) => {
  const [currentSlug, setCurrentSlug] = useState(params.slug);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { addToWishlist } = useWishlist();

  const fetchData = useCallback(async (slug: string) => {
    const data = await getData(slug);
    if (data) {
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts);
    }
  }, []);

  useEffect(() => {
    fetchData(currentSlug);
  }, [currentSlug, fetchData]);

  const handleAddToCart = () => {
    if (!product) return;
    let storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = storedCart.find((item: any) => item.id === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storedCart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageUrl,
        description: product.description,
      });
    }
    localStorage.setItem('cart', JSON.stringify(storedCart));
    dispatch(addToCart(existingItem || storedCart[storedCart.length - 1]));
    showPopup("Item added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const existingItem = storedWishlist.find((item: any) => item._id === product._id.toString());
    if (!existingItem) {
      const wishlistItem = { ...product, _id: product._id.toString() }; // Ensure _id is a string
      storedWishlist.push(wishlistItem);
      localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
      addToWishlist(wishlistItem); // Use wishlistItem with correct type
      showPopup("Item added to wishlist!");
    } else {
      showPopup("Item already in wishlist!");
    }
    
  };

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000);
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin text-[#2A254B]" size={48} />
    </div>;
  }

  return (
    <section className="px-6 md:px-12 py-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="flex flex-col md:flex-row gap-8 items-center bg-white shadow-lg p-8 rounded-lg">
        <div className="w-full md:w-1/2">
          <Image
            src={product.imageUrl}
            width={600}
            height={600}
            alt={product.name}
            className="w-full h-[540px] object-cover rounded-lg hover:scale-105 transition-transform"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-4xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-2xl text-gray-700">${product.price}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="flex gap-4 mt-8">
            <button className="px-8 py-4 bg-[#6A4C93] text-white rounded-lg hover:scale-105" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="px-8 py-4 bg-red-600 text-white rounded-lg hover:scale-105" onClick={handleAddToWishlist}>
              Wishlist ❤️
            </button>
          </div>
        </div>
      </div>
      {popupMessage && (
        <div className="fixed bottom-6 right-6 bg-[#2A254B] text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <p>{popupMessage}</p>
        </div>
      )}
      <Brand />
    </section>
  );
};

export default ProductListing;
