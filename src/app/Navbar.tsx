'use client'
import { useEffect, useState } from "react";
import { WiDaySunny } from "react-icons/wi"; 
import { motion } from "framer-motion"; 

const Navbar = () => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center p-2 lg:p-4 mt-6 mx-6 bg-white rounded-full shadow-lg shadow-gray-300 transition-all duration-500"
    >
      <motion.div
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center space-x-2 p-2 rounded-full shadow-lg relative 
      bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white 
      transition-transform hover:scale-105"
    >
      <div className="relative flex items-center justify-center w-8 h-8">
        <WiDaySunny className="text-yellow-300 text-4xl drop-shadow-lg" />
        <div className="absolute -z-10  w-12 h-8 bg-white rounded-full blur-md opacity-30"></div>
      </div>

      <span className="text-lg font-semibold transition duration-300 hover:text-yellow-300">
        Weather
      </span><div
        className={`w-3  h-3 rounded-full transition duration-500 ${
          isOnline ? "bg-green-500" : "bg-red-500"
        }`}
        title={isOnline ? "Online" : "Offline"}
      ></div>
    </motion.div> 
    <nav className="relative"> 
      <div className="flex justify-between items-center">
        
        <ul className=" md:flex space-x-2 md:space-x-4 "> 
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-500 transition font-semibold duration-100">
              About
            </a>
          </li>
        </ul>

   
      </div>
    </nav>
    </motion.nav>
  );
};

export default Navbar;
