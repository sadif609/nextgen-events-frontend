import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Add search state

  const featuredEvents = [
    {
      title: "Tech Conference 2025",
      imageUrl: "https://i.postimg.cc/5Ny2dFr2/pexels-dinesh-kandel-2152317096-32135425.jpg",
    },
    {
      title: "Music Fiesta",
      imageUrl: "https://i.postimg.cc/hGHVhJjj/pexels-djrodium-16013609.jpg",
    },
    {
      title: "Startup Expo",
      imageUrl: "https://i.postimg.cc/fygzTdzK/pexels-nahmadofficial-27538125.jpg",
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data); // Get all events for search functionality
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Filter events based on search term (same logic as EventList.jsx)
  const filteredEvents = events.filter(event =>
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show limited events when no search, all filtered when searching
  const eventsToShow = searchTerm ? filteredEvents : filteredEvents.slice(0, 6);

  return (
    <div className="page">
      <div className="container">
        {/* Hero Carousel */}
        <div className="carousel-container mb-5">
          <div className="carousel">
            <div 
              className="carousel-slides"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredEvents.map((event, idx) => (
                <div key={idx} className="carousel-slide">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="carousel-image"
                  />
                  <div className="carousel-caption">
                    <h4>{event.title}</h4>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {featuredEvents.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-indicator ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="search-section mb-5">
          <div className="search-hero">
            <h2 className="search-title">Find Your Perfect Event</h2>
            <p className="search-subtitle">Search by event name, venue, or description</p>
            <div className="search-container-home">
              <input
                type="text"
                placeholder="🔍 Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-home"
              />
              {searchTerm && (
                <button 
                  className="search-clear"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="section mb-5">
          <h2 className="text-center mb-4">
            {searchTerm ? `🔍 Search Results (${eventsToShow.length})` : '🎉 Upcoming Events'}
          </h2>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading events...</p>
            </div>
          ) : eventsToShow.length > 0 ? (
            <>
              <div className="grid grid-3">
                {eventsToShow.map((event) => (
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
                      <p className="event-card-description">
                        {event.description.length > 100 
                          ? `${event.description.substring(0, 100)}...` 
                          : event.description
                        }
                      </p>
                      <div className="event-card-actions">
                        <Link
                          to={`/event/${event._id}`}
                          className="btn btn-outline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show "View All" button when showing limited results */}
              {!searchTerm && filteredEvents.length > 6 && (
                <div className="text-center mt-4">
                  <Link to="/events" className="btn btn-primary">
                    View All Events ({filteredEvents.length})
                  </Link>
                </div>
              )}
            </>
          ) : searchTerm ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3 className="empty-state-title">No Events Found</h3>
              <p className="empty-state-description">
                No events match your search "{searchTerm}". Try different keywords.
              </p>
              <button 
                className="btn btn-secondary"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <h3 className="empty-state-title">No Events Yet</h3>
              <p className="empty-state-description">
                Be the first to create an event!
              </p>
              <Link to="/add-event" className="btn btn-primary">
                Create First Event
              </Link>
            </div>
          )}
        </div>

        {/* Call to Action - Only show when not searching */}
        {!searchTerm && (
          <div className="section text-center mb-5">
            <div className="card">
              <div className="card-body">
                <h3 className="mb-3">Want to explore more events?</h3>
                <Link to="/events" className="btn btn-primary btn-lg">
                  Browse All Events
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Why Choose Us - Only show when not searching */}
        {!searchTerm && (
          <div className="features-section">
            <div className="features-header">
              <h2 className="features-title">Why NextGen Events?</h2>
              <p className="features-subtitle">Discover what makes us the perfect platform for your events</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg discover">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Smart Discovery</h4>
                  <p className="feature-description">
                    Advanced search and filtering to find exactly the events you're looking for, instantly.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg organizer">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Lightning Fast</h4>
                  <p className="feature-description">
                    Create, manage, and share your events in minutes with our intuitive dashboard.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg secure">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Enterprise Grade</h4>
                  <p className="feature-description">
                    Bank-level security with reliable hosting ensures your events are always accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;