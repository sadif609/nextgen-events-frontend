import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddToCart = (event) => {
    console.log("Added to Cart:", event);
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        alert("Event deleted successfully!");
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event", error);
        alert("Failed to delete event");
      }
    }
  };

  const navigate = useNavigate();

  const handleViewDetails = (eventId) => {
    console.log("Event Details:");
    navigate(`/events/${eventId}`);
  };

  const filteredEvents = events.filter(event =>
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <div className="container">
        <h2 className="text-center mb-4">Event List</h2>

        <div className="search-container mb-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-3">
          {filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-card-image-wrapper">
                <img
                  src={`http://localhost:5000${event.imageUrl}`}
                  alt={event.title}
                  className="event-card-image-full"
                />
              </div>
              <div className="event-card-content">
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-description" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {event.description}
                </p>
                <p className="event-card-meta-text"><strong>Date:</strong> {event.date}</p>
                <p className="event-card-meta-text"><strong>Venue:</strong> {event.venue}</p>
                <div className="event-card-actions">
                  <button className="btn btn-primary" onClick={() => handleViewDetails(event._id)}>
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventList;