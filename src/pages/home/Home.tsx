import apple from "../../assets/images/apple.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import hero from "../../assets/images/hero.png";
import ProductList from "./Product";

const Home = () => {
  return (
    <>
    <div className="container mx-auto px-6 my-10">
      <div className="bg-black text-white flex flex-col md:flex-row items-center  py-12 px-6 md:px-12 shadow-lg">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src={apple} alt="apple" className="w-8 h-8" />
            <p className="text-lg font-medium">iPhone 14 Series</p>
          </div>

          <h2 className="text-4xl md:text-5xl w-[294px] font-bold leading-tight">
            Up to <span >10% off</span> Voucher
          </h2>

          <div className="flex items-center gap-3 cursor-pointer  pb-1 w-fit transition">
            <p className="text-lg font-semibold border-b-2">Shop Now</p>
            <FaArrowRightLong size={24} />
          </div>
        </div>

        <div className="mt-6 md:mt-0 ml-10">
          <img src={hero} alt="hero" className="w-full max-w-[400px] md:max-w-[500px] object-contain" />
        </div>
      </div>
    </div>
    <ProductList/>
    </>
  );
};

export default Home;
