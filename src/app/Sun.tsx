import { motion } from 'framer-motion'
import React from 'react'

function Sun() {
  return (
    <>
    <motion.div
  initial={{ opacity: 1, scale: 1.5 }}
  animate={{ opacity: 1, scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  className="flex justify-center items-center w-28 h-28 mx-6 mt-60 
  bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full 
  shadow-[0px_0px_40px_10px_rgba(253,186,116,0.7)] transition-all duration-1000ms"
></motion.div>
    </>
  )
}

export default Sun