import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";

const MEDIA_UPLOAD_URL = "https://z-backend-2xag.onrender.com/api/upload/type";


export default function AddProperty() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterBuilder, setFilterBuilder] = useState("All");
  const [filterPropertyType, setFilterPropertyType] = useState("All");
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [media, setMedia] = useState({ photos: [], videos: [], "3DVideo": [] });
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [builderId, setBuilderId] = useState(null);
  const [builder, setBuilder] = useState([]);
  

  

  const navigate = useNavigate();

  // Fetch properties from the backend
useEffect(() => {
  const fetchProperties = async () => {
    try {
      const logindata = sessionStorage.getItem("logindata");

      if (!logindata) {
        console.error("Login data not found in sessionStorage");
        setError("Please log in to view properties");
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(logindata);
      const token = parsedData.token;
      const userId = parsedData.user?.id;

      if (!token || !userId) {
        console.error("Token or user ID is missing in parsed logindata");
        setError("Please log in to view properties");
        setLoading(false);
        return;
      }

      setLoading(true);
     

      // First fetch: Get builder profile by user ID
      const builderResponse = await fetch(
        `https://crm-bcgg.onrender.com/api/properties/builder-profile/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!builderResponse.ok) {
        throw new Error("Failed to fetch builder profile");
      }

      const builderData = await builderResponse.json();
      setBuilder(builderData);
      const builderId = builderData._id;

      if (!builderId) {
        throw new Error("Builder ID (_id) not found in response");
      }

      setBuilderId(builderId);
     

      // ✅ Second fetch: Get properties by builder ID
      const propertiesResponse = await fetch(
        `https://crm-bcgg.onrender.com/api/properties/projects/by-builder/${builderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!propertiesResponse.ok) {
        throw new Error("Failed to fetch properties by builder ID");
      }

      const propertiesData = await propertiesResponse.json();
      setProperties(propertiesData);
      setLoading(false);
    

    } catch (err) {
      setError(err.message);
      setLoading(false);
      
    }
  };

  fetchProperties();
}, []);


  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMediaUpload = async (type, files) => {
    if (!files || files.length === 0) return;

    
    setError(null);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(MEDIA_UPLOAD_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            
          },
        });

        return {
          url: response.data?.fileUrl || URL.createObjectURL(file),
          type: file.type.split("/")[0] || type,
          title: file.name,
        };
      });

      const uploadedMedia = await Promise.all(uploadPromises);
      setMedia((prev) => ({
        ...prev,
        [type]: [...(prev[type] || []), ...uploadedMedia],
      }));
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Failed to upload media");
    } 
  };

  const removeMedia = (type, index) => {
    setMedia((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };
  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

const onSubmit = async (data) => {
  const logindata = sessionStorage.getItem("logindata");

  if (!logindata) {
    setError("You must be logged in to add a project.");
    return;
  }

  const parsedData = JSON.parse(logindata);
  const token = parsedData.token;

  if (!token || !builderId) {
    setError("Missing authentication token or builder ID.");
    return;
  }

  const projectData = {
    ...data,
    builder: builderId,
    amenities,
    media,
  };

  try {
    const response = await fetch("https://crm-bcgg.onrender.com/api/properties/project", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Project creation failed.");
    }

    const result = await response.json();
    console.log("Project created:", result);

    // ✅ Refetch updated properties list
    const propertiesResponse = await fetch(
      `https://crm-bcgg.onrender.com/api/properties/projects/by-builder/${builderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!propertiesResponse.ok) {
      throw new Error("Failed to fetch updated properties.");
    }

    const propertiesData = await propertiesResponse.json();
    setProperties(propertiesData);

    // ✅ Reset form
    setMedia({ photos: [], videos: [], "3DVideo": [] });
    setAmenities([]);
    setNewAmenity("");
    setIsModalOpen(false);

    alert("Project created successfully.");
  } catch (error) {
    console.error("Error:", error);
    setError(error.message);
  }
};



  const filteredProperties = Array.isArray(properties)
    ? properties.filter((property) => {
        const matchesType =
          filterType === "All" ||
          property.type?.toLowerCase() === filterType.toLowerCase();
        const matchesStatus =
          filterStatus === "All" ||
          property.status?.toLowerCase() === filterStatus.toLowerCase();
        const matchesBuilder =
          filterBuilder === "All" ||
          property.buildername?.toLowerCase() === filterBuilder.toLowerCase();
        const matchesPropertyType =
          filterPropertyType === "All" ||
          property.propertyType?.toLowerCase() === filterPropertyType.toLowerCase();

        return (
          matchesType &&
          matchesStatus &&
          matchesBuilder &&
          matchesPropertyType
        );
      })
    : [];

  const handleAddbuildingClick = (id) => {
    navigate("/PropertyBuilder", {
      state: { id },
    });
  };

  const goBack = () => navigate(-1);

  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-100 p-4">
      <IoMdArrowBack onClick={goBack} className="mb-2 text-2xl" />
      <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-grow">
          <select
            className="border rounded p-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
          <select
            className="border rounded p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            className="border rounded p-2"
            value={filterBuilder}
            onChange={(e) => setFilterBuilder(e.target.value)}
          >
            <option value="All">All Builders</option>
            <option value="Casagrand">Casagrand</option>
            <option value="Radiance">Radiance</option>
            <option value="Relator">Relator</option>
          </select>
          <select
            className="border rounded p-2"
            value={filterPropertyType}
            onChange={(e) => setFilterPropertyType(e.target.value)}
          >
            <option value="All">All Properties</option>
            <option value="Plot">Plot</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-auto"
          onClick={() => setIsModalOpen(true)}
        >
          Add Project
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create New Project
            </h1>
            <div className="space-y-6">
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Basic Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name*
                  </label>
                  <input
                    {...register("projectName", {
                      required: "Project name is required",
                      minLength: {
                        value: 3,
                        message: "Project name must be at least 3 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Project name cannot exceed 100 characters",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                  />
                  {errors.projectName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.projectName.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      {...register("location.city", {
                        required: "City is required",
                        pattern: {
                          value: /^[A-Za-z\s-]+$/,
                          message:
                            "City must contain only letters, spaces, or hyphens",
                        },
                        minLength: {
                          value: 2,
                          message: "City must be at least 2 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "City cannot exceed 50 characters",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City"
                    />
                    {errors.location?.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.location.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area*
                    </label>
                    <input
                      {...register("location.area", {
                        required: "Area is required",
                        minLength: {
                          value: 3,
                          message: "Area must be at least 3 characters",
                        },
                        maxLength: {
                          value: 100,
                          message: "Area cannot exceed 100 characters",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Area"
                    />
                    {errors.location?.area && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.location.area.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode*
                    </label>
                    <input
                      {...register("location.pincode", {
                        required: "Pincode is required",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "Pincode must be exactly 6 digits",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Pincode"
                    />
                    {errors.location?.pincode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.location.pincode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type*
                  </label>
                  <select
                    {...register("propertyType", {
                      required: "Property type is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select property type</option>
                    <option value="Plot">Plot</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                  {errors.propertyType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.propertyType.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price*
                  </label>
                  <input
                    {...register("price", {
                      required: "Price is required",
                      
                      
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price (e.g., $500,000)"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type*
                  </label>
                  <select
                    {...register("type", {
                      required: "Type is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.type.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status*
                  </label>
                  <select
                    {...register("status", {
                      required: "Status is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.status.message}
                    </p>
                  )}
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Builder Name*
                  </label>
                  <input
                    {...register("buildername", {
                      required: "Builder name is required",
                      minLength: {
                        value: 3,
                        message: "Builder name must be at least 3 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Builder name cannot exceed 100 characters",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter builder name"
                  />
                  {errors.buildername && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.buildername.message}
                    </p>
                  )}
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Builder*
                  </label>
                  <select
                    {...register("builder", {
                      // Changed from "properties" to "builder"
                      required: "Builder is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select builder</option>
                    {builder &&
                      builder._id && ( // Check if builder exists and has _id
                        <option value={builder._id}>
                          {builder.companyName ||
                            builder.name ||
                            "Unknown Builder"}
                        </option>
                      )}
                  </select>
                  {errors.builder && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.builder.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms*
                  </label>
                  <input
                    type="number"
                    {...register("bed", {
                      required: "Bedrooms are required",
                      min: {
                        value: 0,
                        message: "Bedrooms cannot be negative",
                      },
                      max: {
                        value: 50,
                        message: "Bedrooms cannot exceed 50",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of bedrooms"
                  />
                  {errors.bed && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.bed.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms*
                  </label>
                  <input
                    type="number"
                    {...register("bath", {
                      required: "Bathrooms are required",
                      min: {
                        value: 0,
                        message: "Bathrooms cannot be negative",
                      },
                      max: {
                        value: 50,
                        message: "Bathrooms cannot exceed 50",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of bathrooms"
                  />
                  {errors.bath && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.bath.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Square Feet*
                  </label>
                  <input
                    type="number"
                    {...register("sqft", {
                      required: "Square feet is required",
                      min: {
                        value: 100,
                        message: "Square feet must be at least 100",
                      },
                      max: {
                        value: 1000000,
                        message: "Square feet cannot exceed 1,000,000",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter square feet"
                  />
                  {errors.sqft && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.sqft.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Additional Details
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Units
                  </label>
                  <input
                    type="number"
                    {...register("units", {
                      min: {
                        value: 0,
                        message: "Units cannot be negative",
                      },
                      max: {
                        value: 1000,
                        message: "Units cannot exceed 1000",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of units"
                  />
                  {errors.units && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.units.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kitchen
                  </label>
                  <input
                    {...register("kitchen", {
                      maxLength: {
                        value: 50,
                        message:
                          "Kitchen description cannot exceed 50 characters",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter kitchen type"
                  />
                  {errors.kitchen && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.kitchen.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carpet Area
                  </label>
                  <input
                    {...register("carpetArea", {
                      pattern: {
                        value: /^\d+\s*(sqft|sqm)?$/,
                        message:
                          "Carpet area must be a number followed by optional 'sqft' or 'sqm'",
                      },
                      validate: (value) =>
                        !value ||
                        parseFloat(value) <=
                          parseFloat(
                            document.getElementsByName("sqft")[0]?.value
                          ) ||
                        "Carpet area cannot exceed total square feet",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter carpet area (e.g., 1800 sqft)"
                  />
                  {errors.carpetArea && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.carpetArea.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Map View URL
                  </label>
                  <input
                    {...register("mapView", {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message:
                          "Map view must be a valid URL starting with http:// or https://",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter map view URL"
                  />
                  {errors.mapView && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.mapView.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phase
                  </label>
                  <input
                    {...register("phase", {
                      maxLength: {
                        value: 50,
                        message: "Phase cannot exceed 50 characters",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phase"
                  />
                  {errors.phase && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phase.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor
                  </label>
                  <input
                    type="number"
                    {...register("floor", {
                      min: {
                        value: 0,
                        message: "Floor cannot be negative",
                      },
                      max: {
                        value: 100,
                        message: "Floor cannot exceed 100",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter floor number"
                  />
                  {errors.floor && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.floor.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Details
                  </label>
                  <input
                    {...register("loanDetails", {
                      maxLength: {
                        value: 200,
                        message: "Loan details cannot exceed 200 characters",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter loan details"
                  />
                  {errors.loanDetails && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.loanDetails.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Down Payment
                  </label>
                  <input
                    {...register("downPayment", {
                      
                     
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter down payment (e.g., $50,000)"
                  />
                  {errors.downPayment && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.downPayment.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Possession Date
                  </label>
                  <input
                    type="date"
                    {...register("possessionDate", {
                      validate: (value) =>
                        !value ||
                        new Date(value) >= new Date() ||
                        "Possession date must be today or in the future",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.possessionDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.possessionDate.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Description
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description*
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Project description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                      maxLength: {
                        value: 2000,
                        message: "Description cannot exceed 2000 characters",
                      },
                    })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your project in detail"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specifications
                  </label>
                  <textarea
                    {...register("specifications", {
                      maxLength: {
                        value: 2000,
                        message: "Specifications cannot exceed 2000 characters",
                      },
                    })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="List project specifications"
                  />
                  {errors.specifications && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.specifications.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4 border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Amenities
                </h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add amenity (max 50 characters)"
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    disabled={newAmenity.length > 50}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                  >
                    Add
                  </button>
                </div>
                {newAmenity.length > 50 && (
                  <p className="mt-1 text-sm text-red-600">
                    Amenity cannot exceed 50 characters
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{amenity}</span>
                      <button
                        type="button"
                        onClick={() => removeAmenity(index)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Media</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photos
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        handleMediaUpload("photos", e.target.files)
                      }
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="block w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-blue-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="mt-2 text-sm font-medium text-gray-600">
                          Upload photos
                        </span>
                      </div>
                    </label>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {media.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo.url}
                            alt={photo.title || `Photo ${index}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => removeMedia("photos", index)}
                              className="text-white p-1 rounded-full hover:bg-red-500"
                            >
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Videos
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) =>
                        handleMediaUpload("videos", e.target.files)
                      }
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="block w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-blue-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="mt-2 text-sm font-medium text-gray-600">
                          Upload videos
                        </span>
                      </div>
                    </label>
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      {media.videos.map((video, index) => (
                        <div key={index} className="relative group">
                          <video
                            src={video.url}
                            className="w-full h-32 object-cover rounded-md"
                            controls
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => removeMedia("videos", index)}
                              className="text-white"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      3D Videos
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) =>
                        handleMediaUpload("3DVideo", e.target.files)
                      }
                      className="hidden"
                      id="3dvideo-upload"
                    />
                    <label
                      htmlFor="3dvideo-upload"
                      className="block w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-blue-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                          />
                        </svg>
                        <span className="mt-2 text-sm font-medium text-gray-600">
                          Upload 3D videos
                        </span>
                      </div>
                    </label>
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      {media["3DVideo"].map((video, index) => (
                        <div key={index} className="relative group">
                          <video
                            src={video.url}
                            className="w-full h-32 object-cover rounded-md"
                            controls
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => removeMedia("3DVideo", index)}
                              className="text-white"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full text-gray-700">
            Loading properties...
          </p>
        ) : error ? (
          <p className="text-center col-span-full text-red-600">
            Error: {error}
          </p>
        ) : filteredProperties.length === 0 ? (
          <p className="text-center col-span-full text-gray-700">
            No properties match filters.
          </p>
        ) : (
          filteredProperties.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
              onClick={() => handleAddbuildingClick(property._id)}
            >
              <img
                src={
                  property.media.photos[0]?.url ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={property.projectName}
                className="rounded-md mb-3 object-cover h-48 w-full"
              />
              <h3 className="font-bold text-lg mb-1">{property.projectName}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {`${property.location.area}, ${property.location.city} ${property.location.pincode}`}
              </p>
              <p className="text-green-600 font-semibold mb-1">
                {property.price}
              </p>
              <p className="text-gray-700 mb-1">
                Builder: {property.buildername} | Type: {property.propertyType}
              </p>
              <p className="text-gray-700 mb-2">
                Beds: {property.bed} | Baths: {property.bath} | SqFt:{" "}
                {property.sqft}
              </p>
              <button
                onClick={() => toggleDescription(index)}
                className="text-blue-600 underline self-start mb-2"
              >
                {expandedDescriptions[index] ? "Show Less" : "Show More"}
              </button>
              {expandedDescriptions[index] && (
                <div>
                  <p className="text-gray-600 mb-2">{property.description}</p>
                  <p className="text-gray-600 mb-2">
                    {property.specifications}
                  </p>
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() =>
                    setDropdownOpenIndex(
                      dropdownOpenIndex === index ? null : index
                    )
                  }
                  className="bg-gray-200 p-1 rounded"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpenIndex === index}
                >
                  Details ▼
                </button>
                {dropdownOpenIndex === index && (
                  <div className="absolute bg-white border rounded shadow mt-2 p-3 w-56 z-10">
                    <p>
                      <strong>Units:</strong> {property.units || "N/A"}
                    </p>
                    <p>
                      <strong>Kitchen:</strong> {property.kitchen || "N/A"}
                    </p>
                    <p>
                      <strong>Carpet Area:</strong>{" "}
                      {property.carpetArea || "N/A"}
                    </p>
                    <p>
                      <strong>Map View:</strong>{" "}
                      {property.mapView && property.mapView !== "N/A" ? (
                        <a
                          href={property.mapView}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Map
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Phase:</strong> {property.phase || "N/A"}
                    </p>
                    <p>
                      <strong>Floor:</strong> {property.floor || "N/A"}
                    </p>
                    <p>
                      <strong>Amenities:</strong>{" "}
                      {(property.amenities || []).join(", ") || "N/A"}
                    </p>
                    <p>
                      <strong>Loan Details:</strong>{" "}
                      {property.loanDetails || "N/A"}
                    </p>
                    <p>
                      <strong>Down Payment:</strong>{" "}
                      {property.downPayment || "N/A"}
                    </p>
                    <p>
                      <strong>Possession Date:</strong>{" "}
                      {property.possessionDate || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}