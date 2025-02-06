import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/productApi";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import icon_dilevery from "../../assets/images/icon-delivery.svg";
import icon_return from "../../assets/images/Icon_return.svg";
import "../home/Loader.css";


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = useGetSingleProductQuery(Number(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#000");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("S");
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
      <div className=" flex justify-center my-16">
        <div className="loader "></div>
      </div>
    );
  if (error) return <p>Error loading product details!</p>;

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-500 text-lg">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6  container flex flex-col md:flex-row">
      {product && (
        <>
          <div className="flex flex-col gap-2 ">
            {product.images.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className="w-16 h-16 object-cover cursor-pointer border-2 rounded-md hover:opacity-75 transition"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="flex flex-col  md:flex-row w-full justify-between">
            <div className="w-full md:w-1/2 mr-32">
              <img
                src={selectedImage || product.thumbnail}
                alt={product.title}
                className="w-full h-[500px] object-cover rounded-md  "
              />
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-2xl font-bold">{product.title}</h2>

              <div className="flex items-center gap-2">
                {renderStars(product.rating)}
                <span className="text-gray-500">({product.rating})</span>
              </div>

              <p className="text-lg font-semibold text-gray-800">
                ${product.price}
              </p>
              <p className="text-gray-700 py-7 border-b-2">
                {product.description}
              </p>

              <div className="flex items-center gap-4">
                <h4 className="font-semibold">Colors:</h4>
                <div className="flex gap-2 mt-2">
                  {["#000", "#DB4444"].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 transition ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <h4 className="font-semibold">Size:</h4>
                <div className="flex gap-2 mt-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className={`w-12 h-12 flex items-center justify-center rounded-md  border-2 transition ${
                        selectedSize === size
                          ? "bg-[#DB4444] text-white border-[#DB4444]"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Select size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 border">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 border-r rounded hover:bg-[#DB4444] hover:text-white transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 border-l  rounded hover:bg-[#DB4444] hover:text-white transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button className="w-full bg-[#DB4444] text-white px-6 py-2 rounded text-lg transition">
                  Buy Now
                </button>
                <button
                  onClick={() => handleWishlist(product.id)}
                  className="bg-white border-black  border-[1px] rounded-md p-1"
                >
                  <FaHeart
                    className={
                      wishlist.includes(product.id)
                        ? "text-red-500 w-8 h-8"
                        : "text-gray-400 w-8 h-8"
                    }
                  />
                </button>
              </div>
              <div className="border-[1px] border-black">
                <div className="flex items-center gap-4 border-b-[1px] border-black py-3 px-3">
                  <div>
                    <img src={icon_dilevery} alt="icon_delivey" />
                  </div>
                  <div>
                    <p className="font-semibold text-[20px]">Free Delivery</p>
                    <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 py-3 px-3">
                  <div>
                    <img src={icon_return} alt="icon_return" />
                  </div>
                  <div>
                    <p className="font-semibold text-[20px]">Return Delivery</p>
                    <p>Free 30 Days Delivery Returns. Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
