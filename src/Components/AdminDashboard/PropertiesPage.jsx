// import React, { useEffect, useState } from "react";
// import {
//   HomeModernIcon,
//   BuildingOfficeIcon,
//   Squares2X2Icon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@heroicons/react/24/outline";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { IoMdArrowBack } from "react-icons/io";


// export default function PropertyManager() {
//   const [showModal, setShowModal] = useState(false);
//   const [currentForm, setCurrentForm] = useState(1);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
//   const [filterType, setFilterType] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [expandedCards, setExpandedCards] = useState({});
//   const [builders, setBuilders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);

//   const navigate = useNavigate();


//   const BASE_URL = "https://crm-bcgg.onrender.com";
//   const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

//   const [profile, setProfile] = useState({
//     user: "",
//     companyName: "",
//     tagline: "",
//     logo: "",
//     coverPhotos: [],
//     gallery: [],
//     website: "",
//     email: "",
//     phone: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       pincode: "",
//     },
//     description: "",
//     features: [],
//     servicesOffered: [],
//     socialLinks: {
//       facebook: "",
//       linkedin: "",
//       instagram: "",
//       youtube: "",
//     },
//     supportInfo: {
//       contactPerson: "",
//       supportEmail: "",
//       supportPhone: "",
//     },
//   });

//   const [newFeature, setNewFeature] = useState("");
//   const [newService, setNewService] = useState("");
//   const [newCoverPhoto, setNewCoverPhoto] = useState({
//     url: "",
//     type: "image",
//     title: "",
//   });
//   const [newGalleryItem, setNewGalleryItem] = useState({
//     url: "",
//     type: "image",
//     title: "",
//   });

//   // Fetch builders data on component mount
//   useEffect(() => {
//     const fetchBuilders = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/properties/builder-profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setBuilders(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching builders:", error);
//         setLoading(false);
//       }
//     };

