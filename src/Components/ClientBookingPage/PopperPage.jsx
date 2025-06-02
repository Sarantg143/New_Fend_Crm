import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ThankYouPage = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Stop confetti after 5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    // Navigate after 10 seconds
    const navigateTimer = setTimeout(() => {
      navigate("/user");
    }, 10000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(confettiTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]); // Add navigate to dependency array

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105">
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            Your booking has been confirmed. We've sent you a confirmation email
            with all the details.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold text-blue-800 mb-2">
              Booking Reference
            </h2>
            <p className="text-blue-600 font-mono bg-white py-2 px-3 rounded-md inline-block">
              BK-{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        You'll receive a reminder 24 hours before your appointment.
      </p>
    </div>
  );
};

export default ThankYouPage;
