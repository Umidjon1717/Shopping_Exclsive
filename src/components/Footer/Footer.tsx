import { MdOutlineSend } from "react-icons/md";
import QR from "../../assets/images/QR.svg";
import storeA from "../../assets/images/storeA.svg";
import playM from "../../assets/images/playM.svg";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-2">Exclusive</h2>
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="text-gray-400 mb-3">Get 10% off your first order</p>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full pl-3 pr-12 py-2 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <MdOutlineSend color="#9CA3AF" style={{ fontSize: "1.5rem" }} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Support</h2>
            <p className="text-gray-400">111 Bijoy Sarani, Dhaka, <br /> DH 1515, Bangladesh.</p>
            <p className="text-gray-400">exclusive@gmail.com</p>
            <p className="text-gray-400">+88015-88888-9999</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Account</h2>
            <p className="text-gray-400">My Account</p>
            <p className="text-gray-400">Login / Register</p>
            <p className="text-gray-400">Cart</p>
            <p className="text-gray-400">Wishlist</p>
            <p className="text-gray-400">Shop</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Quick Link</h2>
            <p className="text-gray-400">Privacy Policy</p>
            <p className="text-gray-400">Terms Of Use</p>
            <p className="text-gray-400">FAQ</p>
            <p className="text-gray-400">Contact</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Download App</h2>
            <p className="text-gray-400">Save $3 with App New User Only</p>
            <div className="flex gap-4 mt-3">
              <div>
                <img src={QR} alt="QR Code" className="w-20 h-20" />
              </div>
              <div className="flex flex-col gap-2">
                <img src={storeA} alt="App Store" className="w-32" />
                <img src={playM} alt="Google Play" className="w-32" />
              </div>
            </div>
            <div className="flex gap-7 items-center text-white my-5">
              <FaFacebookF style={{ fontSize: "1.2rem" }}/>
              <FaTwitter style={{ fontSize: "1.2rem" }}/>
              <FaInstagram style={{ fontSize: "1.2rem" }}/>
              <FaLinkedinIn style={{ fontSize: "1.2rem" }}/>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-center mt-10">© Copyright Rimel 2022. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
