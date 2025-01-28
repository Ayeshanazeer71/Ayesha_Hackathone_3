'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { Loader } from 'lucide-react';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

type Product = {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
};

const fetchProducts = async () => {
  const query = `*[_type == "product"]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    price
  }`;
  return await client.fetch(query);
};

const Product = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    getData();
  }, []);

  const handleNavigation = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <section className="px-8 py-12 text-[#2A254B] mt-12">
      <h1 className="text-2xl font-semibold ">Our Popular Products</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin text-[#2A254B]" size={48} />
        </div>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          modules={[Pagination, Autoplay]}
          className="mt-8 pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div
                className="w-full md:w-[390px] h-auto cursor-pointer"
                onClick={() => handleNavigation(product.slug)}
              >
                <Image
                  src={product.imageUrl}
                  height={800}
                  width={800}
                  alt={product.name}
                  className="w-full h-[300px] object-cover rounded-md transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="mt-4">
                  <p className="py-2 text-lg font-medium">{product.name}</p>
                  <p className="text-xl font-semibold">${product.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* Pagination Dots Below Price */}
          <div className="custom-pagination mt-6 flex justify-center"></div>
        </Swiper>
      )}

      <div className="my-10 flex justify-center">
        <button
          className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B] font-medium transition duration-300 ease-in-out hover:bg-[#2A254B] hover:text-white"
          onClick={() => router.push('/products')}
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default Product;
