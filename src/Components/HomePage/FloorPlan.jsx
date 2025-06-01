import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { useInView } from "react-intersection-observer"; // Import useInView hook to detect visibility
import floorPlanMain from "./Assets/floorPlanMain.png";
import floorPlan1 from "./Assets/floorPlan1.png";
import floorPlan2 from "./Assets/floorPlan2.png";
import floorPlan3 from "./Assets/floorPlan3.png";
import Arrow from "../HomePage/Assets/Arrow.png";

const FloorPlan = () => {
  // Intersection Observer hook for detecting visibility
  const { ref: mainFloorPlanRef, inView: mainFloorPlanInView } = useInView({
    triggerOnce: false, // This ensures the animation triggers every time the element comes into view
    threshold: 0.2, // Adjust when the animation triggers (20% of the element should be visible)
  });

  const { ref: firstDropdownRef, inView: firstDropdownInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: secondDropdownRef, inView: secondDropdownInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: additionalImageRef, inView: additionalImageInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Floor Plan</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Floor Plan Image with animation */}
        <div className="lg:col-span-2">
          <motion.img
            ref={mainFloorPlanRef} // Add the ref to the element
            src={floorPlanMain}
            alt="Main Floor Plan"
            className="rounded-lg shadow-lg w-full"
            initial={{ x: -100, opacity: 0 }} // Initial state off-screen left with 0 opacity
            animate={{
              x: mainFloorPlanInView ? 0 : -100, // If in view, animate to 0 position, else off-screen
              opacity: mainFloorPlanInView ? 1 : 0, // If in view, animate opacity to 1
            }}
            transition={{ duration: 0.8 }} // Transition duration for the animation
          />
        </div>

        {/* Dropdowns with animation */}
        <div className="space-y-2">
          <label className="block text-gray-500 text-sm text-center">Apartment</label>
          <motion.div
            ref={firstDropdownRef} // Add the ref to the element
            className="border border-orange-400 p-3 rounded-lg shadow-lg flex justify-between items-center"
            initial={{ x: 100, opacity: 0 }} // Initial state off-screen right with 0 opacity
            animate={{
              x: firstDropdownInView ? 0 : 100, // If in view, animate to 0 position, else off-screen
              opacity: firstDropdownInView ? 1 : 0, // If in view, animate opacity to 1
            }}
            transition={{ duration: 0.8 }}
          >
            <span>2 BHK</span>
            <img src={Arrow} alt="" className="w-[25px] h-[25px]" />
          </motion.div>

          <label className="block text-gray-500 text-sm text-center">Built-Up Area</label>
          <motion.div
            ref={secondDropdownRef} // Add the ref to the element
            className="border border-orange-400 p-3 rounded-lg shadow-lg flex justify-between items-center"
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: secondDropdownInView ? 0 : 100,
              opacity: secondDropdownInView ? 1 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <span>5623 Sq. Ft.</span>
            <img src={Arrow} alt="" className="w-[25px] h-[25px]" />
          </motion.div>

          <motion.div
            ref={additionalImageRef} // Add the ref to the element
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: additionalImageInView ? 0 : -100,
              opacity: additionalImageInView ? 1 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={floorPlan1}
              alt="Alternate Floor Plan"
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Additional Floor Plan Images with animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.img
          ref={additionalImageRef} // Add the ref to the element
          src={floorPlan1}
          alt="Floor Plan 1"
          className="rounded-lg shadow-lg w-full"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: additionalImageInView ? 0 : -100,
            opacity: additionalImageInView ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        />
        <motion.img
          src={floorPlan2}
          alt="Floor Plan 2"
          className="rounded-lg shadow-lg w-full"
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: additionalImageInView ? 0 : 100,
            opacity: additionalImageInView ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        />
        <motion.img
          src={floorPlan3}
          alt="Floor Plan 3"
          className="rounded-lg shadow-lg w-full"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: additionalImageInView ? 0 : -100,
            opacity: additionalImageInView ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
};

export default FloorPlan;
