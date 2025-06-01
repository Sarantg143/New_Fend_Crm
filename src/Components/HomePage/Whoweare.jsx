import React, { useState, useEffect, useRef } from "react";
import whoweare from "./Assets/whoweare.png";

const Whoweare = () => {
  const [showMore, setShowMore] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  // Function to toggle the 'Show more' content
  const handleToggle = () => {
    setShowMore(!showMore);
  };

  // Intersection Observer to detect when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Reset animation after it has finished
          setTimeout(() => setIsInView(false), 1000); // 1000ms to match the animation duration
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mt-20 px-6 md:px-12 mx-auto">
      <div
        ref={ref}
        className={`flex flex-col md:flex-row-reverse items-center gap-20 text-center md:text-left transition-all duration-1000 ${
          isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
        }`}
      >
        {/* Left Section (Image) */}
        <div className="md:w-1/2">
          <img
            src={whoweare}
            alt="Real Estate Building"
            className="w-full h-[390px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right Section (Text) */}
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 tracking-widest uppercase border-b pb-1 w-fit">
            Properties
          </p>
          <h2 className="text-4xl font-semibold leading-snug">
            Premium Properties in the Best Locations
          </h2>
          <p className="text-gray-600">
            Our properties, located in prime areas, boast unique designs and
            aspirational lifestyles within vibrant Emaar communities, all
            seamlessly managed by Emaar Community Management's dedicated team.
          </p>

          <button
            className="bg-gray-900 text-white uppercase tracking-wide py-3 px-6 rounded-md mt-4"
            onClick={handleToggle}
          >
            {showMore ? "Show less" : "Know more"}
          </button>

          {/* Extra Content Toggle */}
          {showMore && (
            <div className="mt-4 text-gray-700 transition-all duration-300">
              <p>
                Discover luxurious amenities, sustainable architecture, and
                thoughtfully designed spaces that reflect modern lifestyles.
                From waterfront residences to urban retreats, each property
                offers a unique experience tailored to your dreams.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Whoweare;
