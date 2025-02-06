import logo from "../../assets/images/logo.svg";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";

import { links } from "../../static";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
const Header = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="border-b">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div className="flex items-center space-x-10">
            {links.map((link, index) => (
              <a key={index} href={link.url}>
                {link.title}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-8">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full pl-3 pr-12 py-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m2.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-4">
            <NavLink to={"/wishlist"} className="relative">
              <FaRegHeart size={26} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
              <IoCartOutline size={26} />
              <IoPersonOutline size={26} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
