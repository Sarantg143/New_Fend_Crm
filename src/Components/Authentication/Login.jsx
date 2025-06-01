import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showSignup, setShowSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  // Signup form states
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupCompanyName, setSignupCompanyName] = useState("");
  const [signupRole, setSignupRole] = useState("directBuilder"); // default role
  const [signupErrors, setSignupErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  const images = [
    {
      url: "https://media.istockphoto.com/id/488120139/photo/modern-real-estate.jpg?s=612x612&w=0&k=20&c=88jk1VLSoYboMmLUx173sHs_XrZ9pH21as8lC7WINQs=",
      text: (
        <a
          href="https://example.com/apartments"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Explore Luxury Apartments
        </a>
      ),
    },
    {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/560522500.jpg?k=ff828719eaa74e28da1470e46ececabe7f4db037594ee0fd3d23a142084a7827&o=&hp=1",
      text: (
        <a
          href="https://example.com/villas"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Discover Premium Villas
        </a>
      ),
    },
    {
      url: "https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=612x612&w=0&k=20&c=HOCqYY0noIVxnp5uQf1MJJEVpsH_d4WtVQ6-OwVoeDo=",
      text: (
        <a
          href="https://example.com/homes"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Find Your Dream Home
        </a>
      ),
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginErrors({ email: "", password: "" }); // Reset errors

    try {
      const response = await axios.post(
        "https://crm-bcgg.onrender.com/api/auth/login",
        {
          identifier: loginEmail,
          password: loginPassword,
        }
      );

      const data = response.data;
      toast.success("Login successful!");
      sessionStorage.setItem("logindata", JSON.stringify(data));

      if (data.user?.role === "admin") {
        navigate("/admin");
      } else if (data.user?.role === "user") {
        navigate("/user");
      } else if (data.user?.role === "directBuilder") {
        navigate("/properties");
      }
      
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "Login failed. Please try again later.";

      // Map server errors to fields if available
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        setLoginErrors({
          email: serverErrors.email || serverErrors.username || "",
          password: serverErrors.password || "",
        });
      } else {
        // For general errors not specific to fields
        toast.error(errorMsg);
        setMessage(errorMsg);
      }
    }
  };

  // Client-side validation for signup
  const validateSignupFields = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
    };

    if (!signupName.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    }
    if (!signupUsername.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (signupUsername.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }
    if (!signupEmail.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!signupPassword) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (signupPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (signupPhone && !/^\d+$/.test(signupPhone)) {
      newErrors.phone = "Phone number should contain digits only";
      isValid = false;
    }

    setSignupErrors(newErrors);
    return isValid;
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignupFields()) return; // Early return if validation fails

    try {
      const response = await axios.post(
        "https://crm-bcgg.onrender.com/api/auth/signup",
        {
          name: signupName,
          email: signupEmail,
          username: signupUsername,
          password: signupPassword,
          phone: signupPhone || "",
          companyName: signupRole === "directBuilder" ? signupCompanyName : "",
        }
      );

      toast.success("Signup successful! Please log in.");
      setMessage("Signup successful! Please log in.");
      setShowSignup(false);

      // Clear form fields
      setSignupName("");
      setSignupUsername("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupPhone("");
      setSignupCompanyName("");
      setSignupErrors({
        name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (error) {
      // Map server-side validation errors to specific fields
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        setSignupErrors({
          name: serverErrors.name || "",
          username: serverErrors.username || "",
          email: serverErrors.email || "",
          password: serverErrors.password || "",
          phone: serverErrors.phone || "",
        });
      } else {
        const errorMsg =
          error.response?.data?.msg || "Signup failed. Please try again later.";
        toast.error(errorMsg);
        setMessage(errorMsg);
      }
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 font-sans px-4 py-10">
      {/* ToastContainer must be included once in your app */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="relative w-full max-w-7xl h-[700px] bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Panels container */}
        <div
          className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ${
            showSignup ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >
          {/* Login Panel */}
          <div className="w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Hi there!</h1>
              <p className="mb-8 text-gray-500">Welcome</p>

              <form onSubmit={handleLogin} noValidate>
                {/* Email Input */}
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`w-full border ${
                      loginErrors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3`}
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginErrors({ ...loginErrors, email: "" });
                    }}
                    required
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="relative mb-2">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`w-full border ${
                      loginErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md p-3 pr-10`}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginErrors({ ...loginErrors, password: "" });
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showLoginPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  {loginErrors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.password}
                    </p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right text-sm mb-6">
                  <a href="#" className="text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-full mb-4 hover:opacity-90 transition"
                >
                  Log In
                </button>
              </form>

              {/* Signup Link */}
              <p className="text-sm text-center">
                Don't have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => {
                    setShowSignup(true);
                    setMessage("");
                  }}
                >
                  Sign up
                </button>
              </p>

              {/* Message */}
              {message && !showSignup && (
                <p className="mt-4 text-center text-sm text-red-600">
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Signup Panel */}
          <div className="w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Join Us!</h1>
              <p className="mb-8 text-gray-500">
                Create an account to continue
              </p>

              <form onSubmit={handleSignup} noValidate>
                {/* Full Name */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full border ${
                      signupErrors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3`}
                    value={signupName}
                    onChange={(e) => {
                      setSignupName(e.target.value);
                      setSignupErrors({ ...signupErrors, name: "" });
                    }}
                    required
                  />
                  {signupErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {signupErrors.name}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Username"
                    className={`w-full border ${
                      signupErrors.username
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md p-3`}
                    value={signupUsername}
                    onChange={(e) => {
                      setSignupUsername(e.target.value);
                      setSignupErrors({ ...signupErrors, username: "" });
                    }}
                    required
                  />
                  {signupErrors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {signupErrors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full border ${
                      signupErrors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3`}
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      setSignupErrors({ ...signupErrors, email: "" });
                    }}
                    required
                  />
                  {signupErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {signupErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative mb-4">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`w-full border ${
                      signupErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md p-3 pr-10`}
                    value={signupPassword}
                    onChange={(e) => {
                      setSignupPassword(e.target.value);
                      setSignupErrors({ ...signupErrors, password: "" });
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showSignupPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  {signupErrors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {signupErrors.password}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className={`w-full border ${
                      signupErrors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3`}
                    value={signupPhone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setSignupPhone(value);
                        setSignupErrors({ ...signupErrors, phone: "" });
                      }
                    }}
                  />
                  {signupErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {signupErrors.phone}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-full mb-4 hover:opacity-90 transition"
                >
                  Sign Up
                </button>
              </form>

              {/* Switch to login */}
              <p className="text-sm text-center">
                Already have an account?
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => {
                    setShowSignup(false);
                    setMessage("");
                  }}
                >
                  Log in
                </button>
              </p>

              {/* Message */}
              {message && showSignup && (
                <p className="mt-4 text-center text-sm text-red-600">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right side image + text */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden rounded-r-2xl">
          <img
            src={images[currentImageIndex].url}
            alt="Real Estate"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute bottom-12 left-12 text-white text-lg sm:text-xl font-semibold">
            {images[currentImageIndex].text}
          </div>
        </div>
      </div>
    </div>
  );
}