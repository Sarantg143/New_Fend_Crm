import React, { useState } from "react";
import Select from "react-select";
import {
  FaCheck,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRulerCombined,
  FaHome,
  FaBuilding,
} from "react-icons/fa";
import bookingimage from "../ClientBookingPage/Assets/bookingimage.png";
import Floorplan11 from "../ClientBookingPage/Assets/Floorplan11.jpg";
import Floorplan12 from "../ClientBookingPage/Assets/Floorplan12.jpg";
import Page from "./Page";
import { useNavigate } from "react-router-dom";

function ArihantPage() {
  const navigate = useNavigate();

  /* ========== TOP SECTION (Read More / Read Less) ========== */
  const [isExpanded, setIsExpanded] = useState(false);

  const textPart1 = `One of our finest creations, in a neighborhood that checks all the boxes.
    Staying at Hunters Road means you are exceptionally close to business,
    as it's adjacent to Purasawakkam, one of the largest commercial markets in Chennai.

    Arihant Vanya Vilas is exceptional not just in its exterior facade,
    but equally stunning in its meticulous planning and every detail.`;

  const textPart2 = `Only 45 bespoke residences that allow you design customisations,
    and 8 of them come with private terraces. The project is planned as per vastu
    around a well designed central courtyard. Tucked away from the main road,
    your home is in a quiet and clean sanctuary. Enter the 10 ft driveway
    and you will feel like a dream coming true.`;

  const handleToggle = () => setIsExpanded(!isExpanded);

  /* ========== PHASE & FLOOR SELECTION ========== */
  const phaseOptions = [
    { value: "phase1", label: "Phase 1" },
    { value: "phase2", label: "Phase 2" },
  ];

  const floorOptions = {
    phase1: [
      { id: "floor1", name: "Floor 1", image: Floorplan11 },
      { id: "floor2", name: "Floor 2", image: Floorplan12 },
    ],
    phase2: [
      { id: "floor3", name: "Floor 3", image: Floorplan11 },
      { id: "floor4", name: "Floor 4", image: Floorplan12 },
    ],
  };

  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const handlePhaseChange = (selectedOption) => {
    setSelectedPhase(selectedOption);
    setSelectedFloor(null); // Reset floor selection when phase changes
  };

  const handleFloorChange = (selectedOption) => {
    const floor = floorOptions[selectedPhase.value].find(
      (f) => f.id === selectedOption.value
    );
    setSelectedFloor(floor);
  };

  /* ========== SPACES DATA ========== */
  const spaces = [
    { id: "s1", label: "S1", available: true },
    { id: "s2", label: "S2", available: true },
    { id: "s3", label: "S3", available: false },
    { id: "s4", label: "S4", available: true },
    { id: "s5", label: "S5", available: true },
    { id: "s6", label: "S6", available: false },
  ];

  const [selectedSpace, setSelectedSpace] = useState(null);

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

  const handleZoomIn = () => setScale((prev) => prev + 0.25);
  const handleZoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.25));

  /* ========== BOOK NOW FUNCTION ========== */
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookNow = async () => {
    setBookingSuccess(false); // Reset success state

    // Check if user is logged in
    const userData = sessionStorage.getItem("logindata");
    if (!userData) {
      // Store the current path to redirect back after login
      sessionStorage.setItem("redirectPath", window.location.pathname);
      // Redirect to login page
      window.location.href = "/login";
      return;
    }

    // Load Razorpay script
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: "rzp_test_E0aQEsxCsOjngr",
        amount: 50000,
        currency: "INR",
        name: "ABV",
        description: "Booking Payment",
        image: "https://yourcompany.com/logo.png",
        handler: function (response) {
          console.log("Payment Success:", response);
          setBookingSuccess(true); // Set success state
          navigate("/popperpage"); // Redirect after successful payment
        },

        prefill: {
          name: "Manikandan",
          email: "loonymyth@gmail.com",
          contact: "6383464657",
        },
        notes: {
          address: "Corporate Office",
        },
        theme: {
          color: "#FAE696",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error);
        alert("Payment failed. Please try again.");
      });
    } catch (error) {
      console.error("Error in payment processing:", error);
      alert("An error occurred during payment processing.");
    }
  };

  // Function to load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#D1D5DB",
      "&:hover": {
        borderColor: "#F59E0B",
      },
      boxShadow: "none",
      minHeight: "40px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#F59E0B" : "white",
      color: state.isSelected ? "white" : "#4B5563",
      "&:hover": {
        backgroundColor: "#FBBF24",
        color: "white",
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div className="mx-auto bg-white">
      {/* ========== TOP SECTION ========== */}
      <div className="mx-auto p-4 flex flex-col lg:flex-row gap-6 bg-white items-start">
        {/* LEFT: Fixed-size image */}
        <div
          className="relative overflow-hidden"
          style={{ width: "800px", height: "500px" }}
        >
          <img
            src={bookingimage}
            alt="Arihant Vanya Vilas"
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
            CasaGrand Vilas Purasawakkam, Chennai - Price, Floor Plans, Reviews
          </h2>

          <div className="text-sm text-gray-700 leading-relaxed">
            {textPart1
              .split("\n")
              .filter((p) => p.trim().length > 0)
              .map((paragraph, idx) => (
                <p key={idx} className="mb-4 last:mb-0">
                  {paragraph.trim()}
                </p>
              ))}
            {isExpanded && (
              <div className="mt-4">
                {textPart2
                  .split("\n")
                  .filter((p) => p.trim().length > 0)
                  .map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>
            )}
          </div>
          <button
            onClick={handleToggle}
            className="mt-4 text-[#C8A158] font-medium hover:underline self-start"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* ========== FLOOR SELECTION SECTION ========== */}
      <div className="max-w-6xl mx-auto my-10 px-4 flex flex-col md:flex-row gap-6 justify-center">
        {/* LEFT: Floor Plan */}
        <div className="md:w-2/3 bg-orange-50 shadow-md rounded-lg p-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Select Available Spaces
          </h2>

          {/* PHASE & FLOOR DROPDOWNS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <Select
                options={phaseOptions}
                value={selectedPhase}
                onChange={handlePhaseChange}
                placeholder="Select Phase"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <Select
                options={
                  selectedPhase
                    ? floorOptions[selectedPhase.value].map((floor) => ({
                        value: floor.id,
                        label: floor.name,
                      }))
                    : []
                }
                value={
                  selectedFloor
                    ? { value: selectedFloor.id, label: selectedFloor.name }
                    : null
                }
                onChange={handleFloorChange}
                placeholder="Select Floor"
                isDisabled={!selectedPhase}
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>
          </div>

          {/* Show the Floor Plan */}
          <div className="relative">
            {/* Show the Floor Plan */}
            <div className="relative">
              <Page onAreaSelect={handleSpaceSelect} spaces={spaces} />
            </div>
          </div>
        </div>

        {/* RIGHT: Details Card */}
        <div
          className="md:w-1/3 border border-orange-100 bg-[#FFF8ED] rounded-lg shadow-sm"
          style={{ height: "500px" }}
        >
          <div className="h-full w-full p-6 overflow-y-auto">
            {selectedSpace ? (
              <>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">
                  {selectedSpace.label}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                    <span>Location: Purasawakkam, Chennai</span>
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-yellow-600 mr-2" />
                    <span>
                      Price: ₹
                      {selectedSpace.label === "S1"
                        ? "1.8CR"
                        : selectedSpace.label === "S2"
                        ? "1.9CR"
                        : "2CR"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-yellow-600 mr-2" />
                    <span>
                      Size:{" "}
                      {selectedSpace.label === "S1"
                        ? "1605 Sq.Ft"
                        : selectedSpace.label === "S2"
                        ? "1705 Sq.Ft"
                        : "1805 Sq.Ft"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-yellow-600 mr-2" />
                    <span>
                      Type: {selectedSpace.label === "S3" ? "3BHK" : "2BHK"}
                    </span>
                  </div>

                  {selectedFloor && (
                    <img
                      src={selectedFloor.image}
                      alt={`${selectedFloor.name} Floor Plan`}
                      className="mt-4 w-full h-auto object-cover max-h-40 border-2 border-[#C8A158] cursor-pointer"
                      onClick={() => openModal(selectedFloor.image)}
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
                  Arihant Vanya Vilas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                    <span>Location: Purasawakkam, Chennai</span>
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-yellow-600 mr-2" />
                    <span>Price Range: ₹1.8CR - 2.5CR</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-yellow-600 mr-2" />
                    <span>Sizes: 1605 - 2819 Sq.Ft</span>
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-yellow-600 mr-2" />
                    <span>Units: 2BHK & 3BHK</span>
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="text-yellow-600 mr-2" />
                    <span>Type: Residential Apartment</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  {selectedFloor
                    ? "Click on an available space in the floor plan to view details and book."
                    : "Select a phase and floor to view available spaces."}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* ========== MODAL FOR IMAGE ZOOM ========== */}
      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded shadow-md max-w-4xl w-full h-auto"
            onClick={(e) => e.stopPropagation()}
          >
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

      {/* ========== FLOOR PLAN SECTION ========== */}
      <div className="bg-[#F8E9CA] py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="uppercase text-[#C8A158] text-sm font-semibold tracking-wide mb-1">
              Floor Plan
            </h2>
            <h3 className="text-2xl font-bold text-black">
              CasaGrand Vilas Floor Plans
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
              <div className="mx-auto mb-4 w-auto h-56 flex items-center justify-center">
                <img
                  src={Floorplan12}
                  alt="3 BHK Floor Plan"
                  className="border-2 border-[#C8A158] object-contain max-h-full cursor-pointer"
                  onClick={() => openModal(Floorplan12)}
                />
              </div>
              <h4 className="text-lg font-semibold text-black mb-2">3 BHK</h4>
              <p className="text-black mb-1">Size: 1605 Sq.Ft</p>
              <p className="text-black mb-1">Carpet Area: 1188 Sq.Ft</p>
              <hr className="border-t border-dotted border-gray-300 my-4" />
              <button className="px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase">
                VIEW PRICE
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
              <div className="mx-auto mb-4 w-auto h-56 flex items-center justify-center">
                <img
                  src={Floorplan12}
                  alt="3 BHK Floor Plan"
                  className="border-2 border-[#C8A158] object-contain max-h-full cursor-pointer"
                  onClick={() => openModal(Floorplan12)}
                />
              </div>
              <h4 className="text-lg font-semibold text-black mb-2">3 BHK</h4>
              <p className="text-black mb-1">Size: 1875 Sq.Ft</p>
              <p className="text-black mb-1">Carpet Area: 1388 Sq.Ft</p>
              <hr className="border-t border-dotted border-gray-300 my-4" />
              <button className="px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase">
                VIEW PRICE
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
              <div className="mx-auto mb-4 w-auto h-56 flex items-center justify-center">
                <img
                  src={Floorplan12}
                  alt="4 BHK Floor Plan"
                  className="border-2 border-[#C8A158] object-contain max-h-full cursor-pointer"
                  onClick={() => openModal(Floorplan12)}
                />
              </div>
              <h4 className="text-lg font-semibold text-black mb-2">4 BHK</h4>
              <p className="text-black mb-1">Size: 2819 Sq.Ft</p>
              <p className="text-black mb-1">Carpet Area: 2086 Sq.Ft</p>
              <hr className="border-t border-dotted border-gray-300 my-4" />
              <button className="px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase">
                VIEW PRICE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* form */}
      <div className="flex justify-center w-full">
        <div className="w-full md:w-1/2 bg-white p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Booking Details
          </h2>
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="First name*"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Last name*"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
              />
            </div>
            <input
              type="text"
              placeholder="United States ( US )*"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Street Address*"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Town / City*"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Email Address*"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Phone*"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
            <textarea
              rows="3"
              placeholder="Add Something"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArihantPage;
