import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;
const BASE_URL = "https://crm-bcgg.onrender.com";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/calender/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDateClick = (arg) => {
    setNewEvent({
      title: "",
      startDate: arg.dateStr,
      endDate: arg.dateStr,
    });
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      startDate: info.event.startStr,
      endDate: info.event.endStr || info.event.startStr,
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    // For new events, require title and start date
    if (!selectedEvent && (!newEvent.title || !newEvent.startDate)) {
      alert("Please enter title and start date for new events.");
      return;
    }

    try {
      const url = selectedEvent
        ? `${BASE_URL}/api/calender/${selectedEvent.id}`
        : `${BASE_URL}/api/calender/`;

      const method = selectedEvent ? "PUT" : "POST";

      // Use selectedEvent data if editing, otherwise use newEvent data
      const eventData = selectedEvent || newEvent;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: eventData.title,
          startDate: eventData.startDate,
          endDate: eventData.endDate || eventData.startDate,
        }),
      });

      if (response.ok) {
        fetchEvents(); // Refresh events after successful operation
        setModalOpen(false);
        setNewEvent({ title: "", startDate: "", endDate: "" });
        setSelectedEvent(null);
      } else {
        console.error("Error saving event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent || !window.confirm("Delete this event?")) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/calender/${selectedEvent.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchEvents();
        setModalOpen(false);
        setSelectedEvent(null);
      } else {
        console.error("Error deleting event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition"
          onClick={() => {
            setNewEvent({ title: "", startDate: "", endDate: "" });
            setSelectedEvent(null);
            setModalOpen(true);
          }}
        >
          + Add Event
        </button>
      </div>

      <div className="flex-1 p-4 overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dateClick={handleDateClick}
          events={events.map((event) => ({
            id: event._id || event.id,
            title: event.title,
            start: event.startDate,
            end: event.endDate,
            color: "#3b82f6",
          }))}
          eventClick={handleEventClick}
          height="100%"
          contentHeight="auto"
          aspectRatio={1.8}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 transition-opacity">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {selectedEvent ? "Edit Event" : "Add New Event"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedEvent ? selectedEvent.title : newEvent.title}
                  onChange={(e) =>
                    selectedEvent
                      ? setSelectedEvent({
                          ...selectedEvent,
                          title: e.target.value,
                        })
                      : setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    (selectedEvent
                      ? selectedEvent.startDate
                      : newEvent.startDate
                    )?.substring(0, 10) || ""
                  }
                  onChange={(e) =>
                    selectedEvent
                      ? setSelectedEvent({
                          ...selectedEvent,
                          startDate: e.target.value,
                        })
                      : setNewEvent({ ...newEvent, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    (selectedEvent
                      ? selectedEvent.endDate
                      : newEvent.endDate
                    )?.substring(0, 10) || ""
                  }
                  onChange={(e) =>
                    selectedEvent
                      ? setSelectedEvent({
                          ...selectedEvent,
                          endDate: e.target.value,
                        })
                      : setNewEvent({ ...newEvent, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-between mt-6 space-x-3">
              <div>
                {selectedEvent && (
                  <button
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedEvent(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  onClick={handleSubmit}
                >
                  {selectedEvent ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
