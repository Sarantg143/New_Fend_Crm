import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import abvlogo from "../HomePage/Assets/logo.png";

export default function ClientNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 bg-white">
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
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: "#EA580C" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a href="#">{item}</a>
            </motion.li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100"
          >
            Post Your Property
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col bg-gray-200 mt-2 p-4 space-y-3 text-center text-gray-700"
          >
            {[
              "Apartments",
              "Individual House",
              "Ongoing Projects",
              "Contact Us",
              "Blogs",
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1, color: "#EA580C" }}
              >
                <a href="#">{item}</a>
              </motion.li>
            ))}
            <li>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-100 w-full"
              >
                Post Your Property
              </motion.button>
            </li>
            <li>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 w-full"
              >
                Login
              </motion.button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
