import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/productApi";
import { IProduct } from "../../types/types";
import { FaHeart } from "react-icons/fa";

const ProductList: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery({ limit: 8, skip: 0 });
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const handleWishlist = (productId: number) => {
    let updatedWishlist;

    if (wishlist.includes(productId)) {
      updatedWishlist = wishlist.filter((id) => id !== productId);
    } else {
      updatedWishlist = [...wishlist, productId];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (isLoading)
    return (
      <div className="flex justify-center my-8">
        <div className="loader"></div>
      </div>
    );
  if (error) return <p>Error fetching products!</p>;

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {data?.products.map((product: IProduct) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow relative">
            <button
              onClick={() => handleWishlist(product.id)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
            >
              <FaHeart className={wishlist.includes(product.id) ? "text-red-500" : "text-gray-400"} />
            </button>

            <Link to={`/products/${product.id}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2 h-12">{product.title}</h2>
              <p className="mt-1 text-red-500">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
