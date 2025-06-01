import { useState } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "Property Visit at Downtown",
      date: new Date("2025-04-28T10:00:00"),
      description: "Client visit to view the property.",
      assigned: "John Doe (Client)",
      type: "Visit",
    },
    {
      title: "Maintenance Check in Uptown",
      date: new Date("2025-04-29T12:00:00"),
      description: "Scheduled maintenance for plumbing repairs.",
      assigned: "Alice Smith (Vendor)",
      type: "Maintenance",
    },
    {
      title: "Lead Follow-up with Jane Doe",
      date: new Date("2025-04-30T14:00:00"),
      description: "Follow-up call with potential lead Jane Doe.",
      assigned: "Bob Johnson (Agent)",
      type: "Lead Follow-up",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    assigned: "",
    type: "Visit",
  });
  const [eventTypeFilter, setEventTypeFilter] = useState("All");

  const handleDateChange = (date) => setSelectedDate(date);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (form.title && form.date && form.description && form.assigned) {
      setEvents([
        ...events,
        {
          ...form,
          date: new Date(form.date),
        },
      ]);
      setForm({
        title: "",
        date: "",
        description: "",
        assigned: "",
        type: "Visit",
      });
      setShowModal(false);
    }
  };

  const filteredEvents = events.filter(
    (event) => eventTypeFilter === "All" || event.type === eventTypeFilter
  );

  return (
    <>
      <h1 className="ms-6 text-2xl font-medium">Calendar</h1>
      <div className="p-6 space-y-6">
        {/* Flex container for Calendar and Event Panel stacked vertically */}
        <div className="flex flex-col gap-6">
          {/* Calendar */}
          <div className="w-full">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="border rounded-md p-4 w-full"
            />
          </div>

          {/* Event Filters and Table */}
          <div className="w-full">
            {/* Event Filters and Add Event Button */}
            <div className="flex items-center space-x-4 mb-6">
              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="border p-2 rounded w-full max-w-xs"
              >
                <option value="All">All Events</option>
                <option value="Visit">Property Visit</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Lead Follow-up">Lead Follow-up</option>
              </select>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Event
              </button>
            </div>

            {/* Events Table */}
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Title</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Assigned</th>
                    <th className="p-2 border">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-2 border">{event.title}</td>
                      <td className="p-2 border">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="p-2 border">{event.type}</td>
                      <td className="p-2 border">{event.assigned}</td>
                      <td className="p-2 border">{event.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal for Adding/Editing Event */}
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-xl font-semibold mb-4">
            {form.title ? "Edit Event" : "Add New Event"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="assigned"
              placeholder="Assigned Vendor/Client"
              value={form.assigned}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="Visit">Property Visit</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Lead Follow-up">Lead Follow-up</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {form.title ? "Update Event" : "Add Event"}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CalendarPage;
