import { useEffect, useState } from "react";

const Popup = ({ selectedLocation, setSelectedLocation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [hasShown, setHasShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // City data with images
  const cityData = [
    {
      name: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Delhi-NCR",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Bengaluru",
      image:
        "https://www.thrillophilia.com/blog/wp-content/uploads/2015/05/shutterstock_1387990289.jpg",
    },
    {
      name: "Hyderabad",
      image: "https://live.staticflickr.com/5525/30580885673_d6c43c7cc2.jpg",
    },
    {
      name: "Ahmedabad",
      image: "https://www.trawell.in/admin/images/upload/461310534Vadodara.jpg",
    },
    {
      name: "Chandigarh",
      image:
        "http://www.travelsiteindia.com/blog/wp-content/uploads/2018/07/nada-sahib-things-to-do-in-chandigarh-1024x768.jpg",
    },
    {
      name: "Chennai",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.lhAP7L_nn7rSLr6pAp9MWwHaE8&pid=Api&P=0&h=180",
    },
    {
      name: "Pune",
      image:
        "https://punetourism.co.in/images/places-to-visit/headers/shaniwar-wada-pune-tourism-entry-fee-timings-holidays-reviews-header.jpg",
    },
    {
      name: "Kolkata",
      image:
        "https://www.trawell.in/admin/images/upload/555418532Victoria-Memorial-Kolkata.jpg",
    },
    {
      name: "Kochi",
      image:
        "https://tse3.mm.bing.net/th?id=OIP.HhIck80M2X2UygYmXskFqgHaEc&pid=Api&P=0&h=180",
    },
    {
      name: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Lucknow",
      image:
        "https://images.unsplash.com/photo-1602334242150-58b6f3f071b4?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Nagpur",
      image:
        "https://punetourism.co.in/images/places-to-visit/headers/shaniwar-wada-pune-tourism-entry-fee-timings-holidays-reviews-header.jpg",
    },
    {
      name: "Indore",
      image:
        "http://www.travelsiteindia.com/blog/wp-content/uploads/2018/07/nada-sahib-things-to-do-in-chandigarh-1024x768.jpg",
    },
    {
      name: "Bhopal",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.lhAP7L_nn7rSLr6pAp9MWwHaE8&pid=Api&P=0&h=180",
    },
    {
      name: "Patna",
      image: "https://www.trawell.in/admin/images/upload/461310534Vadodara.jpg",
    },
    {
      name: "Surat",
      image: "https://live.staticflickr.com/5525/30580885673_d6c43c7cc2.jpg",
    },
    {
      name: "Bhubaneswar",
      image:
        "https://www.thrillophilia.com/blog/wp-content/uploads/2015/05/shutterstock_1387990289.jpg",
    },
    {
      name: "Coimbatore",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Visakhapatnam",
      image:
        "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=500&auto=format&fit=crop&q=60",
    },
  ];

  const popularCities = cityData.slice(0, 10);
  const allCities = cityData;

  // Filter cities based on search query
  const filteredCities = (showAllCities ? allCities : popularCities).filter(
    (city) => city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to detect user's location
  const detectLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const mockApiCall = () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                const randomCity =
                  popularCities[
                    Math.floor(Math.random() * popularCities.length)
                  ];
                resolve(randomCity.name);
              }, 1000);
            });
          };

          const city = await mockApiCall();
          setSelectedLocation(city);
          setIsLocating(false);
          setIsVisible(false);
          setHasShown(true);
        } catch (error) {
          setLocationError("Could not determine your city");
          setIsLocating(false);
        }
      },
      (error) => {
        setLocationError("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  // Prevent scrolling when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  // Show popup only once when component mounts
  useEffect(() => {
    if (!hasShown && !selectedLocation) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Show after 1 second delay

      return () => clearTimeout(timer);
    }
  }, [hasShown, selectedLocation]);

  const handleClose = () => {
    setIsVisible(false);
    setHasShown(true);
  };

  const handleCitySelect = (city) => {
    setSelectedLocation(city);
    setIsVisible(false);
    setHasShown(true);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>

      {/* Popup Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Select Your Location
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for your city"
                className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={detectLocation}
              disabled={isLocating}
              className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isLocating
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {isLocating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Detecting...
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Detect my location
                </>
              )}
            </button>
          </div>

          {selectedLocation && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Your current location:{" "}
              <span className="font-semibold">{selectedLocation}</span>
            </div>
          )}

          {locationError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {locationError}
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {showAllCities ? "All Cities" : "Popular Cities"}
            </h3>

            {filteredCities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No cities found matching your search
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {filteredCities.map((city, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-50 border ${
                      selectedLocation === city.name
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleCitySelect(city.name)}
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-800">
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowAllCities(!showAllCities)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              {showAllCities ? (
                <>
                  <svg
                    className="inline h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Show Less Cities
                </>
              ) : (
                <>
                  <svg
                    className="inline h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  View All Cities
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
