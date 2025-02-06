import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const likedProducts = data.products.filter((product: any) =>
          wishlist.includes(product.id)
        );
        setProducts(likedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (wishlist.length > 0) {
      fetchProducts();
    }
  }, [wishlist]);


  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {products.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 relative">
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
              >
                <FaHeart className="text-red-500" />
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
      )}
    </div>
  );
};

export default Wishlist;
