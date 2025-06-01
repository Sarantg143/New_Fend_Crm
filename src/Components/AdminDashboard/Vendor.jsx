import { useState } from "react";
import { Pencil, Trash, MoreVertical } from "lucide-react";

const VendorsPage = () => {
  const [vendors, setVendors] = useState([
    {
      name: "John's Plumbing",
      category: "Plumber",
      contact: "john@example.com",
      rating: 4.5,
      areaOfService: "Downtown",
      specialties: ["Leak Repairs", "Pipe Installations"],
      profile:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
    {
      name: "Electric Masters",
      category: "Electrician",
      contact: "contact@electricmasters.com",
      rating: 4.8,
      areaOfService: "Uptown",
      specialties: ["Wiring", "Lighting Installation"],
      profile:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
    {
      name: "Electric Masters",
      category: "Electrician",
      contact: "contact@electricmasters.com",
      rating: 4.8,
      areaOfService: "Uptown",
      specialties: ["Wiring", "Lighting Installation"],
      profile:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    contact: "",
    rating: "",
    areaOfService: "",
    specialties: "",
    profile: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddVendor = () => {
    if (
      form.name &&
      form.category &&
      form.contact &&
      form.rating &&
      form.areaOfService &&
      form.profile
    ) {
      const newVendor = {
        ...form,
        rating: parseFloat(form.rating),
        specialties: form.specialties.split(",").map((item) => item.trim()),
      };

      if (editIndex !== null) {
        const updatedVendors = [...vendors];
        updatedVendors[editIndex] = newVendor;
        setVendors(updatedVendors);
      } else {
        setVendors([...vendors, newVendor]);
      }

      setForm({
        name: "",
        category: "",
        contact: "",
        rating: "",
        areaOfService: "",
        specialties: "",
        profile: "",
      });
      setEditIndex(null);
      setShowForm(false);
    }
  };

  const handleEdit = (index) => {
    setForm({
      name: vendors[index].name,
      category: vendors[index].category,
      contact: vendors[index].contact,
      rating: vendors[index].rating.toString(),
      areaOfService: vendors[index].areaOfService,
      specialties: vendors[index].specialties.join(", "),
      profile: vendors[index].profile,
    });
    setEditIndex(index);
    setShowForm(true);
    setMenuOpenIndex(null);
  };

  const handleDelete = (index) => {
    const updatedVendors = [...vendors];
    updatedVendors.splice(index, 1);
    setVendors(updatedVendors);
    setMenuOpenIndex(null);
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg md:text-xl font-semibold">Vendors List</h2>
        <button
          onClick={() => {
            setForm({
              name: "",
              category: "",
              contact: "",
              rating: "",
              areaOfService: "",
              specialties: "",
              profile: "",
            });
            setEditIndex(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base"
        >
          Add Vendor
        </button>
      </div>

      {/* Cards View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor, index) => (
          <div
            key={index}
            className="relative border rounded-lg p-4 shadow-md bg-white space-y-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={vendor.profile}
                alt={vendor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{vendor.name}</h3>
                <p className="text-sm text-gray-600">{vendor.category}</p>
              </div>
              <div className="ml-auto relative">
                <button
                  onClick={() =>
                    setMenuOpenIndex(menuOpenIndex === index ? null : index)
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  <MoreVertical size={20} />
                </button>
                {menuOpenIndex === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg rounded z-10">
                    <button
                      onClick={() => handleEdit(index)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      <Pencil size={14} className="inline mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                    >
                      <Trash size={14} className="inline mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p>
              <span className="font-medium">Contact:</span> {vendor.contact}
            </p>
            <p>
              <span className="font-medium">Rating:</span> {vendor.rating}
            </p>
            <p>
              <span className="font-medium">Area:</span> {vendor.areaOfService}
            </p>
            <p>
              <span className="font-medium">Specialties:</span>{" "}
              {vendor.specialties.join(", ")}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:max-w-xl p-6 space-y-4">
            <h2 className="text-base md:text-lg font-semibold mb-2">
              {editIndex !== null ? "Edit Vendor" : "Add New Vendor"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Vendor Name"
                value={form.name}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Info"
                value={form.contact}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                value={form.rating}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                min="0"
                max="5"
              />
              <input
                type="text"
                name="areaOfService"
                placeholder="Area of Service"
                value={form.areaOfService}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="specialties"
                placeholder="Specialties (comma separated)"
                value={form.specialties}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="profile"
                placeholder="Profile Image URL"
                value={form.profile}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border text-gray-700 text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVendor}
                className="px-4 py-2 rounded bg-blue-600 text-white text-sm md:text-base"
              >
                {editIndex !== null ? "Update Vendor" : "Add Vendor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorsPage;
