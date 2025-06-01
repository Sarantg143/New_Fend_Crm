import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import abvlogo from "../HomePage/Assets/logo.png";

export default function PropertyNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" p-4 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold flex items-center">
          <img src={abvlogo} alt="ABV Logo" className="h-10 mr-2" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          {[
            "About us",
            "Why us",
            "Properties",
            "Testimonials",
            "Contact us",
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: "#EA580C" }}
              transition={{ duration: 0.3 }}
            >
              <a href="#" className="hover:text-orange-500">
                {item}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Enquiry Button (Always Visible) */}
        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
            Enquiry now
          </button>
        </motion.div>

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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden flex flex-col bg-gray-200 mt-2 p-4 space-y-3 text-center text-gray-700"
          >
            {[
              "About us",
              "Why us",
              "Properties",
              "Testimonials",
              "Contact us",
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1, color: "#EA580C" }}
                transition={{ duration: 0.3 }}
              >
                <a href="#" className="hover:text-orange-500">
                  {item}
                </a>
              </motion.li>
            ))}
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
                Enquiry now
              </button>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
