import React from "react";
import { Link } from "react-router-dom"; // <-- Import Link
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

    <circle
      cx="50"
      cy="50"
      r="46"
      fill="url(#reelBody)"
      stroke="#b8862c"
      strokeWidth="1.5"
    />

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
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path d="M3 9.5H21" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M7.5 3V6.5M16.5 3V6.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconClock = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M12 7.5V12L15.2 14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconArrow = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M4 12H20M20 12L14 6M20 12L14 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------------------------------------------------------
   Dummy Data
--------------------------------------------------------- */

const EVENTS = [
  {
    id: 1,
    category: "FESTIVAL",
    date: "OCT 18",
    time: "7:30 PM · Grand Hall",
    title: "Midnight premiere of The Last Reel",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "SCREENING",
    date: "OCT 24",
    time: "9:00 PM · Rooftop Cinema",
    title: "Classics under the stars: Noir Night",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "MASTERCLASS",
    date: "NOV 02",
    time: "4:00 PM · Studio B",
    title: "Behind the lens: Director's Q&A",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop",
  },
];

const Events = () => {
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

        <div className="events-grid">
          {EVENTS.map((event, index) => (
            <article
              className="events-card"
              key={event.id}
              style={{ "--delay": `${index * 0.12}s` }}
            >
              <div className="events-card__media">
                <span className="events-card__filmstrip" aria-hidden="true" />

                <img
                  src={event.image}
                  alt={event.title}
                  className="events-card__image"
                  loading="lazy"
                />

                <span className="events-card__badge">{event.category}</span>

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
                    {event.date}
                  </span>

                  <span className="events-card__meta-item">
                    <IconClock className="events-card__meta-icon" />
                    {event.time}
                  </span>
                </div>

                <h3 className="events-card__title">{event.title}</h3>

                {/* React Router Navigation */}
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