import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";

const BASE_URL = "https://crm-bcgg.onrender.com";
const FLOORS_ENDPOINT = "/api/properties/floors";
const BUILDING_ENDPOINT = "/api/propertiesGet/building"; // Updated endpoint
const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

const FloorFormComponent = ({ buildings, onSubmit, onCancel, floorToEdit }) => {
  const [formData, setFormData] = useState({
    building: floorToEdit?.building || "",
    floorNumber: floorToEdit?.floorNumber || "",
    totalUnits: floorToEdit?.totalUnits || "",
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    if (floorToEdit) {
      setFormData({
        building: floorToEdit.building._id,
        floorNumber: floorToEdit.floorNumber.toString(),
        totalUnits: floorToEdit.totalUnits.toString(),
      });
    }
  }, [floorToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.building) {
      newErrors.building = "Please select a building";
    } else if (!buildings.some((b) => b._id === formData.building)) {
      newErrors.building = "Selected building is invalid";
    }
    if (!formData.floorNumber) {
      newErrors.floorNumber = "Floor number is required";
    } else if (
      !/^\d+$/.test(formData.floorNumber) ||
      parseInt(formData.floorNumber) <= 0
    ) {
      newErrors.floorNumber = "Floor number must be a positive integer";
    }
    if (!formData.totalUnits) {
      newErrors.totalUnits = "Total units is required";
    } else if (
      !/^\d+$/.test(formData.totalUnits) ||
      parseInt(formData.totalUnits) <= 0
    ) {
      newErrors.totalUnits = "Total units must be a positive integer";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmissionStatus("submitting");
    try {
      const payload = {
        building: formData.building,
        floorNumber: parseInt(formData.floorNumber),
        totalUnits: parseInt(formData.totalUnits),
      };

      let response;
      if (floorToEdit) {
        response = await axios.put(
          `${BASE_URL}/api/properties/floor/${floorToEdit._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `${BASE_URL}/api/properties/floor`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.data.success) {
        setSubmissionStatus("success");
        setFormData({ building: "", floorNumber: "", totalUnits: "" });
        onSubmit(response.data.floor);
        setTimeout(() => {
          setSubmissionStatus(null);
          onCancel();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to save floor");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
      setTimeout(() => setSubmissionStatus(null), 3000);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {floorToEdit ? "Edit Floor" : "Add Floor"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {floorToEdit
              ? "Update floor details"
              : "Enter details about the floor"}
          </p>
        </div>
        {buildings.length === 0 && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
            No buildings available. Please add a building first.
          </div>
        )}
        {submissionStatus === "success" && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
            {floorToEdit ? "Floor updated" : "Floor added"} successfully!
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            Error submitting form. Please try again.
          </div>
        )}
        <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="building"
              className="block text-sm font-medium text-gray-700"
            >
              Building *
            </label>
            <div className="mt-1">
              <select
                id="building"
                name="building"
                value={formData.building}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.building ? "border-red-500" : "border-gray-300"
                }`}
                disabled={buildings.length === 0 || !!floorToEdit}
              >
                <option value="">Select a building</option>
                {buildings.map((building) => (
                  <option key={building._id} value={building._id}>
                    {building.buildingName}
                  </option>
                ))}
              </select>
              {errors.building && (
                <p className="mt-1 text-sm text-red-600">{errors.building}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="floorNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Floor Number *
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="floorNumber"
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.floorNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. 1, 2, 3..."
                min="1"
              />
              {errors.floorNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.floorNumber}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="totalUnits"
              className="block text-sm font-medium text-gray-700"
            >
              Total Units *
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="totalUnits"
                name="totalUnits"
                value={formData.totalUnits}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.totalUnits ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Number of units on this floor"
                min="1"
              />
              {errors.totalUnits && (
                <p className="mt-1 text-sm text-red-600">{errors.totalUnits}</p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={
                submissionStatus === "submitting" || buildings.length === 0
              }
              className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                submissionStatus === "submitting" || buildings.length === 0
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {submissionStatus === "submitting" ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Processing...
                </>
              ) : floorToEdit ? (
                "Update Floor"
              ) : (
                "Save Floor"
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function FloorList() {
  const location = useLocation();
  const id = location.state.id;
  const [floors, setFloors] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [showAddFloorModal, setShowAddFloorModal] = useState(false);
  const [floorToEdit, setFloorToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterBuilding, setFilterBuilding] = useState("All");
  const [filterFloorNumber, setFilterFloorNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch building data from the new endpoint
        const buildingResponse = await axios.get(
          `${BASE_URL}${BUILDING_ENDPOINT}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (buildingResponse.data) {
          // Assuming the response is a single building object
          setBuildings([buildingResponse.data]);
        } else {
          throw new Error("Invalid building data structure");
        }

        // Fetch floors for this building
        const floorsResponse = await axios.get(
          `${BASE_URL}${FLOORS_ENDPOINT}/by-building/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (floorsResponse.data && Array.isArray(floorsResponse.data)) {
          setFloors(floorsResponse.data);
        } else {
          throw new Error(
            floorsResponse.data.message || "Failed to fetch floors"
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddFloor = (newFloor) => {
    setFloors((prev) => [...prev, newFloor]);
    setShowAddFloorModal(false);
  };

  const handleUpdateFloor = (updatedFloor) => {
    setFloors((prev) =>
      prev.map((floor) =>
        floor._id === updatedFloor._id ? updatedFloor : floor
      )
    );
    setShowAddFloorModal(false);
    setFloorToEdit(null);
  };

  const handleDeleteFloor = async (floorId) => {
    try {
      await axios.delete(`${BASE_URL}/api/properties/floor/${floorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFloors((prev) => prev.filter((floor) => floor._id !== floorId));
    } catch (error) {
      console.error("Error deleting floor:", error);
      alert("Failed to delete floor. Please try again.");
    }
  };

  const handleEditFloor = (floor) => {
    setFloorToEdit(floor);
    setShowAddFloorModal(true);
  };

  const filteredFloors = floors.filter((floor) => {
    const matchesBuilding =
      filterBuilding === "All" || floor.building === filterBuilding;
    const matchesFloorNumber =
      filterFloorNumber === "" ||
      floor.floorNumber.toString().includes(filterFloorNumber);
    return matchesBuilding && matchesFloorNumber;
  });

  const goBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const handleAddunitClick = (id) => {
    navigate("/add-unit", { state: { id } });
  };

  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-100 p-4">
      <IoMdArrowBack
        onClick={goBack}
        className="mb-2 text-2xl cursor-pointer"
      />

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-grow">
          <select
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterBuilding}
            onChange={(e) => setFilterBuilding(e.target.value)}
          >
            <option value="All">All Buildings</option>
            {buildings.map((building) => (
              <option key={building._id} value={building._id}>
                {building.buildingName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Filter by floor number"
            value={filterFloorNumber}
            onChange={(e) => setFilterFloorNumber(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            setFloorToEdit(null);
            setShowAddFloorModal(true);
          }}
        >
          Add Floor
        </button>
      </div>

      {/* Floors Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredFloors.length === 0 ? (
          <div className="p-4 text-center text-gray-700">
            No floors found. Add a floor to get started.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Building
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Floor Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Units
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFloors.map((floor) => {
                const building = buildings.find(
                  (b) => b._id === floor.building
                );
                return (
                  <tr
                    key={floor._id}
                    className="hover:bg-gray-50"
                    onClick={() => handleAddunitClick(floor._id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {building?.buildingName || "Unknown Building"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {floor.floorNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {floor.totalUnits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditFloor(floor);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFloor(floor._id);
                        }}
                        className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Floor Modal */}
      {showAddFloorModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowAddFloorModal(false);
            setFloorToEdit(null);
          }}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                setShowAddFloorModal(false);
                setFloorToEdit(null);
              }}
            >
              ×
            </button>
            <FloorFormComponent
              buildings={buildings}
              onSubmit={floorToEdit ? handleUpdateFloor : handleAddFloor}
              onCancel={() => {
                setShowAddFloorModal(false);
                setFloorToEdit(null);
              }}
              floorToEdit={floorToEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
