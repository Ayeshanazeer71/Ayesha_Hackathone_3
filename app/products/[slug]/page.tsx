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
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl,
      description: product.description,
    }));
    showPopup("Item added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    addToWishlist({ ...product, _id: product._id.toString() });
    showPopup("Item added to wishlist!");
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
      <div className="flex flex-col md:flex-row gap-8 items-center bg-white shadow-lg p-8 rounded-lg transform transition-transform ">
        <div className="w-full md:w-1/2">
          <Image
            src={product.imageUrl}
            width={600}
            height={600}
            alt={product.name}
            className="w-full h-[540px] sm:h-[300px] md:h-[600px] object-cover rounded-lg transition-all ease-in-out transform hover:scale-105"
            priority
          />

        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-4xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-2xl text-gray-700">${product.price}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="mt-6 p-6 border border-gray-300 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-6 border rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Product Dimensions</h3>
            <div className="text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Width:</span>
                <span>{product.dimensions.width} </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Height:</span>
                <span>{product.dimensions.height} </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Depth:</span>
                <span>{product.dimensions.depth} </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              className="px-8 py-4 bg-gradient-to-r from-[#6A4C93] to-[#2A254B] text-white rounded-lg transform transition-transform hover:scale-105"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="px-8 py-4 bg-red-600 text-white rounded-lg transform transition-transform hover:scale-105"
              onClick={handleAddToWishlist}
            >
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

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                onClick={() => setCurrentSlug(item.slug)}
              >
                <Image
                  src={item.imageUrl}
                  width={200}
                  height={200}
                  alt={item.name}
                  className="w-full h-[200px] object-cover rounded-md"
                  loading="lazy"
                />
                <h3 className="mt-4 text-lg font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <Brand />
    </section>
  );
};

export default ProductListing;
