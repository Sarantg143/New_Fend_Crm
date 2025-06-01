import React, { useState, useEffect } from "react";
import Select from "react-select";
import bookingimage from "../ClientBookingPage/Assets/bookingimage.png";
import Floorplan11 from "../ClientBookingPage/Assets/Floorplan11.jpg";
import Floorplan12 from "../ClientBookingPage/Assets/Floorplan11.jpg";
import houseInHands from "../ClientBookingPage/Assets/houseInHands.avif";
import { 
  FaBuilding as FaBuildingPhase, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaRulerCombined, 
  FaHome, 
  FaBuilding 
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const customSelectStyles = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: "40px",
    padding: "0 8px",
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  menu: (provided) => ({
    ...provided,
    maxHeight: "200px",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "200px",
    overflowY: "auto",
  }),
};

function ArihantPage() {
  const location = useLocation();
  const { buildingId } = location.state || {};
  const [isExpanded, setIsExpanded] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [floorsData, setFloorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property and floors data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!buildingId) {
          throw new Error("No building ID provided");
        }

        // Fetch property details
        const propertyRes = await fetch(
          `https://crm-bcgg.onrender.com/api/properties/floors/by-building/${buildingId}`
        );
        if (!propertyRes.ok) throw new Error("Failed to fetch property data");
        const propertyData = await propertyRes.json();
        setPropertyData(propertyData);

        // Fetch floors data
        const floorsRes = await fetch(
  `https://crm-bcgg.onrender.com/api/properties/floors/by-building/${buildingId}`
);
if (!floorsRes.ok) throw new Error("Failed to fetch floors data");
const floorsData = await floorsRes.json();
setFloorsData(floorsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [buildingId]);

  /* ========== DROPDOWNS & SPACE SELECTION ========== */
  // const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [hoveredSpace, setHoveredSpace] = useState(null);

  // Generate phase options from fetched data
  const phaseOptions = propertyData?.phases?.map(phase => ({
    value: phase._id,
    label: phase.name
  })) || [];

  // Generate floor options from fetched data
const floorOptions = floorsData.map((floor) => ({
  value: floor._id,
  label: `Floor ${floor.floorNumber}`,
}));

  const handlePhaseChange = (phaseOption) => {
    // setSelectedPhase(phaseOption);
    setSelectedFloor(null);
    setSelectedSpace(null);
  };

  const handleFloorChange = (floorOption) => {
  const floor = floorsData.find(f => f._id === floorOption.value);
  setSelectedFloor(floor);
  setSelectedSpace(null);
};

  const handleSpaceSelect = (space) => {
    if (space.available) {
      setSelectedSpace(space);
    }
  };

  /* ========== MODAL STATES FOR IMAGE ZOOM ========== */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [scale, setScale] = useState(1);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
    setScale(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const handleZoomIn = () => setScale(prev => prev + 0.25);
  const handleZoomOut = () => setScale(prev => Math.max(0.5, prev - 0.25));

  /* ========== BOOKING FORM STATE & HANDLER ========== */
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookNow = () => {
    setShowBookingForm(true);
    setTimeout(() => {
      const formSection = document.getElementById("bookingFormSection");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        No property data found
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white">
      {/* ========== TOP SECTION ========== */}
      <div className="mx-auto p-4 flex flex-col lg:flex-row gap-6 bg-white items-start">
        {/* LEFT: Fixed-size image */}
        <div className="relative overflow-hidden" style={{ width: "800px", height: "500px" }}>
          <img
            src={propertyData.media?.coverPhoto?.url || bookingimage}
            alt={propertyData.projectName}
            style={{ animation: "zoomIn 1s ease-in-out forwards" }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT: Fixed-size text container */}
        <div
          className="relative p-6 flex flex-col bg-white"
          style={{
            width: "800px",
            height: "500px",
            overflowY: isExpanded ? "auto" : "hidden",
          }}
        >
          <div className="flex items-center mb-4">
            <span className="text-yellow-600 uppercase font-semibold tracking-wide text-sm mr-2">
              About
            </span>
            <div className="flex-1 h-px bg-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-snug">
            {propertyData.projectName} - Price, Floor Plans, Reviews
          </h2>

          <div className="text-sm text-gray-700 leading-relaxed">
            {propertyData.description
              ? propertyData.description.split("\n").filter(p => p.trim().length > 0).map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph.trim()}
                  </p>
                ))
              : <p>No description available</p>
            }
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-[#C8A158] font-medium hover:underline self-start"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* ========== SVG FLOOR SELECTION SECTION ========== */}
      <div className="max-w-6xl mx-auto my-10 px-4 flex flex-col md:flex-row gap-6 justify-center">
        {/* LEFT: SVG Floor Plan */}
        <div className="md:w-2/3 bg-orange-50 shadow-md rounded-lg p-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Select Available Spaces
          </h2>

          {/* PHASE & FLOOR DROPDOWNS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* <div className="w-full sm:w-1/2">
              <Select
                options={phaseOptions}
                value={selectedPhase}
                onChange={handlePhaseChange}
                placeholder="Select Phase"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div> */}
           <Select
  options={floorOptions}
  value={selectedFloor ? { value: selectedFloor._id, label: `Floor ${selectedFloor.floorNumber}` } : null}
  onChange={handleFloorChange}
  placeholder="Select Floor"
  styles={customSelectStyles}
  menuPortalTarget={document.body}
  // Remove isDisabled if not needed
/>
          </div>

          {/* Show the Floor Plan ONLY if a phase & floor are selected */}
          {selectedFloor && (
            <div className="relative">
              <svg
                viewBox="0 0 900 550"
                className="w-full h-auto border border-gray-200 rounded-lg bg-white"
              >
                {/* Building Outline */}
                <rect
                  x="50"
                  y="50"
                  width="700"
                  height="400"
                  fill="#f5f5f5"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Common Areas */}
                <rect
                  x="200"
                  y="100"
                  width="400"
                  height="100"
                  fill="#d1e7dd"
                  stroke="#333"
                  strokeWidth="1"
                />
                <text x="400" y="160" textAnchor="middle" fill="#333" fontSize="20">
                  Lobby
                </text>

                {/* Spaces */}
                {selectedFloor.spaces?.map((space, index) => {
                  // Layout spaces in a grid
                  const col = index % 3;
                  const row = Math.floor(index / 3);
                  const x = 200 + col * 160;
                  const y = 250 + row * 100;
                  const width = 150;
                  const height = 80;

                  return (
                    <g
                      key={space._id}
                      onMouseEnter={() => setHoveredSpace(space)}
                      onMouseLeave={() => setHoveredSpace(null)}
                      onClick={() => handleSpaceSelect(space)}
                      style={{ cursor: space.available ? "pointer" : "not-allowed" }}
                    >
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={
                          selectedSpace?._id === space._id
                            ? "pink"
                            : !space.available
                            ? "#e2e3e5"
                            : hoveredSpace?._id === space._id
                            ? "#d1e7dd"
                            : "#fff3cd"
                        }
                        stroke={
                          selectedSpace?._id === space._id
                            ? "#dc3545"
                            : !space.available
                            ? "#6c757d"
                            : "#ffc107"
                        }
                        strokeWidth={selectedSpace?._id === space._id ? "3" : "2"}
                      />
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 5}
                        textAnchor="middle"
                        fill={
                          selectedSpace?._id === space._id
                            ? "#dc3545"
                            : !space.available
                            ? "#6c757d"
                            : "#333"
                        }
                        fontSize="16"
                        fontWeight="bold"
                      >
                        {space.name}
                      </text>
                      {!space.available && (
                        <text
                          x={x + width / 2}
                          y={y + height / 2 + 25}
                          textAnchor="middle"
                          fill="#6c757d"
                          fontSize="12"
                        >
                          Booked
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>

        {/* RIGHT: Details Card */}
        <div className="md:w-1/3 border border-orange-100 bg-[#FFF8ED] rounded-lg shadow-sm" style={{ height: "500px" }}>
          <div className="h-full w-full p-6 overflow-y-auto">
            {selectedSpace ? (
              <>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">
                  {selectedFloor?.name} - {selectedSpace.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                    <span>Location: {propertyData.location?.area}, {propertyData.location?.city}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-yellow-600 mr-2" />
                    <span>Price: ₹{selectedSpace.price || 'Price on request'}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-yellow-600 mr-2" />
                    <span>Size: {selectedSpace.area} Sq.Ft</span>
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-yellow-600 mr-2" />
                    <span>Type: {selectedSpace.type}</span>
                  </div>

                  {selectedSpace.floorPlanImage && (
                    <img
                      src={selectedSpace.floorPlanImage}
                      alt="Selected Floor Plan"
                      className="mt-4 w-full h-auto object-cover max-h-40 border-2 border-[#C8A158] cursor-pointer"
                      onClick={() => openModal(selectedSpace.floorPlanImage)}
                    />
                  )}
                </div>
                <button
                  onClick={handleBookNow}
                  className="mt-6 px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase w-full"
                >
                  Book Now
                </button>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">
                  {propertyData.projectName}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                    <span>Location: {propertyData.location?.area}, {propertyData.location?.city}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-yellow-600 mr-2" />
                    <span>Price Range: ₹{propertyData.priceRange?.min || '1.8CR'} - {propertyData.priceRange?.max || '2.5CR'}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-yellow-600 mr-2" />
                    <span>Sizes: {propertyData.areaRange?.min || '1605'} - {propertyData.areaRange?.max || '2819'} Sq.Ft</span>
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-yellow-600 mr-2" />
                    <span>Units: {propertyData.unitTypes?.join(' & ') || '2BHK & 3BHK'}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="text-yellow-600 mr-2" />
                    <span>Type: {propertyData.propertyType || 'Residential Apartment'}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  Select a Phase & Floor from the dropdowns, then pick a space
                  from the interactive plan to view details and book.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========== FLOOR PLAN SECTION ========== */}
      <div className="bg-[#F8E9CA] py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="uppercase text-[#C8A158] text-sm font-semibold tracking-wide mb-1">
              Floor Plan
            </h2>
            <h3 className="text-2xl font-bold text-black">
              {propertyData.projectName} Floor Plans
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            {propertyData.floorPlans?.map((plan, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
                <div className="mx-auto mb-4 w-auto h-56 flex items-center justify-center">
                  <img
                    src={plan.imageUrl || Floorplan11}
                    alt={`${plan.type} Floor Plan`}
                    className="border-2 border-[#C8A158] object-contain max-h-full cursor-pointer"
                    onClick={() => openModal(plan.imageUrl || Floorplan11)}
                  />
                </div>
                <h4 className="text-lg font-semibold text-black mb-2">{plan.type}</h4>
                <p className="text-black mb-1">Size: {plan.area} Sq.Ft</p>
                <p className="text-black mb-1">Carpet Area: {plan.carpetArea} Sq.Ft</p>
                <hr className="border-t border-dotted border-gray-300 my-4" />
                <button className="px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase">
                  VIEW PRICE
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== MODAL FOR IMAGE ZOOM ========== */}
      {isModalOpen && modalImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60" onClick={closeModal}>
          <div className="relative bg-white p-4 rounded shadow-md max-w-4xl w-full h-auto" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-black font-bold text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex justify-center mb-2 space-x-4">
              <button
                onClick={handleZoomOut}
                className="bg-gray-200 px-3 py-1 rounded font-semibold hover:bg-gray-300"
              >
                -
              </button>
              <button
                onClick={handleZoomIn}
                className="bg-gray-200 px-3 py-1 rounded font-semibold hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <div className="flex justify-center items-center overflow-auto">
              <img
                src={modalImage}
                alt="Floor Plan Zoom"
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.3s ease",
                }}
                className="max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========== BOOKING FORM SECTION ========== */}
      {showBookingForm && (
        <section id="bookingFormSection" className="w-full flex justify-center items-center p-4">
          <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg">
            <div className="w-full md:w-1/2 h-[400px] md:h-[600px] animate-slide-in-left">
              <img
                src={houseInHands}
                alt="House in Hands"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 bg-white p-6 animate-slide-in-right">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                Booking Details
              </h2>
              <form className="space-y-4">
                <input type="hidden" name="propertyId" value={buildingId} />
                <input type="hidden" name="spaceId" value={selectedSpace?._id} />
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name*"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name*"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Additional Information"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition font-semibold"
                >
                  Submit Booking
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ArihantPage;