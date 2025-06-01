import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = "https://crm-bcgg.onrender.com";
const MEDIA_UPLOAD_URL = "https://z-backend-2xag.onrender.com/api/upload/type";



export default function ProjectManagement() {

  const location = useLocation();
  const id = location.state.builderId;
  console.log(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({ mode: "onBlur" });

  const [projects, setProjects] = useState([]);
  const [builders, setBuilders] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterBuilder, setFilterBuilder] = useState("All");
  const [filterPropertyType, setFilterPropertyType] = useState("All");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [media, setMedia] = useState({
    photos: [],
    videos: [],
    threeDVideo: [],
  });
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBuildersLoading, setIsBuildersLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

  // Fetch projects and builders on component mount
  useEffect(() => {
    fetchProjects();
    fetchBuilders();
  }, []);

  const fetchProjects = async () => {
  if (!id) return;

  setIsLoading(true);
  setError(null);
  try {
    const response = await axios.get(`${BASE_URL}/api/properties/projects/by-builder/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProjects(response.data || []);
  } catch (err) {
    setError(
      err.response?.data?.message || err.message || "Failed to fetch projects"
    );
  } finally {
    setIsLoading(false);
  }
};


const fetchBuilders = async () => {
  setIsBuildersLoading(true);
  setError(null);
  try {
    const response = await axios.get(
      `${BASE_URL}/api/propertiesGet/builder/${id}`, // Use the id from location.state
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Assuming the response returns a single builder object
    // If it returns an array, you might not need to wrap it in an array
    setBuilders(response.data ? [response.data] : []);
  } catch (err) {
    setError(
      err.response?.data?.message || err.message || "Failed to fetch builder"
    );
  } finally {
    setIsBuildersLoading(false);
  }
};

  const handleMediaUpload = async (type, files) => {
    if (!files || files.length === 0) return;

    setIsLoading(true);
    setError(null);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(MEDIA_UPLOAD_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    setError(null);
    try {
      const projectData = {
        ...data,
        builder: data.builder,
        amenities,
        media,
      };

      const url = isEditMode
        ? `${BASE_URL}/api/properties/project/${currentProjectId}`
        : `${BASE_URL}/api/properties/project`;

      const method = isEditMode ? "put" : "post";

      await axios[method](url, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      resetForm();
      fetchProjects();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to save project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    reset();
    setMedia({ photos: [], videos: [], threeDVideo: [] });
    setAmenities([]);
    setNewAmenity("");
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentProjectId(null);
    setError(null);
  };

  const handleEditProject = (project) => {
    if (!project) return;

    setIsEditMode(true);
    setCurrentProjectId(project._id);

    // Set basic form values
    const fieldsToSet = [
      "projectName",
      "propertyType",
      "price",
      "type",
      "status",
      "bed",
      "bath",
      "sqft",
      "units",
      "kitchen",
      "carpetArea",
      "mapView",
      "phase",
      "floor",
      "loanDetails",
      "downPayment",
      "possessionDate",
      "description",
      "specifications",
    ];

    fieldsToSet.forEach((field) => {
      if (project[field] !== undefined) {
        setValue(field, project[field]);
      }
    });

    // Set location fields
    if (project.location) {
      setValue("location.city", project.location.city || "");
      setValue("location.area", project.location.area || "");
      setValue("location.pincode", project.location.pincode || "");
    }

    // Set builder
    setValue("builder", project.builder?._id || project.builder || "");

    // Set media and amenities
    setMedia(project.media || { photos: [], videos: [], threeDVideo: [] });
    setAmenities(project.amenities || []);

    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (
      !projectId ||
      !window.confirm("Are you sure you want to delete this project?")
    ) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${BASE_URL}/api/properties/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProjects();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to delete project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDescription = (projectId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const filteredProjects = projects.filter((project) => {
    if (!project) return false;

    const matchesType =
      filterType === "All" ||
      (project.type && project.type.toLowerCase() === filterType.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (project.status &&
        project.status.toLowerCase() === filterStatus.toLowerCase());
    const matchesBuilder =
      filterBuilder === "All" ||
      (project.builder && project.builder.toString() === filterBuilder);
    const matchesPropertyType =
      filterPropertyType === "All" ||
      (project.propertyType &&
        project.propertyType.toLowerCase() ===
          filterPropertyType.toLowerCase());

    return (
      matchesType && matchesStatus && matchesBuilder && matchesPropertyType
    );
  });

  // Watch price and sqft for validation
  const priceValue = watch("price");
  const sqftValue = watch("sqft");
  const navigate = useNavigate();

 const handleAddbuildingClick = (id) => {
   navigate("/add-Builder", {
     state: { id },
   });
 };
  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-100 p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError(null)}
            className="absolute top-0 right-0 px-2 py-1"
          >
            ×
          </button>
        </div>
      )}

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
            disabled={isBuildersLoading}
          >
            <option value="All">All Builders</option>
            {builders.map((builder) => (
              <option key={builder._id} value={builder._id}>
                {builder.companyName || "Unknown Builder"}
              </option>
            ))}
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
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Add Project"}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={resetForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Close modal"
              disabled={isLoading}
            >
              ×
            </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditMode ? "Edit Project" : "Create New Project"}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      pattern: {
                        value: /^\$?\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
                        message:
                          "Price must be a valid currency format (e.g., $500,000 or 500000.00)",
                      },
                      validate: (value) =>
                        parseFloat(value.replace(/[$,]/g, "")) > 0 ||
                        "Price must be greater than 0",
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Builder*
                  </label>
                  <select
                    {...register("builder", {
                      required: "Builder is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isBuildersLoading}
                  >
                    <option value="">
                      {isBuildersLoading
                        ? "Loading builder..."
                        : "Select builder"}
                    </option>
                    {builders.map((builder) => (
                      <option key={builder._id} value={builder._id}>
                        {builder.companyName || "Unknown Builder"}
                      </option>
                    ))}
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
                      validate: (value) => {
                        if (!value) return true;
                        const carpetAreaValue = parseFloat(value);
                        const sqftValueNum = parseFloat(sqftValue);
                        return (
                          (!isNaN(carpetAreaValue) &&
                            !isNaN(sqftValueNum) &&
                            carpetAreaValue <= sqftValueNum) ||
                          "Carpet area cannot exceed total square feet"
                        );
                      },
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
                      pattern: {
                        value: /^\$?\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
                        message:
                          "Down payment must be a valid currency format (e.g., $50,000)",
                      },
                      validate: (value) => {
                        if (!value) return true;
                        const downPaymentValue = parseFloat(
                          value.replace(/[$,]/g, "")
                        );
                        const priceValueNum = parseFloat(
                          (priceValue || "").replace(/[$,]/g, "")
                        );
                        return (
                          (!isNaN(downPaymentValue) &&
                            !isNaN(priceValueNum) &&
                            downPaymentValue <= priceValueNum) ||
                          "Down payment cannot exceed total price"
                        );
                      },
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
                        new Date(value) >= new Date().setHours(0, 0, 0, 0) ||
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
                    maxLength={50}
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    disabled={!newAmenity.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                  >
                    Add
                  </button>
                </div>
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
                        handleMediaUpload("threeDVideo", e.target.files)
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
                      {media.threeDVideo.map((video, index) => (
                        <div key={index} className="relative group">
                          <video
                            src={video.url}
                            className="w-full h-32 object-cover rounded-md"
                            controls
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => removeMedia("threeDVideo", index)}
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
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                    ? "Update Project"
                    : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading && !isModalOpen ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <p className="text-center col-span-full text-gray-700">
              {projects.length === 0
                ? "No projects found. Create a new project to get started."
                : "No projects match the selected filters."}
            </p>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                onClick={() => handleAddbuildingClick(project._id)}
                key={project._id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <img
                  src={
                    project.media?.photos[0]?.url ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={project.projectName}
                  className="rounded-md mb-3 object-cover h-48 w-full"
                />
                <h3 className="font-bold text-lg mb-1">
                  {project.projectName}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {project.location &&
                    `${project.location.area}, ${project.location.city} ${project.location.pincode}`}
                </p>
                <p className="text-green-600 font-semibold mb-1">
                  {project.price}
                </p>
                <p className="text-gray-700 mb-1">
                  Builder:{" "}
                  {builders.find((b) => b._id === project.builder)?.name ||
                    "Unknown"}{" "}
                  | Type: {project.propertyType}
                </p>
                <p className="text-gray-700 mb-2">
                  Beds: {project.bed} | Baths: {project.bath} | SqFt:{" "}
                  {project.sqft}
                </p>
                <button
                  onClick={() => toggleDescription(index)}
                  className="text-blue-600 underline self-start mb-2"
                >
                  {expandedDescriptions[index] ? "Show Less" : "Show More"}
                </button>
                {expandedDescriptions[index] && (
                  <div>
                    <p className="text-gray-600 mb-2">{project.description}</p>
                    <p className="text-gray-600 mb-2">
                      {project.specifications}
                    </p>
                  </div>
                )}
                <div className="mt-auto flex justify-between items-center">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="text-blue-600 hover:text-blue-800"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}