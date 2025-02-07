import logo from "../../assets/images/logo.svg";
import { IoCartOutline, IoLogOutOutline, IoMenu, IoClose } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { links } from "../../static";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const accessToken = localStorage.getItem("accessToken");

  const handleProfileClick = () => {
    if (accessToken) {
      navigate("/profile");
    } else {
      alert("You need to log in first!");
    }
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/signUp");
    }
  };

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    }
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, [accessToken]);

  return (
    <div className="border-b bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <img src={logo} alt="logo" className="h-10" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <NavLink key={index} to={link.url} className="text-gray-700 hover:text-blue-500">
                {link.title}
              </NavLink>
            ))}
          </div>

          {/* Icons and Profile */}
          <div className="flex items-center space-x-6">
            <NavLink to="/wishlist" className="relative">
              <FaRegHeart size={26} className="text-gray-700 hover:text-red-500 transition" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
            <IoCartOutline size={26} className="text-gray-700 hover:text-green-500 transition cursor-pointer" />
            <div onClick={handleProfileClick} className="cursor-pointer">
              {isLoggedIn ? (
                <div className="w-8 h-8 bg-[#DB4444] text-white flex items-center justify-center rounded-full text-lg font-semibold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <IoPersonOutline size={26} className="text-gray-700 hover:text-blue-500 transition" />
              )}
            </div>
            {isLoggedIn && (
              <IoLogOutOutline size={26} onClick={handleLogout} className="text-gray-700 hover:text-red-500 transition cursor-pointer" />
            )}

            {/* Hamburger Button for Mobile */}
            <div className="md:hidden flex items-center">
              {isMenuOpen ? (
                <IoClose size={30} className="cursor-pointer" onClick={() => setIsMenuOpen(false)} />
              ) : (
                <IoMenu size={30} className="cursor-pointer" onClick={() => setIsMenuOpen(true)} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white border-t">
            {links.map((link, index) => (
              <NavLink key={index} to={link.url} className="text-gray-700 hover:text-blue-500">
                {link.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
