"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image"
import Link from "next/link";
import WishlistButton from "../components/WishlistButton";
import { Loader } from "lucide-react";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

const itemsPerPage = 4; 

const ProductsPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = `*[_type == "product" && image.asset != null]{
        _id,
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        price
      }`;
      try {
        const result = await client.fetch(query);
        setData(result || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Memoized pagination logic
  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data]);
  const currentProducts = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, currentPage]);

  // 🔹 Pagination handlers
  const goToPreviousPage = useCallback(() => setCurrentPage((prev) => Math.max(prev - 1, 1)), []);
  const goToNextPage = useCallback(() => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), [totalPages]);
  const goToPage = useCallback((page: number) => setCurrentPage(page), []);

  return (
    <section className="px-4 md:px-8 py-12 text-[#2A254B] mt-12">
      <h1 className="text-2xl font-semibold md:text-3xl">New Ceramics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {loading ? (
          <div className="col-span-4 flex justify-center items-center" aria-live="polite">
            <Loader className="w-12 h-12 animate-spin text-[#2A254B]" />
          </div>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="w-full h-auto relative" key={product._id}>
              <Link href={`/products/${product.slug}`} passHref>
                <Image
                  src={product.imageUrl}
                  height={700}
                  width={700}
                  alt={`Image of ${product.name}`}
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-md"
                  {...(currentPage === 1 ? { priority: true } : { loading: "lazy" })}
                />
              </Link>

            
              <div className="absolute top-3 right-3">
                <WishlistButton product={product} />
              </div>

              <div className="my-4 text-[#2A254B]">
                <h2 className="py-2 text-sm sm:text-base font-medium">{product.name}</h2>
                <p className="text-lg font-semibold">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No products found</p>
        )}
      </div>

      
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav className="inline-flex items-center space-x-2 bg-white shadow-md rounded-lg px-4 py-2">
            {/* Previous Button */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md text-sm font-medium transition 
          ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              ⬅ Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition 
            ${currentPage === index + 1 ? "bg-[#2A254B] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md text-sm font-medium transition 
          ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              Next ➡
            </button>
          </nav>
        </div>
      )}
    </section>

  );
};

export default ProductsPage;
