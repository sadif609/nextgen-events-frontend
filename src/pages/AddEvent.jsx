import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add this import

function AddEvent() {
  const navigate = useNavigate(); // Add navigation
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    banner: null,
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setEventData({
      ...eventData,
      banner: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      alert("Please log in first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("date", eventData.date);
    formData.append("venue", eventData.venue);
    formData.append("description", eventData.description);
    formData.append("userEmail", user.email);
    if (eventData.banner) {
      formData.append("banner", eventData.banner);
    }
  
    try {
      const res = await axios.post("http://localhost:5000/api/events", formData);
      console.log("Event submitted:", res.data);
      alert("Event added successfully!");
      
      // Reset form after successful submission
      setEventData({
        title: "",
        date: "",
        venue: "",
        description: "",
        banner: null,
      });
      
      // Clear file input
      const fileInput = document.getElementById("banner-input");
      if (fileInput) {
        fileInput.value = "";
      }
      
      // Ask user what to do next
      const goToMyEvents = window.confirm(
        "Event created successfully! 🎉\n\nWould you like to view your events? (Click Cancel to add another event)"
      );
      
      if (goToMyEvents) {
        navigate("/my-events");
      }
      // If cancel, stay on current page with cleared form
      
    } catch (err) {
      console.error("Error submitting event:", err);
      alert("Failed to add event");
    }
  };

  // Rest of your JSX remains exactly the same
  return (
    <div className="page">
      <div className="container">
        <div className="form-container">
          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">Create New Event</h2>
              <p className="form-subtitle">Fill in the details to create your event</p>
            </div>
            
            <form onSubmit={handleSubmit} className="event-form">
              <div className="form-group">
                <label className="form-label">Event Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter event title"
                  value={eventData.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    required
                    className="form-input"
                    style={{
    colorScheme: 'dark'
  }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    placeholder="Enter venue"
                    value={eventData.venue}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={4}
                  name="description"
                  placeholder="Enter event description"
                  value={eventData.description}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Event Banner</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    name="banner"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="file-input"
                    id="banner-input"
                  />
                  <label htmlFor="banner-input" className="file-input-label">
                    {eventData.banner ? eventData.banner.name : "Choose Image"}
                    <span className="file-input-icon">📁</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;