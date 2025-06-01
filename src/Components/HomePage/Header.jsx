import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import abvlogo from "../HomePage/Assets/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold flex items-center">
          <img src={abvlogo} alt="ABV Logo" className="h-10 mr-2" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          {[
            "Apartments",
            "Individual House",
            "Ongoing Projects",
            "Contact Us",
            "Blogs",
          ].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a href="#" className="hover:text-orange-500">
                {item}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <motion.button
            className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100"
            whileHover={{ scale: 1.1 }}
          >
            Post Your Property
          </motion.button>
          <motion.button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            whileHover={{ scale: 1.1 }}
          >
            Login
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="md:hidden flex flex-col bg-gray-200 mt-2 p-4 space-y-3 text-center text-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {[
              "Apartments",
              "Individual House",
              "Ongoing Projects",
              "Contact Us",
              "Blogs",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-orange-500">
                  {item}
                </a>
              </li>
            ))}
            <li>
              <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-100 w-full">
                Post Your Property
              </button>
            </li>
            <li>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 w-full">
                Login
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}