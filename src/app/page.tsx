"use client";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import SnowfallComp from "./SnowfallComp";
import Sun from "./Sun";
import Search from "./Search";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 flex flex-col">
      {" "}
      <div className="absolute inset-0 z-20">
        <SnowfallComp />
      </div>
      <div className="absolute -inset-0 z-10 w-full">
        <Navbar />
      </div>
      <div className="absolute z-30  w-full flex justify-center items-center h-screen">
        <Search />
      </div>
      <div className="absolute -z-0 w-10">
        <motion.div
          initial={{ y: -100, x: -100 }}
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="text-9xl absolute -z-0 drop-shadow-2xl animate-spin-slow w-14 h-14 m-60"
        >
          <Sun />
        </motion.div>
      </div>
      <div className="mt-auto w-full relative">
        <img
          src="/image/for-removebg-preview.png"
          className="w-full h-auto"
          alt="Background"
        />
      </div>
    </div>
  );
}
