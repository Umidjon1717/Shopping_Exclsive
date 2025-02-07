import apple from "../../assets/images/apple.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import hero from "../../assets/images/hero.png";
import ProductList from "./Product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate(); 
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto px-6 my-10">
        <div className="bg-black text-white flex flex-col md:flex-row items-center py-12 px-6 md:px-12 shadow-lg">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src={apple} alt="apple" className="w-8 h-8" />
              <p className="text-lg font-medium">iPhone 14 Series</p>
            </div>
            <h2 className="text-4xl md:text-5xl w-full md:w-[294px] font-bold leading-tight text-center md:text-left">
              Up to 10% off Voucher
            </h2>
            <div className="flex items-center gap-3 cursor-pointer pb-1 w-fit transition mx-auto md:mx-0">
              <button onClick={() => navigate("/products")} className="text-lg font-semibold border-b-2">Shop Now</button>
              <FaArrowRightLong size={24} />
            </div>
          </div>
          <div className="mt-6 md:mt-0 md:ml-10 flex justify-center w-full">
            <img src={hero} alt="hero" className="w-full max-w-[300px] md:max-w-[500px] object-contain" />
          </div>
        </div>
      </div>
      <button 
        className="md:hidden fixed top-4 right-4 bg-black text-white p-2 rounded-lg z-50" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>
      <nav className={`fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
        <a href="/" className="text-lg py-2">Home</a>
        <a href="/products" className="text-lg py-2">Products</a>
        <a href="/about" className="text-lg py-2">About</a>
        <a href="/contact" className="text-lg py-2">Contact</a>
      </nav>
      <ProductList />
    </>
  );
};

export default Home;