//     fetchBuilders();
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setProfile((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value,
//         },
//       }));
//     } else {
//       setProfile((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const addFeature = () => {
//     if (newFeature.trim()) {
//       setProfile((prev) => ({
//         ...prev,
//         features: [...prev.features, newFeature.trim()],
//       }));
//       setNewFeature("");
//     }
//   };

//   const removeFeature = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index),
//     }));
//   };

//   const addService = () => {
//     if (newService.trim()) {
//       setProfile((prev) => ({
//         ...prev,
//         servicesOffered: [...prev.servicesOffered, newService.trim()],
//       }));
//       setNewService("");
//     }
//   };

//   const removeService = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       servicesOffered: prev.servicesOffered.filter((_, i) => i !== index),
//     }));
//   };

//   const addCoverPhoto = () => {
//     if (newCoverPhoto.url.trim()) {
//       setProfile((prev) => ({
//         ...prev,
//         coverPhotos: [...prev.coverPhotos, { ...newCoverPhoto }],
//       }));
//       setNewCoverPhoto({ url: "", type: "image", title: "" });
//     }
//   };

//   const removeCoverPhoto = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       coverPhotos: prev.coverPhotos.filter((_, i) => i !== index),
//     }));
//   };

//   const addGalleryItem = () => {
//     if (newGalleryItem.url.trim()) {
//       setProfile((prev) => ({
//         ...prev,
//         gallery: [...prev.gallery, { ...newGalleryItem }],
//       }));
//       setNewGalleryItem({ url: "", type: "image", title: "" });
//     }
//   };

//   const removeGalleryItem = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       gallery: prev.gallery.filter((_, i) => i !== index),
//     }));
//   };

//   const toggleCardExpansion = (index) => {
//     setExpandedCards((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const handlefileupload = async (e) => {
//     const file = e.target.files[0];
//     const name = e.target.name;
//     const formdata = new FormData();
//     formdata.append("file", file);
//     try {
//       const res = await axios.post(
//         `https://z-backend-2xag.onrender.com/api/upload/type`,
//         formdata,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       const link = await res.data;
//       setProfile((previous) => ({ ...previous, [name]: link.fileUrl }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCoverPhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     const formdata = new FormData();
//     formdata.append("file", file);
//     try {
//       const res = await axios.post(
//         `https://z-backend-2xag.onrender.com/api/upload/type`,
//         formdata,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       const link = await res.data;
//       setNewCoverPhoto((prev) => ({
//         ...prev,
//         url: link.fileUrl,
//         type: file.type.startsWith("video") ? "video" : "image",
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleGalleryItemUpload = async (e) => {
//     const file = e.target.files[0];
//     const formdata = new FormData();
//     formdata.append("file", file);
//     try {
//       const res = await axios.post(
//         `https://z-backend-2xag.onrender.com/api/upload/type`,
//         formdata,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       const link = await res.data;
//       setNewGalleryItem((prev) => ({
//         ...prev,
//         url: link.fileUrl,
//         type: file.type.startsWith("video") ? "video" : "image",
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/users/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     if (showModal) {
//       fetchUsers();
//     }
//   }, [token, showModal]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/api/properties/builder-profile`,
//         profile,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Data posted successfully:", response.data);
//       alert("Builder profile saved successfully!");
//       setShowModal(false);
//       // Refresh the builders list after adding a new one
//       const res = await axios.get(`${BASE_URL}/api/properties/builder-profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setBuilders(res.data);
//     } catch (error) {
//       console.error("Error posting data:", error);
//       alert("Error saving builder profile. Please try again.");
//     }
//   };

// const handleAddprojectClick = (builderId) => {
//   navigate("/add-project", {
//     state: { builderId },
//   });
// };


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }


//   return (
//     <div className="flex flex-col h-screen bg-gray-100 p-4">
//       {/* Filters */}
//       <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
//         <div className="flex flex-wrap gap-3 items-center flex-grow">
//           <select
//             className="border rounded p-2"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             aria-label="Filter by Type"
//           >
//             <option value="All">All Types</option>
//             <option value="Residential">Residential</option>
//             <option value="Commercial">Commercial</option>
//           </select>

//           <select
//             className="border rounded p-2"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             aria-label="Filter by Status"
//           >
//             <option value="All">All Statuses</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>

//         <button
//           type="button"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-auto"
//           onClick={() => setShowModal(true)}
//         >
//           Add Builder
//         </button>
//       </div>

//       {/* Builders list */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {builders.length === 0 ? (
//           <div className="col-span-full text-center py-10">
//             <p className="text-gray-700 text-lg">No builders found.</p>
//             <button
//               onClick={() => setShowModal(true)}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Add Your First Builder
//             </button>
//           </div>
//         ) : (
//           builders.map((builder, index) => (
//             <div
//               key={builder._id}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//               onClick={() => handleAddprojectClick(builder._id)}
//             >
//               {/* Cover Photo */}
//               {builder.coverPhotos.length > 0 && (
//                 <div className="h-48 overflow-hidden">
//                   <img
//                     src={builder.coverPhotos[0].url}
//                     alt={builder.coverPhotos[0].title || "Cover photo"}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}

//               {/* Basic Info */}
//               <div className="p-6">
//                 <div className="flex items-start">
//                   {builder.logo && (
//                     <img
//                       src={builder.logo}
//                       alt="Company logo"
//                       className="h-16 w-16 rounded-full object-cover border-2 border-white -mt-12 mr-4"
//                     />
//                   )}
//                   <div>
//                     <h3 className="font-bold text-xl">{builder.companyName}</h3>
//                     <p className="text-gray-600">{builder.tagline}</p>
//                   </div>
//                 </div>

//                 <p className="mt-4 text-gray-700 line-clamp-3">
//                   {builder.description}
//                 </p>

//                 <div className="mt-4 grid grid-cols-2 gap-2">
//                   <div>
//                     <p className="text-sm text-gray-500">Email</p>
//                     <p className="font-medium break-words">{builder.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Phone</p>
//                     <p className="font-medium">{builder.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Location</p>
//                     <p className="font-medium">
//                       {builder.address.city}, {builder.address.state}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Website</p>
//                     <a
//                       href={builder.website}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-medium text-blue-600 hover:underline"
//                     >
//                       Visit Site
//                     </a>
//                   </div>
//                 </div>

//                 {/* Expanded Details */}
//                 {expandedCards[index] && (
//                   <div className="mt-6 border-t pt-4">
//                     <h4 className="font-semibold mb-2">Features</h4>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {builder.features.map((feature, i) => (
//                         <span
//                           key={i}
//                           className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>

//                     <h4 className="font-semibold mb-2">Services Offered</h4>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {builder.servicesOffered.map((service, i) => (
//                         <span
//                           key={i}
//                           className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
//                         >
//                           {service}
//                         </span>
//                       ))}
//                     </div>

//                     <h4 className="font-semibold mb-2">Social Links</h4>
//                     <div className="flex space-x-4 mb-4">
//                       {builder.socialLinks.facebook && (
//                         <a
//                           href={builder.socialLinks.facebook}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           Facebook
//                         </a>
//                       )}
//                       {builder.socialLinks.linkedin && (
//                         <a
//                           href={builder.socialLinks.linkedin}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           LinkedIn
//                         </a>
//                       )}
//                       {builder.socialLinks.instagram && (
//                         <a
//                           href={builder.socialLinks.instagram}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           Instagram
//                         </a>
//                       )}
//                       {builder.socialLinks.youtube && (
//                         <a
//                           href={builder.socialLinks.youtube}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           YouTube
//                         </a>
//                       )}
//                     </div>

//                     <h4 className="font-semibold mb-2">Support Information</h4>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-500">Contact Person</p>
//                         <p className="font-medium">
//                           {builder.supportInfo.contactPerson}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Support Email</p>
//                         <p className="font-medium">
//                           {builder.supportInfo.supportEmail}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Support Phone</p>
//                         <p className="font-medium">
//                           {builder.supportInfo.supportPhone}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={() => toggleCardExpansion(index)}
//                   className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
//                 >
//                   {expandedCards[index] ? (
//                     <>
//                       <ChevronUpIcon className="h-5 w-5 mr-1" />
//                       Show Less
//                     </>
//                   ) : (
//                     <>
//                       <ChevronDownIcon className="h-5 w-5 mr-1" />
//                       Know More
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Add Builder Modal */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="modal-title"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="bg-white rounded-lg max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 id="modal-title" className="text-xl font-semibold mb-4">
//               Add Builder
//             </h2>

//             <form onSubmit={handleSubmit}>
//               {/* Section 1: Basic Information */}
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Basic Information
//               </h2>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   User *
//                 </label>
//                 <select
//                   name="user"
//                   value={profile.user}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select a user</option>
//                   {users.map((user) => (
//                     <option key={user._id} value={user._id}>
//                       {user.name} ({user.email})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-5 mb-8">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Company Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={profile.companyName}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your company name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tagline
//                   </label>
//                   <input
//                     type="text"
//                     name="tagline"
//                     value={profile.tagline}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="A short tagline about your company"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Company Logo
//                   </label>
//                   <input
//                     type="file"
//                     name="logo"
//                     onChange={handlefileupload}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Company Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={profile.description}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Tell us about your company, your mission, and values"
//                   />
//                 </div>
//               </div>

//               {/* Section 2: Cover Photos */}
//               <div className="bg-gray-50 p-6 rounded-lg mb-8">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   Cover Photos
//                 </h2>

//                 <div className="space-y-5">
//                   {profile.coverPhotos.length > 0 && (
//                     <div className="space-y-3">
//                       {profile.coverPhotos.map((photo, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between bg-white p-3 rounded border"
//                         >
//                           <div>
//                             <p className="font-medium">
//                               {photo.title || `Cover Photo ${index + 1}`}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {photo.type} - {photo.url.substring(0, 30)}...
//                             </p>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeCoverPhoto(index)}
//                             className="text-red-500 hover:text-red-700 p-1"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Photo
//                       </label>
//                       <input
//                         type="file"
//                         onChange={handleCoverPhotoUpload}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Title
//                       </label>
//                       <input
//                         type="text"
//                         value={newCoverPhoto.title}
//                         onChange={(e) =>
//                           setNewCoverPhoto({
//                             ...newCoverPhoto,
//                             title: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Cover photo title"
//                       />
//                     </div>

//                     <button
//                       type="button"
//                       onClick={addCoverPhoto}
//                       disabled={!newCoverPhoto.url}
//                       className={`flex items-center justify-center px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         newCoverPhoto.url
//                           ? "bg-purple-600 hover:bg-blue-700"
//                           : "bg-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                         />
//                       </svg>
//                       Add Cover Photo
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Section 3: Gallery */}
//               <div className="bg-gray-50 p-6 rounded-lg mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   Gallery
//                 </h2>

//                 <div className="space-y-5">
//                   {profile.gallery.length > 0 && (
//                     <div className="space-y-3">
//                       {profile.gallery.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between bg-white p-3 rounded border"
//                         >
//                           <div>
//                             <p className="font-medium">
//                               {item.title || `Gallery Item ${index + 1}`}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {item.type} - {item.url.substring(0, 30)}...
//                             </p>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeGalleryItem(index)}
//                             className="text-red-500 hover:text-red-700 p-1"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Gallery Item
//                       </label>
//                       <input
//                         type="file"
//                         onChange={handleGalleryItemUpload}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Title
//                       </label>
//                       <input
//                         type="text"
//                         value={newGalleryItem.title}
//                         onChange={(e) =>
//                           setNewGalleryItem({
//                             ...newGalleryItem,
//                             title: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Gallery item title"
//                       />
//                     </div>

//                     <button
//                       type="button"
//                       onClick={addGalleryItem}
//                       disabled={!newGalleryItem.url}
//                       className={`flex items-center justify-center px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         newGalleryItem.url
//                           ? "bg-purple-600 hover:bg-blue-700"
//                           : "bg-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                         />
//                       </svg>
//                       Add Gallery Item
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Section 4: Contact Information */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   Contact Information
//                 </h2>

//                 <div className="space-y-5">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Website
//                       </label>
//                       <input
//                         type="url"
//                         name="website"
//                         value={profile.website}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="https://yourcompany.com"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={profile.email}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="contact@yourcompany.com"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={profile.phone}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="+91 9876543210"
//                     />
//                   </div>

//                   <div className="space-y-3">
//                     <h3 className="text-lg font-medium text-gray-800">
//                       Address
//                     </h3>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Street Address
//                       </label>
//                       <input
//                         type="text"
//                         name="address.street"
//                         value={profile.address.street}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="123 Main Street"
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           City
//                         </label>
//                         <input
//                           type="text"
//                           name="address.city"
//                           value={profile.address.city}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Mumbai"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           State
//                         </label>
//                         <input
//                           type="text"
//                           name="address.state"
//                           value={profile.address.state}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Maharashtra"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Pincode
//                         </label>
//                         <input
//                           type="text"
//                           name="address.pincode"
//                           value={profile.address.pincode}
//                           onChange={handleChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="400001"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Section 5: Features */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   Company Features
//                 </h2>

//                 <div className="space-y-5">
//                   <div className="flex flex-wrap gap-2">
//                     {profile.features.map((feature, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
//                       >
//                         {feature}
//                         <button
//                           type="button"
//                           onClick={() => removeFeature(index)}
//                           className="ml-1.5 inline-flex text-blue-500 hover:text-blue-700 focus:outline-none"
//                         >
//                           &times;
//                         </button>
//                       </span>
//                     ))}
//                   </div>

//                   <div className="flex">
//                     <input
//                       type="text"
//                       value={newFeature}
//                       onChange={(e) => setNewFeature(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && addFeature()}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Add a feature (e.g. RERA Registered)"
//                     />
//                     <button
//                       type="button"
//                       onClick={addFeature}
//                       className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Section 6: Services Offered */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   Services Offered
//                 </h2>

//                 <div className="space-y-5">
//                   <div className="flex flex-wrap gap-2">
//                     {profile.servicesOffered.map((service, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
//                       >
//                         {service}
//                         <button
//                           type="button"
//                           onClick={() => removeService(index)}
//                           className="ml-1.5 inline-flex text-green-500 hover:text-green-700 focus:outline-none"
//                         >
//                           &times;
//                         </button>
//                       </span>
//                     ))}
//                   </div>

//                   <div className="flex">
//                     <input
//                       type="text"
//                       value={newService}
//                       onChange={(e) => setNewService(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && addService()}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Add a service (e.g. Apartments)"
//                     />
//                     <button
//                       type="button"
//                       onClick={addService}
//                       className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Section 7: Social Links */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   Social Media Links
//                 </h2>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Facebook
//                     </label>
//                     <input
//                       type="text"
//                       name="socialLinks.facebook"
//                       value={profile.socialLinks.facebook}
//                       onChange={handleChange}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="facebook.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       LinkedIn
//                     </label>
//                     <input
//                       type="text"
//                       name="socialLinks.linkedin"
//                       value={profile.socialLinks.linkedin}
//                       onChange={handleChange}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="linkedin.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Instagram
//                     </label>
//                     <input
//                       type="text"
//                       name="socialLinks.instagram"
//                       value={profile.socialLinks.instagram}
//                       onChange={handleChange}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="instagram.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       YouTube
//                     </label>
//                     <input
//                       type="text"
//                       name="socialLinks.youtube"
//                       value={profile.socialLinks.youtube}
//                       onChange={handleChange}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="youtube.com"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Section 8: Support Information */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   Support Information
//                 </h2>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Contact Person
//                     </label>
//                     <input
//                       type="text"
//                       name="supportInfo.contactPerson"
//                       value={profile.supportInfo.contactPerson}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Name of the support contact person"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Support Email
//                       </label>
//                       <input
//                         type="email"
//                         name="supportInfo.supportEmail"
//                         value={profile.supportInfo.supportEmail}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="support@yourcompany.com"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Support Phone
//                       </label>
//                       <input
//                         type="tel"
//                         name="supportInfo.supportPhone"
//                         value={profile.supportInfo.supportPhone}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="+91 9876543210"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 mt-6">
//                 <button
//                   type="button"
//                   className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
//  }

import React, { useEffect, useState } from "react";
import {
  HomeModernIcon,
  BuildingOfficeIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function PropertyManager() {
  const [showModal, setShowModal] = useState(false);
  const [currentForm, setCurrentForm] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedCards, setExpandedCards] = useState({});
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const BASE_URL = "https://crm-bcgg.onrender.com";
  const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

  const [profile, setProfile] = useState({
    _id: "",
    user: "",
    companyName: "",
    tagline: "",
    logo: "",
    coverPhotos: [],
    gallery: [],
    website: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    description: "",
    features: [],
    servicesOffered: [],
    socialLinks: {
      facebook: "",
      linkedin: "",
      instagram: "",
      youtube: "",
    },
    supportInfo: {
      contactPerson: "",
      supportEmail: "",
      supportPhone: "",
    },
  });

  const [newFeature, setNewFeature] = useState("");
  const [newService, setNewService] = useState("");
  const [newCoverPhoto, setNewCoverPhoto] = useState({
    url: "",
    type: "image",
    title: "",
  });
  const [newGalleryItem, setNewGalleryItem] = useState({
    url: "",
    type: "image",
    title: "",
  });

  // Fetch builders data on component mount
  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/properties/builder-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBuilders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching builders:", error);
        setLoading(false);
      }
    };

    fetchBuilders();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setProfile((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setProfile((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addService = () => {
    if (newService.trim()) {
      setProfile((prev) => ({
        ...prev,
        servicesOffered: [...prev.servicesOffered, newService.trim()],
      }));
      setNewService("");
    }
  };

  const removeService = (index) => {
    setProfile((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.filter((_, i) => i !== index),
    }));
  };

  const addCoverPhoto = () => {
    if (newCoverPhoto.url.trim()) {
      setProfile((prev) => ({
        ...prev,
        coverPhotos: [...prev.coverPhotos, { ...newCoverPhoto }],
      }));
      setNewCoverPhoto({ url: "", type: "image", title: "" });
    }
  };

  const removeCoverPhoto = (index) => {
    setProfile((prev) => ({
      ...prev,
      coverPhotos: prev.coverPhotos.filter((_, i) => i !== index),
    }));
  };

  const addGalleryItem = () => {
    if (newGalleryItem.url.trim()) {
      setProfile((prev) => ({
        ...prev,
        gallery: [...prev.gallery, { ...newGalleryItem }],
      }));
      setNewGalleryItem({ url: "", type: "image", title: "" });
    }
  };

  const removeGalleryItem = (index) => {
    setProfile((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const toggleCardExpansion = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlefileupload = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const formdata = new FormData();
    formdata.append("file", file);
    try {
      const res = await axios.post(
        `https://z-backend-2xag.onrender.com/api/upload/type`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const link = await res.data;
      setProfile((previous) => ({ ...previous, [name]: link.fileUrl }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoverPhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    try {
      const res = await axios.post(
        `https://z-backend-2xag.onrender.com/api/upload/type`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const link = await res.data;
      setNewCoverPhoto((prev) => ({
        ...prev,
        url: link.fileUrl,
        type: file.type.startsWith("video") ? "video" : "image",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGalleryItemUpload = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    try {
      const res = await axios.post(
        `https://z-backend-2xag.onrender.com/api/upload/type`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const link = await res.data;
      setNewGalleryItem((prev) => ({
        ...prev,
        url: link.fileUrl,
        type: file.type.startsWith("video") ? "video" : "image",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (showModal) {
      fetchUsers();
    }
  }, [token, showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingIndex !== null) {
        // Update existing builder
        response = await axios.put(
          `${BASE_URL}/api/properties/builder-profile/${profile._id}`,
          profile,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new builder
        response = await axios.post(
          `${BASE_URL}/api/properties/builder-profile`,
          profile,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      
      console.log("Data saved successfully:", response.data);
      alert(`Builder profile ${editingIndex !== null ? 'updated' : 'saved'} successfully!`);
      setShowModal(false);
      
      // Refresh the builders list
      const res = await axios.get(`${BASE_URL}/api/properties/builder-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBuilders(res.data);
      
      // Reset editing state
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving data:", error);
      alert(`Error ${editingIndex !== null ? 'updating' : 'saving'} builder profile. Please try again.`);
    }
  };

  const handleAddprojectClick = (builderId) => {
    navigate("/add-project", {
      state: { builderId },
    });
  };

  const handleEditBuilder = (builder, index) => {
    setEditingIndex(index);
    setProfile({
      ...builder,
      // Make sure to include nested objects properly
      address: builder.address || {
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
      socialLinks: builder.socialLinks || {
        facebook: "",
        linkedin: "",
        instagram: "",
        youtube: "",
      },
      supportInfo: builder.supportInfo || {
        contactPerson: "",
        supportEmail: "",
        supportPhone: "",
      },
    });
    setShowModal(true);
  };

  const handleDeleteBuilder = async (builderId, index) => {
    if (window.confirm("Are you sure you want to delete this builder?")) {
      try {
        await axios.delete(
          `${BASE_URL}/api/properties/builder-profile/${builderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedBuilders = [...builders];
        updatedBuilders.splice(index, 1);
        setBuilders(updatedBuilders);
        alert("Builder deleted successfully!");
      } catch (error) {
        console.error("Error deleting builder:", error);
        alert("Error deleting builder. Please try again.");
      }
    }
  };

  const toggleDropdown = (index) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-grow">
          <select
            className="border rounded p-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="Filter by Type"
          >
            <option value="All">All Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>

          <select
            className="border rounded p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter by Status"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-auto"
          onClick={() => {
            setEditingIndex(null);
            setProfile({
              user: "",
              companyName: "",
              tagline: "",
              logo: "",
              coverPhotos: [],
              gallery: [],
              website: "",
              email: "",
              phone: "",
              address: {
                street: "",
                city: "",
                state: "",
                pincode: "",
              },
              description: "",
              features: [],
              servicesOffered: [],
              socialLinks: {
                facebook: "",
                linkedin: "",
                instagram: "",
                youtube: "",
              },
              supportInfo: {
                contactPerson: "",
                supportEmail: "",
                supportPhone: "",
              },
            });
            setShowModal(true);
          }}
        >
          Add Builder
        </button>
      </div>

      {/* Builders list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builders.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-700 text-lg">No builders found.</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Builder
            </button>
          </div>
        ) : (
          builders.map((builder, index) => (
            <div
              key={builder._id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              {/* Actions dropdown */}
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(index);
                  }}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                </button>

                {dropdownOpenIndex === index && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditBuilder(builder, index);
                        setDropdownOpenIndex(null);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBuilder(builder._id, index);
                        setDropdownOpenIndex(null);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Card content */}
              <div
                onClick={() => handleAddprojectClick(builder._id)}
                className="cursor-pointer"
              >
                {/* Cover Photo */}
                {builder.coverPhotos.length > 0 && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={builder.coverPhotos[0].url}
                      alt={builder.coverPhotos[0].title || "Cover photo"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Basic Info */}
                <div className="p-6">
                  <div className="flex items-start">
                    {builder.logo && (
                      <img
                        src={builder.logo}
                        alt="Company logo"
                        className="h-16 w-16 rounded-full object-cover border-2 border-white -mt-12 mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-xl">
                        {builder.companyName}
                      </h3>
                      <p className="text-gray-600">{builder.tagline}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-700 line-clamp-3">
                    {builder.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium break-words">{builder.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{builder.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {builder.address.city}, {builder.address.state}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={builder.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Site
                      </a>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedCards[index] && (
                    <div className="mt-6 border-t pt-4">
                      <h4 className="font-semibold mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {builder.features.map((feature, i) => (
                          <span
                            key={i}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-semibold mb-2">Services Offered</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {builder.servicesOffered.map((service, i) => (
                          <span
                            key={i}
                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-semibold mb-2">Social Links</h4>
                      <div className="flex space-x-4 mb-4">
                        {builder.socialLinks.facebook && (
                          <a
                            href={builder.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Facebook
                          </a>
                        )}
                        {builder.socialLinks.linkedin && (
                          <a
                            href={builder.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            LinkedIn
                          </a>
                        )}
                        {builder.socialLinks.instagram && (
                          <a
                            href={builder.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Instagram
                          </a>
                        )}
                        {builder.socialLinks.youtube && (
                          <a
                            href={builder.socialLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            YouTube
                          </a>
                        )}
                      </div>

                      <h4 className="font-semibold mb-2">
                        Support Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Contact Person
                          </p>
                          <p className="font-medium">
                            {builder.supportInfo.contactPerson}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Support Email</p>
                          <p className="font-medium">
                            {builder.supportInfo.supportEmail}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Support Phone</p>
                          <p className="font-medium">
                            {builder.supportInfo.supportPhone}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCardExpansion(index);
                    }}
                    className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
                  >
                    {expandedCards[index] ? (
                      <>
                        <ChevronUpIcon className="h-5 w-5 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDownIcon className="h-5 w-5 mr-1" />
                        Know More
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Builder Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-title" className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Builder" : "Add Builder"}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Section 1: Basic Information */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Basic Information
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User *
                </label>
                <select
                  name="user"
                  value={profile.user}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={profile.tagline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="A short tagline about your company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Logo
                  </label>
                  <input
                    type="file"
                    name="logo"
                    onChange={handlefileupload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Description
                  </label>
                  <textarea
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your company, your mission, and values"
                  />
                </div>
              </div>

              {/* Section 2: Cover Photos */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Cover Photos
                </h2>

                <div className="space-y-5">
                  {profile.coverPhotos.length > 0 && (
                    <div className="space-y-3">
                      {profile.coverPhotos.map((photo, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded border"
                        >
                          <div>
                            <p className="font-medium">
                              {photo.title || `Cover Photo ${index + 1}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              {photo.type} - {photo.url.substring(0, 30)}...
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCoverPhoto(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Photo
                      </label>
                      <input
                        type="file"
                        onChange={handleCoverPhotoUpload}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newCoverPhoto.title}
                        onChange={(e) =>
                          setNewCoverPhoto({
                            ...newCoverPhoto,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Cover photo title"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={addCoverPhoto}
                      disabled={!newCoverPhoto.url}
                      className={`flex items-center justify-center px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        newCoverPhoto.url
                          ? "bg-purple-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Cover Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Gallery */}
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Gallery
                </h2>

                <div className="space-y-5">
                  {profile.gallery.length > 0 && (
                    <div className="space-y-3">
                      {profile.gallery.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded border"
                        >
                          <div>
                            <p className="font-medium">
                              {item.title || `Gallery Item ${index + 1}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.type} - {item.url.substring(0, 30)}...
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeGalleryItem(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gallery Item
                      </label>
                      <input
                        type="file"
                        onChange={handleGalleryItemUpload}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newGalleryItem.title}
                        onChange={(e) =>
                          setNewGalleryItem({
                            ...newGalleryItem,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Gallery item title"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={addGalleryItem}
                      disabled={!newGalleryItem.url}
                      className={`flex items-center justify-center px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        newGalleryItem.url
                          ? "bg-purple-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Gallery Item
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 4: Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Contact Information
                </h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={profile.website}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="contact@yourcompany.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Address
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        value={profile.address.street}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="address.city"
                          value={profile.address.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Mumbai"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="address.state"
                          value={profile.address.state}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Maharashtra"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="address.pincode"
                          value={profile.address.pincode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Features */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Company Features
                </h2>

                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {profile.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-1.5 inline-flex text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addFeature()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a feature (e.g. RERA Registered)"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 6: Services Offered */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Services Offered
                </h2>

                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {profile.servicesOffered.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="ml-1.5 inline-flex text-green-500 hover:text-green-700 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex">
                    <input
                      type="text"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addService()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a service (e.g. Apartments)"
                    />
                    <button
                      type="button"
                      onClick={addService}
                      className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 7: Social Links */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Social Media Links
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook
                    </label>
                    <input
                      type="text"
                      name="socialLinks.facebook"
                      value={profile.socialLinks.facebook}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="facebook.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      name="socialLinks.linkedin"
                      value={profile.socialLinks.linkedin}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="linkedin.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="socialLinks.instagram"
                      value={profile.socialLinks.instagram}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="instagram.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      YouTube
                    </label>
                    <input
                      type="text"
                      name="socialLinks.youtube"
                      value={profile.socialLinks.youtube}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="youtube.com"
                    />
                  </div>
                </div>
              </div>

              {/* Section 8: Support Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Support Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="supportInfo.contactPerson"
                      value={profile.supportInfo.contactPerson}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Name of the support contact person"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Support Email
                      </label>
                      <input
                        type="email"
                        name="supportInfo.supportEmail"
                        value={profile.supportInfo.supportEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="support@yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Support Phone
                      </label>
                      <input
                        type="tel"
                        name="supportInfo.supportPhone"
                        value={profile.supportInfo.supportPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editingIndex !== null ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}