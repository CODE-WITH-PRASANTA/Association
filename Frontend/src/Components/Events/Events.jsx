import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API, { IMG_URL } from "../../api/axios"; // <-- Import your API client config
import "./Events.css";

/* ---------------------------------------------------------
   Icons
--------------------------------------------------------- */
const IconReel = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="reelBody" cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#3a3d46" />
        <stop offset="55%" stopColor="#1c1e24" />
        <stop offset="100%" stopColor="#0b0c10" />
      </radialGradient>
      <radialGradient id="reelHub" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#e9c273" />
        <stop offset="100%" stopColor="#b8862c" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#reelBody)" stroke="#b8862c" strokeWidth="1.5" />
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <circle
        key={deg}
        cx={50 + Math.cos((deg * Math.PI) / 180) * 27}
        cy={50 + Math.sin((deg * Math.PI) / 180) * 27}
        r="11"
        fill="#0a0b0f"
        stroke="#b8862c"
      />
    ))}
    <circle cx="50" cy="50" r="10" fill="url(#reelHub)" />
    <circle cx="50" cy="50" r="3" fill="#000" />
  </svg>
);

const IconCalendar = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 9.5H21" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7.5 3V6.5M16.5 3V6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconClock = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5V12L15.2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrow = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------
   Component
--------------------------------------------------------- */
const Events = () => {
  // 1. Initialize API dynamic states
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from backend on mount
  useEffect(() => {
    const fetchLandingEvents = async () => {
      try {
        const res = await API.get("/events");
        // Limit to latest 3 events for front landing visual design if necessary
        setEvents(res.data.slice(0, 3)); 
      } catch (error) {
        console.error("Error loading events for frontend layout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingEvents();
  }, []);

  return (
    <section className="events-section">
      {/* ambient background glow */}
      <div className="events-section__bg" aria-hidden="true">
        <span className="events-section__glow events-section__glow--gold" />
        <span className="events-section__glow events-section__glow--crimson" />
      </div>

      <div className="events-section__inner">
        <header className="events-header">
          <span className="events-marquee">
            <span className="events-marquee__bulb" />
            <span className="events-marquee__bulb" />
            <span className="events-marquee__bulb" />
            <span className="events-marquee__label">Now Showing</span>
            <span className="events-marquee__bulb" />
            <span className="events-marquee__bulb" />
            <span className="events-marquee__bulb" />
          </span>

          <h2 className="events-title">Upcoming Events</h2>
          <span className="events-title__rule" />

          <p className="events-subtitle">
            Discover exclusive premieres, screenings and masterclasses.
          </p>
        </header>

        {/* 3. Handle Loader UI State */}
        {loading ? (
          <div style={{ textAlign: "center", color: "#b8862c", margin: "3rem 0" }}>
            Loading Dynamic Events...
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", margin: "3rem 0" }}>
            No current events listed. Check back soon!
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event, index) => (
              <article
                className="events-card"
                key={event._id || event.id} /* Use Mongo _id fallback if standard ID is missing */
                style={{ "--delay": `${index * 0.12}s` }}
              >
                <div className="events-card__media">
                  <span className="events-card__filmstrip" aria-hidden="true" />

                  {/* 4. Connect server file structure uploads securely */}
                  <img
                    src={`${IMG_URL}/uploads/${event.image}`}
                    alt={event.title}
                    className="events-card__image"
                    loading="lazy"
                  />

                  <span className="events-card__badge">
                    {event.category ? event.category.toUpperCase() : "GENERAL"}
                  </span>

                  <div className="events-card__reel">
                    <IconReel className="events-card__reel-icon" />
                  </div>

                  <span
                    className="events-card__filmstrip events-card__filmstrip--bottom"
                    aria-hidden="true"
                  />
                </div>

                <div className="events-card__body">
                  <div className="events-card__meta">
                    <span className="events-card__meta-item">
                      <IconCalendar className="events-card__meta-icon" />
                      {/* Format date gracefully if backend returns standard system timestamps */}
                      {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'SHORT', day: 'numeric' }).toUpperCase() : "TBD"}
                    </span>

                    <span className="events-card__meta-item">
                      <IconClock className="events-card__meta-icon" />
                      {event.time || "See Details"}
                    </span>
                  </div>

                  <h3 className="events-card__title">{event.title}</h3>

                  {/* React Router Dynamic State Navigation */}
                  <Link
                    to="/eventdetails"
                    state={{ event }}
                    className="events-card__link"
                  >
                    See Event Details
                    <IconArrow className="events-card__link-icon" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="events-cta">
          <Link to="/events" className="events-cta__button">
            View All Events
            <IconArrow className="events-cta__icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;